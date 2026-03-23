"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

const capabilities = [
  { icon: "🧠", title: "Risk Profiling", desc: "AI-analyzed questionnaires with bias detection" },
  { icon: "📝", title: "IPS Generation", desc: "Auto-drafted policy statements from risk profiles" },
  { icon: "🏗️", title: "Portfolio Construction", desc: "AI-optimized allocations within IPS bands" },
  { icon: "📡", title: "Drift Monitoring", desc: "Event-driven detection, not scheduled" },
  { icon: "⚖️", title: "Smart Rebalancing", desc: "Tax-aware trade suggestions" },
  { icon: "🔒", title: "Audit Trail", desc: "Every decision logged and reproducible" },
];

export default function SolutionPage() {
  return (
    <SceneLayout gradient="from-[#06060a] via-[#0a0620] to-[#06060a]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-transparent blur-[120px] animate-pulse-soft pointer-events-none" />

      <AnimatedSection className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-violet-400/90 mb-8">
          <span className="text-sm">🌕</span>
          The Solution
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-white/90">AI that</span>{" "}
          <span className="gradient-text">advises, not decides</span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl">
        <p className="text-lg text-white/70 leading-relaxed">
          Deterministic AI suggests. Humans approve. Every step is auditable, reproducible, and compliant.
        </p>
      </AnimatedSection>

      {/* Capabilities grid */}
      <AnimatedSection delay={0.4} className="mt-14 w-full max-w-4xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="glass-card p-5 group hover:border-violet-500/20 transition-all duration-500"
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{cap.icon}</div>
              <h3 className="text-sm font-semibold text-white/90 mb-1">{cap.title}</h3>
              <p className="text-[11px] text-white/55 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Key differentiators */}
      <AnimatedSection delay={0.6} className="mt-10 w-full max-w-2xl">
        <div className="glass-card p-5 flex items-center justify-center gap-6 text-center">
          {[
            { icon: "🔒", label: "Deterministic", sub: "temp=0, seed=42" },
            { icon: "👤", label: "Human-in-Loop", sub: "4 approval gates" },
            { icon: "⚡", label: "Event-Driven", sub: "Not scheduled" },
          ].map((d, i) => (
            <div key={i} className="flex-1">
              <div className="text-xl mb-1">{d.icon}</div>
              <div className="text-xs font-semibold text-violet-300/90">{d.label}</div>
              <div className="text-[10px] text-white/50">{d.sub}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.8} className="mt-14">
        <Link
          href="/flow/onboarding"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 transition-all duration-500"
        >
          Explore the flow
          <span className="group-hover:translate-x-1 transition-transform">🚀</span>
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
