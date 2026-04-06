import React from 'react';

const BrandPhilosophy: React.FC = () => {
    return (
        <section className="py-32 bg-[var(--industrial-bg-primary)] relative overflow-hidden flex items-center justify-center text-center">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/images/perf-aware.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay grayscale gpu-accelerated" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--industrial-bg-primary)] via-transparent to-[var(--industrial-bg-primary)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                    We don't just manufacture valves. <br />
                    <span className="text-[var(--industrial-text-secondary)] italic">We engineer confidence.</span>
                </h2>
                <div className="w-24 h-1 bg-[var(--industrial-accent)] mx-auto mb-10" />
                <p className="text-xl text-[var(--industrial-text-secondary)] leading-relaxed font-light">
                    In an industry where a single failure can be catastrophic, we choose to over-engineer.
                    From the drawing board to the final pressure test, every Technovalves product is built
                    with a singular purpose: to perform flawlessly when it matters most.
                </p>
            </div>
        </section>
    );
};

export default BrandPhilosophy;
