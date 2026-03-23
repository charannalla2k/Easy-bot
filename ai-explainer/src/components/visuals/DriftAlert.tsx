"use client";

import { motion } from "framer-motion";

const driftData = [
  { asset: "Equity", target: 50, actual: 56, band: 5, drifted: true },
  { asset: "Fixed Income", target: 40, actual: 36, band: 5, drifted: false },
  { asset: "Alternatives", target: 10, actual: 8, band: 3, drifted: false },
];

const trades = [
  { action: "SELL", ticker: "VTI", amount: "3%", color: "text-red-400" },
  { action: "SELL", ticker: "VXUS", amount: "3%", color: "text-red-400" },
  { action: "BUY", ticker: "BND", amount: "4%", color: "text-emerald-400" },
  { action: "BUY", ticker: "VNQ", amount: "2%", color: "text-emerald-400" },
];

export default function DriftAlert() {
  return (
    <div className="max-w-md mx-auto space-y-3">
      {/* Alert notification */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
        className="glass-card p-4 border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xl shrink-0"
          >
            ⚠️
          </motion.div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-red-300">Drift Detected</div>
            <div className="text-[10px] text-white/50">
              Equity allocation exceeds ±5% band
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-600/20 text-red-400 border border-red-500/20 shrink-0"
          >
            CRITICAL
          </motion.div>
        </div>
      </motion.div>

      {/* Drift analysis bars */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass-card p-5"
      >
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3">
          Drift Analysis
        </div>
        <div className="space-y-3">
          {driftData.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.2 }}
            >
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-white/50">{d.asset}</span>
                <span
                  className={
                    d.drifted ? "text-red-400 font-semibold" : "text-white/50"
                  }
                >
                  {d.actual}% / {d.target}% {d.drifted && "⚠"}
                </span>
              </div>
              <div className="relative h-2.5 rounded-full bg-white/5">
                {/* Target band zone */}
                <div
                  className="absolute h-full rounded-full bg-white/[0.04]"
                  style={{
                    left: `${d.target - d.band}%`,
                    width: `${d.band * 2}%`,
                  }}
                />
                {/* Actual position */}
                <motion.div
                  initial={{ width: `${d.target}%` }}
                  animate={{ width: `${d.actual}%` }}
                  transition={{
                    delay: 1.5 + i * 0.2,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute h-full rounded-full ${
                    d.drifted
                      ? "bg-red-500 shadow-lg shadow-red-500/30"
                      : "bg-cyan-500"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Rebalancing suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="glass-card p-5 bg-gradient-to-br from-cyan-500/5 to-transparent"
      >
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[10px] font-bold text-cyan-400/60 uppercase tracking-wider">
            AI Rebalancing Suggestion
          </span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.8, type: "spring" }}
            className="px-1.5 py-0.5 rounded text-[8px] bg-violet-600/20 text-violet-300 border border-violet-500/15"
          >
            TAX-OPTIMIZED
          </motion.span>
        </div>
        <div className="space-y-1">
          {trades.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3 + i * 0.15 }}
              className="flex items-center gap-2 py-1"
            >
              <span className={`text-[10px] font-bold w-8 ${t.color}`}>
                {t.action}
              </span>
              <span className="text-[11px] font-mono text-white/70">
                {t.ticker}
              </span>
              <span className="text-[10px] text-white/40 ml-auto">
                {t.amount}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
