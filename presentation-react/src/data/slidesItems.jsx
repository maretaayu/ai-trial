import React from 'react';
import {
    Brain, TriangleAlert, Target, GitBranch, ArrowUpRight,
    CheckCircle2, Boxes, Zap, Fingerprint, Lock, EyeOff,
    Layers, Search, Code, Key, Scale, Users, Workflow, MonitorPlay,
    FileText, Sparkles, Paintbrush, Building2, Headphones, ShieldCheck, Rocket,
    Clock, TrendingUp, BookOpen, List
} from 'lucide-react';

import Slide1Title from '../components/slides/Slide1Title';
import Slide3Tangga from '../components/slides/Slide3Tangga';
import Slide4Agents from '../components/slides/Slide4Agents';
import Slide5Security from '../components/slides/Slide5Security';
import Slide7ROI from '../components/slides/Slide7ROI';
import { SimpleSlide, SplitSlide, QuoteLayout, StatSlide, BigStatementSlide } from '../components/slides/SharedLayouts';
import { SlideLLMComparison, SlideVibeCoding, SlideDataAnalysis, SlideMeetingAI, SlideDivisionMapping, SlideLLMLandscape, SlideLLMTrends2026 } from '../components/slides/ToolsSlides';
import { ChapterSlide } from '../components/slides/ChapterSlide';
import { SlideUseCaseMarketing, SlideUseCaseHR, SlideUseCaseFinance, SlideUseCaseSales, SlideUseCaseIT, SlideUseCaseCS, Slide10xMarketing, SlideSpecializedAgents, SlideHiroyukiQuote } from '../components/slides/UseCaseSlides';
import { SlideAIMatrix } from '../components/slides/SlideAIMatrix';
import SlideAgenticCommerce from '../components/slides/SlideAgenticCommerce';
import SlideAgenticConcept from '../components/slides/SlideAgenticConcept';
import SlideNotebookLMDemo from '../components/slides/SlideNotebookLMDemo';

/* ───────────────────────────────────────────────
   SPECIAL SLIDE COMPONENTS (inline, one-off)
─────────────────────────────────────────────── */

