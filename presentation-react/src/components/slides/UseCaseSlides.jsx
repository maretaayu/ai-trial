import React from 'react';
import {
    Megaphone, Users, TrendingUp, Cpu, HeadphonesIcon,
    Briefcase, ArrowRight, Zap, Clock, CheckCircle2,
    Database, Search, Layout, BarChart3, Quote, Target, FileText
} from 'lucide-react';

// ── Shared helpers ───────────────────────────────────────────────────────────

const ToolPill = ({ logo, name }) => {
    const [failed, setFailed] = React.useState(false);
    return (
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2.5 py-1 shadow-sm">
            {(!logo || failed)
                ? <div className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-[8px] font-black flex items-center justify-center flex-shrink-0">{name[0]}</div>
                : <img src={logo} alt={name} className="w-4 h-4 object-contain flex-shrink-0" onError={() => setFailed(true)} />
            }
            <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">{name}</span>
        </div>
    );
};

const UseCaseCard = ({ before, after, color = "bg-gray-50 border-gray-200" }) => (
    <div className="flex items-stretch gap-3">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Before</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{before}</p>
        </div>
        <div className="flex items-center flex-shrink-0">
            <ArrowRight className="w-5 h-5 text-gray-300" />
        </div>
        <div className={`flex-1 border rounded-2xl p-4 ${color}`}>
            <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3.5 h-3.5 text-current opacity-60" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-60">With AI</span>
            </div>
            <p className="text-sm font-medium leading-relaxed">{after}</p>
        </div>
    </div>
);

// ── Base layout ───────────────────────────────────────────────────────────────

