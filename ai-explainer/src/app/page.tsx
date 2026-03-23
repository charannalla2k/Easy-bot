"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export default function Home() {
  return (
    <SceneLayout gradient="from-[#06060a] via-[#0a0818] to-[#06060a]">
      {/* Central orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="w-72 h-72 rounded-full bg-gradient-to-br from-violet-600/15 via-purple-600/10 to-transparent blur-[80px] animate-pulse-soft" />
          <div className="absolute inset-0 w-72 h-72 rounded-full border border-violet-500/10 animate-spin-slow" />
          <div className="absolute inset-8 w-56 h-56 rounded-full border border-violet-500/5 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "20s" }} />
        </div>
      </div>

      <AnimatedSection className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-violet-400/90 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Interactive AI Application Explainer
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white/95">Suitability</span>
          <br />
          <span className="gradient-text">reimagined</span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-xl">
        <p className="text-base sm:text-lg text-white/70 leading-relaxed">
          AI-powered investment suitability, policy generation, and continuous portfolio monitoring — with humans always in control.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/problem/intro"
          className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40 transition-all duration-500"
        >
          Begin the journey
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link
          href="/flow/onboarding"
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card text-sm font-medium text-white/80 hover:text-white transition-all duration-500 hover:scale-[1.03] hover:border-white/20"
        >
          Jump to flow
          <span className="text-white/60">🚀</span>
        </Link>
      </AnimatedSection>

      {/* Bottom hint */}
      <AnimatedSection delay={0.8} className="mt-16">
        <p className="text-[11px] text-white/40 tracking-wider uppercase text-center">
          5 scenes · AI-powered explainer · Scroll through the story
        </p>
      </AnimatedSection>
    </SceneLayout>
  );
}
