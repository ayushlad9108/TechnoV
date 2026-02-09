import React from 'react';
import { motion } from 'framer-motion';

const HeroContinuation: React.FC = () => {
    return (
        <section className="relative py-24 bg-[var(--industrial-bg-primary)] overflow-hidden">
            {/* Technical Grid Background - Textural Continuity */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `linear-gradient(var(--industrial-border) 1px, transparent 1px), linear-gradient(90deg, var(--industrial-border) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Radial Glow Continuity */}
            <div className="absolute inset-0 z-0 bg-radial-gradient from-[var(--industrial-bg-secondary)]/20 to-[var(--industrial-bg-primary)] opacity-80 pointer-events-none" />

            {/* Visual Bridge Image */}
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 mask-image-linear-to-l">
                <img
                    src="/images/industrial-bridge.jpg"
                    alt="Industrial Facility"
                    className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--industrial-bg-primary)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-8">
                            Engineered to perform where <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--industrial-accent)] to-white">
                                failure is not an option.
                            </span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-8 items-start border-l-2 border-[var(--industrial-accent)] pl-6 md:pl-10">
                            <p className="text-xl md:text-2xl text-[var(--industrial-text-secondary)] font-light max-w-2xl leading-relaxed">
                                In the world's most demanding environments—from deep-sea extraction to hyper-critical processing—our precision flow control systems stand as the last line of defense.
                            </p>
                            <div className="flex flex-col gap-2 text-sm font-mono text-[var(--industrial-text-secondary)] opacity-70 mt-2 md:mt-0">
                                <span>PMAX: 20,000 PSI</span>
                                <span>TEMP: -196°C / +800°C</span>
                                <span>LIFECYCLE: 25 YRS+</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroContinuation;
