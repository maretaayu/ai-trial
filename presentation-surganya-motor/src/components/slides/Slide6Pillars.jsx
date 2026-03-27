import { Rocket, ShieldCheck, Users, Workflow, Target } from 'lucide-react';

export default function Slide6Pillars() {
    const pillars = [
        {
            num: "01",
            icon: <Target className="w-5 h-5" />,
            title: "Establish Goals",
            desc: "Menargetkan parameter rasio presisi, contohnya realisasi 100% kesertaan staf pada pelatihan adaptasi AI di triwulan pertama."
        },
        {
            num: "02",
            icon: <Users className="w-5 h-5" />,
            title: "Secure Sponsorship",
            desc: "Sinergi fungsionaris lini (direksi), penyokong budaya (Groundswell Lead), dan penerjemah konfigurasi (AI Accelerator)."
        },
        {
            num: "03",
            icon: <Rocket className="w-5 h-5" />,
            title: "Sustain Momentum",
            desc: "Menyiapkan gamifikasi lingkungan percontohan interaktif korporat untuk memvalidasi pemakaian inovatif pelaksana."
        },
        {
            num: "04",
            icon: <Workflow className="w-5 h-5" />,
            title: "Integrate into Workflows",
            desc: "Konversi uji praktikal ke pekerjaan keseharian staf. (Contoh: pekan penanganan masalah analistis otonom)."
        },
        {
            num: "05",
            icon: <ShieldCheck className="w-5 h-5" />,
            title: "Prepare for Risks",
            desc: "Edukasi garda fungsional mengenai sirkulasi siber, pembaruan tren phishing, dan kesiapsiagaan dari rekayasa sabotase."
        }
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center px-4 max-w-6xl mx-auto">

            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> 5 Titik Bangun
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter leading-[1.05] text-gray-900 mb-4">
                    Menuju Tenaga Perusahaan<br />Berbasis Agen AI.
                </h2>
                <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed tracking-tight">
                    Langkah strategis memandu sinkronisasi otomasi dari dasar operasional hingga level dukungan arsitektur tata manajerial tertinggi.
                </p>
            </div>

            {/* 5 Pillars Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
                {pillars.map((pillar, i) => (
                    <div key={i} className="bg-gray-50/50 border border-gray-100 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all group flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-white text-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                {pillar.icon}
                            </div>
                            <span className="text-gray-300 font-black text-2xl group-hover:text-gray-800 transition-colors">
                                {pillar.num}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                            {pillar.title}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed font-medium mt-auto">
                            {pillar.desc}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}
