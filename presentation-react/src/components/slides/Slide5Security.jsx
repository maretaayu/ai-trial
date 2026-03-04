import { ShieldAlert, Database, Scale, Fingerprint, Lock } from 'lucide-react';

export default function Slide5Security() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 items-start justify-between">

                {/* Left Side: Header & Context */}
                <div className="w-full md:w-[40%] flex flex-col justify-start">
                    <div className="inline-flex max-w-max items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Guardrails
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-[3rem] font-bold mb-6 tracking-tighter leading-[1.05] text-gray-900">
                        Keamanan Data &<br />Tata Kelola AI.
                    </h2>

                    <p className="text-lg text-gray-500 font-medium mb-8 leading-relaxed tracking-tight">
                        Transformasi masif harus dikawal instrumen akuntabilitas formal. Integrasi elemen <strong>Agentic AI</strong> tunduk pada regulasi privasi & etika.
                    </p>

                    {/* Key Rule Box */}
                    <div className="bg-gray-50 border border-gray-200 p-6 rounded-3xl mt-auto">
                        <div className="flex items-center gap-3 mb-3">
                            <Lock className="w-5 h-5 text-gray-900" />
                            <h4 className="font-bold text-gray-900 tracking-tight">Zero Data Retention</h4>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Standarisasi lisensi <em>Enterprise</em> wajib. Privatisasi dokumentasi terunggah dipastikan terisolasi mutlak dari pusat pelatihan mesin vendor publik.
                        </p>
                    </div>
                </div>

                {/* Right Side: Compliance Grid */}
                <div className="w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Prompt Leakage */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 hover:-translate-y-1 transition-all">
                        <div className="bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                            <Fingerprint className="w-6 h-6 text-gray-900" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">Risiko <em>Prompt Leakage</em> (UU PDP)</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Data internal eksklusif (keuangan staf/rekrutmen nasabah) yang diinput ke AI publik berpotensi dipanen sebagai korpus laten pelatihan komersial <em>publisher</em>.
                        </p>
                    </div>

                    {/* 2. Human in the loop */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 hover:-translate-y-1 transition-all">
                        <div className="bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                            <Scale className="w-6 h-6 text-gray-900" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">Otorisasi <em>Human-in-the-Loop</em></h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Kecepatan komputasi tetap wajib tunduk pada akuntabilitas bisnis. Otorisasi keputusan final (approval/rekrutmen) tetap diam di ranah wewenang konfirmasi manusia.
                        </p>
                    </div>

                    {/* 3. Halusinasi */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 hover:-translate-y-1 transition-all md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
                        <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">Ancaman "Halusinasi" & Manipulasi Siber (Social Engineering)</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                                Pembudayaan <em>Skeptisisme Profesional Kontekstual</em> mutlak didorong untuk menutupi ancaman narasi koheren namun fiktif (halusinasi), serta bahaya manipulasi identitas multimedia <em>Deepfake</em> yang memalsukan komunikasi siber eksekutif perseroan.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
