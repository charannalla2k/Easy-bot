"use client";

import { motion } from "framer-motion";

const lines = [
  { section: true, text: "Investment Policy Statement" },
  { text: "Client: John Doe" },
  { text: "Risk Profile: Moderate Conservative" },
  { section: true, text: "Target Allocations" },
  { text: "Equity: 50% (±5%)" },
  { text: "Fixed Income: 40% (±5%)" },
  { text: "Alternatives: 10% (±3%)" },
  { section: true, text: "Constraints" },
  { text: "✓ ESG Compliant" },
  { text: "✓ No Concentrated Positions > 10%" },
];

export default function IPSDocument() {
  return (
    <div className="glass-card p-6 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
          AI-Generated IPS
        </span>
      </div>

      <div className="bg-white/[0.02] rounded-lg p-4 border border-white/5 min-h-[220px]">
        {lines.map((line, i) => {
          const delay = 0.3 + i * 0.45;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay, duration: 0.4 }}
              className={
                line.section
                  ? "text-xs font-bold text-purple-300/80 mt-3 mb-1 first:mt-0 uppercase tracking-wide"
                  : "text-[11px] text-white/65 leading-relaxed py-0.5"
              }
            >
              {line.text}
              <motion.span
                animate={{ opacity: [1, 0, 1, 0] }}
                transition={{ delay, duration: 1.2, times: [0, 0.3, 0.6, 1] }}
                className="text-purple-400 ml-0.5 text-xs"
              >
                |
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5 }}
        className="mt-3 text-center text-[10px] text-purple-400/60"
      >
        📝 Draft ready for advisor review
      </motion.div>
    </div>
  );
}
