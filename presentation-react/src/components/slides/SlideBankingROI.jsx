import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

const costItems = [
    { stat: "0–15%", label: "Total Staff Cost Efficiency", desc: "By automating data entry, analysis, and reporting tasks that traditionally require extensive manual labor." },
    { stat: "10–20%", label: "IT Staff Cost Savings", desc: "AI monitors system performance, detects issues, and resolves them without manual intervention." },
    { stat: "10–15%", label: "Savings from Asset Depreciation", desc: "Better credit risk assessment reduces bad debts and impairment reserves that need to be set aside." },
];

const revenueItems = [
    { stat: "+5–7%", label: "Trading Revenue", desc: "AI market analysis algorithms forecast future market movements for faster, more accurate trading decisions." },
    { stat: "+1–2%", label: "Fees & Commissions", desc: "Predictive analytics strengthen customer loyalty — increasing revenue from fees and commissions." },
    { stat: "+5–10%", label: "Interest Income", desc: "Personalized marketing improves customer acquisition, increasing conversion and customer relationships." },
    { stat: "+2–3%", label: "Net Interest Income", desc: "More accurate loan interest rate setting based on individual credit risk assessments." },
];

export default function SlideBankingROI() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8">

                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
                        Banking Sector · AI Impact
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
                        AI's Impact on Bank <span className="text-blue-600">Revenue & Costs.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-6">

                    {/* Cost Savings */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingDown className="w-4 h-4 text-gray-500" />
                            <span className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">Cost Reduction</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            {costItems.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="text-2xl font-black text-gray-800 flex-shrink-0 w-20 leading-none pt-0.5">{item.stat}</div>
                                    <div>
                                        <div className="text-xs font-semibold text-gray-700 mb-0.5">{item.label}</div>
                                        <div className="text-xs text-gray-400 leading-relaxed">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue Growth */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-bold tracking-[0.15em] text-blue-400 uppercase">Revenue Growth</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            {revenueItems.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                                    <div className="text-2xl font-black text-blue-700 flex-shrink-0 w-20 leading-none pt-0.5">{item.stat}</div>
                                    <div>
                                        <div className="text-xs font-semibold text-gray-700 mb-0.5">{item.label}</div>
                                        <div className="text-xs text-gray-400 leading-relaxed">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <p className="text-[10px] text-gray-400 mt-3">Source: Deloitte (2024), OJK Roadmap AI Perbankan</p>
            </div>
        </div>
    );
}
