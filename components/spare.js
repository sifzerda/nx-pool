//app/page.js`
"use client";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(29,78,216,0.22),transparent_35%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.18),transparent_40%)]" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Outer Neon Frame */}
      <div className="pointer-events-none absolute inset-3 rounded-[30px] border border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.15),0_0_80px_rgba(59,130,246,0.1)]" />

      {/* Floating Glows */}
      <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-[-120px] bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* Header */}
      <header className="relative z-10 px-6 pt-10">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-cyan-500/20 bg-black/50 px-8 py-8 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.12)]">
          <div className="flex flex-col items-center gap-6">
            {/* Neon Title */}
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-cyan-400/20 rounded-full" />

              <h1
                className="relative text-center text-5xl md:text-7xl italic tracking-[0.2em] text-cyan-100"
                style={{
                  fontFamily: "cursive",
                  textShadow:
                    "0 0 6px rgba(103,232,249,0.9), 0 0 14px rgba(34,211,238,0.9), 0 0 30px rgba(59,130,246,0.8)",
                }}
              >
                Eight ◉ Ball
              </h1>

              <p className="mt-3 text-center text-xs uppercase tracking-[0.6em] text-cyan-500/70">
                Neon Lounge • Arcade • Pool
              </p>
            </div>

            {/* Navigation */}
            <nav className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "POOL", active: true },
                { label: "SIGNUP", active: false },
                { label: "LOGIN", active: false },
                { label: "ABOUT", active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`group relative overflow-hidden rounded-full border px-8 py-3 text-sm font-semibold tracking-[0.25em] transition-all duration-300
                    ${
                      item.active
                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                        : "border-cyan-500/20 bg-white/[0.02] text-cyan-400 hover:border-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-500/10 via-cyan-300/10 to-fuchsia-500/10 transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative z-10 flex justify-center px-6 py-16">
        <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-cyan-500/20 bg-black/55 p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.12)]">
          {/* Glow Ring */}
          <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[90px]" />

          {/* Top Accent */}
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

          <div className="relative z-10">
            <h2
              className="text-center text-4xl md:text-5xl italic text-cyan-100"
              style={{
                fontFamily: "cursive",
                textShadow:
                  "0 0 6px rgba(103,232,249,0.8), 0 0 18px rgba(34,211,238,0.8)",
              }}
            >
              Main Menu
            </h2>

            <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_rgba(103,232,249,0.8)]" />

            <p className="mt-8 text-center text-sm leading-relaxed text-zinc-300">
              Sign in to track your wins, unlock custom cues, and compete on the leaderboard.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-500">
                  Tables
                </p>
                <p className="mt-2 text-xl font-bold text-cyan-100">12</p>
              </div>

              <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/[0.04] p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400">
                  Players
                </p>
                <p className="mt-2 text-xl font-bold text-fuchsia-100">248</p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-500">
                  High Score
                </p>
                <p className="mt-2 text-xl font-bold text-cyan-100">9,840</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-5">
              <button className="group relative overflow-hidden rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-6 py-5 text-sm font-bold tracking-[0.3em] text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <span className="relative z-10">START GAME</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-300/20 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <button className="group relative overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-6 py-5 text-sm font-bold tracking-[0.3em] text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.45)]">
                <span className="relative z-10">HIGH SCORES</span>
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-300/20 to-fuchsia-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}