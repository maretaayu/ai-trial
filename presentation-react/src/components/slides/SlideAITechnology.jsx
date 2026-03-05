import React from 'react';

export default function SlideAITechnology() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white px-8">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

                {/* Visual Side */}
                <div className="w-full md:w-[55%] flex flex-col items-center">
                    <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-8 text-center">Jenis Teknologi Kecerdasan Artifisial</p>

                    <div className="w-full aspect-[4/3] max-h-[500px] relative flex items-center justify-center">
                        <svg viewBox="0 0 600 350" className="w-full h-full drop-shadow-sm">
                            {/* AI Oval */}
                            <ellipse cx="300" cy="175" rx="280" ry="160" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                            <text x="300" y="55" fontSize="16" fontWeight="bold" fill="#64748b" textAnchor="middle">Artificial Intelligence</text>

                            {/* ML Oval */}
                            <ellipse cx="320" cy="190" rx="210" ry="120" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                            <text x="320" y="110" fontSize="14" fontWeight="bold" fill="#475569" textAnchor="middle">Machine Learning</text>

                            {/* DL Oval */}
                            <ellipse cx="340" cy="210" rx="140" ry="80" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                            <text x="340" y="165" fontSize="13" fontWeight="bold" fill="#334155" textAnchor="middle">Deep Learning</text>

                            {/* Predictive AI Circle */}
                            <circle cx="110" cy="180" r="45" fill="#1e3a8a" />
                            <text x="110" y="175" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">Predictive</text>
                            <text x="110" y="190" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">AI</text>

                            {/* Generative AI Circle */}
                            <circle cx="260" cy="235" r="35" fill="#7f1d1d" />
                            <text x="260" y="232" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">Generative</text>
                            <text x="260" y="244" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">AI</text>

                            {/* Agentic AI Circle */}
                            <circle cx="420" cy="235" r="35" fill="#ea580c" />
                            <text x="420" y="232" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">Agentic</text>
                            <text x="420" y="244" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">AI</text>

                            {/* Arrow */}
                            <defs>
                                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                    <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                                </marker>
                            </defs>
                            <line x1="305" y1="235" x2="375" y2="235" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            <text x="340" y="250" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle">moving to</text>
                        </svg>
                    </div>
                </div>

                {/* Text Side - Simplified Definitions */}
                <div className="w-full md:w-[45%] flex flex-col gap-8">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                            <span className="w-4 h-4 rounded-full bg-[#1e3a8a] block"></span> Predictive AI
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Menganalisis data historis untuk <strong className="text-gray-900">memproyeksikan kejadian masa depan</strong>. Sangat matang digunakan di perbankan untuk <em>credit scoring</em> dan mendeteksi dugaan penipuan (Fraud Detection).
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                            <span className="w-4 h-4 rounded-full bg-[#7f1d1d] block"></span> Generative AI
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Bukan menebak data, melainkan <strong className="text-gray-900">menghasilkan konten baru</strong> (teks, gagasan, pelaporan) dari instruksi komunikasi awam layaknya ChatGPT.
                        </p>
                    </div>
                    <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 -mx-5 -mb-5">
                        <h3 className="text-2xl md:text-3xl font-bold text-orange-600 mb-3 flex items-center gap-3">
                            <span className="w-4 h-4 rounded-full bg-[#ea580c] block"></span> Agentic AI
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed font-medium">
                            Gelombang terbaru. Mesin tak lagi sekadar penjawab pertanyaan, melainkan menjadi agen pekerja yang mampu <strong className="text-gray-900">mengambil keputusan & mengeksekusi operasional multi-sistem</strong> secara otonom.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
