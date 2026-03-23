"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProblemIntroPage() {
  return (
    <SceneLayout gradient="from-[#0a0808] via-[#12080a] to-[#0a0608]">
      {/* Red pulsing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-red-900/15 via-rose-900/8 to-transparent blur-[140px] animate-pulse-soft pointer-events-none" />

      {/* Cinematic question */}
      <AnimatedSection className="text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
            <span className="text-white/90">What happens when</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              portfolio decisions are inconsistent?
            </span>
          </h1>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="text-center max-w-2xl">
        <p className="text-lg sm:text-xl text-white/65 leading-relaxed">
          Every day, advisors make suitability decisions independently — with no
          shared framework, no automated checks, and no systematic oversight.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.7} className="text-center max-w-xl mt-8">
        <p className="text-sm text-white/45 leading-relaxed">
          The result? Compliance gaps, regulatory risk, and portfolios that
          quietly drift away from their intended targets.
        </p>
      </AnimatedSection>

      {/* Visual separator — thin glowing line */}
      <AnimatedSection delay={0.9} className="mt-14 w-full max-w-md">
        <div className="h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={1.1} className="mt-10 mb-4">
        <Link
          href="/problem/pain-points"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600/60 to-rose-600/60 text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-600/25 hover:scale-[1.03] transition-all duration-300"
        >
          See the pain points
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
