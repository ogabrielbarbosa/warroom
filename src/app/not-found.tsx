import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-mono text-6xl font-bold text-foreground">404</h1>
        <p className="text-sm text-muted-foreground">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="font-mono text-sm text-primary hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
