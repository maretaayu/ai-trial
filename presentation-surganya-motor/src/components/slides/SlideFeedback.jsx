import React from 'react';
import { MessageSquareHeart, ExternalLink } from 'lucide-react';

const SlideFeedback = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white text-gray-900">
            <div className="w-full max-w-4xl mx-auto px-12 flex flex-col md:flex-row items-center gap-16">
                {/* Left Side: Content */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6 shadow-sm">
                            <MessageSquareHeart className="w-3 h-3 text-red-400" /> Feedback Form
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4 text-gray-900">
                            Terima Kasih <br />& <span className="text-blue-600">Review.</span>
                        </h2>
                        <p className="text-lg text-gray-500 font-medium">
                            Masukan Anda sangat berharga untuk pengembangan materi kelas kami selanjutnya.
                        </p>
                    </div>

                    <a
                        href="https://forms.gle/GLvj5o94sZGDvcE17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all group shadow-lg"
                    >
                        Klik di sini untuk Feedback
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>

                {/* Right Side: QR Code */}
                <div className="w-full md:w-64 flex flex-col items-center gap-4 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-white relative z-10 w-full aspect-square flex items-center justify-center overflow-hidden">
                        <img
                            src="/feedback-qr.jpg"
                            alt="QR Feedback"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mt-2">
                        Scan to open form
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SlideFeedback;
