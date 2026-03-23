"use client";

import { motion } from "framer-motion";

function ScoreGauge({
  label,
  score,
  max,
  color,
  delay,
}: {
  label: string;
  score: number;
  max: number;
  color: string;
  delay: number;
}) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / max) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{
              delay: delay + 0.3,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-lg font-bold text-white/90">{score}</span>
        </motion.div>
      </div>
      <span className="text-[10px] text-white/50 mt-1.5">{label}</span>
    </motion.div>
  );
}

export default function RiskScoreCard() {
  const capacity = 72;
  const tolerance = 65;
  const finalScore = Math.min(capacity, tolerance);

  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
          AI Risk Analysis
        </span>
      </div>

      <div className="flex items-center justify-center gap-8">
        <ScoreGauge label="Capacity" score={capacity} max={100} color="#7c3aed" delay={0.3} />
        <ScoreGauge label="Tolerance" score={tolerance} max={100} color="#a78bfa" delay={0.6} />
      </div>

      {/* Final result */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="mt-5 p-3 rounded-lg bg-violet-600/15 border border-violet-500/20 text-center"
      >
        <div className="text-[10px] text-white/40 uppercase tracking-wide mb-1">
          Final Risk = MIN(Capacity, Tolerance)
        </div>
        <div className="text-2xl font-bold text-violet-300">{finalScore}</div>
        <div className="text-xs text-violet-400/70 mt-0.5">Moderate Conservative</div>
      </motion.div>

      {/* AI check badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="mt-3 flex items-center justify-center gap-2"
      >
        {["Consistency ✓", "No Bias Detected ✓"].map((badge, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.8 + i * 0.2, type: "spring", stiffness: 300 }}
            className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-600/15 text-emerald-400/80 border border-emerald-500/15"
          >
            {badge}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
