# Automações Instagram — Clone ManyChat

Feature de automação de comentários e DMs do Instagram dentro do War Room. Baseado no fluxo step-by-step do ManyChat (não um flow builder visual com DAG, mas um formulário guiado com preview ao vivo).

---

## 1. Visão Geral

O usuário seleciona um Reel/post, configura uma keyword no comentário, e define que mensagens serão enviadas na DM quando alguém comentar essa keyword.

**Fluxo do usuário (4 passos):**
1. **Quando alguém faz um comentário** — em qual publicação?
2. **E esse comentário possui** — qual keyword?
3. **Eles receberão** — mensagem de boas-vindas (texto + botão)
4. **E então, eles vão receber** — DM final com o link/conteúdo

**Layout da tela:**
- Coluna esquerda (~40%): formulário com os 4 passos acordeão/scroll
- Coluna direita (~60%): preview em iPhone mockup mostrando como ficará a DM

---

## 2. Arquitetura

```
┌──────────────────────────────────────────────────────┐
│              WAR ROOM (Next.js Frontend)              │
│                                                       │
│   /automations          /automations/new              │
│   - Lista de            - Formulário 4-step           │
│     automações          - Preview iPhone ao vivo      │
│                                                       │
│            ↓ salva configuração JSON ↓                │
│                                                       │
│              SUPABASE (PostgreSQL)                    │
│   - automations (config + trigger + mensagens)        │
│   - automation_contacts (quem interagiu)              │
│   - automation_logs (execuções)                       │
└──────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────┐
│                   n8n (Executor)                      │
│                                                       │
│   1. Webhook listener → recebe eventos do Instagram   │
│   2. Busca automation no Supabase pelo media_id       │
│   3. Avalia keyword match                             │
│   4. Envia public reply no comentário (opcional)      │
│   5. Envia DM via Instagram Graph API                 │
│   6. Aguarda resposta/clique → envia DM final         │
│   7. Loga no Supabase                                 │
└──────────────────────────────────────────────────────┘
                           ↕
              Instagram Graph API (Meta)
```

**Por que n8n como executor?**
- Já está integrado no projeto (`n8n.sharken.com.br`)
- Lida bem com webhooks, delays, retries, rate limits
- Edge Functions do Supabase não tem scheduling nativo
- War Room = configurador / n8n = executor

---

## 3. Modelo de Dados

