"use client";

import { motion } from "framer-motion";

const allocations = [
  { label: "Equity", target: 50, color: "bg-blue-500", glow: "shadow-blue-500/30" },
  { label: "Fixed Income", target: 40, color: "bg-violet-500", glow: "shadow-violet-500/30" },
  { label: "Alternatives", target: 10, color: "bg-cyan-500", glow: "shadow-cyan-500/30" },
];

const holdings = [
  { ticker: "VTI", type: "US Equity", weight: 25 },
  { ticker: "VXUS", type: "Intl Equity", weight: 25 },
  { ticker: "BND", type: "US Bonds", weight: 30 },
  { ticker: "BNDX", type: "Intl Bonds", weight: 10 },
  { ticker: "VNQ", type: "Real Estate", weight: 10 },
];

export default function PortfolioAllocator() {
  return (
    <div className="glass-card p-6 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
          Portfolio Construction
        </span>
      </div>

      {/* Allocation bars */}
      <div className="space-y-3">
        {allocations.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.25 }}
          >
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-white/50">{a.label}</span>
              <span className="text-white/70 font-medium">{a.target}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${a.target}%` }}
                transition={{ delay: 0.5 + i * 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${a.color} shadow-lg ${a.glow}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Holdings table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-5 bg-white/[0.02] rounded-lg p-3 border border-white/5"
      >
        <div className="text-[9px] text-white/30 uppercase tracking-wider mb-2">
          Selected Holdings
        </div>
        {holdings.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.15 }}
            className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-white/80">
                {h.ticker}
              </span>
              <span className="text-[9px] text-white/35">{h.type}</span>
            </div>
            <span className="text-[11px] text-white/60">{h.weight}%</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="mt-3 text-center text-[10px] text-blue-400/60"
      >
        💼 100% Allocated — Ready for approval
      </motion.div>
    </div>
  );
}
