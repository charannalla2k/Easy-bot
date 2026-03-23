"use client";

import { useState, useEffect } from "react";
import QuestionnairePreview from "./QuestionnairePreview";
import RiskScoreCard from "./RiskScoreCard";
import IPSDocument from "./IPSDocument";
import PortfolioAllocator from "./PortfolioAllocator";
import DriftAlert from "./DriftAlert";
import ApprovalStamp from "./ApprovalStamp";

const visuals: Record<string, React.ComponentType> = {
  onboarding: QuestionnairePreview,
  "risk-analysis": RiskScoreCard,
  ips: IPSDocument,
  portfolio: PortfolioAllocator,
  drift: DriftAlert,
};

export default function StepVisual({
  step,
  showApproval = false,
}: {
  step: string;
  showApproval?: boolean;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const [stampVisible, setStampVisible] = useState(false);

  const Visual = visuals[step];

  // Delay the approval stamp so it appears after the main visual
  useEffect(() => {
    setStampVisible(false);
    if (!showApproval) return;
    const timer = setTimeout(() => setStampVisible(true), 3800);
    return () => clearTimeout(timer);
  }, [showApproval, replayKey]);

  if (!Visual) return null;

  return (
    <div className="w-full">
      <div className="relative">
        <div key={replayKey}>
          <Visual />
          {showApproval && stampVisible && (
            <div className="mt-5">
              <ApprovalStamp />
            </div>
          )}
        </div>

        {/* Replay button */}
        <button
          onClick={() => setReplayKey((k) => k + 1)}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-sm text-white/50 hover:text-white/80 transition-all cursor-pointer hover:scale-110 z-10"
          title="Replay animation"
        >
          ↻
        </button>
      </div>
    </div>
  );
}
