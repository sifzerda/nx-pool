

export default function Navigation() {
  return (
    <header className="relative z-10 px-6 pt-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-cyan-400/15 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.08)]">
        {/* Top Light Strip */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

        <div className="relative px-8 py-10 md:px-14">
          {/* Corner accents */}
          <div className="absolute left-6 top-6 h-12 w-12 border-l border-t border-cyan-400/40" />
          <div className="absolute right-6 top-6 h-12 w-12 border-r border-t border-fuchsia-400/40" />
          <div className="absolute bottom-6 left-6 h-12 w-12 border-b border-l border-fuchsia-400/20" />
          <div className="absolute bottom-6 right-6 h-12 w-12 border-b border-r border-cyan-400/20" />

          <div className="flex flex-col items-center gap-8">
            {/* Main Title */}
            <div className="relative text-center">
              <div className="absolute inset-0 bg-cyan-400/20 blur-[80px]" />

              <p className="mb-4 text-[10px] uppercase tracking-[0.9em] text-cyan-500/70">
                Open Until 3AM
              </p>

              <h1
                className="relative text-6xl italic tracking-[0.25em] text-cyan-100 md:text-8xl"
                style={{
                  fontFamily: "cursive",
                  textShadow:
                    "0 0 8px rgba(103,232,249,1), 0 0 18px rgba(34,211,238,0.95), 0 0 40px rgba(34,211,238,0.8), 0 0 80px rgba(59,130,246,0.5)",
                }}
              >
                Eight ◉ Ball
              </h1>

              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400" />
                <span className="text-xs uppercase tracking-[0.6em] text-fuchsia-300/80">
                  Neon Lounge
                </span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400" />
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-wrap items-center justify-center gap-4">
              {[
                "POOL",
                "TOURNAMENTS",
                "SIGNUP",
                "LOGIN",
                "VIP",
              ].map((item, index) => (
                <button
                  key={item}
                  className={`group relative overflow-hidden rounded-full border px-7 py-3 text-xs font-bold tracking-[0.35em] transition-all duration-300 ${
                    index === 0
                      ? "border-cyan-300 bg-cyan-400/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-cyan-400/40 hover:text-cyan-100 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-300/15 to-fuchsia-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}