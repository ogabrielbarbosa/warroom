import { Users } from "lucide-react";
import type { AutomationContact } from "../lib/types";

export function AutomationContactsTab({
  contacts,
}: {
  contacts: AutomationContact[];
}) {
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-12 text-center">
        <Users className="size-8 text-muted-foreground" strokeWidth={1.5} />
        <p className="font-mono text-sm font-bold text-foreground">
          Nenhum contato ainda
        </p>
        <p className="max-w-md text-sm text-muted-foreground">
          Quando alguém comentar e receber a DM, aparece aqui pra você acompanhar.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6 md:p-8">
      <p className="text-sm text-muted-foreground">
        {contacts.length} {contacts.length === 1 ? "pessoa interagiu" : "pessoas interagiram"} com essa automação
      </p>

      <div className="flex flex-col divide-y divide-border border border-border">
        {contacts.map((contact) => (
          <ContactRow key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

function ContactRow({ contact }: { contact: AutomationContact }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <span className="truncate font-mono text-sm font-medium text-foreground">
          @{contact.username ?? contact.igScopedId}
        </span>
        {contact.firstName && (
          <span className="truncate text-xs text-muted-foreground">
            {contact.firstName}
          </span>
        )}
      </div>
      <div className="flex flex-col items-end gap-0.5 text-xs">
        <span className="font-mono text-foreground">
          {contact.interactionCount ?? 1}{" "}
          {(contact.interactionCount ?? 1) === 1 ? "interação" : "interações"}
        </span>
        {contact.lastInteraction && (
          <span className="text-muted-foreground">
            {new Date(contact.lastInteraction).toLocaleDateString("pt-BR")}
          </span>
        )}
      </div>
    </div>
  );
}
