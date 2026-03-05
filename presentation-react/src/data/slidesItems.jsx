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
import SlideBankingOpportunity from '../components/slides/SlideBankingOpportunity';
import SlideBankingUseCases from '../components/slides/SlideBankingUseCases';
import SlideBankingAIMatrix from '../components/slides/SlideBankingAIMatrix';
import SlideAgenticBanking from '../components/slides/SlideAgenticBanking';
import SlideBankingROI from '../components/slides/SlideBankingROI';
import SlideAIIntro from '../components/slides/SlideAIIntro';

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
                    { num: "01", title: "Introduction", desc: "What is AI and why the mindset must shift." },
                    { num: "02", title: "Banking & AI", desc: "Why financial services leads in AI adoption." },
                    { num: "03", title: "The Era of Agentic AI", desc: "From Predictive to Agentic workflows." },
                    { num: "04", title: "Tools Landscape", desc: "Mapping AI categories & everyday tools." },
                    { num: "05", title: "Security & Governance", desc: "Data guardrails, UU PDP, and Human-in-the-loop." },
                    { num: "06", title: "Live Demo", desc: "Enterprise knowledge with NotebookLM." },
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
    // CH 1 — INTRODUCTION: WHAT IS AI?
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="1"
            chapter="Introduction"
            title="What is AI, Really?"
            subtitle="Before diving into tools, let's ground ourselves in the basics — what AI is, and why it matters now more than ever."
        />, isDark: true
    },

    { component: <SlideAIIntro />, isDark: false },
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
            quote="Agen AI adalah lompatan besar dari sekadar pendekatan 'add-on' menjadi proses 'AI-first'. Ini adalah perubahan fundamental dalam workflow."
            author="Oliver Parker"
            role="VP, Global GTM for Generative AI — Google Cloud"
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80"
        />, isDark: false
    },

    // ══════════════════════════════════════════════════════════
    // CH 2 — BANKING & AI OPPORTUNITY
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="2"
            chapter="Banking & AI"
            title="The Banking AI Opportunity."
            subtitle="Financial services is one of the fastest AI adopters globally — and the economic potential across every banking segment is enormous."
        />, isDark: true
    },

    { component: <SlideBankingOpportunity />, isDark: false },
    { component: <SlideBankingUseCases />, isDark: false },
    { component: <SlideBankingAIMatrix />, isDark: false },

    {
        component: <StatSlide
            stat="88%"
            statLabel="dari organisasi yang menggunakan agen AI melaporkan ROI yang terukur dalam tahun pertama implementasi."
            breakdowns={[
                { pct: "4.1×", label: "rata-rata ROI untuk workflow AI Agentic" },
                { pct: "74%", label: "melaporkan peningkatan kepuasan karyawan" },
                { pct: "68%", label: "melaporkan pengambilan keputusan yang lebih cepat antardepartemen" },
                { pct: "61%", label: "penurunan biaya operasional dalam waktu 6 bulan" },
            ]}
            source="Sumber: Google Cloud, The ROI of AI, 2025"
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
            subtitle="Based on Google Cloud's 2026 AI Agent Trends Report — the industry has moved well past conversational assistants."
        />, isDark: true
    },

    { component: <Slide3Tangga />, isDark: false },
    { component: <SlideAgenticBanking />, isDark: false },

    {
        component: <StatSlide
            stat="52%"
            statLabel="dari para eksekutif di organisasi pengguna Gen AI telah menempatkan agen AI di tahap produksi."
            breakdowns={[
                { pct: "49%", label: "menggunakan agen AI untuk Customer Service" },
                { pct: "46%", label: "menggunakan agen AI untuk operasional Marketing atau Security" },
                { pct: "45%", label: "menggunakan agen AI untuk Tech Support" },
                { pct: "43%", label: "menggunakan agen AI untuk riset atau inovasi produk" },
            ]}
            source="Sumber: Google Cloud, The ROI of AI, 2025 (Total global: n=3466)"
        />, isDark: true
    },

    // ══════════════════════════════════════════════════════════
    // CH 4 — AI TOOLS LANDSCAPE
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="4"
            chapter="AI Tools Landscape"
            title="Know Your Tools."
            subtitle="Not all AI tools are the same. Let's look at the broad categories serving everyday organizational needs."
        />, isDark: true
    },

    { component: <SlideToolsGrid />, isDark: false },
    { component: <SlideLLMLandscape />, isDark: false },
    { component: <SlideLLMComparison />, isDark: false },
    { component: <SlideLLMTrends2026 />, isDark: false },
    { component: <SlideVibeCoding />, isDark: false },
    { component: <SlideDataAnalysis />, isDark: false },
    { component: <SlideMeetingAI />, isDark: false },
    { component: <SlideDivisionMapping />, isDark: false },

    // ══════════════════════════════════════════════════════════
    // CH 5 — UU PDP & TATA KELOLA
    // ══════════════════════════════════════════════════════════
    {
        component: <ChapterSlide
            number="5"
            chapter="UU PDP & Tata Kelola"
            title="Regulasi & Keamanan Data."
            subtitle="Implementasi AI di perbankan bukan sekadar urusan teknologi, melainkan juga kepatuhan pada regulasi OJK & pelindungan data."
        />, isDark: true
    },

    {
        component: <BigStatementSlide
            eyebrow="Fondasi Regulasi"
            statement="Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)."
            body="Seluruh implementasi AI di perbankan wajib didasarkan pada UU PDP untuk memastikan pengelolaan data nasabah yang sensitif dilakukan secara bertanggung jawab, aman, dan mutlak melindungi hak privasi nasabah."
            source="Referensi: Roadmap OJK - Tata Kelola Kecerdasan Artifisial Perbankan Indonesia"
        />, isDark: true
    },

    { component: <Slide5Security />, isDark: false },

    {
        component: <SplitSlide
            label="Langkah Praktis"
            title="Implementasi UU PDP."
            subtitle="Tindakan nyata yang harus diamankan dalam alur kerja sistem AI."
            points={[
                { title: "Identifikasi & Persetujuan (Consent)", desc: "Klasifikasi jenis data yang dikelola model AI dan pastikan ada persetujuan yang eksplisit dari nasabah sebelum data mereka masuk ke dalam siklus analitik AI.", icon: CheckCircle2 },
                { title: "Hak Nasabah & Zero Data Leakage", desc: "Jaga keamanan data via manajemen akses ketat. Nasabah harus memiliki hak final untuk mengakses, memperbaiki, atau menghapus datanya (Right to be Forgotten).", icon: Lock }
            ]}
        />, isDark: false
    },

    {
        component: <SplitSlide
            label="Struktur Organisasi"
            title="Sinergi Komite AI."
            subtitle="Penyelarasan mandat bisnis, risiko keamanan, dan teknologi."
            points={[
                { title: "Mandat Komite AI", desc: "Bank disarankan memiliki tim khusus (atau komite di bawah Pengarah TI) untuk menjamin adopsi AI tetap pada rel rencana strategis perbankan dan panduan standar etika.", icon: Users },
                { title: "Kepatuhan POJK No. 17/2023", desc: "Lembaga komite bertugas memantau kepatuhan bahwa integrasi sistem, vendor AI maupun pengembangan in-house tetap tegak lurus dengan regulasi tata kelola teknologi informasi (PTI) pilar OJK.", icon: Scale }
            ]}
        />, isDark: false
    },

    {
        component: <SplitSlide
            label="Rekomendasi Keamanan"
            title="Mitigasi Risiko Publik."
            subtitle="Praktik fundamental yang secara mutlak perlu diimplementasikan agar tidak terjadi kasus kebocoran seperti institusi lain."
            points={[
                { title: "Lisensi Enterprise (Zero Retention)", desc: "Wajib menggunakan akun/langganan Enterprise (seperti M365 Copilot, Vertex AI) agar secara legal vendor dilarang menyedot data bank Anda untuk melatih model AI publik mereka.", icon: Key },
                { title: "Anonimisasi Sistematis (De-identifikasi)", desc: "Wajib adanya protokol ketat untuk menyembunyikan (masking) identitas seperti NIK, nama lengkap, dan rekening nasabah sebelum operasional masuk ke layer analisis AI.", icon: EyeOff }
            ]}
        />, isDark: false
    },

    {
        component: <SplitSlide
            label="Pengawasan & Cyber Threat"
            title="Keamanan Siber In-the-Loop."
            subtitle="Membangun instrumen pertahanan ganda: dari limitasi otoritas mesin hingga kemampuan deteksi dini."
            points={[
                { title: "Pengawasan Manusia (Human Oversight)", desc: "Pertegas batas otoritas mesin. Karyawan dituntut wajib bisa mengidentifikasi momen yang tepat untuk melakukan validasi, intervensi, maupun koreksi atas hasil kalkulasi algoritma AI.", icon: ShieldCheck },
                { title: "Kenali Ancaman AI Spesifik", desc: "Karyawan wajib dilatih mengenali eskalasi serangan era baru (Prompt Injection atau Training Data Poisoning) serta pemahaman tajam pada prosedur eskalasi insiden jaringan AI.", icon: TriangleAlert }
            ]}
        />, isDark: false
    },

    // ══════════════════════════════════════════════════════════
    // CH 6 — LIVE DEMO: NOTEBOOKLM
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
            label="Spotlight: NotebookLM"
            title="Why NotebookLM is different."
            subtitle="Enterprise-grade knowledge grounding — not general internet search."
            points={[
                { title: "Your data only", desc: "NotebookLM only answers from the documents you upload. It will not hallucinate facts from the web. Every claim is cited.", icon: FileText },
                { title: "Audio Overviews", desc: "Upload a 50-page policy document and get a listenable podcast-style briefing. Perfect for leadership on the go.", icon: Headphones }
            ]}
        />, isDark: false
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
