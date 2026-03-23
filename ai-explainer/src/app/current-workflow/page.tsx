"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

const workflowSteps = [
  { icon: "📝", label: "Client fills paper forms", color: "text-amber-400/80" },
  { icon: "→", label: "", color: "text-white/25" },
  { icon: "🧑‍💼", label: "Advisor manually reviews", color: "text-amber-400/80" },
  { icon: "→", label: "", color: "text-white/25" },
  { icon: "📄", label: "IPS created in Word/Excel", color: "text-amber-400/80" },
  { icon: "→", label: "", color: "text-white/25" },
  { icon: "📊", label: "Portfolio built ad-hoc", color: "text-amber-400/80" },
  { icon: "→", label: "", color: "text-white/25" },
  { icon: "🤞", label: "Hope nothing drifts", color: "text-red-400/80" },
];

export default function CurrentWorkflowPage() {
  return (
    <SceneLayout gradient="from-[#08080c] via-[#0c0a14] to-[#08080c]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-900/15 via-orange-900/10 to-transparent blur-[120px] animate-pulse-soft pointer-events-none" />

      <AnimatedSection className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-amber-400/90 mb-8">
          <span className="text-sm">🪐</span>
          Current Workflow
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-white/90">The old way is</span>{" "}
          <span className="gradient-text-warm">manual</span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl">
        <p className="text-lg text-white/70 leading-relaxed">
          Paper-heavy, error-prone, and completely disconnected from ongoing monitoring.
        </p>
      </AnimatedSection>

      {/* Workflow chain */}
      <AnimatedSection delay={0.4} className="mt-16 w-full max-w-4xl">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {workflowSteps.map((step, i) =>
            step.label ? (
              <div
                key={i}
                className="glass-card px-4 py-3 text-center min-w-[120px] hover:border-amber-500/20 transition-all duration-500"
              >
                <div className="text-2xl mb-1.5">{step.icon}</div>
                <div className={`text-[10px] font-medium ${step.color} leading-tight`}>{step.label}</div>
              </div>
            ) : (
              <span key={i} className="text-xl text-white/20">→</span>
            )
          )}
        </div>
      </AnimatedSection>

      {/* Pain points */}
      <AnimatedSection delay={0.6} className="mt-12 w-full max-w-2xl">
        <div className="glass-card p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { val: "60%", label: "Time on paperwork" },
              { val: "0", label: "Automated drift checks" },
              { val: "High", label: "Compliance risk" },
              { val: "Low", label: "Client trust" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-amber-400/90">{stat.val}</div>
                <div className="text-[10px] text-white/55 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.8} className="mt-16">
        <Link
          href="/solution"
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card text-sm font-medium text-white/85 hover:text-white hover:border-white/20 hover:scale-[1.03] transition-all duration-500"
        >
          Discover the solution
          <span className="text-white/60 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