const DeptSlide = ({ icon: Icon, iconBg, dept, deptColor, title, subtitle, cases, tools, accentBorder }) => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
                <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[9px] font-black tracking-[0.25em] text-gray-400 uppercase">Department Use Case</p>
                    <h2 className="text-2xl font-bold tracking-tighter text-gray-900 leading-tight">{title}</h2>
                </div>
                <span className={`ml-auto text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full ${deptColor}`}>{dept}</span>
            </div>

            {subtitle && <p className="text-gray-500 text-sm mb-5 max-w-2xl">{subtitle}</p>}

            {/* Before/After Cases */}
            <div className="flex flex-col gap-3 mb-5">
                {cases.map((c, i) => (
                    <UseCaseCard key={i} before={c.before} after={c.after} color={c.color || accentBorder} />
                ))}
            </div>

            {/* Tools */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-1">Tools used:</span>
                {tools.map((t, i) => <ToolPill key={i} logo={t.logo} name={t.name} />)}
            </div>
        </div>
    </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// 1. MARKETING & BRAND
// ══════════════════════════════════════════════════════════════════════════════
export const SlideUseCaseMarketing = () => (
    <DeptSlide
        icon={Megaphone}
        iconBg="bg-pink-100 text-pink-600"
        dept="Marketing & Brand"
        deptColor="bg-pink-100 text-pink-700"
        title="From content bottleneck to content engine."
        subtitle="Marketing teams spend 60–70% of their time on execution. AI shifts that time back to strategy and creativity."
        accentBorder="bg-pink-50 border-pink-200 text-pink-800"
        cases={[
            {
                before: "Social media manager spends 4 hours writing and scheduling a week of posts across LinkedIn, Instagram, and WhatsApp.",
                after: "Content Agent drafts 7 days of on-brand posts in 10 minutes. Manager reviews, edits tone, and schedules in one sitting.",
                color: "bg-pink-50 border-pink-200 text-pink-800"
            },
            {
                before: "Campaign performance report takes 2 days — pulling from Google Ads, Meta, and GA4 manually into Excel.",
                after: "Reporting Agent connects to all platforms, generates a visual 1-page summary every Monday at 7AM automatically.",
                color: "bg-pink-50 border-pink-200 text-pink-800"
            },
            {
                before: "Producing a product video requires hiring an external agency — 2 weeks lead time and Rp 20M budget.",
                after: "HeyGen creates a branded AI presenter video in 30 minutes. ElevenLabs adds professional voiceover in any language.",
                color: "bg-pink-50 border-pink-200 text-pink-800"
            },
        ]}
        tools={[
            { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
            { name: "Midjourney", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png" },
            { name: "HeyGen", logo: "https://app.heygen.com/favicon.ico" },
            { name: "ElevenLabs", logo: "https://elevenlabs.io/favicon.ico" },
            { name: "Canva AI", logo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Canva_Logo.png" },
            { name: "Fireflies.ai", logo: "https://fireflies.ai/favicon.ico" },
        ]}
    />
);

// ══════════════════════════════════════════════════════════════════════════════
// 2. HR / HUMAN CAPITAL
// ══════════════════════════════════════════════════════════════════════════════
export const SlideUseCaseHR = () => (
    <DeptSlide
        icon={Users}
        iconBg="bg-blue-100 text-blue-600"
        dept="HR / Human Capital"
        deptColor="bg-blue-100 text-blue-700"
        title="Faster hiring. Smarter onboarding. Zero paperwork."
        subtitle="HR teams manage the most human-intensive workflows. AI handles the repetitive so humans can focus on culture and people."
        accentBorder="bg-blue-50 border-blue-200 text-blue-800"
        cases={[
            {
                before: "Recruiter screens 200 CVs manually for a single role — takes 3 days and still misses top candidates.",
                after: "AI scans all 200 CVs against job criteria in 10 minutes, ranks candidates, and drafts 10 personalized outreach emails.",
                color: "bg-blue-50 border-blue-200 text-blue-800"
            },
            {
                before: "New employee sends 7 different emails to HR, IT, and Finance just to get set up on their first day.",
                after: "When offer letter is signed, agents auto-trigger: IT creates accounts, Finance sets up payroll, L&D schedules training.",
                color: "bg-blue-50 border-blue-200 text-blue-800"
            },
            {
                before: "HR policy Q&A takes hours — team digs through 15 different PDF documents to answer one leave policy question.",
                after: "NotebookLM is loaded with all HR policies. Employees self-serve: 'Do I get leave for moving house?' — answered in 5 seconds with citation.",
                color: "bg-blue-50 border-blue-200 text-blue-800"
            },
        ]}
        tools={[
            { name: "NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
            { name: "Claude 3.5", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Anthropic_logo.svg" },
            { name: "Copilot M365", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png" },
            { name: "Otter.ai", logo: "https://otter.ai/favicon.ico" },
            { name: "Loom AI", logo: "https://cdn.loom.com/assets/img/favicons/loom/favicon-32x32.png" },
        ]}
    />
);

// ══════════════════════════════════════════════════════════════════════════════
// 3. FINANCE & ACCOUNTING
// ══════════════════════════════════════════════════════════════════════════════
export const SlideUseCaseFinance = () => (
    <DeptSlide
        icon={TrendingUp}
        iconBg="bg-green-100 text-green-600"
        dept="Finance & Accounting"
        deptColor="bg-green-100 text-green-700"
        title="From spreadsheet hell to intelligent forecasting."
        subtitle="Finance teams are drowning in reconciliation, reporting, and manual analysis. AI eliminates the grunt work and surfaces the insights."
        accentBorder="bg-green-50 border-green-200 text-green-800"
        cases={[
            {
                before: "Monthly financial report takes the team 3 days — pulling figures from 6 systems, formatting in Excel, building charts.",
                after: "Copilot in Excel aggregates all sources, builds chart summaries, and highlights variances over 10% automatically.",
                color: "bg-green-50 border-green-200 text-green-800"
            },
            {
                before: "Analysts spend days answering 'what's driving the Q3 revenue dip?' — manually slicing data across regions and SKUs.",
                after: "Julius AI: 'Show me the top 5 revenue drop drivers in Q3 vs Q2 by region, flag anything above 15%' — answered in 30 seconds.",
                color: "bg-green-50 border-green-200 text-green-800"
            },
            {
                before: "Vendor invoice processing is manual: receive PDF, enter data, match PO, approve — takes 3 days per batch.",
                after: "AI agent reads invoices, matches to PO database, flags discrepancies, routes only exceptions to the human approver.",
                color: "bg-green-50 border-green-200 text-green-800"
            },
        ]}
        tools={[
            { name: "Copilot Excel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/240px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png" },
            { name: "Julius AI", logo: "https://julius.ai/favicon.ico" },
            { name: "Gemini Looker", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png" },
            { name: "NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
            { name: "GPT-4o", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
        ]}
    />
);

// ══════════════════════════════════════════════════════════════════════════════
// 4. SALES & BUSINESS DEVELOPMENT
// ══════════════════════════════════════════════════════════════════════════════
export const SlideUseCaseSales = () => (
    <DeptSlide
        icon={Briefcase}
        iconBg="bg-amber-100 text-amber-600"
        dept="Sales & Business Development"
        deptColor="bg-amber-100 text-amber-700"
        title="Close faster. Prospect smarter. Pitch better."
        subtitle="Sales cycles are long because research, proposal writing, and follow-ups are manual. AI compresses every stage."
        accentBorder="bg-amber-50 border-amber-200 text-amber-800"
        cases={[
            {
                before: "Sales rep spends 2 hours researching a prospect before a call — LinkedIn, website, news, financials.",
                after: "AI agent compiles a 1-page prospect brief in 3 minutes: company overview, recent news, decision-makers, pain points.",
                color: "bg-amber-50 border-amber-200 text-amber-800"
            },
            {
                before: "Proposal writing takes 2 days — customizing the deck, pricing page, and cover letter from scratch for each client.",
                after: "Feed deal info to AI: it generates a full customized proposal draft with executive summary, ROI model, and branded layout.",
                color: "bg-amber-50 border-amber-200 text-amber-800"
            },
            {
                before: "After a 60-minute client discovery call, the team takes another hour writing the meeting summary and CRM notes.",
                after: "Fireflies joins the call, auto-transcribes, extracts action items, and pushes a structured summary directly into Salesforce.",
                color: "bg-amber-50 border-amber-200 text-amber-800"
            },
        ]}
        tools={[
            { name: "GPT-4o", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
            { name: "Fireflies.ai", logo: "https://fireflies.ai/favicon.ico" },
            { name: "Perplexity", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Perplexity_AI_logo.svg" },
            { name: "Gamma.app", logo: "https://gamma.app/favicon.ico" },
            { name: "Copilot M365", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png" },
        ]}
    />
);

// ══════════════════════════════════════════════════════════════════════════════
// 5. IT / ENGINEERING
// ══════════════════════════════════════════════════════════════════════════════
export const SlideUseCaseIT = () => (
    <DeptSlide
        icon={Cpu}
        iconBg="bg-purple-100 text-purple-600"
        dept="IT & Engineering"
        deptColor="bg-purple-100 text-purple-700"
        title="Ship faster. Debug smarter. Document automatically."
        subtitle="Engineering teams lose 30–40% of their time on non-coding tasks. AI reclaims that time for actual building."
        accentBorder="bg-purple-50 border-purple-200 text-purple-800"
        cases={[
            {
                before: "Junior developer spends 3 hours debugging a legacy codebase with no documentation — reading code line by line.",
                after: "Cursor AI reads the entire codebase, explains the bug root cause, and suggests a fix with full context in 5 minutes.",
                color: "bg-purple-50 border-purple-200 text-purple-800"
            },
            {
                before: "Building a new internal HR portal from scratch takes 3 weeks of backend + frontend development time.",
                after: "Lovable generates a fully functional React portal from a plain-English description in 30 minutes. IT customizes from there.",
                color: "bg-purple-50 border-purple-200 text-purple-800"
            },
            {
                before: "Writing technical documentation and API docs is always 'pending' — nobody has time and it never gets done.",
                after: "Antigravity reads the codebase and auto-generates full technical documentation, README files, and inline comments.",
                color: "bg-purple-50 border-purple-200 text-purple-800"
            },
        ]}
        tools={[
            { name: "Cursor", logo: "https://www.cursor.com/favicon.ico" },
            { name: "Antigravity", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
            { name: "GitHub Copilot", logo: "https://github.githubassets.com/favicons/favicon.svg" },
            { name: "Lovable", logo: "https://framerusercontent.com/images/GwnBzFEBuniRE9RD0DaXtGBE.png" },
            { name: "DeepSeek R1", logo: "https://www.deepseek.com/favicon.ico" },
        ]}
    />
);

// ══════════════════════════════════════════════════════════════════════════════
// 6. CUSTOMER SERVICE
// ══════════════════════════════════════════════════════════════════════════════
export const SlideUseCaseCS = () => (
    <DeptSlide
        icon={HeadphonesIcon}
        iconBg="bg-teal-100 text-teal-600"
        dept="Customer Service"
        deptColor="bg-teal-100 text-teal-700"
        title="From reactive tickets to proactive resolution."
        subtitle="Customer service teams are overwhelmed by volume. AI reduces handle time by 60% and resolves Tier-1 issues without human escalation."
        accentBorder="bg-teal-50 border-teal-200 text-teal-800"
        cases={[
            {
                before: "Agent spends 10–15 minutes searching internal wikis to answer 'What's the refund policy for orders over 30 days?'",
                after: "AI agent instantly reads all policy docs and replies to the customer with the exact policy + the correct form link in seconds.",
                color: "bg-teal-50 border-teal-200 text-teal-800"
            },
            {
                before: "After every customer call, agent manually writes call summary, tags the issue type, and updates the CRM — 15 min per call.",
                after: "Grain records and transcribes the call, auto-tags issue type, extracts sentiment, and logs the summary to CRM automatically.",
                color: "bg-teal-50 border-teal-200 text-teal-800"
            },
            {
                before: "Seasonal spikes create a 3-day ticket backlog that burns out the team and drops CSAT scores.",
                after: "AI agent resolves all Tier-1 issues (FAQs, status checks, simple refunds) instantly. Humans only handle complex escalations.",
                color: "bg-teal-50 border-teal-200 text-teal-800"
            },
        ]}
        tools={[
            { name: "GPT-4o", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
            { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png" },
            { name: "Grain", logo: "https://grain.com/favicon.ico" },
            { name: "Fireflies.ai", logo: "https://fireflies.ai/favicon.ico" },
            { name: "ElevenLabs", logo: "https://elevenlabs.io/favicon.ico" },
            { name: "NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
        ]}
    />
);
// ══════════════════════════════════════════════════════════════════════════════
// NEW PREMIUM MARKETING SLIDES
// ══════════════════════════════════════════════════════════════════════════════

export const Slide10xMarketing = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-[60%]">
                <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">• USE CASE: MARKETING</p>
                <h2 className="text-6xl font-black tracking-tighter text-gray-900 mb-8 leading-[1]">
                    The 10x Marketing Manager.
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                    A marketing manager’s job used to be a constant scramble of drafting posts and pulling data. In 2026, they orchestrate a system of specialized AI agents.
                </p>
            </div>
            <div className="w-full md:w-[40%] flex flex-col gap-8">
                <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Target className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-2">Shift to orchestration</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            With agents focusing on specific tasks, the marketing manager can multiply their output by focusing on high-impact strategy and brand storytelling.
                        </p>
                    </div>
                </div>
                <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-2">Democratization of AI</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Tools like Gemini Enterprise allow knowledge workers to build their own agents, instead of relying solely on IT.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const SlideSpecializedAgents = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-[55%]">
                    <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">• ORCHESTRATION</p>
                    <h2 className="text-5xl font-black tracking-tighter text-gray-900 mb-6 leading-[1.1]">
                        The specialized agent system.
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed mb-10">
                        Their new role involves orchestrating five specialized agents:
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-gray-100 rounded-lg"><Database className="w-4 h-4 text-gray-600" /></span>
                                <h3 className="font-bold text-gray-900 text-base">Data agent</h3>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed pl-11">Sifts through millions of data points to find actionable patterns in market trends.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-gray-100 rounded-lg"><Search className="w-4 h-4 text-gray-600" /></span>
                                <h3 className="font-bold text-gray-900 text-base">Analyst agent</h3>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed pl-11">Monitors market trends and competitor announcements 24/7, delivering a 1-page daily report.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-gray-100 rounded-lg"><FileText className="w-4 h-4 text-gray-600" /></span>
                                <h3 className="font-bold text-gray-900 text-base">Content agent</h3>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed pl-11">Drafts social media copy and blog articles in the brand voice for manager review.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-gray-100 rounded-lg"><Layout className="w-4 h-4 text-gray-600" /></span>
                                <h3 className="font-bold text-gray-900 text-base">Creative agent</h3>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed pl-11">Generates images and videos based on strategic guidelines to accompany posts.</p>
                        </div>
                        <div className="space-y-2 col-span-2">
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-gray-100 rounded-lg"><BarChart3 className="w-4 h-4 text-gray-600" /></span>
                                <h3 className="font-bold text-gray-900 text-base">Reporting agent</h3>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed pl-11">Pulls and analyzes weekly campaign data, delivering a summary of key insights every Friday.</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[45%] relative">
                    <img
                        src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d5?auto=format&fit=crop&w=800&q=80"
                        alt="Specialized Agents"
                        className="rounded-[40px] shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl max-w-[280px]">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] text-amber-500 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            DATA TIP
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed font-medium mb-4">
                            Struktur multijenjang ini bertindak sebagai alat pelipatgandaan ("intelligence multiplier").
                        </p>
                        <button className="w-full py-2 bg-gray-800 hover:bg-black text-[10px] font-bold text-white rounded-full transition-colors">
                            Pelajari Selengkapnya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const SlideHiroyukiQuote = () => (
    <div className="w-full h-full flex items-center justify-center p-12">
        <div className="max-w-4xl relative">
            <Quote className="absolute -top-16 -left-20 w-32 h-32 text-gray-100 -z-10" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.2] mb-12">
                "As roles shift to agent management, enabling employees is vital. Democratization via tools like Gemini Enterprise allows knowledge workers to build agents, improving productivity and elevating partnerships to focus on complex, long-term initiatives."
            </h2>
            <div className="flex flex-col">
                <h3 className="text-3xl font-black tracking-tighter text-gray-900">Hiroyuki Koike</h3>
                <p className="text-sm font-bold text-gray-400 tracking-wide uppercase">
                    Managing Director, Customer Engineering, Japan, Google Cloud
                </p>
            </div>
        </div>
    </div>
);
