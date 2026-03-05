import React from 'react';
import { Users, Tag, BarChart2, Shield } from 'lucide-react';

const areas = [
    {
        icon: Users,
        title: "Interaksi Nasabah",
        items: [
            { label: "Client engagement", desc: "Mengotomatiskan tools perencanaan keuangan dan antarmuka aplikasi kustom" },
            { label: "Relationship management", desc: "Mengoptimalkan komunikasi klien, menyesuaikan strategi engagement" },
            { label: "Personal financial advisory", desc: "Coaching keuangan real-time berdasarkan tren pengeluaran" },
        ],
        color: "border-blue-200 bg-blue-50",
        iconBg: "bg-blue-600",
    },
    {
        icon: Tag,
        title: "Produk & Ketentuan Harga",
        items: [
            { label: "Credit assessment & loan origination", desc: "Menilai kelayakan kredit, merancang penawaran pinjaman secara mandiri" },
            { label: "Dynamic pricing", desc: "Menyesuaikan harga dan penawaran retensi berdasarkan perilaku klien secara real-time" },
        ],
        color: "border-slate-200 bg-slate-50",
        iconBg: "bg-slate-600",
    },
    {
        icon: BarChart2,
        title: "Intelijen Pasar",
        items: [
            { label: "Competitive market analysis", desc: "Melacak strategi kompetitor, menyajikan wawasan strategis" },
            { label: "Market trend surveillance", desc: "Memantau pergeseran pasar, memperingatkan analis terhadap risiko baru" },
        ],
        color: "border-indigo-200 bg-indigo-50",
        iconBg: "bg-indigo-600",
    },
    {
        icon: Shield,
        title: "Kepatuhan & Pencegahan Fraud",
        items: [
            { label: "Transaction monitoring", desc: "Memantau risiko AML, menandai transaksi berisiko tinggi secara dinamis" },
            { label: "Financial risk surveillance", desc: "Melacak ancaman pasar real-time, merekomendasikan mitigasi risiko" },
            { label: "Process automation & quality", desc: "Mengotomatiskan triase keluhan, mendeteksi anomali operasional" },
        ],
        color: "border-gray-200 bg-gray-50",
        iconBg: "bg-gray-700",
    },
];

export default function SlideAgenticBanking() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8">

                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
                        Agentic AI · Aplikasi Perbankan
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-gray-900">
                        Di Mana Agentic AI Berperan di <span className="text-blue-600">Perbankan.</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Kompleksitas tugas lebih tinggi · Lebih otonom · Dampak lebih besar pada produktivitas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {areas.map((area, i) => {
                        const Icon = area.icon;
                        return (
                            <div key={i} className={`rounded-2xl border p-5 ${area.color}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-8 h-8 rounded-lg ${area.iconBg} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-800">{area.title}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {area.items.map((item, j) => (
                                        <div key={j}>
                                            <span className="text-xs font-semibold text-gray-700">{item.label}: </span>
                                            <span className="text-xs text-gray-500">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="text-[10px] text-gray-400 mt-3">Sumber: World Economic Forum — How Agentic AI will transform financial services (2024)</p>
            </div>
        </div>
    );
}
