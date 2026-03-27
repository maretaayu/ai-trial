import React from 'react';
import { Building2, TrendingUp, BarChart2, CreditCard, Shield, Smartphone } from 'lucide-react';

const rows = [
    {
        icon: Building2,
        industry: "Banking",
        useCases: ["Customer Service", "Fraud Detection", "KYC Process", "Process Automation", "Personalized Products"],
        value: ["Enhanced customer experience", "Operational efficiency", "Improved accuracy"],
    },
    {
        icon: TrendingUp,
        industry: "Corporate Finance",
        useCases: ["Portfolio Optimization", "Capital Budgeting", "Compliance", "Investment Management", "Financial Statement Analysis"],
        value: ["Optimal capital allocation", "Risk management", "Efficiency & accuracy"],
    },
    {
        icon: BarChart2,
        industry: "Capital Markets",
        useCases: ["Stock Movement Projections", "Algorithmic Trading", "Investment Planning", "Trade Executions", "Portfolio Rebalancing"],
        value: ["Smarter investment decisions", "Execute market strategies faster"],
    },
    {
        icon: CreditCard,
        industry: "Payment System",
        useCases: ["Cyber Fraud Detection", "Streamlined Settlement", "Data-driven Insights", "Personalized Recommendations"],
        value: ["Automated processing", "Faster transactions", "Optimal payment acceptance"],
    },
    {
        icon: Shield,
        industry: "Insurance",
        useCases: ["Credit Scoring", "Fraud Detection", "Claims Management", "Claims Adjudication", "Insurance Distribution"],
        value: ["Operational efficiency", "Reduced risks"],
    },
    {
        icon: Smartphone,
        industry: "Fintech",
        useCases: ["Investment Management", "Fraud Identification", "Personalized Sales", "Secure Transactions"],
        value: ["Better decision making", "Improved customer interaction"],
    },
];

export default function SlideBankingUseCases() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8">

                {/* Header */}
                <div className="mb-5">
                    <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
                        Banking Sector · AI Use Cases
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
                        AI Applications Across <span className="text-blue-600">Financial Services.</span>
                    </h2>
                </div>

                {/* Table */}
                <div className="w-full rounded-2xl overflow-hidden border border-gray-100">
                    {/* Table Header */}
                    <div className="grid grid-cols-[160px_1fr_1fr] bg-gray-900 text-white text-xs font-bold tracking-[0.12em] uppercase">
                        <div className="px-4 py-2.5">Industry</div>
                        <div className="px-4 py-2.5 border-l border-gray-700">Use Cases</div>
                        <div className="px-4 py-2.5 border-l border-gray-700">Value Delivered</div>
                    </div>

                    {/* Table Rows */}
                    {rows.map((row, i) => {
                        const Icon = row.icon;
                        return (
                            <div
                                key={i}
                                className={`grid grid-cols-[160px_1fr_1fr] text-xs border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                {/* Industry */}
                                <div className="px-4 py-3 flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                    <span className="font-semibold text-gray-800 leading-tight">{row.industry}</span>
                                </div>

                                {/* Use Cases */}
                                <div className="px-4 py-3 border-l border-gray-100">
                                    <div className="flex flex-wrap gap-1">
                                        {row.useCases.map((uc, j) => (
                                            <span key={j} className="inline-block bg-gray-100 text-gray-600 rounded-md px-2 py-0.5 text-[10px] font-medium">
                                                {uc}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Value Delivered */}
                                <div className="px-4 py-3 border-l border-gray-100">
                                    <div className="flex flex-col gap-0.5">
                                        {row.value.map((v, j) => (
                                            <div key={j} className="flex items-start gap-1.5">
                                                <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                                                <span className="text-gray-500 leading-snug">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="text-[10px] text-gray-400 mt-2">Source: OJK — Compiled from various sources</p>
            </div>
        </div>
    );
}
