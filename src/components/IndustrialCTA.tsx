import React from 'react';
import { Link } from 'react-router-dom';

const IndustrialCTA: React.FC = () => {
    return (
        <section className="py-32 bg-[var(--industrial-bg-primary)] relative overflow-hidden flex items-center justify-center border-t border-[var(--industrial-border)]">
            <div className="absolute inset-0 bg-[url('/images/industrial-bridge.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay gpu-accelerated" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--industrial-bg-primary)] via-transparent to-[var(--industrial-bg-primary)]" />
            <div className="absolute inset-0 bg-radial-gradient from-[var(--industrial-accent)]/5 to-transparent opacity-30" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-[var(--industrial-text-primary)] mb-8 tracking-tight drop-shadow-2xl">
                    Engineered for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--industrial-accent)] to-[var(--industrial-highlight)]">Reliability</span>
                </h2>
                <p className="text-xl text-[var(--industrial-text-secondary)] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                    Precision you can trust. Performance you can measure. Experience the next generation of industrial flow control.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link to="/products" className="btn-industrial px-8 py-4 text-white font-bold uppercase tracking-widest hover:bg-[var(--industrial-accent)]">
                        Explore Valve Solutions
                    </Link>
                    <a
                        href="/TechnoValves-Brochure.pdf"
                        download
                        className="btn-industrial px-8 py-4 text-[var(--industrial-text-primary)] font-bold uppercase tracking-widest hover:text-white"
                    >
                        Download Brochure
                    </a>
                </div>
            </div>
        </section>
    );
};

export default IndustrialCTA;
