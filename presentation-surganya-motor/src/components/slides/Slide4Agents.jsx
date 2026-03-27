import { Database, FileText, Image, Lightbulb } from 'lucide-react';

export default function Slide4Agents() {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-24 items-center justify-between px-8">

            {/* Left Side: Refined Text & List */}
            <div className="w-full md:w-[45%] flex flex-col justify-center">

                {/* Sophisticated Badge */}
                <div className="inline-flex max-w-max items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Orchestration
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 tracking-tighter leading-[1.05] text-gray-900">
                    The specialized<br />agent system.
                </h2>

                <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed tracking-tight">
                    Karyawan beralih peran dari pelaksana teknis murni menjadi koordinator strategis multijenjang.
                </p>

                {/* Elegant List without heavy borders */}
                <div className="flex flex-col gap-8">
                    {/* Agent 1 */}
                    <div className="flex gap-4 items-start group">
                        <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            <Database className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">Data agent</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">Menganalisis jutaan titik data ireguler untuk merumuskan pola cerdas harian.</p>
                        </div>
                    </div>

                    {/* Agent 2 */}
                    <div className="flex gap-4 items-start group">
                        <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">Content agent</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">Merancang drafi editorial mandiri yang presisi dengan DNA panduan bahasa utama korporat.</p>
                        </div>
                    </div>

                    {/* Agent 3 */}
                    <div className="flex gap-4 items-start group">
                        <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            <Image className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">Creative agent</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">Memproduksi aset visual grafis berdasarkan perintah terstruktur dari agen editorial sebelumnya.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Clean Image & Integrated Tip */}
            <div className="w-full md:w-[50%] flex flex-col justify-center items-end mt-12 md:mt-0">

                <div className="w-full max-w-lg relative">
                    {/* Modern subtle frame/background instead of harsh floating box */}
                    <div className="absolute -inset-4 bg-gray-50 rounded-[2.5rem] -z-10 border border-gray-100"></div>

                    <img
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&h=700&q=80"
                        className="w-full h-[400px] lg:h-[480px] object-cover rounded-[2rem] shadow-xl shadow-gray-200/50"
                        alt="Data multiplier"
                    />

                    {/* Minimalist Integrated Tip Card (No longer massive/overflowing) */}
                    <div className="absolute -left-8 -bottom-8 bg-white/80 backdrop-blur-xl p-5 lg:p-6 rounded-[1.5rem] shadow-2xl shadow-gray-200/50 border border-white/50 w-[85%] max-w-[320px]">
                        <h4 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-2 tracking-tight uppercase">
                            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                            Data Tip
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed font-medium mb-4">
                            Struktur multijenjang ini bertindak sebagai alat pelipatgandaan (*intelligence multiplier*).
                        </p>
                        <button className="flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 text-gray-900 py-2.5 rounded-xl font-semibold text-xs border border-gray-200 transition-colors">
                            Pelajari Selengkapnya
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
