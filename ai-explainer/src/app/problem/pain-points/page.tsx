"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { motion } from "framer-motion";

const painPoints = [
  {
    icon: "🚫",
    title: "No Systematic Monitoring",
    description:
      "Portfolios drift from their IPS targets without anyone noticing. Rebalancing only happens when an advisor remembers — or a client complains.",
    stat: "0",
    statLabel: "automated drift checks",
    color: "from-red-500/20 to-red-500/5",
    border: "hover:border-red-500/25",
  },
  {
    icon: "📄",
    title: "Manual Documentation",
    description:
      "Every IPS, every suitability rationale, every rebalancing memo — written by hand in Word or Excel. Inconsistent formats, inconsistent logic.",
    stat: "60%",
    statLabel: "advisor time on paperwork",
    color: "from-amber-500/20 to-amber-500/5",
    border: "hover:border-amber-500/25",
  },
  {
    icon: "⚖️",
    title: "Regulatory Exposure",
    description:
      "Without reproducible, auditable processes, every regulatory review is a stress test. Gaps are inevitable when everything is manual.",
    stat: "High",
    statLabel: "compliance risk level",
    color: "from-rose-500/20 to-rose-500/5",
    border: "hover:border-rose-500/25",
  },
];

export default function PainPointsPage() {
  return (
    <SceneLayout gradient="from-[#0a0808] via-[#140a0a] to-[#0a0608]">
      {/* Ambient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-900/15 via-amber-900/8 to-transparent blur-[120px] animate-pulse-soft pointer-events-none" />

      <AnimatedSection className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-red-400/90 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Pain Points
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-white/90">Three critical</span>{" "}
          <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
            failures
          </span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl">
        <p className="text-base text-white/60 leading-relaxed">
          Each one compounds the others, creating a cycle of risk that manual processes cannot break.
        </p>
      </AnimatedSection>

      {/* Pain point cards — staggered entrance */}
      <div className="mt-14 w-full max-w-4xl space-y-4">
        {painPoints.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`glass-card p-6 bg-gradient-to-r ${point.color} ${point.border} transition-all duration-500`}
          >
            <div className="flex items-start gap-5">
              <div className="text-3xl shrink-0 mt-1">{point.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white/90 mb-2">{point.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{point.description}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="text-2xl font-bold text-white/85">{point.stat}</div>
                <div className="text-[10px] text-white/45 mt-0.5 whitespace-nowrap">{point.statLabel}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Step Navigation */}
      <AnimatedSection delay={1.1} className="mt-14 mb-4 flex items-center justify-center gap-4 w-full">
        <Link
          href="/problem/intro"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </Link>
        <Link
          href="/problem/impact"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600/60 to-rose-600/60 text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-600/25 hover:scale-[1.03] transition-all duration-300"
        >
          See the impact
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
