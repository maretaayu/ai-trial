import React from 'react';

const rows = [
    {
        type: "Predictive AI",
        color: "bg-slate-700",
        textColor: "text-white",
        tagColor: "bg-slate-600 text-slate-100",
        desc: "Forecasts outcomes using historical patterns",
        examples: [
            { fn: "Marketing & Sales", items: ["Customer retention", "Cross-selling", "Pricing optimization"] },
            { fn: "Operations", items: ["Intelligent payment routing", "Smart payment repairs", "Branch network optimization"] },
            { fn: "Risk & Compliance", items: ["Early warning credit risk", "Collateral risk assessment", "Automated credit decisions"] },
        ],
    },
    {
        type: "Generative AI",
        color: "bg-blue-600",
        textColor: "text-white",
        tagColor: "bg-blue-500 text-white",
        desc: "Creates content, synthesizes data, automates document work",
        examples: [
            { fn: "Prospecting & Onboarding", items: ["Streamlined KYC", "Intelligent doc processing", "Initial fact finding"] },
            { fn: "Financial Advice", items: ["Investment research synthesis", "Tailored reports per client", "Support & needs identification"] },
            { fn: "Customer Support", items: ["Policy/contract monitoring", "Automated classification", "Customer service chatbots"] },
        ],
    },
    {
        type: "Agentic AI",
        color: "bg-gray-900",
        textColor: "text-white",
        tagColor: "bg-gray-700 text-gray-100",
        desc: "Autonomous agents that act across systems with minimal human input",
        examples: [
            { fn: "Customer Interaction", items: ["Client engagement automation", "Relationship management", "Personal financial advisory"] },
            { fn: "Market Intelligence", items: ["Competitive market analysis", "Market trend surveillance", "Strategic insights generation"] },
            { fn: "Compliance & Fraud", items: ["AML transaction monitoring", "Financial risk surveillance", "Process automation & quality"] },
        ],
    },
];

export default function SlideBankingAIMatrix() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8">

                <div className="mb-5">
                    <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
                        Banking Sector · AI Implementation
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
                        Three Levels of AI in <span className="text-blue-600">Banking Functions.</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-3">
                    {rows.map((row, i) => (
                        <div key={i} className="grid grid-cols-[180px_1fr] rounded-2xl overflow-hidden border border-gray-100">
                            {/* Label */}
                            <div className={`${row.color} ${row.textColor} px-5 py-4 flex flex-col justify-center`}>
                                <div className="text-sm font-black tracking-tight leading-tight">{row.type}</div>
                                <div className="text-[10px] opacity-70 mt-1 leading-snug">{row.desc}</div>
                            </div>
                            {/* Examples */}
                            <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50">
                                {row.examples.map((ex, j) => (
                                    <div key={j} className="px-4 py-3">
                                        <div className="text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">{ex.fn}</div>
                                        <div className="flex flex-col gap-1">
                                            {ex.items.map((item, k) => (
                                                <div key={k} className="flex items-start gap-1.5">
                                                    <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0 mt-1.5" />
                                                    <span className="text-[11px] text-gray-600 leading-snug">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-[10px] text-gray-400 mt-3">Source: BCG (2023), World Economic Forum (2024)</p>
            </div>
        </div>
    );
}
