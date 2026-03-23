"use client";

import { motion } from "framer-motion";

export default function ApprovalStamp() {
  return (
    <div className="glass-card p-5 max-w-xs mx-auto text-center">
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-4">
        Human Approval Gate
      </div>

      {/* Document placeholder */}
      <div className="bg-white/[0.02] rounded-lg p-4 border border-white/5 relative mb-4">
        <div className="space-y-2">
          {[85, 70, 60, 45].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-white/5"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* APPROVED stamp */}
        <motion.div
          initial={{ scale: 3, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: -12 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="px-5 py-2 border-2 border-emerald-500/60 rounded-lg">
            <span className="text-lg font-black text-emerald-500/70 uppercase tracking-widest">
              Approved
            </span>
          </div>
        </motion.div>
      </div>

      {/* Signature line */}
      <div className="relative h-8 mb-1">
        <div className="absolute bottom-0 left-4 right-4 h-px bg-white/10" />
        <svg
          className="absolute bottom-1 left-6 w-32 h-6"
          viewBox="0 0 130 24"
        >
          <motion.path
            d="M5 18 C 15 4, 25 22, 40 12 C 55 2, 60 20, 75 10 C 85 2, 95 16, 110 8 L 125 14"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="text-[9px] text-white/25">Advisor Signature</div>

      {/* Verified badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 300 }}
        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/15 text-emerald-400/80 text-[10px] font-medium border border-emerald-500/15"
      >
        ✓ Verified &amp; Logged
      </motion.div>
    </div>
  );
}
