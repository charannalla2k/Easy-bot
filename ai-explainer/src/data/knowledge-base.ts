export type ViewMode = "client" | "advisor" | "technical";

export interface DataItem {
  name: string;
  source: string;
  aiUsed: boolean;
  stored: boolean;
  description: string;
}

export interface StepContent {
  whatHappens: string;
  systemInvolvement: string;
  description: string;
}

export interface Step {
  id: number;
  title: string;
  icon: string;
  phase: string;
  timing: string;
  views: Record<ViewMode, StepContent>;
  dataUsed: DataItem[];
  aiPowered: boolean;
  humanGate: boolean;
  actors: string[];
}

export interface AppContext {
  name: string;
  tagline: string;
  description: string;
  keyDifferentiators: string[];
  allocationModels: Record<string, string>;
}

export const appContext: AppContext = {
  name: "Suitability + IPS Builder with Drift Enforcement",
  tagline:
    "AI-Powered Investment Suitability, Policy Generation & Portfolio Monitoring",
  description:
    "A comprehensive platform that helps wealth advisors document client suitability, generate Investment Policy Statements, construct portfolios, and continuously monitor for drift — all powered by deterministic AI with human-in-the-loop approval at every critical decision point.",
  keyDifferentiators: [
    "Deterministic AI — reproducible & auditable (temp=0, seed=42)",
    "Event-Driven Drift Detection — triggered on save & manual request, not scheduled",
    "Human-in-the-Loop — AI suggests, humans approve at every gate",
    "Dual Scoring — Final risk = MIN(Capacity, Tolerance)",
    "Full audit trail for regulatory compliance",
  ],
  allocationModels: {
    Conservative: "30% Equity / 60% Debt / 10% Alternatives",
    "Moderately Conservative": "40% Equity / 50% Debt / 10% Alternatives",
    Moderate: "50% Equity / 40% Debt / 10% Alternatives",
    "Moderately Aggressive": "60% Equity / 30% Debt / 10% Alternatives",
    Aggressive: "70% Equity / 20% Debt / 10% Alternatives",
  },
};

