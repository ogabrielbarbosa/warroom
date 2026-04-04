import { ShareForm } from "./_components/share-form";

export default async function SharePage(props: {
  searchParams: Promise<{ url?: string; text?: string; title?: string }>;
}) {
  const searchParams = await props.searchParams;

  // Instagram shares the link in `text` or `url` param
  // Extract any URL from the text if url param is empty
  const rawUrl = searchParams.url || "";
  const rawText = searchParams.text || "";
  // Try to find a URL in the text field (Instagram often puts the link there)
  const urlFromText = rawText.match(/https?:\/\/[^\s]+/)?.[0] || "";
  const sharedUrl = rawUrl || urlFromText || rawText;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-mono text-2xl font-bold text-primary">
            Compartilhar
          </h1>
          <p className="text-sm text-muted-foreground">
            Envie o conteúdo para processamento
          </p>
        </div>

        <ShareForm initialUrl={sharedUrl} />
      </div>
    </div>
  );
}
