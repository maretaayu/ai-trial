import React from 'react';
import { Bot, LineChart, MessageSquare, BrainCircuit } from 'lucide-react';

export default function SlideAutomationVsAI() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 px-8">
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">

                <div className="text-center max-w-4xl mx-auto">
                    <p className="text-sm md:text-base font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Evolusi Kapabilitas</p>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter text-gray-900 mb-6 leading-tight">Perbedaan Otomatisasi & AI.</h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Pendekatan teknologi korporat terus berkembang, mulai dari sekadar mengotomasi tugas rutin manual hingga menciptakan agen cerdas yang mampu bertindak secara mandiri.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 lg:gap-6 mt-4">

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center mb-6">
                            <Bot className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1. RPA Automatization</h3>
                        <p className="text-base text-gray-500 leading-relaxed">
                            Fokus mengotomasi proses berulang yang kaku <strong>tanpa menghasilkan informasi komprehensif baru</strong>. Aturannya bersifat "Jika A, maka B" mutlak tanpa adaptasi penalaran.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <LineChart className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">2. Predictive AI</h3>
                        <p className="text-base text-gray-500 leading-relaxed">
                            Menggunakan statistik historis untuk mengenali pola dan <strong>memprediksi kecenderungan data</strong> masa depan. Kuat di manajemen risiko, namun bukan sebagai pencipta gagasan konten.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <MessageSquare className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">3. Generative AI</h3>
                        <p className="text-base text-gray-500 leading-relaxed">
                            Mampu <strong>menghasilkan narasi atau wawasan baru</strong> secara otodidak yang sangat fasih merangkum dokumen abstrak tanpa harus ada klasifikasi rumus algoritma kaku.
                        </p>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden hover:-translate-y-1 transition-transform">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
                        <div className="w-14 h-14 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-orange-500/30">
                            <BrainCircuit className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10">4. Agentic AI</h3>
                        <p className="text-base text-gray-400 leading-relaxed relative z-10 font-medium">
                            Paradigma pemungkas. Bukan hanya mahir menjawab, ia dibekali otonomi <strong>mengatur langkah penyelesaian, mengambil keputusan, dan bertindak real-time</strong> di beragam sistem korporasi.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
