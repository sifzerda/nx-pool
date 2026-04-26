"use client";

import Pool from "../../components/Game";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020308] text-white">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%),radial-gradient(circle_at_left,rgba(59,130,246,0.1),transparent_30%)]" />

      {/* Animated Glow Orbs */}
      <div className="absolute left-[-120px] top-10 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse" />
      <div className="absolute right-[-120px] top-1/3 h-[380px] w-[380px] rounded-full bg-fuchsia-500/10 blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-120px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />

      {/* Neon Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] perspective-[1200px]">
        <div className="absolute inset-0 origin-bottom rotate-x-[78deg] bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Outer Frame */}
      <div className="pointer-events-none absolute inset-4 rounded-[36px] border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.08),inset_0_0_60px_rgba(34,211,238,0.04)]" />

      {/* Main Content */}
      <section className="relative z-10 px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Main Card */}
          <div className="relative overflow-hidden rounded-[36px] border border-cyan-400/15 bg-black/40 p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(34,211,238,0.08)]">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />


  <Pool />


            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-5xl italic text-cyan-100"
                  style={{
                    fontFamily: "cursive",
                    textShadow:
                      "0 0 8px rgba(103,232,249,0.8), 0 0 20px rgba(34,211,238,0.8)",
                  }}
                >
                  Main Menu
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400">
                  Step into the city's brightest underground pool bar. Challenge players, win credits, unlock legendary cues, and dominate the leaderboard.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  ["Tables", "12", "cyan"],
                  ["Players", "248", "fuchsia"],
                  ["Jackpot", "$2.4K", "cyan"],
                  ["Highscore", "9,840", "fuchsia"],
                ].map(([label, value, color]) => (
                  <div key={label}
                    className={`rounded-3xl border p-5 backdrop-blur-md ${
                      color === "cyan"
                        ? "border-cyan-400/15 bg-cyan-500/[0.04]"
                        : "border-fuchsia-400/15 bg-fuchsia-500/[0.04]"
                    }`}
                  >
                    <p className={`text-[10px] uppercase tracking-[0.35em] ${color === "cyan" ? "text-cyan-500" : "text-fuchsia-400"}`}>
                      {label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid gap-5 sm:grid-cols-2">
                <button className="group relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-cyan-500/10 px-6 py-6 text-sm font-bold tracking-[0.35em] text-cyan-100 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                  <span className="relative z-10">START GAME</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>

                <button className="group relative overflow-hidden rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/10 px-6 py-6 text-sm font-bold tracking-[0.35em] text-fuchsia-100 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-[0_0_40px_rgba(217,70,239,0.35)]">
                  <span className="relative z-10">HIGH SCORES</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-300/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Neon 8 Ball */}
          <div className="relative overflow-hidden rounded-[36px] border border-cyan-400/15 bg-black/40 p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(34,211,238,0.08)]">
            <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

            <div className="flex h-full flex-col items-center justify-center">
              <div className="relative flex h-[360px] w-[360px] items-center justify-center rounded-full border border-cyan-400/15 bg-black/40 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
                <div className="absolute inset-0 rounded-full border border-cyan-400/10 animate-pulse" />
                <div className="absolute inset-6 rounded-full border border-cyan-400/10" />
                <div className="absolute inset-12 rounded-full border border-fuchsia-400/10" />

                <div className="absolute h-60 w-60 rounded-full bg-cyan-400/10 blur-[90px]" />

                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black/80 text-6xl font-bold text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    8
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs uppercase tracking-[0.5em] text-cyan-500/70">
                  After Dark Edition
                </p>
                <p className="mt-3 text-sm text-zinc-500">
                  Where every shot feels electric.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

