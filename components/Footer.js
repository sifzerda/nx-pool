export default function Footer() {
  return (
    <footer className="relative z-10 px-6 pb-8 pt-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-cyan-400/15 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.08)]">
        {/* Top Light Strip */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

        <div className="relative px-8 py-10 md:px-14">
          {/* Corner accents */}
          <div className="absolute left-6 top-6 h-12 w-12 border-l border-t border-cyan-400/40" />
          <div className="absolute right-6 top-6 h-12 w-12 border-r border-t border-fuchsia-400/40" />
          <div className="absolute bottom-6 left-6 h-12 w-12 border-b border-l border-fuchsia-400/20" />
          <div className="absolute bottom-6 right-6 h-12 w-12 border-b border-r border-cyan-400/20" />

          {/* Neon Glow Background Orbs */}
          <div className="absolute -left-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />
          <div className="absolute -right-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[80px]" />

          {/* Footer Content */}
          <div className="relative flex flex-col items-center gap-2 text-center">
            {/* Brand / Title */}
            <h3
              className="text-[12px] text-cyan-100 uppercase tracking-[0.5em] "
              style={{
                textShadow:
                  "0 0 8px rgba(103,232,249,0.8), 0 0 20px rgba(34,211,238,0.8)",
              }}
            >
              Neon Break
            </h3>

            {/* Small Footer Info */}
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400">
             sifzerda || 2026 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}