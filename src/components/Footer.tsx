export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted">&lt;ShegouB /&gt; · Cotonou, Bénin · 2026</span>
        <span className="font-mono text-xs text-muted">
          Built with Next.js · Notion API · Vercel
        </span>
      </div>
    </footer>
  );
}
