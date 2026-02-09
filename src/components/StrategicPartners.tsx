import React from 'react';
import { motion } from 'framer-motion';

const partners = [
    { name: "KENT CONTROL", slogan: "Precision Monitoring", logo: "K" },
    { name: "PARAMOUNT VALVES", slogan: "Industrial Isolation", logo: "P" },
    { name: "HAMMEL DAHL", slogan: "Flow Control Experts", logo: "HD" },
    { name: "PALADON", slogan: "Actuation Systems", logo: "PL" },
    { name: "REXA", slogan: "Linear Actuators", logo: "RX" }
];

const StrategicPartners: React.FC = () => {
    return (
        <section className="py-24 bg-[var(--industrial-bg-secondary)] border-b border-[var(--industrial-border)]">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl font-serif font-bold text-white mb-2 uppercase tracking-tighter">Strategic Ecosystem</h2>
                    <div className="w-12 h-1 bg-[var(--industrial-accent)]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--industrial-border)] border border-[var(--industrial-border)]">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                            className="bg-[var(--industrial-bg-secondary)] p-12 flex flex-col items-center justify-center text-center group transition-all duration-300"
                        >
                            <div className="w-16 h-16 mb-6 flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[var(--industrial-accent)] transition-colors">
                                <span className="text-2xl font-black text-white/20 group-hover:text-[var(--industrial-accent)] font-mono">{partner.logo}</span>
                            </div>
                            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-1">{partner.name}</h4>
                            <p className="text-[var(--industrial-text-secondary)] text-[10px] uppercase font-mono">{partner.slogan}</p>

                            <motion.button
                                className="mt-6 text-[var(--industrial-accent)] text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity"
                                whileHover={{ x: 5 }}
                            >
                                Know More →
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StrategicPartners;
