export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6 bg-navy">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <span className="font-mono text-sm font-bold text-white tracking-tighter">
            &lt;ShegouB <span className="text-purple">/</span>&gt;
          </span>
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
            Cotonou, Bénin · 2026
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Tech Stack
          </span>
          <span className="text-[10px] text-muted font-mono">
            Next.js · Notion API · Framer Motion · Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}
