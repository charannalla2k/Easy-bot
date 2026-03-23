"use client";

import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";

export default function ProblemPage() {
  return (
    <SceneLayout gradient="from-[#0a0a0a] via-[#1a0a0a] to-[#0a0508]">
      {/* Decorative red/amber orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-900/20 via-amber-900/10 to-transparent blur-[100px] animate-pulse-soft pointer-events-none" />

      <AnimatedSection className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-red-400/80 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          The Problem
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="text-white">Suitability is</span>{" "}
          <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
            broken
          </span>
        </h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="text-center max-w-2xl mt-2">
        <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
          Manual assessments are inconsistent. Portfolio drift goes unmonitored.
          Regulatory scrutiny is intensifying.
        </p>
      </AnimatedSection>

      {/* Problem cards */}
      <AnimatedSection delay={0.4} className="mt-16 w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "📋",
              title: "Inconsistent Assessments",
              desc: "Manual suitability docs vary by advisor, creating compliance gaps",
            },
            {
              icon: "📉",
              title: "Unmonitored Drift",
              desc: "Portfolios deviate from IPS targets without systematic detection",
            },
            {
              icon: "⚖️",
              title: "Regulatory Pressure",
              desc: "Intense scrutiny on documentation and suitability rationale",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="glass-card p-6 text-center group hover:border-red-500/20 transition-all duration-500"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="text-sm font-semibold text-white/90 mb-2">{card.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.6} className="mt-16">
        <Link
          href="/current-workflow"
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card text-sm font-medium text-white/85 hover:text-white hover:border-white/20 hover:scale-[1.03] transition-all duration-500"
        >
          See the current workflow
          <span className="text-white/60 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
