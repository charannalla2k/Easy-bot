import { NextRequest, NextResponse } from "next/server";
import { steps, appContext } from "@/data/knowledge-base";
import type { ViewMode } from "@/data/knowledge-base";

// ---------- Rate limiter (in-memory, per-IP, per minute) ----------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20; // max requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ---------- Input sanitisation ----------
const MAX_MESSAGE_LENGTH = 500;
const VALID_VIEW_MODES: ViewMode[] = ["client", "advisor", "technical"];

function sanitizeInput(raw: string): string {
  return raw
    .slice(0, MAX_MESSAGE_LENGTH)
    .replace(/[<>]/g, "")   // strip angle brackets to prevent injection
    .trim();
}

// Scene context for non-step pages
const sceneDescriptions: Record<string, string> = {
  problem:
    "This scene explains the business problem: manual suitability assessments are inconsistent, portfolio drift goes unmonitored, and regulatory scrutiny on documentation is intense.",
  workflow:
    "This scene shows the current manual workflow: paper forms, manual advisor review, IPS created in Word/Excel, ad-hoc portfolio building, and zero automated drift monitoring.",
  solution:
    "This scene introduces the AI-powered solution: deterministic AI (temp=0, seed=42) that suggests while humans approve, with 6 AI steps, 4 human gates, event-driven drift detection, and full audit trails.",
  value:
    "This scene shows value drivers: consistent regulatory-compliant documentation, 70% advisor time saved, 24/7 systematic monitoring, and better client outcomes through disciplined rebalancing.",
  general: appContext.description,
};

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, stepId, viewMode = "client", scene = "general" } = body as {
      message: string;
      stepId: number;
      viewMode: ViewMode;
      scene?: string;
    };

    // Validate message
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Sanitise & clamp
    const safeMessage = sanitizeInput(message);
    const safeViewMode = VALID_VIEW_MODES.includes(viewMode) ? viewMode : "client";
    const safeStepId = typeof stepId === "number" ? Math.floor(stepId) : -1;

    // Build context depending on whether this is a step page or scene page
    const isStepPage = safeStepId >= 0 && safeStepId < steps.length;
    let systemPrompt: string;

    if (isStepPage) {
      const step = steps[safeStepId];
      const content = step.views[safeViewMode] || step.views.client;
      const dataDetails = step.dataUsed
        .map((d) => `- ${d.name}: ${d.description} (Source: ${d.source})`)
        .join("\n");
      const allStepNames = steps.map((s, i) => `Phase ${i}: ${s.title}`).join(", ");

      systemPrompt = `You explain the "${appContext.name}" application. Currently on Phase ${safeStepId}: "${step.title}".

APP: ${appContext.description}
STEP: ${content.description}
WHAT HAPPENS: ${content.whatHappens}
SYSTEM/AI: ${content.systemInvolvement}
DATA:\n${dataDetails}
ALL PHASES: ${allStepNames}

RULES: Answer ONLY from above context. Keep responses to 2-3 sentences max. If question is about a different phase, say: "That's covered in another part of the walkthrough — navigate there to learn more."`;
    } else {
      const sceneCtx = sceneDescriptions[scene] || sceneDescriptions.general;
      systemPrompt = `You explain the "${appContext.name}" application. Currently on the "${scene}" scene.

APP: ${appContext.description}
SCENE CONTEXT: ${sceneCtx}
KEY DIFFERENTIATORS: ${appContext.keyDifferentiators.join("; ")}

RULES: Answer ONLY from above context. Keep responses to 2-3 sentences max. If question is about a specific flow step, say: "That's covered in another part of the walkthrough — navigate there to learn more."`;
    }

    // Try Groq first, then OpenAI, then fallback
    const groqKey = process.env.GROQ_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!groqKey && !openaiKey) {
      console.warn("Chat API: No GROQ_API_KEY or OPENAI_API_KEY configured");
    }

    if (groqKey) {
      try {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
              temperature: 0,
              max_tokens: 200,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: safeMessage },
              ],
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ reply: data.choices[0].message.content });
        }
        const errBody = await response.text();
        console.error(`Groq API error ${response.status}: ${errBody}`);
      } catch (err) {
        console.error("Groq API fetch failed:", err);
      }
    }

    if (openaiKey) {
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
              model: process.env.OPENAI_MODEL || "gpt-4o-mini",
              temperature: 0,
              seed: 42,
              max_tokens: 200,
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: safeMessage },
              ],
          }),
        }
        );
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ reply: data.choices[0].message.content });
        }
        const errBody = await response.text();
        console.error(`OpenAI API error ${response.status}: ${errBody}`);
      } catch (err) {
        console.error("OpenAI API fetch failed:", err);
      }
    }

    // Fallback
    if (isStepPage) {
      const step = steps[safeStepId];
      const content = step.views[safeViewMode] || step.views.client;
      const reply = generateGroundedResponse(safeMessage, step, content, safeStepId);
      return NextResponse.json({ reply });
    }

    return NextResponse.json({
      reply: sceneDescriptions[scene] || sceneDescriptions.general,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function generateGroundedResponse(
  message: string,
  step: (typeof steps)[0],
  content: { description: string; whatHappens: string; systemInvolvement: string },
  stepId: number
): string {
  const lowerMsg = message.toLowerCase();

  for (const s of steps) {
    if (s.id !== stepId && lowerMsg.includes(s.title.toLowerCase().split(" ")[0].toLowerCase())) {
      return `That's covered in ${s.phase}: "${s.title}". Navigate there to learn more.`;
    }
  }

  if (lowerMsg.includes("what happen") || lowerMsg.includes("how does") || lowerMsg.includes("process")) {
    return content.whatHappens;
  }
  if (lowerMsg.includes("ai") || lowerMsg.includes("system") || lowerMsg.includes("automat")) {
    return content.systemInvolvement;
  }
  if (lowerMsg.includes("data") || lowerMsg.includes("information")) {
    return step.dataUsed.map((d) => `• ${d.name}: ${d.description} (${d.source})`).join("\n");
  }
  if (lowerMsg.includes("who") || lowerMsg.includes("approv")) {
    return `Actors: ${step.actors.join(", ")}. ${step.humanGate ? "Includes human approval gate." : "No human gate."}`;
  }

  return content.description;
}