export const steps: Step[] = [
  {
    id: 0,
    title: "Client Onboarding",
    icon: "👤",
    phase: "Phase 0",
    timing: "~15 min",
    views: {
      client: {
        description:
          "This is where you get started. Your financial advisor registers you in the system, and you complete a simple questionnaire about your financial goals, risk comfort, and investment timeline.",
        whatHappens:
          "You log in, answer a set of clear questions about your finances and goals, and the system automatically scores your responses to understand your investment profile.",
        systemInvolvement:
          "The system auto-scores your questionnaire to categorize your risk profile. No AI makes decisions here — it simply calculates a score from your answers.",
      },
      advisor: {
        description:
          "Register a new client with their profile, financial details, and risk parameters. The client then completes a weighted risk questionnaire that is auto-scored and categorized.",
        whatHappens:
          "Advisor logs in → Registers client with profile & financials → Client logs in → Completes weighted risk questionnaire → System creates assessment with auto-scoring.",
        systemInvolvement:
          "The system uses a deterministic scoring algorithm to evaluate questionnaire responses. Scores are calculated for both risk capacity and risk tolerance independently.",
      },
      technical: {
        description:
          "Role-based authentication gates advisor and client access. Client profile data is persisted. Questionnaire responses feed into a deterministic scoring engine that produces capacity and tolerance sub-scores.",
        whatHappens:
          "POST /api/clients (register) → GET /api/questionnaire (serve questions) → POST /api/assessments (submit answers) → Scoring engine runs synchronously → Assessment record created with status=pending_review.",
        systemInvolvement:
          "Deterministic scoring engine (no AI/LLM). Weighted scoring formula applied to questionnaire responses. Dual-score output: risk_capacity_score + risk_tolerance_score. Final risk = MIN(capacity, tolerance).",
      },
    },
    dataUsed: [
      {
        name: "Client Profile",
        source: "Advisor input",
        aiUsed: false,
        stored: true,
        description: "Name, contact details, financial situation",
      },
      {
        name: "Risk Questionnaire Responses",
        source: "Client input",
        aiUsed: false,
        stored: true,
        description: "Answers to weighted risk assessment questions",
      },
      {
        name: "Assessment Score",
        source: "System calculation",
        aiUsed: false,
        stored: true,
        description:
          "Auto-calculated risk capacity and tolerance scores",
      },
    ],
    aiPowered: false,
    humanGate: false,
    actors: ["Advisor", "Client", "System"],
  },
  {
    id: 1,
    title: "AI-Powered Risk Analysis",
    icon: "🧠",
    phase: "Phase 1",
    timing: "~5 min AI + Review",
    views: {
      client: {
        description:
          "The AI carefully analyzes your questionnaire answers using three different methods to make sure your risk profile is accurate and fair. Your advisor then reviews everything before anything is finalized.",
        whatHappens:
          "Three AI checks run in parallel: one scores your risk capacity and tolerance, another checks if your answers are consistent, and a third looks for any behavioral biases. Your advisor reviews all findings and finalizes your risk category.",
        systemInvolvement:
          "AI performs the analysis, but your advisor has full control. They can accept the AI's recommendation, override it, or send it back for reassessment.",
      },
      advisor: {
        description:
          "Three parallel AI analyses run on the client's assessment data: deterministic risk scoring, consistency analysis (flagging contradictions), and behavioral bias detection. Results converge for advisor review.",
        whatHappens:
          "Assessment + client profile feed into 3 parallel AI agents → Results merge → Advisor reviews composite analysis → Accept, Override (with justification), or Reject (back to Phase 0).",
        systemInvolvement:
          "AI models run with temp=0, seed=42 for reproducibility. Deterministic Scorer calculates capacity + tolerance. Consistency Analyzer flags answer contradictions. Bias Analyst detects behavioral patterns like recency bias or overconfidence.",
      },
      technical: {
        description:
          "Parallel AI pipeline: three specialized agents process assessment data concurrently. Fork-join pattern with parallel gateway. All AI calls use deterministic parameters (temperature=0, seed=42) for audit reproducibility.",
        whatHappens:
          "Parallel Gateway (fork) → [Deterministic Scorer API, Consistency Analyzer API, Bias Analyst API] → Parallel Gateway (join) → Composite result → Human approval gate (advisor). State transitions: pending_review → analyzed → advisor_approved | advisor_overridden | rejected.",
        systemInvolvement:
          "OpenAI API calls with strict system prompts. Each agent has isolated context. Scorer uses structured output (JSON mode). Consistency Analyzer compares answer pairs for contradictions. Bias Analyst evaluates response patterns against known behavioral finance biases. All outputs logged for audit trail.",
      },
    },
    dataUsed: [
      {
        name: "Assessment & Questionnaire",
        source: "Phase 0 output",
        aiUsed: true,
        stored: true,
        description: "Client's scored assessment from onboarding",
      },
      {
        name: "Client Profile & Financials",
        source: "System database",
        aiUsed: true,
        stored: false,
        description: "Referenced but not modified during analysis",
      },
      {
        name: "AI Analysis Results",
        source: "AI System (3 agents)",
        aiUsed: true,
        stored: true,
        description:
          "Risk scores, consistency flags, bias detection results",
      },
      {
        name: "Advisor Decision",
        source: "Advisor input",
        aiUsed: false,
        stored: true,
        description:
          "Accept/Override/Reject with justification logged",
      },
    ],
    aiPowered: true,
    humanGate: true,
    actors: ["AI System", "Advisor"],
  },
  {
    id: 2,
    title: "Investment Policy Statement (IPS)",
    icon: "📝",
    phase: "Phase 2",
    timing: "AI Draft + Review",
    views: {
      client: {
        description:
          "Based on your risk profile, the AI creates a personalized Investment Policy Statement — a document that defines how your money should be invested, including target allocations and boundaries.",
        whatHappens:
          "The AI drafts your IPS with recommended investment targets and limits. Your advisor reviews and fine-tunes it, and then you both review and approve the final document together.",
        systemInvolvement:
          "AI generates the initial draft, but both your advisor and you must approve it before it becomes active. You can request revisions at any point.",
      },
      advisor: {
        description:
          "AI generates a comprehensive IPS based on the finalized risk category and allocation model. The IPS includes target allocations, rebalancing bands (±5%), constraints (ESG, concentrated positions), and investment objectives.",
        whatHappens:
          "Risk category + allocation model → AI generates IPS draft → Advisor reviews target allocations, bands & rebalancing strategy → Advisor and Client jointly approve → System activates IPS.",
        systemInvolvement:
          "AI drafts the complete IPS document using structured templates. Advisor can modify all parameters. Dual approval gate: both advisor and client must accept. Revise loop available before activation.",
      },
      technical: {
        description:
          "IPS generation uses the risk category to select an allocation model template, then AI populates specific parameters. Document follows a structured schema with target_allocations[], rebalancing_bands{}, constraints[], and objectives[].",
        whatHappens:
          "POST /api/ips/generate (risk_category, client_id) → AI drafts IPS (structured JSON) → PUT /api/ips/:id (advisor edits) → POST /api/ips/:id/approve (dual approval) → Status: draft → under_review → active.",
        systemInvolvement:
          "OpenAI API with IPS-specific system prompt and structured output. Template-driven generation ensures compliance. Example output: { target: { equity: 50, fixed_income: 40, alternatives: 10 }, bands: { tolerance: 5 }, constraints: ['ESG', 'no_concentrated_positions'] }.",
      },
    },
    dataUsed: [
      {
        name: "Risk Category & Allocation Model",
        source: "Phase 1 output",
        aiUsed: true,
        stored: false,
        description: "Finalized risk category drives allocation selection",
      },
      {
        name: "IPS Document",
        source: "AI-generated, advisor-refined",
        aiUsed: true,
        stored: true,
        description:
          "Target allocations, bands, constraints, objectives",
      },
      {
        name: "Approval Records",
        source: "Advisor & Client input",
        aiUsed: false,
        stored: true,
        description: "Dual sign-off timestamps and any revision history",
      },
    ],
    aiPowered: true,
    humanGate: true,
    actors: ["AI System", "Advisor", "Client"],
  },
  {
    id: 3,
    title: "Portfolio Construction & Approval",
    icon: "🏗️",
    phase: "Phase 3",
    timing: "AI Draft + Multi-Party Review",
    views: {
      client: {
        description:
          "Now it's time to pick the actual investments. The AI suggests specific securities (stocks, bonds, etc.) that fit your investment policy, and your advisor fine-tunes the selection before you give final approval.",
        whatHappens:
          "The AI proposes a portfolio of specific investments aligned with your IPS. Your advisor can add, remove, or adjust positions. Once you approve, the portfolio is deployed and becomes your active investment portfolio.",
        systemInvolvement:
          "AI selects from an approved securities list and allocates to match your IPS targets. Your advisor customizes the selection, and you have the final say before anything is locked in.",
      },
      advisor: {
        description:
          "AI drafts a portfolio by selecting securities from the master list and allocating percentages to match IPS targets. Advisor can add, remove, or adjust any holding before client approval.",
        whatHappens:
          "Securities master list + Active IPS → AI drafts portfolio (100% allocated) → Advisor edits holdings → Client approves → System deploys portfolio (becomes read-only).",
        systemInvolvement:
          "AI portfolio optimizer selects securities considering: IPS target allocations, diversification rules, available securities list, and any constraints. Advisor has full edit capability. Client approval gate required.",
      },
      technical: {
        description:
          "Portfolio construction pipeline: AI optimizer selects from securities master data, allocates weights to match IPS targets within band constraints. Holdings persisted as portfolio_holdings[] with security_id, weight, and asset_class.",
        whatHappens:
          "GET /api/securities (master list) + GET /api/ips/:id (active IPS) → POST /api/portfolios/draft (AI optimization) → PUT /api/portfolios/:id/holdings (advisor edits) → POST /api/portfolios/:id/approve (client gate) → Status: draft → approved → deployed (read-only).",
        systemInvolvement:
          "Constrained optimization: maximize diversification subject to IPS allocation targets ± bands. Security filtering by asset class, ESG flags, concentration limits. Output: Array<{security_id, ticker, weight, asset_class}>. Portfolio locked on deployment.",
      },
    },
    dataUsed: [
      {
        name: "Securities Master List",
        source: "System database",
        aiUsed: true,
        stored: false,
        description: "Approved securities with asset class, ESG flags",
      },
      {
        name: "Active IPS & Target Bands",
        source: "Phase 2 output",
        aiUsed: true,
        stored: false,
        description: "Allocation targets and constraints for optimization",
      },
      {
        name: "Portfolio Holdings",
        source: "AI-generated, advisor-modified",
        aiUsed: true,
        stored: true,
        description: "Final security positions with weights",
      },
      {
        name: "Client Approval",
        source: "Client input",
        aiUsed: false,
        stored: true,
        description: "Client sign-off before portfolio deployment",
      },
    ],
    aiPowered: true,
    humanGate: true,
    actors: ["AI System", "Advisor", "Client"],
  },
  {
    id: 4,
    title: "Continuous Monitoring & Rebalancing",
    icon: "📡",
    phase: "Phase 4",
    timing: "Continuous / Event-Driven",
    views: {
      client: {
        description:
          "Once your portfolio is live, the system continuously watches it to make sure it stays aligned with your investment policy. If something drifts too far, your advisor is alerted and can rebalance.",
        whatHappens:
          "The system checks your portfolio whenever changes are saved or your advisor requests a check. If any allocation drifts outside the allowed range (e.g., equities drop below 45% when the target is 50% ± 5%), the AI flags it and suggests adjustments. Your advisor reviews and decides on any trades.",
        systemInvolvement:
          "AI monitors and analyzes drift automatically, but all rebalancing decisions go through your advisor. No trades happen without human approval.",
      },
      advisor: {
        description:
          "Event-driven drift detection runs on every holdings save and on manual request. When drift exceeds IPS bands, AI analyzes root cause and risk impact, then generates tax-aware rebalancing recommendations.",
        whatHappens:
          "Trigger (holdings saved / manual request) → System detects drift (actual vs IPS bands) → If drift found: AI analyzes root cause & impact → Advisor decides: Rebalance or Log & Continue → If rebalance: AI suggests trades → Advisor adjusts → Holdings saved → Re-check drift → Loop until resolved.",
        systemInvolvement:
          "Drift detection is deterministic (percentage comparison). Drift analysis uses AI for root-cause explanation and risk assessment. Rebalancing suggestions are AI-generated with tax optimization. Advisor has full control: accept, edit, or override every suggested trade.",
      },
      technical: {
        description:
          "Event-driven architecture: drift detection triggered by portfolio_holdings.save event or manual API call. Drift calculated as |actual_weight - target_weight| per asset class. Breaches flagged when delta > IPS band tolerance.",
        whatHappens:
          "Event: holdings_saved | manual_check → GET /api/drift/detect (compare actual vs IPS) → XOR Gateway: drift_found? → If yes: POST /api/drift/analyze (AI root-cause) → Human gate → If rebalance: POST /api/rebalance/suggest (AI tax-optimized trades) → PUT /api/holdings (save) → Recursive re-check until resolved.",
        systemInvolvement:
          "Drift detection: pure math (no AI). Drift analysis: OpenAI API with portfolio context for root-cause narrative. Rebalance suggestions: constrained optimization with tax-loss harvesting logic. All decisions logged with advisor_id, timestamp, action_taken, and justification. Implements loop-back pattern for persistent drift.",
      },
    },
    dataUsed: [
      {
        name: "Current Holdings",
        source: "System database",
        aiUsed: true,
        stored: false,
        description: "Live portfolio positions and weights",
      },
      {
        name: "IPS Targets & Bands",
        source: "Phase 2 output",
        aiUsed: true,
        stored: false,
        description:
          "Target allocations and tolerance bands for comparison",
      },
      {
        name: "Drift Events",
        source: "System calculation + AI analysis",
        aiUsed: true,
        stored: true,
        description: "Detected drift with root cause and risk impact",
      },
      {
        name: "Rebalancing Trades",
        source: "AI-suggested, advisor-approved",
        aiUsed: true,
        stored: true,
        description: "Tax-optimized trade suggestions to restore targets",
      },
      {
        name: "Advisor Decisions",
        source: "Advisor input",
        aiUsed: false,
        stored: true,
        description:
          "Rebalance/No-action decisions with justification (audit trail)",
      },
    ],
    aiPowered: true,
    humanGate: true,
    actors: ["System", "AI System", "Advisor"],
  },
];
