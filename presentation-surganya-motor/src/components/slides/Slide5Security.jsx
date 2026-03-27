import { ShieldCheck, Users, Settings, Server } from 'lucide-react';

export default function Slide5Security() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8 flex flex-col justify-center h-full gap-12">

                {/* Header Section */}
                <div className="text-center w-full max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-full text-xs uppercase font-bold tracking-[0.2em] text-gray-500 mb-6">
                        <ShieldCheck className="w-4 h-4 text-blue-500" /> Prinsip Tata Kelola
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-6">People, Process, Technology.</h2>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        Kerangka utama dalam memastikan implementasi AI perbankan beroperasi dengan aman, etis, dan sejalan dengan mandat peraturan.
                    </p>
                </div>

                {/* 3 Pillars: People, Process, Technology */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">People</h3>
                        <p className="text-base text-gray-500 leading-relaxed">
                            Karyawan wajib dilatih untuk memiliki <strong>literasi AI</strong>, memahami cara kerja algoritma, serta mampu mendeteksi & memitigasi bias agar keputusan AI objektif dan tidak diskriminatif.
                        </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                            <Settings className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Process</h3>
                        <p className="text-base text-gray-500 leading-relaxed">
                            Bank wajib memiliki kebijakan tata kelola data eksak, audit rutin, dan menyediakan mekanisme <strong>pengawasan manusia <em>(human oversight)</em></strong> untuk validasi setiap keputusan AI.
                        </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                            <Server className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Technology</h3>
                        <p className="text-base text-gray-500 leading-relaxed">
                            Infrastruktur AI harus dibangun atas prinsip <em>Privacy by Design</em>. Data nasabah wajib <strong>dienkripsi dan dianonimkan (de-identifikasi)</strong> di semua siklus proses mesin.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
