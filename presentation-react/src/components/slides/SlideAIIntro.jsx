import React from 'react';

const types = [
    {
        label: "Machine Learning",
        short: "ML",
        color: "bg-slate-200 text-slate-700",
        dotColor: "bg-slate-400",
        desc: "A subset of AI that develops models and algorithms enabling computers to learn and find solutions through dataset analysis.",
    },
    {
        label: "Deep Learning",
        short: "DL",
        color: "bg-slate-300 text-slate-800",
        dotColor: "bg-slate-500",
        desc: "Uses multilayer artificial neural networks to handle complex learning tasks — excels at processing large amounts of text or image data.",
    },
    {
        label: "Predictive AI",
        short: "Pred.",
        color: "bg-blue-100 text-blue-800",
        dotColor: "bg-blue-500",
        desc: "Projects outcomes, trends, or future events through analysis of historical data. Supports risk management, customer segmentation, and prediction.",
    },
    {
        label: "Generative AI",
        short: "Gen.",
        color: "bg-indigo-100 text-indigo-800",
        dotColor: "bg-indigo-500",
        desc: "Creates new data and outputs — text, images, audio, or code. Independent learning, no supervision. Examples: ChatGPT, Gemini.",
    },
    {
        label: "Agentic AI",
        short: "Agent",
        color: "bg-gray-900 text-white",
        dotColor: "bg-white",
        desc: "The latest wave. Capable of autonomous decision-making, collaboration, and independent learning. Interacts with other AI systems and automates complex tasks.",
        highlight: true,
    },
];

export default function SlideAIIntro() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8">

                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-3">
                        Foundations · Artificial Intelligence
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
                        Understanding the <span className="text-blue-600">Types of AI.</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">AI is a broad field — what matters is knowing which type fits which problem.</p>
                </div>

                {/* Visual: nested concept + list */}
                <div className="grid grid-cols-[220px_1fr] gap-8 items-center">

                    {/* Left: nested visual */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-52 h-52 rounded-full border-2 border-slate-200 bg-slate-50 flex items-center justify-center relative">
                            <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">AI</span>
                            <div className="w-40 h-40 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center relative">
                                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 uppercase tracking-wider">ML</span>
                                <div className="w-28 h-28 rounded-full border-2 border-slate-400 bg-slate-100 flex items-center justify-center relative">
                                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-600 uppercase tracking-wider">DL</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                            <span className="text-[7px] font-black text-white text-center leading-tight">Pred.</span>
                                        </div>
                                        <div className="text-[10px] text-slate-400">→</div>
                                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                            <span className="text-[7px] font-black text-white text-center leading-tight">Gen.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Agentic outside arrow */}
                        </div>
                        <div className="absolute -right-2 bottom-8 flex flex-col items-center">
                            <div className="text-[9px] text-slate-400">→</div>
                            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mt-0.5">
                                <span className="text-[7px] font-black text-white text-center leading-tight">Agentic</span>
                            </div>
                        </div>
                        <p className="absolute -bottom-5 text-[9px] text-gray-400 text-center w-full">Source: BCG (2023); WEF (2024); Bernard Marr (Forbes) (2024)</p>
                    </div>

                    {/* Right: descriptions */}
                    <div className="flex flex-col gap-2.5">
                        {types.map((t, i) => (
                            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${t.highlight ? 'bg-gray-900' : 'bg-gray-50 border border-gray-100'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${t.dotColor}`} />
                                <div>
                                    <span className={`text-xs font-bold ${t.highlight ? 'text-white' : 'text-gray-800'}`}>{t.label}. </span>
                                    <span className={`text-xs leading-relaxed ${t.highlight ? 'text-gray-300' : 'text-gray-500'}`}>{t.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
