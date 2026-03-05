import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';
import { SplitSlide } from './SharedLayouts';

const SlideReferences = () => {
    return (
        <SplitSlide
            label="Referensi Utama"
            title="Sumber Data & Publikasi."
            subtitle="Seluruh fakta dan angka dalam materi ini bersumber dari laporan resmi otoritas dan riset teknologi terkini."
            points={[
                {
                    title: "OJK: AI Perbankan",
                    desc: "Roadmap Tata Kelola Kecerdasan Artifisial Perbankan Indonesia - Otoritas Jasa Keuangan.",
                    icon: ShieldCheck
                },
                {
                    title: "Google: Agentic AI 2026",
                    desc: "Laporan Riset Tren Agen AI 2026: Pergeseran dari chatbot ke agen otonom di industri global.",
                    icon: Globe
                }
            ]}
        />
    );
};

export default SlideReferences;
