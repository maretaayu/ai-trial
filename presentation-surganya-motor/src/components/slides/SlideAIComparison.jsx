import React from 'react';

const cols = [
    {
        label: "Robotic Process Automation",
        short: "RPA",
        color: "bg-slate-600",
        headerText: "text-white",
        rowBg: "bg-slate-50",
        functions: "Automation of workflow & repetitive tasks. Does not generate new output.",
        core: "Emulates human interaction with the system. Does not create new interaction methods.",
        learning: "Based on imitating rules (copying). No learning.",
        useCase: "Task automation, data entry, process automation.",
    },
    {
        label: "Traditional AI",
        short: "Traditional",
        color: "bg-blue-600",
        headerText: "text-white",
        rowBg: "bg-blue-50",
        functions: "Pattern recognition, regression, analysis/prediction, classification.",
        core: "Analysis and prediction based on existing data/models. Almost no real-time learning.",
        learning: "Single algorithm for machine learning. More structured and controlled.",
        useCase: "Supporting human decision-making, risk management, customer segmentation, prediction.",
    },
    {
        label: "Generative AI",
        short: "GenAI",
        color: "bg-indigo-600",
        headerText: "text-white",
        rowBg: "bg-indigo-50",
        functions: "Content generation — text, images, codes, audio.",
        core: "Generates new data and outputs. Real-time learning, independent correction.",
        learning: "Independent learning, no supervision, latent space representation.",
        useCase: "Human augmentation; creation of text, images, audio, code.",
    },
    {
        label: "Agentic AI",
        short: "Agentic",
        color: "bg-gray-900",
        headerText: "text-white",
        rowBg: "bg-gray-50",
        functions: "Autonomous decision making and action execution.",
        core: "Interacts with other AI systems, learns and acts in real time.",
        learning: "Reinforcement learning, unsupervised learning.",
        useCase: "AI Assistant and autonomous teams.",
    },
];

const rowLabels = ["Functions", "Core Competencies", "Learning", "Use Case"];
const rowKeys = ["functions", "core", "learning", "useCase"];

export default function SlideAIComparison() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8">

                {/* Header */}
                <div className="mb-5">
                    <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-3">
                        Foundations · Automation vs AI
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
                        From Automation to <span className="text-blue-600">Agentic AI.</span>
                    </h2>
                </div>

                {/* Table */}
                <div className="w-full rounded-2xl overflow-hidden border border-gray-100">
                    {/* Header Row */}
                    <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr]">
                        <div className="bg-white" />
                        {cols.map((col, i) => (
                            <div key={i} className={`${col.color} ${col.headerText} px-4 py-3 text-center`}>
                                <div className="text-xs font-black tracking-tight leading-tight">{col.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Data Rows */}
                    {rowLabels.map((label, ri) => (
                        <div key={ri} className={`grid grid-cols-[100px_1fr_1fr_1fr_1fr] border-t border-gray-100 ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                            <div className="px-3 py-3 flex items-start">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-snug">{label}</span>
                            </div>
                            {cols.map((col, ci) => (
                                <div key={ci} className="px-4 py-3 border-l border-gray-100">
                                    <p className="text-[11px] text-gray-600 leading-relaxed">{col[rowKeys[ri]]}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <p className="text-[10px] text-gray-400 mt-2">Source: Compiled from various sources</p>
            </div>
        </div>
    );
}
