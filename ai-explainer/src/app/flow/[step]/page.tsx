"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import SceneLayout from "@/components/SceneLayout";
import AnimatedSection from "@/components/AnimatedSection";
import StepVisual from "@/components/visuals/StepVisual";
import { steps } from "@/data/knowledge-base";

const stepRoutes: Record<string, number> = {
  onboarding: 0,
  "risk-analysis": 1,
  ips: 2,
  portfolio: 3,
  drift: 4,
};

const routeOrder = ["onboarding", "risk-analysis", "ips", "portfolio", "drift"];

const gradients: Record<string, string> = {
  onboarding: "from-[#06080a] via-[#061210] to-[#060a08]",
  "risk-analysis": "from-[#08060e] via-[#100820] to-[#08060e]",
  ips: "from-[#06060e] via-[#0a0818] to-[#06060e]",
  portfolio: "from-[#060810] via-[#061020] to-[#060810]",
  drift: "from-[#08080c] via-[#0a1018] to-[#08080c]",
};

const accentColors: Record<string, string> = {
  onboarding: "emerald",
  "risk-analysis": "violet",
  ips: "purple",
  portfolio: "blue",
  drift: "cyan",
};

const orbGradients: Record<string, string> = {
  onboarding: "from-emerald-900/20 via-green-900/10 to-transparent",
  "risk-analysis": "from-violet-900/25 via-purple-900/10 to-transparent",
  ips: "from-purple-900/20 via-indigo-900/10 to-transparent",
  portfolio: "from-blue-900/20 via-cyan-900/10 to-transparent",
  drift: "from-cyan-900/20 via-blue-900/10 to-transparent",
};

const tagColors: Record<string, string> = {
  onboarding: "text-emerald-400/70 border-emerald-500/20",
  "risk-analysis": "text-violet-400/70 border-violet-500/20",
  ips: "text-purple-400/70 border-purple-500/20",
  portfolio: "text-blue-400/70 border-blue-500/20",
  drift: "text-cyan-400/70 border-cyan-500/20",
};

interface PageProps {
  params: Promise<{ step: string }>;
}

export default function FlowStepPage({ params }: PageProps) {
  const { step: slug } = use(params);

  const stepId = stepRoutes[slug];
  if (stepId === undefined) notFound();

  const step = steps[stepId];
  const currentIdx = routeOrder.indexOf(slug);
  const prevRoute = currentIdx > 0 ? `/flow/${routeOrder[currentIdx - 1]}` : "/solution";
  const nextRoute =
    currentIdx < routeOrder.length - 1
      ? `/flow/${routeOrder[currentIdx + 1]}`
      : "/value";

  const gradient = gradients[slug];
  const orb = orbGradients[slug];
  const tag = tagColors[slug];
  const accent = accentColors[slug];

  return (
    <SceneLayout gradient={gradient}>
      {/* Ambient orb */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${orb} blur-[120px] animate-pulse-soft pointer-events-none`}
      />

      {/* Phase badge */}
      <AnimatedSection className="text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium ${tag} mb-6`}>
          <span className="text-lg">{step.icon}</span>
          {step.phase} · {step.timing}
        </div>
      </AnimatedSection>

      {/* Title */}
      <AnimatedSection delay={0.1} className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-white/95 mb-4">
          {step.title}
        </h1>
      </AnimatedSection>

      {/* Description */}
      <AnimatedSection delay={0.2} className="text-center max-w-xl">
        <p className="text-base sm:text-lg text-white/65 leading-relaxed">
          {step.views.client.description}
        </p>
      </AnimatedSection>

      {/* Actors & badges */}
      <AnimatedSection delay={0.3} className="mt-8 flex items-center gap-2 flex-wrap justify-center">
        {step.aiPowered && (
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-violet-600/20 text-violet-300 border border-violet-500/20">
            ✦ AI-Powered
          </span>
        )}
        {step.humanGate && (
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-600/15 text-amber-300 border border-amber-500/20">
            👤 Human Gate
          </span>
        )}
        {step.actors.map((actor) => (
          <span
            key={actor}
            className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/8 text-white/65 border border-white/12"
          >
            {actor}
          </span>
        ))}
      </AnimatedSection>

      {/* Interactive Visual Demo */}
      <AnimatedSection delay={0.35} className="mt-10 w-full max-w-4xl">
        <StepVisual step={slug} showApproval={step.humanGate} />
      </AnimatedSection>

      {/* Content cards */}
      <AnimatedSection delay={0.5} className="mt-12 w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* What happens */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-md bg-${accent}-600/20 flex items-center justify-center text-xs text-${accent}-400`}>
                ▶
              </div>
              <h3 className="text-xs font-bold text-white/75 uppercase tracking-wider">What Happens</h3>
            </div>
            <p className="text-sm text-white/65 leading-relaxed">
              {step.views.client.whatHappens}
            </p>
          </div>

          {/* System involvement */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-violet-600/20 flex items-center justify-center text-xs text-violet-400">
                ⚙
              </div>
              <h3 className="text-xs font-bold text-white/75 uppercase tracking-wider">System & AI</h3>
            </div>
            <p className="text-sm text-white/65 leading-relaxed">
              {step.views.client.systemInvolvement}
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Data transparency mini */}
      <AnimatedSection delay={0.6} className="mt-4 w-full max-w-4xl">
        <div className="glass-card p-5">
          <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-3">Data Used in This Step</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {step.dataUsed.map((d, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                <div className="flex gap-1 mt-0.5">
                  {d.aiUsed && (
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-violet-600/20 text-violet-300">AI</span>
                  )}
                  {d.stored ? (
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-blue-600/15 text-blue-300">Stored</span>
                  ) : (
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-white/25">Processed</span>
                  )}
                </div>
                <div>
                  <div className="text-[11px] font-medium text-white/70">{d.name}</div>
                  <div className="text-[10px] text-white/45">{d.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Step Navigation */}
      <AnimatedSection delay={0.7} className="mt-14 mb-4 flex items-center justify-center gap-4 w-full">
        <Link
          href={prevRoute}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Previous
        </Link>
        <Link
          href={nextRoute}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600/70 to-purple-600/70 text-sm font-semibold text-white hover:shadow-lg hover:shadow-violet-600/25 hover:scale-[1.03] transition-all duration-300"
        >
          Next
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </AnimatedSection>
    </SceneLayout>
  );
}
