import React from 'react';
import { motion } from 'framer-motion';

const challenges = [
    {
        id: '01',
        title: 'Extreme Pressure',
        description: 'Handling localized spikes up to 20,000 PSI without structural deformation or seal compromise.',
        highlight: 'Structural Integrity'
    },
    {
        id: '02',
        title: 'Thermal Extremes',
        description: 'Operating flawlessly from cryogenic depths (-196°C) to superheated steam (+800°C).',
        highlight: 'Thermal Stability'
    },
    {
        id: '03',
        title: 'Corrosive Media',
        description: 'Resisting aggressive chemical attack through advanced metallurgy and proprietary coatings.',
        highlight: 'Material Science'
    },
    {
        id: '04',
        title: 'Zero Leakage',
        description: 'Meeting fugitive emission standards where environmental safety is non-negotiable.',
        highlight: 'Triple-Seal Tech'
    }
];

const IndustrialChallenges: React.FC = () => {
    return (
        <section className="py-32 bg-[var(--industrial-bg-secondary)] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/industrial-challenges.jpg"
                    alt="Background Texture"
                    className="w-full h-full object-cover opacity-5 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-[var(--industrial-bg-secondary)]/90" />
            </div>

            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#2E3A45_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--industrial-accent)] font-mono text-sm tracking-widest uppercase mb-4 block"
                    >
                        // Mission Critical Challenges
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold text-white max-w-3xl"
                    >
                        Industry doesn't ask for permission. <br />
                        It demands resilience.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {challenges.map((challenge, index) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group relative border-t border-[var(--industrial-border)] pt-8 hover:border-[var(--industrial-accent)] transition-colors duration-500"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-3xl font-bold text-[var(--industrial-text-primary)] group-hover:text-white transition-colors">
                                    {challenge.title}
                                </h3>
                                <span className="font-mono text-4xl text-[var(--industrial-border)] group-hover:text-[var(--industrial-accent)] transition-colors opacity-50">
                                    {challenge.id}
                                </span>
                            </div>
                            <p className="text-lg text-[var(--industrial-text-secondary)] mb-6 max-w-md leading-relaxed">
                                {challenge.description}
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm font-mono text-[var(--industrial-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="w-2 h-2 bg-[var(--industrial-accent)] rounded-full animate-pulse" />
                                {challenge.highlight}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IndustrialChallenges;
