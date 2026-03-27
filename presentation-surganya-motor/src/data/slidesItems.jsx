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
import { SlideUseCaseMarketing, SlideUseCaseLD, SlideUseCaseHR, SlideUseCaseFinance, SlideUseCaseSales, SlideUseCaseIT, SlideUseCaseCS, Slide10xMarketing, SlideSpecializedAgents, SlideHiroyukiQuote } from '../components/slides/UseCaseSlides';
import { SlideAIMatrix } from '../components/slides/SlideAIMatrix';
import SlideAgenticCommerce from '../components/slides/SlideAgenticCommerce';
import SlideAgenticConcept from '../components/slides/SlideAgenticConcept';
import SlideNotebookLMDemo from '../components/slides/SlideNotebookLMDemo';
import { SlideOutputPreview } from '../components/slides/SlideOutputPreview';
import SlideBankingOpportunity from '../components/slides/SlideBankingOpportunity';
import SlideBankingUseCases from '../components/slides/SlideBankingUseCases';
import SlideBankingAIMatrix from '../components/slides/SlideBankingAIMatrix';
import SlideAgenticBanking from '../components/slides/SlideAgenticBanking';
import SlideBankingROI from '../components/slides/SlideBankingROI';
import SlideAIIntro from '../components/slides/SlideAIIntro';
import SlideReferences from '../components/slides/SlideReferences';
import SlideFeedback from '../components/slides/SlideFeedback';

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
                    { num: "01", title: "AI in L&D", desc: "Understanding how AI shifts the Learning & Development landscape." },
                    { num: "02", title: "Use Case & Implementation", desc: "Real-world potential implementations for corporate training." },
                    { num: "03", title: "The Era of Agentic AI", desc: "How AI agents handle training workflows automatically." },
                    { num: "04", title: "Discussion & Q&A", desc: "Exploring ideas to leverage AI for team upskilling." },
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
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900">Dulu vs. Sekarang.</h2>
                <p className="text-xl text-gray-500 mt-4 font-medium">AI bukan lagi sekadar eksperimen — melainkan infrastruktur kompetitif.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                    <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6 block">2022 — Dulu</span>
                    {["Satu orang mengerjakan satu tugas pada satu waktu.", "Demo AI sekadar eksperimen yang menyenangkan.", "Data tersekat-sekat antar departemen.", "Pembuatan laporan memakan waktu berhari-hari secara manual.", "Karyawan dinilai berdasarkan jumlah jam kerja."].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 mb-4 text-gray-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></div>
                            <span className="text-base font-medium">{t}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-900 rounded-3xl p-8">
                    <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-6 block">2026 — Sekarang</span>
                    {["Satu orang mengorkestrasi sebuah tim agen AI (AI Agents).", "Agen AI menjalankan workflow secara terus-menerus, 24/7.", "Pengetahuan dibagikan secara real-time lintas sistem.", "Laporan di-generate otomatis dalam hitungan detik.", "Karyawan dinilai berdasarkan hasil kerja (outcomes) yang dicapai."].map((t, i) => (
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
    // COVER + AGENDA
    // ══════════════════════════════════════════════════════════
    { component: <Slide1Title />, isDark: false },
    { component: <SlideOutline />, isDark: false },

    // ══════════════════════════════════════════════════════════
    // CH 1 — INTRODUCTION: AI in L&D
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="1"
            chapter="Introduction"
            title="AI in Learning & Development."
            subtitle="Before diving into tools, let's ground ourselves in the basics — what AI is, and why it's a game-changer for L&D."
        />, isDark: true
    },

    { component: <SlideAIIntro />, isDark: false },
    { component: <SlideThenVsNow />, isDark: false },

    {
        component: <SplitSlide
            label="The Mindset Shift"
            title="From Executor to Orchestrator."
            subtitle="The most important skill in 2026 isn't just knowing the content — it's knowing how to direct AI to scale learning."
            points={[
                { title: "The Old Model: Content Creators", desc: "L&D teams were valued for manual creation: writing modules, designing decks, recording training videos.", icon: Clock },
                { title: "The New Model: Strategic Orchestrators", desc: "Teams direct AI agents to generate content, personalize paths, and analyze skill gaps at scale.", icon: Target }
            ]}
        />, isDark: false
    },

    {
        component: <QuoteLayout
            quote="AI bukan sekadar alat pembantu, melainkan mitra strategis dalam mengakselerasi kompetensi karyawan di seluruh jaringan operasional."
            author="Oliver Parker"
            role="VP, Global GTM for Generative AI — Google Cloud"
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80"
        />, isDark: false
    },

    // ══════════════════════════════════════════════════════════
    // CH 2 — USE CASE & IMPLEMENTATION
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="2"
            chapter="Use Case"
            title="Implementation Scenarios."
            subtitle="Real-world scenarios where AI can simplify Learning & Development workflows."
        />, isDark: true
    },

    { component: <SlideUseCaseLD />, isDark: false },
    { component: <SlideUseCaseCS />, isDark: false },
    { component: <SlideUseCaseHR />, isDark: false },

    {
        component: <StatSlide
            stat="88%"
            statLabel="organisasi yang menggunakan AI untuk L&D melaporkan peningkatan retensi pengetahuan yang signifikan."
            breakdowns={[
                { pct: "3.5×", label: "lebih cepat dalam memproduksi modul pelatihan" },
                { pct: "82%", label: "karyawan merasa pelatihan lebih relevan & personal" },
                { pct: "70%", label: "pengurangan waktu downtime mekanik saat mencari SOP" },
                { pct: "55%", label: "penghematan biaya operasional pelatihan lapangan" },
            ]}
            source="Referensi: Ruangguru Enterprise AI Report, 2025"
        />, isDark: true
    },

    // ══════════════════════════════════════════════════════════
    // CH 3 — THE ERA OF AGENTIC AI
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="3"
            chapter="AI Trends 2026"
            title="The Era of Agentic AI."
            subtitle="Based on Google Cloud's 2026 AI Agent Trends Report — moving from chatbots to automated workflow agents."
        />, isDark: true
    },

    { component: <Slide3Tangga />, isDark: false },
    { component: <SlideAgenticCommerce />, isDark: false },

    {
        component: <StatSlide
            stat="52%"
            statLabel="eksekutif telah menempatkan agen AI di tahap produksi untuk mendukung operasional internal."
            breakdowns={[
                { pct: "49%", label: "menggunakan agen AI untuk Knowledge Management" },
                { pct: "46%", label: "menggunakan agen AI untuk Content & Training" },
                { pct: "45%", label: "menggunakan agen AI untuk Operational Support" },
                { pct: "43%", label: "menggunakan agen AI untuk Data Insights" },
            ]}
            source="Sumber: Google Cloud, The ROI of AI, 2025"
        />, isDark: true
    },

    // ══════════════════════════════════════════════════════════
    // CH 4 — LIVE DEMO: NOTEBOOKLM
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="4"
            chapter="Live Demo"
            title="NotebookLM for Digital SOPs."
            subtitle="Turn technical manuals into an intelligent, citable mentor for every employee."
        />, isDark: true
    },

    {
        component: <SplitSlide
            label="Spotlight: NotebookLM"
            title="Why it fits the strategy."
            subtitle="Instant knowledge grounding for technical and operational excellence."
            points={[
                { title: "Safe & Accurate", desc: "Answers only from your uploaded SOPs. No hallucinations. Perfect for critical technical specifications.", icon: FileText },
                { title: "Interactive Training", desc: "Upload training materials and get instant quizzes or audio summaries for mechanics on the move.", icon: Headphones }
            ]}
        />, isDark: false
    },
    
    { component: <SlideNotebookLMDemo />, isDark: false },

    // ══════════════════════════════════════════════════════════
    // CLOSING
    // ══════════════════════════════════════════════════════════
    {
        component: <BigStatementSlide
            eyebrow="Conclusion"
            statement="AI is not about replacing trainers, but empowering them to reach more talent."
            body="Technology handles the scale, while L&D leaders focus on the most important element: human growth and organizational culture."
            source="Source: Ruangguru Engineering Academy"
        />, isDark: true
    },

    { component: <SlideReferences />, isDark: false },
    { component: <SlideFeedback />, isDark: false },
];