// Outline / Table of Contents Slide
const SlideOutline = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto px-8">
            <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-8">
                <List className="w-3.5 h-3.5" /> Today's Agenda
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-12">What We'll Cover.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                    { num: "01", title: "Introduction", desc: "Then vs Now — why the way people work is fundamentally changing." },
                    { num: "02", title: "AI Trends 2026", desc: "The global shift from AI assistants to Agentic AI systems." },
                    { num: "03", title: "AI Tools Landscape", desc: "Mapping categories & tools your teams can adopt today." },
                    { num: "04", title: "Cross-Dept Use Cases", desc: "HR, Marketing, Finance, Customer Service in action." },
                    { num: "05", title: "Data Security & PDP Law", desc: "Guardrails for responsible enterprise AI adoption." },
                    { num: "06", title: "Live Demo: NotebookLM", desc: "Document intelligence that reads your internal knowledge base." },
                ].map((item) => (
                    <div key={item.num} className="flex items-start gap-5 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg hover:shadow-gray-100 transition-all group">
                        <span className="text-3xl font-black text-gray-200 group-hover:text-gray-900 transition-colors leading-none mt-1">{item.num}</span>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">{item.title}</h3>
                            <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Then vs Now comparison slide
const SlideThenVsNow = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-8">
            <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900">Then vs. Now.</h2>
                <p className="text-xl text-gray-500 mt-4 font-medium">AI is no longer a curiosity — it is competitive infrastructure.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                    <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6 block">2022 — Then</span>
                    {["One person, one task at a time.", "AI demos were fun experiments.", "Data was siloed across departments.", "Reports took days to compile manually.", "Employees were measured by hours logged."].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 mb-4 text-gray-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></div>
                            <span className="text-base font-medium">{t}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-900 rounded-3xl p-8">
                    <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-6 block">2026 — Now</span>
                    {["One person orchestrates a team of AI agents.", "Agents run workflows continuously, 24/7.", "Knowledge is shared in real-time across systems.", "Reports are auto-generated in seconds.", "Employees are measured by outcomes they direct."].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 mb-4 text-white">
                            <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="text-base font-medium">{t}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// AI Tools Grid slide
const SlideToolsGrid = () => {
    const categories = [
        {
            label: "Workspace AI",
            color: "bg-blue-50 border-blue-100",
            iconColor: "text-blue-600",
            tools: [
                { name: "Microsoft 365 Copilot", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png" },
                { name: "Google Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/240px-Google_Gemini_logo.svg.png" },
                { name: "Notion AI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
            ]
        },
        {
            label: "Research & RAG",
            color: "bg-green-50 border-green-100",
            iconColor: "text-green-600",
            tools: [
                { name: "Google NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/240px-Google_2015_logo.svg.png" },
                { name: "Perplexity AI", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Perplexity_AI_logo.svg" },
                { name: "ChatGPT (Enterprise)", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
            ]
        },
        {
            label: "Creative & Visual",
            color: "bg-purple-50 border-purple-100",
            iconColor: "text-purple-600",
            tools: [
                { name: "Midjourney", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png" },
                { name: "Canva Magic Studio", logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Canva_Logo.png" },
                { name: "Adobe Firefly", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Firefly_wordmark.svg" },
            ]
        },
        {
            label: "Agentic Builders",
            color: "bg-orange-50 border-orange-100",
            iconColor: "text-orange-600",
            tools: [
                { name: "Google Vertex AI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/240px-Google_2015_logo.svg.png" },
                { name: "Microsoft AutoGen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png" },
                { name: "CrewAI", logo: "https://avatars.githubusercontent.com/u/151832966?s=200" },
            ]
        },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-8">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-bold tracking-tighter text-gray-900">The AI Tools Landscape.</h2>
                    <p className="text-xl text-gray-500 mt-3 font-medium">Four categories. Dozens of tools. One unified goal: efficiency at scale.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {categories.map((cat, i) => (
                        <div key={i} className={`rounded-3xl border p-6 ${cat.color}`}>
                            <span className="text-xs font-bold tracking-[0.2em] text-gray-600 uppercase block mb-5">{cat.label}</span>
                            <div className="flex flex-col gap-4">
                                {cat.tools.map((tool, j) => (
                                    <div key={j} className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-white/50">
                                        <img src={tool.logo} className="w-6 h-6 object-contain" alt={tool.name} onError={e => { e.target.style.display = 'none'; }} />
                                        <span className="text-sm font-semibold text-gray-800 tracking-tight">{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────────
   SLIDES DATA EXPORT
─────────────────────────────────────────────── */
export const slidesData = [

    // ══════════════════════════════════════════════════════════
    // ACT 1 — HOOK: COVER + AGENDA
    // ══════════════════════════════════════════════════════════
    { component: <Slide1Title />, isDark: false },
    { component: <SlideOutline />, isDark: false },

    // ══════════════════════════════════════════════════════════
    // ACT 2 — WHY: THE WORLD HAS CHANGED
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="1"
            chapter="Introduction"
            title="The World Has Changed."
            subtitle="AI is not the next software upgrade. It's a once-in-a-generation shift in how humans interact with knowledge and work itself."
        />, isDark: true
    },

    { component: <SlideThenVsNow />, isDark: false },

    {
        component: <SplitSlide
            label="The Mindset Shift"
            title="From Executor to Orchestrator."
            subtitle="The most important skill in 2026 isn't coding — it's knowing how to direct AI to do it for you."
            points={[
                { title: "The Old Model: Task Executors", desc: "Employees were valued for speed of manual execution: typing, formatting, copy-pasting across tools.", icon: Clock },
                { title: "The New Model: Strategic Orchestrators", desc: "Employees direct AI agents, set quality standards, and validate outcomes. The work shifts from doing to deciding.", icon: Target }
            ]}
        />, isDark: false
    },

    {
        component: <QuoteLayout
            quote="AI agents are the leap from being an 'add-on' approach to being an 'AI-first' process. It's a fundamental change in workflow."
            author="Oliver Parker"
            role="VP, Global GTM for Generative AI — Google Cloud"
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80"
        />, isDark: false
    },

    // ══════════════════════════════════════════════════════════
    // ACT 3 — AI TRENDS 2026: THE 3 LEVELS
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="2"
            chapter="AI Trends 2026"
            title="The Era of Agentic AI."
            subtitle="Based on Google Cloud's 2026 AI Agent Trends Report — the industry has moved well past conversational assistants."
        />, isDark: true
    },

    { component: <Slide3Tangga />, isDark: false },

    // STAT: 52% — AI agents already in production
    {
        component: <StatSlide
            stat="52%"
            statLabel="of executives in gen AI-using organizations already have AI agents in production."
            breakdowns={[
                { pct: "49%", label: "use agents for customer service" },
                { pct: "46%", label: "use agents for marketing or security operations" },
                { pct: "45%", label: "use agents for tech support" },
                { pct: "43%", label: "use agents for product innovation or research" },
            ]}
            source="Source: Google Cloud, The ROI of AI, 2025 (Total global: n=3466)"
        />, isDark: true
    },

    // ══════════════════════════════════════════════════════════
    // ACT 4 — TOOLS LANDSCAPE: WHAT'S OUT THERE
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="3"
            chapter="AI Tools Landscape"
            title="Know Your Tools."
            subtitle="Not all AI tools are the same. Each category serves a distinct organizational need — from workspace productivity to creative content, research to code."
        />, isDark: true
    },

    { component: <SlideToolsGrid />, isDark: false },
    { component: <SlideLLMLandscape />, isDark: false },
    { component: <SlideLLMComparison />, isDark: false },
    { component: <SlideLLMTrends2026 />, isDark: false },
    { component: <SlideVibeCoding />, isDark: false },
    { component: <SlideDataAnalysis />, isDark: false },
    { component: <SlideMeetingAI />, isDark: false },

    {
        component: <SplitSlide
            label="Spotlight: NotebookLM"
            title="Why NotebookLM is different."
            subtitle="Enterprise-grade knowledge grounding — not general internet search."
            points={[
                { title: "Your data only", desc: "NotebookLM only answers from the documents you upload. It will not hallucinate facts from the web. Every claim is cited.", icon: FileText },
                { title: "Audio Overviews", desc: "Upload a 50-page policy document and get a listenable podcast-style briefing. Perfect for leadership on the go.", icon: Headphones }
            ]}
        />, isDark: false
    },

    { component: <SlideDivisionMapping />, isDark: false },



    // ── Chapter 4: Use Cases ──────────────────────────────────────────────
    {
        component: <ChapterSlide
            number="4"
            chapter="Use Cases — Every Department"
            title="AI in Action."
            subtitle="These are not hypothetical pilot projects. These are things your teams can start doing this week."
        />, isDark: true
    },

    // ── Overview Matrix: AI × Department ─────────────────────────────────
    { component: <SlideAIMatrix />, isDark: false },

    // ── Department Use Case Slides (Before → After) ───────────────────────
    { component: <SlideUseCaseMarketing />, isDark: false },
    { component: <SlideUseCaseHR />, isDark: false },
    { component: <SlideUseCaseFinance />, isDark: false },
    { component: <SlideAgenticCommerce />, isDark: false },
    { component: <SlideUseCaseSales />, isDark: false },
    { component: <SlideUseCaseIT />, isDark: false },
    { component: <SlideUseCaseCS />, isDark: false },


    // STAT: 88% ROI
    {
        component: <StatSlide
            stat="88%"
            statLabel="of organizations using AI agents report a measurable ROI within the first year of deployment."
            breakdowns={[
                { pct: "4.1×", label: "average ROI for agentic AI workflows" },
                { pct: "74%", label: "report improved employee satisfaction" },
                { pct: "68%", label: "report faster decision-making across depts." },
                { pct: "61%", label: "reduced operational cost within 6 months" },
            ]}
            source="Source: Google Cloud, The ROI of AI, 2025"
        />, isDark: true
    },

    // ══════════════════════════════════════════════════════════
    // ACT 6 — GUARDRAILS: DATA SECURITY & UU PDP
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="5"
            chapter="Data Security & Governance"
            title="Speed Needs Strong Guardrails."
            subtitle="Autonomous systems require formal accountability frameworks. AI governance is not optional — it's the foundation."
        />, isDark: true
    },

    {
        component: <BigStatementSlide
            eyebrow="Key Finding · Security"
            statement="70% of security leaders say AI has increased threat detection speed — but 58% feel unprepared for AI-specific breaches."
            body="The answer is not to slow down AI adoption, but to build governance infrastructure that scales alongside it."
            source="Source: Google Cloud AI Agent Trends 2026 Report"
        />, isDark: true
    },

    {
        component: <SplitSlide
            label="Key Risk"
            title="Prompt Data Leakage."
            subtitle="The most common — and most dangerous — mistake in enterprise AI adoption."
            points={[
                { title: "What employees do (unknowingly)", desc: "Paste internal salary data, client names, or contract details into a public AI tool for 'quick analysis'. The AI vendor may log and learn from it.", icon: Fingerprint },
                { title: "Indonesia PDP Law Implications", desc: "If personal data of customers is exposed to third-party AI systems without consent, your company may face regulatory consequences under UU PDP.", icon: Lock }
            ]}
        />, isDark: false
    },

    {
        component: <SplitSlide
            label="Key Mitigation"
            title="Enterprise Zero Data Retention."
            subtitle="The minimum viable security baseline for any corporate AI deployment."
            points={[
                { title: "Isolated Enterprise Licensing", desc: "Use enterprise-tier cloud services (MS365 Copilot, Google Workspace) where your documents are contractually NOT used to train AI models.", icon: Key },
                { title: "Anonymization Policy", desc: "Before any data is passed to an AI agent, strip names, IDs, and identifiers. Build this as a workplace habit — not just a policy document.", icon: EyeOff }
            ]}
        />, isDark: false
    },

    { component: <Slide5Security />, isDark: false },

    {
        component: <SplitSlide
            label="Governance"
            title="Human-in-the-Loop."
            subtitle="The most critical principle: automation accelerates, but humans authorize."
            points={[
                { title: "AI can draft, never decide", desc: "Financial approvals, hiring decisions, and contract signings must always route through a human decision-point — no exceptions.", icon: Scale },
                { title: "Professional Skepticism Culture", desc: "Employees must treat AI outputs as a first draft, not ground truth. Verify citations. Question confident-sounding but unverified claims.", icon: CheckCircle2 }
            ]}
        />, isDark: false
    },


    // ══════════════════════════════════════════════════════════
    // ACT 8 — LIVE DEMO: NOTEBOOKLM
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="6"
            chapter="Live Demo"
            title="NotebookLM in Action."
            subtitle="Turn a stack of unmanageable company documents into an intelligent, citable Q&A engine — in minutes."
        />, isDark: true
    },

    {
        component: <SplitSlide
            label="The Problem (Study Case)"
            title="20 overlapping policy PDFs."
            subtitle="A real challenge for HR and Legal teams in most organizations."
            points={[
                { title: "The Situation", desc: "Your HR team needs to answer: 'Which version of the leave policy applies to contract employees hired after Jan 2024?'", icon: FileText },
                { title: "The Old Way", desc: "Open each PDF one by one, Ctrl+F for keywords, then cross-reference versions manually — taking hours and still prone to error.", icon: Clock }
            ]}
        />, isDark: false
    },

    { component: <SlideNotebookLMDemo />, isDark: false },

    // ══════════════════════════════════════════════════════════
    // CLOSING
    // ══════════════════════════════════════════════════════════
    {
        component: <BigStatementSlide
            eyebrow="Google Cloud · AI Agent Trends 2026 · p.38"
            statement="Upskilling talent will be the ultimate driver of business value."
            body="It is tempting to focus on the technology—the models, the platforms, and the prompts—but this misses the most critical element: the people. The half-life of a professional skill is now 4 years—and in tech, as short as two years."
            source="Source: Google Cloud AI Agent Trends 2026 Report"
        />, isDark: true
    },
];
