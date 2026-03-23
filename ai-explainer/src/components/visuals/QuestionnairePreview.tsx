"use client";

import { motion } from "framer-motion";

const fields = [
  { label: "Investment Timeline", value: "10+ years" },
  { label: "Annual Income", value: "$120,000" },
  { label: "Risk Comfort Level", value: "Moderate", highlight: true },
  { label: "Investment Experience", value: "5 years" },
];

export default function QuestionnairePreview() {
  return (
    <div className="glass-card p-6 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
          Risk Questionnaire
        </span>
      </div>

      <div className="space-y-3">
        {fields.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[10px] text-white/35 mb-1 uppercase tracking-wide">{f.label}</div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6 + i * 0.4, duration: 0.5 }}
              className="overflow-hidden"
            >
              <div
                className={`px-3 py-2 rounded-lg text-xs ${
                  f.highlight
                    ? "bg-emerald-600/15 border border-emerald-500/25 text-emerald-300"
                    : "bg-white/5 border border-white/8 text-white/70"
                }`}
              >
                {f.value}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
        className="mt-5 h-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 origin-left"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="mt-2 text-center text-[10px] text-emerald-400/70"
      >
        ✓ Questionnaire Complete
      </motion.div>
    </div>
  );
}
