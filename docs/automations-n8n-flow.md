# Fluxo n8n — Executor das Automações

Documento de referência para construir os workflows n8n que executam as automações configuradas no War Room.

---

## Visão Geral

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Instagram  │     │     n8n      │     │   Supabase   │
│  (Meta App)  │────▶│  (Executor)  │◀───▶│  (War Room)  │
└──────────────┘     └──────────────┘     └──────────────┘
       ▲                    │
       └────────────────────┘
         Reply via Graph API
```

Você precisa de **2 workflows** no n8n:

1. **Comment Handler** — quando alguém comenta num Reel, processa e dispara a automação
2. **DM Handler** — quando alguém clica no botão da DM (postback) ou responde, avança o fluxo

---

## Workflow 1: Comment Handler

### Trigger
Webhook do Meta (você já tem). Payload chega com:

```json
{
  "object": "instagram",
  "entry": [{
    "id": "<ig-user-id>",
    "time": 1234567890,
    "changes": [{
      "field": "comments",
      "value": {
        "id": "<comment-id>",
        "text": "Quero o link!",
        "from": { "id": "<ig-scoped-id>", "username": "user_x" },
        "media": { "id": "<media-id>" }
      }
    }]
  }]
}
```

### Diagrama de nós

```
┌────────────────────────────────────────────────────────────┐
│  [1] Webhook IN (Meta)                                      │
│      Recebe payload                                         │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [2] Filter: field === "comments"                           │
│      (ignora messages, mentions, etc)                       │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [3] Set: extrai dados do comentário                        │
│      media_id, comment_id, comment_text,                    │
│      from_id (ig_scoped_id), from_username                  │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [4] Supabase Query: busca automações ativas pra esse Reel  │
│      SELECT * FROM automations                              │
│      WHERE (ig_media_id = {{media_id}}                      │
│             OR content_id = {{media_id}})                   │
│        AND is_active = true                                 │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [5] If: encontrou automação?                               │
│      └─ NÃO → end                                           │
│      └─ SIM → continua                                      │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [6] Code (JS): keyword match                               │
│                                                              │
│      const text = $json.comment_text.toLowerCase();         │
│      const auto = $json.automation;                         │
│                                                              │
│      if (auto.comment_match_type === "any_word") {          │
│        return { matched: true };                            │
│      }                                                       │
│      const matched = auto.keywords.some(kw =>               │
│        text.includes(kw.toLowerCase())                      │
│      );                                                      │
│      return { matched };                                    │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [7] If: matched?                                           │
│      └─ NÃO → end (não é nosso público)                     │
│      └─ SIM → continua                                      │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [8] Supabase Upsert: automation_contacts                   │
│      onConflict: ig_scoped_id                               │
│      { ig_scoped_id, username, last_interaction: now() }    │
│      .select() → retorna contact.id                         │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [9] Supabase Insert: automation_logs                       │
│      {                                                       │
│        automation_id, contact_id,                           │
│        comment_id, comment_text,                            │
│        status: "triggered"                                  │
│      }                                                       │
│      .select() → retorna log.id (pra updates depois)        │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [10] Supabase RPC ou UPDATE: incrementa contador            │
│      UPDATE automations                                     │
│      SET total_triggered = total_triggered + 1              │
│      WHERE id = {{automation.id}}                           │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [11] If: reply_to_comments === true?                        │
│      └─ NÃO → pula                                          │
│      └─ SIM → continua pro public reply                     │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [12] Code: escolhe variante aleatória                       │
│      const variants = $json.public_reply_variants;          │
│      const i = Math.floor(Math.random() * variants.length); │
│      return { reply: variants[i] || "Te chamei na DM 📩" }; │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [13] HTTP POST: Public Reply ao comentário                  │
│      POST /v21.0/{comment_id}/replies                       │
│      Body: { message: "{{reply}}",                          │
│              access_token: "{{META_ACCESS_TOKEN}}" }        │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [14] Supabase Update log: status = "public_replied"         │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [15] If: welcome_enabled === true?                          │
│      └─ NÃO → pula direto pra mensagem final                │
│      └─ SIM → envia Private Reply com botão                 │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [16] HTTP POST: Private Reply (DM ligada ao comentário)     │
│      POST /v21.0/{IG_USER_ID}/messages                      │
│      Body: {                                                │
│        recipient: { comment_id: "{{comment_id}}" },         │
│        message: {                                           │
│          text: "{{welcome_message}}",                       │
│          quick_replies: [{                                  │
│            content_type: "text",                            │
│            title: "{{welcome_button_label}}",               │
│            payload: "AUTO_{{automation_id}}_NEXT"           │
│          }]                                                  │
│        }                                                     │
│      }                                                       │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [17] Supabase Update log: status = "dm_sent"                │
│      UPDATE automations SET total_dms_sent += 1             │
└────────────────────────────────────────────────────────────┘
```

**Importante:** o `payload` do quick_reply (`AUTO_{automation_id}_NEXT`) é o que o **Workflow 2** vai ler pra saber qual automação avançar. Isso é o que conecta os dois fluxos.

---

## Workflow 2: DM Handler

### Trigger
Mesmo webhook do Meta. Payload chega com:

```json
{
  "object": "instagram",
  "entry": [{
    "id": "<ig-user-id>",
    "messaging": [{
      "sender": { "id": "<ig-scoped-id>" },
      "recipient": { "id": "<ig-user-id>" },
      "timestamp": 1234567890,
      "message": {
        "mid": "<message-id>",
        "text": "Me envie o link",
        "quick_reply": { "payload": "AUTO_uuid-da-automation_NEXT" }
      }
    }]
  }]
}
```

### Diagrama

```
┌────────────────────────────────────────────────────────────┐
│  [1] Webhook IN (Meta) — mesmo endpoint                     │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [2] Filter: tem messaging[]?                               │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [3] Code: extrai automation_id do payload                  │
│      const payload = $json.message?.quick_reply?.payload;   │
│      if (!payload?.startsWith("AUTO_")) return [];          │
│      const [, automationId, action] = payload.split("_");   │
│      return { automationId, action,                         │
│               sender_id: $json.sender.id,                   │
│               text: $json.message?.text };                  │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [4] Supabase Get: SELECT * FROM automations                │
│      WHERE id = {{automationId}}                            │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [5] Supabase Get contact:                                  │
│      SELECT id FROM automation_contacts                     │
│      WHERE ig_scoped_id = {{sender_id}}                     │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [6] If: require_follow === true?                           │
│      └─ NÃO → pula pro [10] (mensagem final direta)         │
│      └─ SIM → checa se já segue                             │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [7] HTTP GET: checar se usuário segue                      │
│      GET /v21.0/{sender_id}?fields=is_user_follow_business  │
│      &access_token=<token>                                  │
│      ⚠ requer instagram_manage_insights ou similar           │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [8] If: já segue?                                          │
│      └─ NÃO → envia follow_message + end                    │
│      └─ SIM → continua pra mensagem final                   │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│  [9] (caminho NÃO segue): HTTP POST follow_message          │
│      POST /v21.0/{IG_USER_ID}/messages                      │
│      {                                                       │
│        recipient: { id: "{{sender_id}}" },                  │
│        message: {                                           │
│          text: "{{follow_message}}",                        │
│          quick_replies: [{                                  │
│            title: "Já segui!",                              │
│            payload: "AUTO_{{automationId}}_NEXT"            │
│          }]                                                  │
│        }                                                     │
│      }                                                       │
│      → end                                                  │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [10] HTTP POST: mensagem final com link                     │
│      POST /v21.0/{IG_USER_ID}/messages                      │
│      {                                                       │
│        recipient: { id: "{{sender_id}}" },                  │
│        message: { text: "{{final_message}}\n\n              │
│                          {{final_link_label}}: {{url}}" }   │
│      }                                                       │
└──────────────────────┬─────────────────────────────────────┘
                       ▼
┌────────────────────────────────────────────────────────────┐
│ [11] Supabase Insert log:                                   │
│      {                                                       │
│        automation_id, contact_id,                           │
│        status: "completed"                                  │
│      }                                                       │
│      UPDATE automations SET                                 │
│        total_clicks = total_clicks + 1                      │
└────────────────────────────────────────────────────────────┘
```

---

## Decisões de design importantes

### 1. Por que `payload: "AUTO_{id}_NEXT"` e não só o ID?

Permite expandir o fluxo sem quebrar. Se você adicionar um passo intermediário (ex: confirmar email), pode usar `AUTO_{id}_CONFIRM_EMAIL`, e o Workflow 2 já distingue.

### 2. Idempotência

Meta pode reentregar webhooks. Adicione no início de cada workflow:
- Buscar `automation_logs` por `comment_id` (Workflow 1) ou `message.mid` (Workflow 2)
- Se já existe → end (não processar duas vezes)

### 3. Rate limit

Limites do Instagram:
- 200 DMs/hora por conta
- 1 Private Reply por comentário (não tente reenviar)

Pra evitar bater no limite:
- Use o nó **Wait** do n8n entre disparos (~18s entre cada)
- Ou crie uma fila no Supabase: tabela `automation_queue` com `process_at timestamp` e um cron que processa

### 4. Tratamento de erros

Em cada HTTP POST do Graph API, configure **Continue On Fail** e capture erro:

```js
if ($json.error) {
  // Insert em automation_logs com status="failed", error_message
  // End workflow
}
```

### 5. Token expirado

Long-lived token dura 60 dias. Crie um **workflow agendado** mensal:

```
Schedule (1x/mês)
  ↓
HTTP GET /v21.0/oauth/access_token?grant_type=ig_refresh_token
  ↓
Salva novo token em variável global do n8n / vault
```

---

## Credenciais Supabase no n8n

Use **service_role key** (não a anon) pra bypass do RLS. Adicione como credencial Postgres ou HTTP Header:

```
URL: https://kbukldxjgiikhobtnabq.supabase.co/rest/v1/<table>
Headers:
  apikey: <service_role_key>
  Authorization: Bearer <service_role_key>
  Prefer: return=representation
```

A service_role key está em **Supabase Dashboard → Settings → API → service_role**.

---

## Helper SQL — Increment counter

Crie uma função no Supabase pra incremento atômico:

```sql
create or replace function public.increment_automation_counter(
  automation_id uuid,
  counter text,
  amount int default 1
)
returns void as $$
begin
  if counter = 'triggered' then
    update public.automations set total_triggered = total_triggered + amount where id = automation_id;
  elsif counter = 'dms_sent' then
    update public.automations set total_dms_sent = total_dms_sent + amount where id = automation_id;
  elsif counter = 'clicks' then
    update public.automations set total_clicks = total_clicks + amount where id = automation_id;
  end if;
end;
$$ language plpgsql security definer;
```

No n8n, chama via:
```
POST /rest/v1/rpc/increment_automation_counter
Body: { "automation_id": "...", "counter": "triggered" }
```

---

## Checklist pra construir

**Workflow 1 (Comment):**
- [ ] Filter por field === "comments"
- [ ] Extract dados
- [ ] Query automations ativas (por ig_media_id ou content_id)
- [ ] Keyword match em Code node
- [ ] Upsert contact
- [ ] Insert log "triggered"
- [ ] Increment counter
- [ ] (opcional) Public reply rotacionado
- [ ] Send Private Reply com quick_reply
- [ ] Update log "dm_sent"

**Workflow 2 (DM postback):**
- [ ] Filter messaging[] events
- [ ] Parse payload `AUTO_{id}_NEXT`
- [ ] Get automation
- [ ] (se require_follow) check follow status
- [ ] (se não segue) envia follow_message
- [ ] (se segue ou not require) envia final_message
- [ ] Log "completed"
- [ ] Increment clicks

**Operações de manutenção:**
- [ ] Workflow agendado de refresh do access_token (mensal)
- [ ] Idempotência via check de mid/comment_id
- [ ] Rate limit (Wait node de ~18s entre disparos)
