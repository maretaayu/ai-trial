import React from 'react';
import { Megaphone, Users, TrendingUp, Cpu, Headphones, Crown } from 'lucide-react';

// ─── Logo with graceful fallback to colored initial ───────────────────────
const ToolLogo = ({ name, logo, color = 'bg-gray-100', textColor = 'text-gray-600', size = 'md' }) => {
    const [failed, setFailed] = React.useState(false);
    const initial = name?.[0]?.toUpperCase() || '?';
    const sz = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';
    if (!logo || failed) {
        return (
            <div className={`${sz} rounded-xl ${color} ${textColor} flex items-center justify-center font-black flex-shrink-0`}>
                {initial}
            </div>
        );
    }
    return (
        <img src={logo} alt={name}
            className={`${sz} object-contain rounded-xl flex-shrink-0 bg-white`}
            onError={() => setFailed(true)} />
    );
};

// ─── Dept icon pill ───────────────────────────────────────────────────────
const DeptIcon = ({ Icon, color }) => (
    <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4" />
    </div>
);

// ─── LLM Comparison Slide ─────────────────────────────────────────────────
export const SlideLLMComparison = () => {
    const models = [
        {
            name: "GPT-5.2 Omni", maker: "OpenAI",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png",
            color: "bg-green-50 border-green-100", lf: "bg-green-100 text-green-700",
            badge: "🏆 Best Reasoning",
            best: "Deep reasoning & real-time multimodality. The gold standard for complex logic, coding, and abstract problem solving."
        },
        {
            name: "Gemini 3.1 Pro", maker: "Google DeepMind",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png",
            color: "bg-blue-50 border-blue-100", lf: "bg-blue-100 text-blue-700",
            badge: "📄 Best for Docs",
            best: "1–2M token context window. Deep native integration with Google Workspace — ideal for long document research and data analysis."
        },
        {
            name: "Claude 4.5 Opus", maker: "Anthropic",
            logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Anthropic_logo.svg",
            color: "bg-amber-50 border-amber-100", lf: "bg-amber-100 text-amber-700",
            badge: "✍️ Best Writing",
            best: "Most natural language and tone. High safety standards + \"Dev Team\" multi-agent mode. Favorite for HR, legal, and creative workflows."
        },
        {
            name: "Llama 4 Maverick", maker: "Meta · Open Source",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/798px-Meta_Platforms_Inc._logo.svg.png",
            color: "bg-purple-50 border-purple-100", lf: "bg-purple-100 text-purple-700",
            badge: "🔒 Best Privacy",
            best: "400B parameter model. Runs on-premise with zero data leaving the company. New standard for regulated industries requiring data sovereignty."
        },
        {
            name: "DeepSeek V3.2", maker: "DeepSeek",
            logo: "https://www.deepseek.com/favicon.ico",
            color: "bg-rose-50 border-rose-100", lf: "bg-rose-100 text-rose-700",
            badge: "💰 Best Cost-Efficiency",
            best: "MoE (Mixture of Experts) architecture — beats GPT-4o on math and coding benchmarks at a fraction of the cost. Strong for technical teams."
        },
        {
            name: "Qwen 3.5", maker: "Alibaba",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Alibaba_Group_Holding_Limited_logo.svg/320px-Alibaba_Group_Holding_Limited_logo.svg.png",
            color: "bg-orange-50 border-orange-100", lf: "bg-orange-100 text-orange-700",
            badge: "👁️ Best Instruction Following",
            best: "Holds IFEval accuracy records for precise instruction following and outstanding visual understanding. Best for structured, multi-step enterprise tasks."
        },
    ];


    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-8">
                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Understanding the Models</p>
                <h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-6">Which LLM for what?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {models.map((m, i) => (
                        <div key={i} className={`rounded-3xl border p-5 ${m.color} flex flex-col gap-2.5`}>
                            {m.badge && (
                                <span className="text-[9px] font-black tracking-wider bg-white/70 border border-white rounded-full px-2.5 py-1 w-max text-gray-600">{m.badge}</span>
                            )}
                            <div className="flex items-center gap-3">
                                <ToolLogo name={m.name} logo={m.logo} color={m.lf.split(' ')[0]} textColor={m.lf.split(' ')[1]} />
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 tracking-tight leading-tight">{m.name}</h3>
                                    <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">{m.maker}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs leading-relaxed">{m.best}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── LLM Landscape: Proprietary vs Open Source ────────────────────────────
export const SlideLLMLandscape = () => {
    const all = [
        { type: "Proprietary", name: "GPT-5.2 Omni", maker: "OpenAI", strength: "Best Reasoning", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png", lf: "bg-green-100 text-green-700", desc: "Deep reasoning & real-time multimodality. Gold standard for coding and complex logic." },
        { type: "Proprietary", name: "Gemini 3.1 Pro", maker: "Google DeepMind", strength: "1–2M Token Context", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png", lf: "bg-blue-100 text-blue-700", desc: "Native Google Workspace integration. Best for long document research & data analysis." },
        { type: "Proprietary", name: "Claude 4.5 Opus", maker: "Anthropic", strength: "Most Natural Language", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Anthropic_logo.svg", lf: "bg-amber-100 text-amber-700", desc: "Highest safety standards + Dev Team multi-agent mode. Top for HR, legal & creative." },
        { type: "Open Source", name: "Llama 4 Maverick", maker: "Meta (400B)", strength: "Best for On-Premise", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/798px-Meta_Platforms_Inc._logo.svg.png", lf: "bg-purple-100 text-purple-700", desc: "Zero data leaves the company. New standard for regulated, privacy-first industries." },
        { type: "Open Source", name: "DeepSeek V3.2", maker: "DeepSeek · MoE", strength: "Beats GPT-4o on Math", logo: "https://www.deepseek.com/favicon.ico", lf: "bg-rose-100 text-rose-700", desc: "Cost-efficient MoE architecture. Outperforms on coding and math benchmarks." },
        { type: "Open Source", name: "Qwen 3.5", maker: "Alibaba", strength: "Record IFEval Accuracy", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Alibaba_Group_Holding_Limited_logo.svg/320px-Alibaba_Group_Holding_Limited_logo.svg.png", lf: "bg-orange-100 text-orange-700", desc: "Top instruction-following precision and outstanding visual understanding." },
        { type: "Open Source", name: "Mistral 3", maker: "Mistral AI", strength: "Lightest & Fastest", logo: "https://mistral.ai/favicon.ico", lf: "bg-gray-100 text-gray-600", desc: "Preferred for lightweight self-hosted deployment. Enterprise privacy without the cloud." },
    ];

    const proprietary = all.filter(m => m.type === "Proprietary");
    const openSource = all.filter(m => m.type === "Open Source");

    const TableRow = ({ m, shade }) => (
        <tr className={shade ? "bg-gray-50/60" : "bg-white"}>
            <td className="py-3 pl-4 pr-3 w-9">
                <ToolLogo name={m.name} logo={m.logo} color={m.lf.split(' ')[0]} textColor={m.lf.split(' ')[1]} size="sm" />
            </td>
            <td className="py-3 pr-4 w-40">
                <p className="font-bold text-sm text-gray-900 leading-tight">{m.name}</p>
                <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{m.maker}</p>
            </td>
            <td className="py-3 pr-4 w-44">
                <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full ${m.lf}`}>{m.strength}</span>
            </td>
            <td className="py-3 pr-4 text-gray-500 text-xs leading-relaxed">{m.desc}</td>
        </tr>
    );

    const SectionDivider = ({ label, sublabel, isOpen }) => (
        <tr>
            <td colSpan={4} className="pt-5 pb-2 pl-4">
                <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-indigo-500" : "bg-gray-800"}`} />
                    <span className="text-xs font-black text-gray-900">{label}</span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">{sublabel}</span>
                    <div className="h-px flex-1 bg-gray-100" />
                </div>
            </td>
        </tr>
    );

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto px-8">
                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">AI Models Landscape · 2026</p>
                <h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-4">The LLM universe today.</h2>

                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    {/* Column headers */}
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-900 text-gray-400">
                                <th className="py-2.5 pl-4 pr-3 w-9" />
                                <th className="py-2.5 pr-4 text-left text-[9px] font-black tracking-widest uppercase w-40">Model</th>
                                <th className="py-2.5 pr-4 text-left text-[9px] font-black tracking-widest uppercase w-44">Best For</th>
                                <th className="py-2.5 pr-4 text-left text-[9px] font-black tracking-widest uppercase">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <SectionDivider label="Proprietary" sublabel="Closed · Subscription-based" isOpen={false} />
                            {proprietary.map((m, i) => <TableRow key={i} m={m} shade={i % 2 === 1} />)}
                            <SectionDivider label="Open Source" sublabel="Open-weight · Free to self-host" isOpen />
                            {openSource.map((m, i) => <TableRow key={i} m={m} shade={i % 2 === 1} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// ─── LLM Trends 2026 ──────────────────────────────────────────────────────
export const SlideLLMTrends2026 = () => {
    const trends = [
        {
            n: "01", title: "Agentic AI",
            tag: "Act, don't just answer",
            color: "bg-indigo-50 border-indigo-200",
            tagColor: "bg-indigo-100 text-indigo-700",
            desc: "Modern LLMs can now use tools autonomously — browsing the web, running code, sending emails — without needing step-by-step instructions. They complete tasks, not just answer questions."
        },
        {
            n: "02", title: "Thinking Mode",
            tag: "Inference Scaling",
            color: "bg-blue-50 border-blue-200",
            tagColor: "bg-blue-100 text-blue-700",
            desc: "Like OpenAI's o-series, most flagship models now have a 'thinking' mode — the AI pauses to verify its own logic before answering. Slower, but dramatically more accurate for complex reasoning."
        },
        {
            n: "03", title: "Sovereign AI",
            tag: "LLM Lokal & Indonesia",
            color: "bg-purple-50 border-purple-200",
            tagColor: "bg-purple-100 text-purple-700",
            desc: "Models trained on local context and regional languages. Indonesia's 'Sahabat-AI' understands Bahasa, regional dialects, and cultural nuance — giving more accurate, contextually appropriate responses."
        },
        {
            n: "04", title: "On-Device AI",
            tag: "No Internet Required",
            color: "bg-teal-50 border-teal-200",
            tagColor: "bg-teal-100 text-teal-700",
            desc: "Chips like Apple M5 and Snapdragon X Elite can now run large models entirely on-device. No data ever touches a cloud server — your AI works fully offline, protecting sensitive information completely."
        },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-8">
                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">LLM Landscape · 2026</p>
                <h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-6">AI is no longer just about <span className="text-gray-400 font-light">"predicting the next word."</span></h2>
                <div className="grid grid-cols-2 gap-4">
                    {trends.map((t, i) => (
                        <div key={i} className={`rounded-3xl border p-6 ${t.color} flex flex-col gap-3 h-full`}>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-black text-gray-200">{t.n}</span>
                                <div>
                                    <h3 className="font-black text-gray-900 text-lg tracking-tight leading-tight">{t.title}</h3>
                                    <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${t.tagColor}`}>{t.tag}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Vibe Coding / Web Builder Slide ─────────────────────────────────────
export const SlideVibeCoding = () => {
    const useCases = [
        { label: "Marketing", prompt: "Build a registration landing page for our AI training event with a form, speaker section, and countdown timer.", color: "border-pink-200 bg-pink-50 text-pink-800" },
        { label: "HR", prompt: "Create a digital onboarding checklist portal where new employees can track and complete their day-1 tasks.", color: "border-blue-200 bg-blue-50 text-blue-800" },
        { label: "Sales", prompt: "Build a client proposal generator — paste deal info and it outputs a branded PDF proposal automatically.", color: "border-indigo-200 bg-indigo-50 text-indigo-800" },
        { label: "Finance", prompt: "Create an internal expense dashboard that pulls from Google Sheets and shows monthly trends by department.", color: "border-green-200 bg-green-50 text-green-800" },
        { label: "Operations", prompt: "Build a simple vendor management portal with a searchable table, status badges, and contact info.", color: "border-amber-200 bg-amber-50 text-amber-800" },
        { label: "IT", prompt: "Generate a ticket tracking app: users submit issues, team triages, and status updates notify via email.", color: "border-purple-200 bg-purple-50 text-purple-800" },
        { label: "Events", prompt: "Create an RSVP & seat management tool for the year-end company town hall with QR code check-in.", color: "border-rose-200 bg-rose-50 text-rose-800" },
        { label: "Customer Service", prompt: "Build a internal knowledge base search tool that queries our SOP documents and returns highlighted answers.", color: "border-teal-200 bg-teal-50 text-teal-800" },
    ];

    const tools = [
        { name: "Lovable", tag: "Vibe Coding", logo: "https://framerusercontent.com/images/GwnBzFEBuniRE9RD0DaXtGBE.png", fb: "bg-pink-100 text-pink-700" },
        { name: "Bolt.new", tag: "Full-Stack AI", logo: "https://bolt.new/favicon.svg", fb: "bg-violet-100 text-violet-700" },
        { name: "v0 by Vercel", tag: "UI Generator", logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png", fb: "bg-gray-100 text-gray-700" },
        { name: "Antigravity", tag: "AI Coding Agent", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg", fb: "bg-blue-100 text-blue-700" },
        { name: "GitHub Copilot", tag: "Code Completion", logo: "https://github.githubassets.com/favicons/favicon.svg", fb: "bg-gray-100 text-gray-700" },
        { name: "Cursor", tag: "AI Code Editor", logo: "https://www.cursor.com/favicon.ico", fb: "bg-indigo-100 text-indigo-700" },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-8 flex gap-10 items-start pt-6">
                {/* Left: Use Cases */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-2">Use Case · Product Building</p>
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900 mb-1 leading-tight">What can you build?</h2>
                    <p className="text-gray-400 text-sm mb-5">Just describe it in plain English — no code required.</p>
                    <div className="grid grid-cols-2 gap-2.5">
                        {useCases.map((u, i) => (
                            <div key={i} className={`rounded-2xl border px-4 py-3 ${u.color}`}>
                                <span className="text-[9px] font-black tracking-widest uppercase opacity-60 block mb-1">{u.label}</span>
                                <p className="text-xs leading-relaxed font-medium opacity-90 italic">"{u.prompt}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Tools */}
                <div className="w-[220px] flex-shrink-0 flex flex-col gap-3 pt-8">
                    <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">Powered by</p>
                    {tools.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm">
                            <ToolLogo name={t.name} logo={t.logo} color={t.fb.split(' ')[0]} textColor={t.fb.split(' ')[1]} size="sm" />
                            <div className="min-w-0">
                                <p className="font-bold text-gray-900 text-xs leading-tight truncate">{t.name}</p>
                                <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">{t.tag}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Data Analysis Tools Slide ────────────────────────────────────────────
export const SlideDataAnalysis = () => {
    const tools = [
        { name: "Julius AI", tag: "Data Analysis", logo: "https://julius.ai/favicon.ico", fb: "bg-blue-100 text-blue-700", color: "bg-blue-50 border-blue-100", desc: "Upload any CSV or Excel file and ask questions in natural language. Returns charts, summaries, and anomaly detection instantly." },
        { name: "ChatGPT Data Analysis", tag: "Code Interpreter", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png", fb: "bg-green-100 text-green-700", color: "bg-green-50 border-green-100", desc: "Upload your dataset and GPT-4 writes and runs Python to analyze it, visualize trends, and return a plain-language summary." },
        { name: "Google Looker + Gemini", tag: "BI + AI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png", fb: "bg-yellow-100 text-yellow-700", color: "bg-yellow-50 border-yellow-100", desc: "Enterprise BI platform with built-in Gemini. Ask your dashboards questions and get data-grounded answers in natural language." },
        { name: "Copilot in Excel", tag: "Spreadsheet AI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/240px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png", fb: "bg-green-100 text-green-700", color: "bg-gray-50 border-gray-200", desc: "Highlight a table and ask Copilot to analyze trends, build pivot charts, or explain outliers — no formulas required." },
    ];
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-8 flex gap-12 items-center">
                <div className="w-[42%] flex-shrink-0">
                    <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Use Case · Data Intelligence</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-6 leading-[1.05]">Ask your data in plain English.</h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-6">Business teams can query millions of rows, generate charts, and surface insights — no SQL or Python required.</p>
                    <div className="bg-gray-900 rounded-2xl p-5">
                        <p className="text-gray-500 text-xs mb-2 font-mono">// Natural language query</p>
                        <p className="text-green-400 text-sm font-mono leading-relaxed">"Show me the top 5 products by revenue drop in Q3 vs Q2, broken down by region, and flag anything above 15% decline."</p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    {tools.map((t, i) => (
                        <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border ${t.color}`}>
                            <ToolLogo name={t.name} logo={t.logo} color={t.fb.split(' ')[0]} textColor={t.fb.split(' ')[1]} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900 text-sm">{t.name}</h3>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-gray-200">{t.tag}</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Meeting & Voice AI Slide ─────────────────────────────────────────────
export const SlideMeetingAI = () => {
    const tools = [
        { name: "Otter.ai", tag: "Transcription", logo: "https://otter.ai/favicon.ico", fb: "bg-blue-100 text-blue-700", color: "bg-blue-50 border-blue-100", desc: "Real-time transcription with speaker ID and automated action item extraction from any meeting." },
        { name: "Fireflies.ai", tag: "Meeting AI", logo: "https://fireflies.ai/favicon.ico", fb: "bg-purple-100 text-purple-700", color: "bg-purple-50 border-purple-100", desc: "Joins Zoom/Teams/Meet calls, records, transcribes, summarizes, and syncs notes to your CRM automatically." },
        { name: "Loom AI", tag: "Video Async", logo: "https://cdn.loom.com/assets/img/favicons/loom/favicon-32x32.png", fb: "bg-orange-100 text-orange-700", color: "bg-orange-50 border-orange-100", desc: "Record your screen or camera. AI generates chapters, summary, and key takeaways automatically." },
        { name: "ElevenLabs", tag: "Voice AI", logo: "https://elevenlabs.io/favicon.ico", fb: "bg-green-100 text-green-700", color: "bg-green-50 border-green-100", desc: "Generate lifelike voiceovers in any language. Used for e-learning narration, training content, and accessible media." },
        { name: "HeyGen", tag: "Avatar Video", logo: "https://app.heygen.com/favicon.ico", fb: "bg-pink-100 text-pink-700", color: "bg-pink-50 border-pink-100", desc: "Create AI video presentations with a realistic avatar. Ideal for training, product demos, and onboarding at scale." },
        { name: "Sora (OpenAI)", tag: "Text-to-Video", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png", fb: "bg-rose-100 text-rose-700", color: "bg-rose-50 border-rose-100", desc: "Generate cinematic video clips from text prompts. Ideal for marketing, brand stories, and product visualizations." },
        { name: "Descript", tag: "Audio/Video Edit", logo: "https://www.descript.com/favicon.ico", fb: "bg-amber-100 text-amber-700", color: "bg-amber-50 border-amber-100", desc: "Edit video like a text document. Delete a sentence in the transcript and it disappears from the video." },
        { name: "Grain", tag: "Meeting Intel", logo: "https://grain.com/favicon.ico", fb: "bg-teal-100 text-teal-700", color: "bg-teal-50 border-teal-100", desc: "Highlights key moments from customer and internal calls for CRM logging, coaching, and product feedback." },
    ];
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-8">
                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">Use Case · Meetings & Communication</p>
                <h2 className="text-5xl font-bold tracking-tighter text-gray-900 mb-3">Your meetings, automated.</h2>
                <p className="text-lg text-gray-500 font-medium mb-8">AI that joins, records, summarizes, and sends action items — before you close your laptop.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tools.map((t, i) => (
                        <div key={i} className={`rounded-3xl border p-5 ${t.color} flex flex-col gap-3`}>
                            <div className="flex items-center gap-3">
                                <ToolLogo name={t.name} logo={t.logo} color={t.fb.split(' ')[0]} textColor={t.fb.split(' ')[1]} />
                                <div>
                                    <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase block">{t.tag}</span>
                                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{t.name}</h3>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Division Tools Mapping Slide ─────────────────────────────────────────
export const SlideDivisionMapping = () => {
    const divisions = [
        {
            dept: "Marketing & Brand", Icon: Megaphone, iconColor: "bg-pink-100 text-pink-600",
            color: "border-pink-200 bg-pink-50", badge: "bg-pink-100 text-pink-700",
            tools: [
                { name: "Midjourney", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png" },
                { name: "Canva AI", logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Canva_Logo.png" },
                { name: "GPT-4o", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
                { name: "HeyGen", logo: "https://app.heygen.com/favicon.ico" },
                { name: "Fireflies", logo: "https://fireflies.ai/favicon.ico" },
            ]
        },
        {
            dept: "HR / Human Capital", Icon: Users, iconColor: "bg-blue-100 text-blue-600",
            color: "border-blue-200 bg-blue-50", badge: "bg-blue-100 text-blue-700",
            tools: [
                { name: "NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
                { name: "Claude 3.5", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Anthropic_logo.svg" },
                { name: "Copilot M365", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png" },
                { name: "Otter.ai", logo: "https://otter.ai/favicon.ico" },
                { name: "Loom AI", logo: "https://cdn.loom.com/assets/img/favicons/loom/favicon-32x32.png" },
            ]
        },
        {
            dept: "Finance & Accounting", Icon: TrendingUp, iconColor: "bg-green-100 text-green-600",
            color: "border-green-200 bg-green-50", badge: "bg-green-100 text-green-700",
            tools: [
                { name: "Copilot Excel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/240px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png" },
                { name: "Julius AI", logo: "https://julius.ai/favicon.ico" },
                { name: "Gemini Looker", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png" },
                { name: "NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
            ]
        },
        {
            dept: "IT / Engineering", Icon: Cpu, iconColor: "bg-purple-100 text-purple-600",
            color: "border-purple-200 bg-purple-50", badge: "bg-purple-100 text-purple-700",
            tools: [
                { name: "Antigravity", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
                { name: "GitHub Copilot", logo: "https://github.githubassets.com/favicons/favicon.svg" },
                { name: "Cursor", logo: "https://www.cursor.com/favicon.ico" },
                { name: "Lovable", logo: "https://framerusercontent.com/images/GwnBzFEBuniRE9RD0DaXtGBE.png" },
                { name: "DeepSeek R1", logo: "https://www.deepseek.com/favicon.ico" },
            ]
        },
        {
            dept: "Customer Service", Icon: Headphones, iconColor: "bg-amber-100 text-amber-600",
            color: "border-amber-200 bg-amber-50", badge: "bg-amber-100 text-amber-700",
            tools: [
                { name: "GPT-4o", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
                { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png" },
                { name: "Fireflies", logo: "https://fireflies.ai/favicon.ico" },
                { name: "ElevenLabs", logo: "https://elevenlabs.io/favicon.ico" },
                { name: "Grain", logo: "https://grain.com/favicon.ico" },
            ]
        },
        {
            dept: "Leadership / C-Suite", Icon: Crown, iconColor: "bg-gray-100 text-gray-600",
            color: "border-gray-200 bg-gray-50", badge: "bg-gray-100 text-gray-700",
            tools: [
                { name: "NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
                { name: "Perplexity", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Perplexity_AI_logo.svg" },
                { name: "Copilot M365", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png" },
                { name: "Loom AI", logo: "https://cdn.loom.com/assets/img/favicons/loom/favicon-32x32.png" },
                { name: "Sora", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
            ]
        },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-8">
                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">Tools by Division</p>
                <h2 className="text-5xl font-bold tracking-tighter text-gray-900 mb-8">Which dept uses what?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {divisions.map((div, i) => (
                        <div key={i} className={`rounded-3xl border ${div.color} p-5`}>
                            <div className="flex items-center gap-3 mb-4">
                                <DeptIcon Icon={div.Icon} color={div.iconColor} />
                                <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${div.badge}`}>{div.dept}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {div.tools.map((tool, j) => (
                                    <div key={j} className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 border border-white/80 shadow-sm">
                                        <ToolLogo name={tool.name} logo={tool.logo} color="bg-gray-100" textColor="text-gray-600" size="sm" />
                                        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{tool.name}</span>
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
