import React from 'react';

const rows = [
    {
        type: "Predictive AI",
        color: "bg-slate-700",
        textColor: "text-white",
        tagColor: "bg-slate-600 text-slate-100",
        desc: "Memprediksi hasil menggunakan pola data masa lalu",
        examples: [
            { fn: "Pemasaran & Penjualan", items: ["Retensi Nasabah", "Penjualan Silang", "Optimasi Harga"] },
            { fn: "Operasional", items: ["Routing Pembayaran Cerdas", "Perbaikan Pembayaran Otomatis", "Optimasi Jaringan Cabang"] },
            { fn: "Risiko & Kepatuhan", items: ["Peringatan Dini Risiko Kredit", "Penilaian Risiko Agunan", "Keputusan Kredit Otomatis"] },
        ],
    },
    {
        type: "Generative AI",
        color: "bg-blue-600",
        textColor: "text-white",
        tagColor: "bg-blue-500 text-white",
        desc: "Membuat konten, sintesa data, & otomatisasi dokumen",
        examples: [
            { fn: "Prospek & Onboarding", items: ["KYC yang Efisien", "Proses Dokumen Cerdas", "Pengumpulan Fakta Awal"] },
            { fn: "Saran Keuangan", items: ["Sintesa Riset Investasi", "Laporan Khusus Nasabah", "Identifikasi Kebutuhan"] },
            { fn: "Layanan Pelanggan", items: ["Monitoring Kontrak", "Klasifikasi Otomatis", "Chatbot Layanan"] },
        ],
    },
    {
        type: "Agentic AI",
        color: "bg-gray-900",
        textColor: "text-white",
        tagColor: "bg-gray-700 text-gray-100",
        desc: "Agen otonom yang bekerja lintas sistem & proses",
        examples: [
            { fn: "Interaksi Nasabah", items: ["Otomatisasi Engagement", "Manajemen Hubungan", "Penasihat Keuangan Pribadi"] },
            { fn: "Intelijen Pasar", items: ["Analisis Pasar Kompetitif", "Pengawasan Tren Pasar", "Generasi Insight Strategis"] },
            { fn: "Kepatuhan & Fraud", items: ["Monitoring Transaksi AML", "Pengawasan Risiko", "Otomatisasi Proses"] },
        ],
    },
];

export default function SlideBankingAIMatrix() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-7xl mx-auto px-8 py-10">

                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">
                        Sektor Perbankan · Implementasi AI
                    </div>
                    <h2 className="text-5xl font-bold tracking-tighter text-gray-900 leading-[1.1]">
                        Tiga Level AI dalam <span className="text-blue-600">Fungsi Perbankan.</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    {rows.map((row, i) => (
                        <div key={i} className="grid grid-cols-[220px_1fr] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                            {/* Label */}
                            <div className={`${row.color} ${row.textColor} px-8 py-6 flex flex-col justify-center`}>
                                <div className="text-xl font-black tracking-tight leading-tight mb-2">{row.type}</div>
                                <div className="text-xs opacity-80 leading-relaxed font-medium">{row.desc}</div>
                            </div>
                            {/* Examples */}
                            <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/50">
                                {row.examples.map((ex, j) => (
                                    <div key={j} className="px-6 py-5">
                                        <div className="text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-4">{ex.fn}</div>
                                        <div className="flex flex-col gap-2.5">
                                            {ex.items.map((item, k) => (
                                                <div key={k} className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40 flex-shrink-0 mt-1.5" />
                                                    <span className="text-sm text-gray-700 leading-snug font-medium opacity-90">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                    <p className="text-[11px] text-gray-400 font-medium">Source: BCG (2023), World Economic Forum (2024)</p>
                </div>
            </div>
        </div>
    );
}
