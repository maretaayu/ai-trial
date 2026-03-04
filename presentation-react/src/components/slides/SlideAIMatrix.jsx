import React from 'react';
import { PenLine, BarChart2, Zap, Search, Palette, Megaphone, Users, TrendingUp, Briefcase, Cpu, Headphones } from 'lucide-react';

const depts = [
    { name: "Marketing", Icon: Megaphone, color: "text-pink-500", bg: "bg-pink-50", border: "border-pink-200" },
    { name: "HR", Icon: Users, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
    { name: "Finance", Icon: TrendingUp, color: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
    { name: "Sales", Icon: Briefcase, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
    { name: "IT / Engineering", Icon: Cpu, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
    { name: "Customer Service", Icon: Headphones, color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200" },
];

const taskCategories = [
    { label: "Generate & Write", Icon: PenLine, header: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { label: "Analyze Data", Icon: BarChart2, header: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Automate Tasks", Icon: Zap, header: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Search & Q&A", Icon: Search, header: "bg-teal-50 text-teal-700 border-teal-200" },
    { label: "Create Visuals", Icon: Palette, header: "bg-pink-50 text-pink-700 border-pink-200" },
];

// cell content: [dept_index][task_index]
const matrix = [
    // Marketing
    ["Social posts, newsletters, ad copy, press releases", "Campaign ROI, competitor trends, audience insights", "Schedule posts, send campaigns, auto-tag leads", "Brand mentions, competitor intel, FAQ answers", "Product videos, social visuals, event banners"],
    // HR
    ["Job descriptions, offer letters, onboarding docs", "CV screening, engagement scores, turnover risk", "New hire workflows, IT provisioning, training setup", "Policy Q&A, benefits questions, SOP lookup", "Training decks, org charts, culture content"],
    // Finance
    ["Financial summaries, board reports, budget memos", "Revenue trends, anomaly detection, forecast models", "Invoice processing, expense approval, reconciliation", "Budget policy lookup, compliance Q&A, audit prep", "Exec dashboards, budget charts, performance slides"],
    // Sales
    ["Proposals, outreach emails, pitch decks", "Pipeline risk, deal scoring, win/loss analysis", "CRM updates, meeting follow-ups, lead nurturing", "Prospect research, pricing Q&A, product info", "Sales decks, product demos, client presentations"],
    // IT / Engineering
    ["Documentation, commit messages, API specs", "Error log analysis, performance metrics, bug trends", "Deploy pipelines, ticket routing, infra monitoring", "Codebase Q&A, runbook lookup, architecture search", "Architecture diagrams, system flow charts"],
    // Customer Service
    ["Reply drafts, apology emails, resolution summaries", "CSAT analysis, ticket volume trends, root cause", "Tier-1 auto-resolution, escalation routing, tagging", "Policy lookup, order status, product Q&A", "Help center visuals, tutorial videos, UI guides"],
];

export const SlideAIMatrix = () => (
    <div className="w-full h-full flex flex-col justify-center px-8 py-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-5">
            <p className="text-[9px] font-black tracking-[0.3em] text-gray-400 uppercase mb-1">AI Capabilities Overview</p>
            <h2 className="text-4xl font-bold tracking-tighter text-gray-900">Where can AI help?</h2>
            <p className="text-gray-400 text-sm mt-1">Every department. Every task type. One unified capability map.</p>
        </div>

        {/* Matrix */}
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {/* Empty top-left cell */}
                        <th className="w-[140px] pb-2 pr-3" />
                        {taskCategories.map((t, i) => (
                            <th key={i} className="pb-2 px-1">
                                <div className={`flex items-center gap-1.5 justify-center border rounded-xl px-3 py-2 ${t.header}`}>
                                    <t.Icon className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="text-[10px] font-black whitespace-nowrap">{t.label}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {depts.map((dept, ri) => (
                        <tr key={ri}>
                            {/* Dept label */}
                            <td className="pr-3 py-1 align-top">
                                <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${dept.bg} ${dept.border}`}>
                                    <dept.Icon className={`w-3.5 h-3.5 flex-shrink-0 ${dept.color}`} />
                                    <span className={`text-[10px] font-black whitespace-nowrap ${dept.color}`}>{dept.name}</span>
                                </div>
                            </td>
                            {/* Task cells */}
                            {matrix[ri].map((cell, ci) => (
                                <td key={ci} className="px-1 py-1 align-top">
                                    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 h-full shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
                                        <p className="text-[10px] text-gray-500 leading-relaxed">{cell}</p>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
