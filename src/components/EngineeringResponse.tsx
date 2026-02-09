import React from 'react';
import { motion } from 'framer-motion';

const responses = [
    {
        title: "Precision Machining",
        desc: "Manufacturing to micron-level tolerances using 5-axis CNC technology, ensuring perfect component mating and seal integrity.",
        stat: "±0.005mm TOLERANCE"
    },
    {
        title: "Advanced Metallurgy",
        desc: "Utilizing Inconel, Hastelloy, and Duplex Stainless Steels to resist hydrogen embrittlement and chloride stress corrosion.",
        stat: "NACE MR0175 COMPLIANT"
    },
    {
        title: "Rigorous Testing",
        desc: "Every valve undergoes hydrostatic, pneumatic, and fugitive emission testing beyond industry standards before shipment.",
        stat: "100% INSPECTION RATE"
    }
];

const EngineeringResponse: React.FC = () => {
    return (
        <section className="py-24 bg-[var(--industrial-bg-primary)] border-y border-[var(--industrial-border)] relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Visual / Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 w-full relative h-[300px] md:h-[600px] bg-[var(--industrial-bg-secondary)] overflow-hidden rounded-sm"
                    >
                        {/* Placeholder for a high-tech valve generic image or abstract engineering shot */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--industrial-border)] to-[var(--industrial-bg-primary)] opacity-50" />
                        <div
                            className="absolute inset-0 opacity-80 mix-blend-normal bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                            style={{ backgroundImage: "url('/images/text-image-rel.jpg')" }}
                        />
                        {/* Safe Zone Gradient for Text Overlay if needed */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--industrial-bg-primary)]/90 via-transparent to-transparent opacity-60" />

                        {/* Overlay HUD */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-xs font-mono text-[var(--industrial-accent)]">ENG.RESPONSE_MODULE</span>
                                <span className="text-xs font-mono text-white/50">SEC.03</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-white/10 p-4 bg-black/20 backdrop-blur-sm">
                                    <div className="text-xs text-white/50 mb-1">STRESS TEST</div>
                                    <div className="text-xl text-white font-mono">PASS</div>
                                </div>
                                <div className="border border-white/10 p-4 bg-black/20 backdrop-blur-sm">
                                    <div className="text-xs text-white/50 mb-1">MATERIAL</div>
                                    <div className="text-xl text-white font-mono">316L SS</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="lg:w-1/2 w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl font-serif font-bold text-white mb-10"
                        >
                            Our Response to <br />
                            <span className="text-[var(--industrial-accent)]">Unforgiving Conditions.</span>
                        </motion.h2>

                        <div className="space-y-12">
                            {responses.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.6 }}
                                    className="pl-6 border-l border-[var(--industrial-border)] hover:border-[var(--industrial-accent)] transition-colors duration-300"
                                >
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-[var(--industrial-text-secondary)] mb-3 leading-relaxed">{item.desc}</p>
                                    <div className="text-xs font-mono text-[var(--industrial-accent)] tracking-wider bg-[var(--industrial-bg-secondary)] inline-block px-2 py-1 rounded">
                                        {item.stat}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EngineeringResponse;
