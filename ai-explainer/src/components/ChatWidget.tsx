"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Map routes to knowledge base step IDs and scene context
function getSceneContext(pathname: string): { stepId: number; scene: string } {
  if (pathname === "/" || pathname.startsWith("/problem")) return { stepId: -1, scene: "problem" };
  if (pathname === "/current-workflow") return { stepId: -1, scene: "workflow" };
  if (pathname === "/solution") return { stepId: -1, scene: "solution" };
  if (pathname === "/flow/onboarding") return { stepId: 0, scene: "onboarding" };
  if (pathname === "/flow/risk-analysis") return { stepId: 1, scene: "risk-analysis" };
  if (pathname === "/flow/ips") return { stepId: 2, scene: "ips" };
  if (pathname === "/flow/portfolio") return { stepId: 3, scene: "portfolio" };
  if (pathname === "/flow/drift") return { stepId: 4, scene: "drift" };
  if (pathname === "/value") return { stepId: -1, scene: "value" };
  return { stepId: -1, scene: "general" };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { stepId, scene } = getSceneContext(pathname);

  // Clear on nav
  useEffect(() => {
    setMessages([]);
  }, [pathname]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          stepId: stepId >= 0 ? stepId : 0,
          viewMode: "client",
          scene,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[min(340px,calc(100vw-2.5rem))] rounded-2xl glass-card flex flex-col overflow-hidden shadow-2xl shadow-black/50"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold">
                  ✦
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/90">AI Assistant</div>
                  <div className="text-[10px] text-white/60 capitalize">{scene} context</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white/80 text-lg transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-2xl mb-2 opacity-40">💬</div>
                  <p className="text-xs text-white/50">Ask about this section</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-violet-600/40 text-white/90 rounded-br-sm"
                        : "bg-white/8 text-white/85 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-xl px-4 py-2.5 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-3 border-t border-white/5 flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-white/8 border border-white/12 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3 py-2 bg-violet-600/70 hover:bg-violet-600/90 text-white text-xs font-medium rounded-lg disabled:opacity-30 transition-colors cursor-pointer"
              >
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white text-lg shadow-lg shadow-violet-600/30 cursor-pointer ml-auto"
      >
        {open ? "✕" : "✦"}
      </motion.button>
    </div>
  );
}
