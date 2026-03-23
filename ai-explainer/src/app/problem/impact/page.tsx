"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { motion } from "framer-motion";

const consequences = [
  {
    icon: "💸",
    label: "Financial Penalties",
    description: "Regulatory fines from inconsistent suitability documentation and missing audit trails.",
  },
  {
    icon: "📉",
    label: "Client Attrition",
    description: "Clients lose trust when portfolios silently deviate from their stated objectives.",
  },
  {
    icon: "⏳",
    label: "Wasted Advisor Time",
    description: "Senior advisors spend 60%+ of their time on manual paperwork instead of advising.",
  },
  {
    icon: "🔓",
    label: "Audit Failures",
    description: "Without reproducible processes, every audit uncovers gaps and inconsistencies.",
  },
];

export default function ProblemImpactPage() {
  return (
    <SceneLayout gradient="from-[#0a0606] via-[#160808] to-[#0a0506]">
      {/* Deep red orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-red-900/20 via-rose-900/10 to-transparent blur-[140px] animate-pulse-soft pointer-events-none" />

      <AnimatedSection className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-rose-400/90 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          Real-World Impact
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-white/90">The cost of</span>{" "}
          <span className="bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
            doing nothing
          </span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl">
        <p className="text-base text-white/60 leading-relaxed">
          These aren&apos;t hypothetical risks. They&apos;re happening every day at firms that rely on manual processes.
        </p>
      </AnimatedSection>

      {/* Consequence grid */}
      <div className="mt-14 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {consequences.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6 bg-gradient-to-br from-red-500/10 to-transparent hover:border-rose-500/20 transition-all duration-500 group"
          >
            <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-sm font-semibold text-white/90 mb-2">{item.label}</h3>
            <p className="text-xs text-white/55 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Transition statement */}
      <AnimatedSection delay={1.0} className="mt-12 text-center max-w-lg">
        <div className="h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent mb-8" />
        <p className="text-sm text-white/50 leading-relaxed italic">
          There is a better way. A system where AI advises, humans approve, and
          every decision is auditable.
        </p>
      </AnimatedSection>

      {/* Step Navigation */}
      <AnimatedSection delay={1.2} className="mt-10 mb-4 flex items-center justify-center gap-4 w-full">
        <Link
          href="/problem/pain-points"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Pain points
        </Link>
        <Link
          href="/current-workflow"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600/70 to-red-600/70 text-sm font-semibold text-white hover:shadow-lg hover:shadow-rose-600/25 hover:scale-[1.03] transition-all duration-300"
        >
          See the current workflow
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
