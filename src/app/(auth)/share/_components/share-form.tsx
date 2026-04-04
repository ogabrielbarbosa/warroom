"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2, ExternalLink } from "lucide-react";

const WEBHOOK_URL = "https://n8n.sharken.com.br/webhook/share-video";

export function ShareForm({
  initialUrl,
}: {
  initialUrl: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [instructions, setInstructions] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_url: url.trim(),
          instructions: instructions.trim(),
        }),
      });

      if (!res.ok) throw new Error("Webhook failed");

      setStatus("sent");

      // Redirect back to Instagram after short delay
      setTimeout(() => {
        // Try to go back to the previous app, fallback to closing
        if (document.referrer) {
          window.location.href = document.referrer;
        } else {
          window.close();
        }
      }, 1500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* URL Field */}
      <div className="space-y-2">
        <label
          htmlFor="share-url"
          className="text-sm font-medium text-foreground"
        >
          Link
        </label>
        <div className="relative">
          <input
            id="share-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/reel/..."
            className="w-full rounded-lg border border-border bg-card px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>
      </div>

      {/* Instructions Field */}
      <div className="space-y-2">
        <label
          htmlFor="share-instructions"
          className="text-sm font-medium text-foreground"
        >
          Instruções{" "}
          <span className="text-muted-foreground">(opcional)</span>
        </label>
        <textarea
          id="share-instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Ex: Analisar hook, extrair roteiro, salvar referência..."
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!url.trim() || status === "sending" || status === "sent"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "idle" && (
          <>
            <Send className="size-4" />
            Enviar
          </>
        )}
        {status === "sending" && (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        )}
        {status === "sent" && (
          <>
            <CheckCircle className="size-4" />
            Enviado! Voltando...
          </>
        )}
        {status === "error" && (
          <>
            <Send className="size-4" />
            Erro — Tentar novamente
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-center text-xs text-red-400">
          Não foi possível enviar. Verifique sua conexão.
        </p>
      )}

    </form>
  );
}
