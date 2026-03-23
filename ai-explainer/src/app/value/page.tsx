"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

const valueDrivers = [
  {
    icon: "🔒",
    title: "Regulatory Compliance",
    stat: "100%",
    desc: "Consistent, auditable suitability documentation",
    gradient: "from-emerald-600/20 to-emerald-600/5",
  },
  {
    icon: "⏱️",
    title: "Advisor Time Saved",
    stat: "70%",
    desc: "Automated IPS creation and portfolio construction",
    gradient: "from-violet-600/20 to-violet-600/5",
  },
  {
    icon: "📡",
    title: "Systematic Monitoring",
    stat: "24/7",
    desc: "Event-driven drift detection on every change",
    gradient: "from-blue-600/20 to-blue-600/5",
  },
  {
    icon: "📈",
    title: "Client Outcomes",
    stat: "Better",
    desc: "Disciplined rebalancing and transparent process",
    gradient: "from-cyan-600/20 to-cyan-600/5",
  },
];

export default function ValuePage() {
  return (
    <SceneLayout gradient="from-[#060a0e] via-[#06100e] to-[#060a08]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-900/20 via-cyan-900/10 to-transparent blur-[120px] animate-pulse-soft pointer-events-none" />

      <AnimatedSection className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-emerald-400/90 mb-8">
          <span className="text-sm">🌟</span>
          Value Delivered
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-white/90">Real</span>{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            impact
          </span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl">
        <p className="text-lg text-white/65 leading-relaxed">
          From compliance confidence to better client outcomes — every dimension improves.
        </p>
      </AnimatedSection>

      {/* Value cards */}
      <AnimatedSection delay={0.4} className="mt-14 w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {valueDrivers.map((v, i) => (
            <div
              key={i}
              className={`glass-card p-6 bg-gradient-to-br ${v.gradient} group hover:border-emerald-500/20 transition-all duration-500`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{v.icon}</div>
                <div className="text-3xl font-bold text-white/80 group-hover:text-white transition-colors">
                  {v.stat}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white/85 mb-1">{v.title}</h3>
              <p className="text-xs text-white/55 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Summary bar */}
      <AnimatedSection delay={0.6} className="mt-10 w-full max-w-3xl">
        <div className="glass-card p-5 text-center">
          <p className="text-sm text-white/65 leading-relaxed">
            <span className="text-white/85 font-semibold">6 AI-Powered Steps</span> ·{" "}
            <span className="text-white/85 font-semibold">4 Human Approval Gates</span> ·{" "}
            <span className="text-white/85 font-semibold">Event-Driven Drift Detection</span> ·{" "}
            <span className="text-white/85 font-semibold">Fully Auditable & Deterministic</span>
          </p>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.8} className="mt-14 flex flex-col items-center gap-4">
        <Link
          href="/flow/onboarding"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600/70 to-cyan-600/70 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all duration-500"
        >
          Explore the full flow again
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link
          href="/"
          className="text-xs text-white/50 hover:text-white/70 transition-colors"
        >
          Back to start
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