### Tabela `automations`
```sql
create table automations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  account_id uuid references accounts(id),

  name text not null,
  is_active boolean default false,

  -- Passo 1: Trigger (qual publicação)
  trigger_type text not null check (trigger_type in ('specific_post', 'any_post', 'next_post')),
  media_id text,                    -- ID do reel/post no Instagram (quando specific_post)
  media_url text,                   -- URL para mostrar no UI
  media_thumbnail_url text,         -- thumbnail para preview

  -- Passo 2: Comment match
  comment_match_type text not null check (comment_match_type in ('specific_keyword', 'any_word')),
  keywords text[],                  -- array de palavras (ex: ['CLAUDE', 'IA'])
  reply_to_comments boolean default false,  -- "interagir com os comentários deles"
  public_reply_variants text[],     -- respostas públicas aleatórias

  -- Passo 3: Mensagem de boas-vindas (Opening DM)
  welcome_enabled boolean default true,
  welcome_message text,
  welcome_button_label text,        -- ex: "Me envie o link"

  -- Passo 4: DM final (após clique no botão)
  final_message text,
  final_link_label text,            -- ex: "é o link"
  final_link_url text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Tabela `automation_contacts`
```sql
create table automation_contacts (
  id uuid primary key default gen_random_uuid(),
  ig_scoped_id text not null,
  username text,
  first_name text,
  last_interaction timestamptz,
  created_at timestamptz default now(),
  unique(ig_scoped_id)
);
```

### Tabela `automation_logs`
```sql
create table automation_logs (
  id uuid primary key default gen_random_uuid(),
  automation_id uuid references automations(id) on delete cascade,
  contact_id uuid references automation_contacts(id),
  comment_id text,
  comment_text text,
  status text check (status in ('triggered', 'public_replied', 'dm_sent', 'completed', 'failed')),
  error_message text,
  executed_at timestamptz default now()
);
```

**RLS:** ativado em todas. `automations` filtrada por `user_id`. Logs/contacts joinados via automation.

---

## 4. UI — Wireframe das Telas

### `/automations` (Lista)
- Card por automação: thumbnail do reel + nome + keyword + toggle ativo + métricas (ex: "127 DMs enviadas")
- Botão "Nova Automação" no topo

### `/automations/new` e `/automations/[id]/edit`
**Layout 2 colunas:**

**Coluna esquerda (formulário):**

#### Bloco 1 — "Quando alguém faz um comentário"
- Radio: `uma publicação ou Reel específico` (default)
- Radio: `qualquer publicação ou Reel`
- Radio: `próxima publicação ou Reel`
- Se "específico": grid de thumbnails dos últimos reels (puxados via `content` table) + "Mostrar todos"

#### Bloco 2 — "E esse comentário possui"
- Radio: `uma palavra ou expressão específica` → input de keywords (separadas por vírgula)
- Radio: `qualquer palavra`
- Sugestões clicáveis: "Preço", "Link", "Comprar"
- Toggle: `interagir com os comentários deles na publicação` (= responder publicamente)

#### Bloco 3 — "Eles receberão"
- Toggle ON/OFF: `uma mensagem de boas-vindas`
- Textarea: mensagem (com suporte a emoji)
- Input: label do botão (ex: "Me envie o link")

#### Bloco 4 — "E então, eles vão receber"
- Textarea: mensagem final
- Input: label do link
- Input: URL do link
- Botão: "+ Adicionar Um Link"

**Coluna direita:** iPhone mockup com tabs `Publicar | Comentários | DM` mostrando preview reativo conforme o usuário digita.

**Header:** botão "Ativar" no topo direito.

---

## 5. Fases de Implementação

### **Fase 1 — Fundação Backend** (3-4 dias)
- [ ] Migration: criar tabelas `automations`, `automation_contacts`, `automation_logs`
- [ ] RLS policies
- [ ] DAL: `lib/dal/automations.ts` (getAutomations, getAutomationById)
- [ ] Server Actions: `features/automations/actions/` (create, update, delete, toggleActive)
- [ ] TypeScript types

### **Fase 2 — UI de Listagem e Criação** (4-5 dias)
- [ ] Rota `/automations` (Server Component) com lista
- [ ] Componente `AutomationCard` (thumbnail + dados + toggle)
- [ ] Rota `/automations/new` e `/automations/[id]/edit`
- [ ] Layout 2 colunas (formulário + preview)
- [ ] **Sync de Reels Instagram** — ao abrir o seletor:
  1. Buscar lista de mídia da conta IG via `GET /{ig-user-id}/media` (Graph API)
  2. Fazer `upsert` na tabela `content` por `ig_media_id` (cria conteúdos novos não-sincronizados)
  3. Retornar lista mergeada (DB + IG) ordenada por data
  4. Cache de 5min para evitar hits excessivos na Graph API
- [ ] Bloco 1: seletor de Reel (grid de thumbnails do merge IG+DB)
- [ ] Bloco 2: input de keywords + toggle public reply
- [ ] Bloco 3: editor de welcome message
- [ ] Bloco 4: editor de final message
- [ ] Componente `IPhonePreview` reativo (mostra welcome → click → final)
- [ ] Botão "Ativar" + persistência no Supabase

### **Fase 3 — Integração Instagram + n8n** (5-7 dias)
- [ ] Configurar Meta App + permissões IG (`instagram_business_manage_messages`, `instagram_business_manage_comments`)
- [ ] Endpoint de OAuth do Instagram para conectar conta (salvar `access_token` em `accounts`)
- [ ] Workflow n8n: webhook receiver → validação `X-Hub-Signature-256`
- [ ] Workflow n8n: busca automation por `media_id` no Supabase
- [ ] Workflow n8n: matching de keyword (contains, exact, etc.)
- [ ] Workflow n8n: enviar public reply (rotacionando variantes)
- [ ] Workflow n8n: enviar Private Reply (welcome DM com botão)
- [ ] Workflow n8n: listener de postback de botão → enviar DM final
- [ ] Persistir `automation_contacts` e `automation_logs`
- [ ] Rate limiter (200 DMs/hr)

### **Fase 4 — Analytics e Logs** (2-3 dias)
- [ ] Dashboard por automação: total disparos, DMs enviadas, taxa de cliques
- [ ] Lista de contatos que interagiram
- [ ] Aba de logs com filtro por status
- [ ] Métricas no card da listagem

### **Fase 5 — Polish e Edge Cases** (2-3 dias)
- [ ] Validação de formulário (Zod)
- [ ] Estados de loading/erro
- [ ] Confirmação ao deletar
- [ ] Preview de variantes de public reply
- [ ] Tratamento de token expirado do Instagram
- [ ] Empty states

### **Fase 6 — Features PRO (futuro)**
- [ ] "qualquer publicação" e "próxima publicação"
- [ ] DM solicitando follow antes do link
- [ ] DM solicitando email
- [ ] Múltiplos passos no fluxo (delay, condição)
- [ ] A/B test de mensagens
- [ ] Templates de automação

---

## 6. Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| UI | shadcn v4 + Tailwind 4 + lucide-react |
| Form state | React state (formulário simples não precisa react-hook-form, mas pode usar) |
| Validação | Zod (Server Actions) |
| DB | Supabase Postgres + RLS |
| Auth | Supabase Auth |
| Executor | n8n (workflows existentes em `n8n.sharken.com.br`) |
| API Externa | Instagram Graph API v21+ (Meta) |

---

## 7. APIs do Instagram — Referência Rápida

**Permissões necessárias no Meta App:**
- `instagram_business_basic`
- `instagram_business_manage_messages`
- `instagram_business_manage_comments`
- `pages_read_engagement`

**Webhook subscription:**
```
POST /{ig-user-id}/subscribed_apps
fields: comments, messages, messaging_postbacks
```

**Private Reply (DM ligada ao comentário):**
```
POST /v21.0/<IG_USER_ID>/messages
{
  "recipient": { "comment_id": "<comment-id>" },
  "message": {
    "text": "Olá! Clique abaixo para receber o link",
    "quick_replies": [{ "content_type": "text", "title": "Me envie o link", "payload": "SEND_LINK" }]
  }
}
```

**DM follow-up (após user responder/clicar):**
```
POST /v21.0/<IG_USER_ID>/messages
{
  "recipient": { "id": "<ig-scoped-id>" },
  "message": { "text": "Aqui está: https://link.com" }
}
```

**Limites:**
- 200 DMs/hora por conta
- 1 Private Reply por comentário
- Janela de 24h após interação do usuário para follow-up
- 7 dias de prazo para responder a um comentário

---

## 8. Riscos e Considerações

- **Aprovação do Meta App:** as permissões `instagram_business_manage_messages` exigem App Review da Meta (pode levar dias/semanas). Considerar começar em Development Mode e adicionar testers.
- **Rate limits:** 200 DMs/hora pode ser limitante em vídeos virais. n8n precisa de fila + retry.
- **Spam detection:** Instagram pode bloquear se reply público sempre idêntico. Por isso variantes aleatórias.
- **Token refresh:** Long-lived tokens duram 60 dias e precisam refresh antes de expirar.
- **Webhook reliability:** Meta pode reentregar eventos. Usar idempotência via `comment_id`.

---

## 9. Próximos Passos Imediatos

1. ✅ Validar este plano com o usuário
2. Criar migration Supabase (Fase 1)
3. Stub das rotas e DAL
4. Construir UI do formulário com preview (Fase 2) usando dados mock
5. Em paralelo: começar processo de App Review da Meta
