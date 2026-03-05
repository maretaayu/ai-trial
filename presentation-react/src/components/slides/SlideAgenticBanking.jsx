import React, { useState } from 'react';
import { Users, Tag, BarChart2, Shield, ArrowRight } from 'lucide-react';

const areas = [
    {
        icon: Users,
        title: "Interaksi Nasabah",
        items: [
            { label: "Client Engagement", desc: "Otomatisasi tools perencanaan keuangan dan antarmuka aplikasi kustom yang responsif." },
            { label: "Relationship Management", desc: "Optimasi komunikasi klien dan penyesuaian strategi engagement secara dinamis." },
            { label: "Personal Financial Advisory", desc: "Coaching keuangan real-time berdasarkan pola perilaku nasabah." },
        ],
    },
    {
        icon: Tag,
        title: "Produk & Harga",
        items: [
            { label: "Credit Assessment", desc: "Menilai kelayakan kredit dan penawaran pinjaman secara mandiri dan akurat." },
            { label: "Dynamic Pricing", desc: "Penyesuaian harga dan penawaran retensi berdasarkan perilaku real-time." },
        ],
    },
    {
        icon: BarChart2,
        title: "Intelijen Pasar",
        items: [
            { label: "Competitive Analysis", desc: "Pelacakan strategi kompetitor secara otomatis dan insight strategis instan." },
            { label: "Trend Surveillance", desc: "Pemantauan pergeseran pasar dan peringatan dini terhadap risiko baru." },
        ],
    },
    {
        icon: Shield,
        title: "Kepatuhan & Fraud",
        items: [
            { label: "Transaction Monitoring", desc: "Monitoring risiko AML dan penandaan transaksi berisiko tinggi secara otonom." },
            { label: "Risk Surveillance", desc: "Pelacakan ancaman pasar real-time dan mitigasi risiko otomatis." },
            { label: "Process Automation", desc: "Otomatisasi triase keluhan dan deteksi anomali operasional." },
        ],
    },
];

export default function SlideAgenticBanking() {
    const [activeTab, setActiveTab] = useState(0);
    const activeData = areas[activeTab];

    return (
        <div className="w-full h-full flex items-center justify-center bg-white text-gray-900">
            <div className="w-full max-w-5xl mx-auto px-8">

                {/* Compact Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 border-b border-gray-900 pb-2 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">
                        Agentic AI · Banking Case Studies
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">
                        Penerapan Agentic AI di Perbankan.
                    </h2>
                </div>

                {/* Minimalist Tabs */}
                <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                    {areas.map((area, i) => {
                        const isActive = activeTab === i;
                        return (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`px-6 py-4 flex items-center gap-3 transition-all relative whitespace-nowrap ${isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <area.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-300'}`} />
                                <span className={`text-sm font-bold tracking-tight ${isActive ? '' : 'font-medium'}`}>
                                    {area.title}
                                </span>
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in fade-in zoom-in duration-300" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Compact Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 min-h-[200px]">
                    {activeData.items.map((item, j) => (
                        <div key={j} className="flex gap-4 group">
                            <div className="mt-1 flex-shrink-0">
                                <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-gray-900 mb-1">{item.label}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Minimal Footer */}
                <div className="mt-16 pt-6 border-t border-gray-50 flex justify-between items-center text-[10px] font-bold tracking-wider text-gray-300 uppercase">
                    <span>Source: World Economic Forum (2024)</span>
                </div>
            </div>
        </div>
    );
}
