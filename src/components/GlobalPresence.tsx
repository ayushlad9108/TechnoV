import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
    id: string;
    city: string;
    country: string;
    type: 'HQ' | 'Sales' | 'Factory';
    x: number; // percentage
    y: number; // percentage
    details: string;
}

const locations: Location[] = [
    { id: 'hq-usa', city: 'Houston', country: 'USA', type: 'HQ', x: 20, y: 40, details: 'Global Headquarters & R&D Center' },
    { id: 'sales-uae', city: 'Dubai', country: 'UAE', type: 'Sales', x: 62, y: 45, details: 'MENA Regional Sales Office' },
    { id: 'sales-germany', city: 'Frankfurt', country: 'Germany', type: 'Sales', x: 50, y: 30, details: 'European Distribution Hub' },
    { id: 'factory-india', city: 'Coimbatore', country: 'India', type: 'Factory', x: 72, y: 55, details: 'Primary Manufacturing Facility' },
    { id: 'sales-singapore', city: 'Singapore', country: 'Singapore', type: 'Sales', x: 80, y: 65, details: 'APAC Operations Center' },
    { id: 'sales-brazil', city: 'Rio de Janeiro', country: 'Brazil', x: 32, y: 75, type: 'Sales', details: 'South America Support' },
];

const GlobalPresence: React.FC = () => {
    const [selected, setSelected] = useState<Location | null>(null);

    return (
        <section className="py-32 bg-[var(--industrial-bg-primary)] border-t border-[var(--industrial-border)] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
                    >
                        Our <span className="text-[var(--industrial-accent)]">Global</span> Presence
                    </motion.h2>
                    <p className="text-[var(--industrial-text-secondary)] text-xl">
                        A World-Class Network Supporting Critical Infrastructure.
                    </p>
                </div>

                <div className="relative aspect-[1/1] md:aspect-[21/9] w-full bg-[var(--industrial-bg-secondary)] border border-[var(--industrial-border)] overflow-hidden rounded-sm group">
                    {/* Stylized Map Texture */}
                    <div
                        className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover md:bg-center bg-[80%_center] grayscale"
                    />

                    {/* SVG Map Lines (Simplified grid) */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2E3A45_1px,transparent_1px)] [background-size:40px_40px]" />

                    {/* Interactive Markers */}
                    <div className="absolute inset-0">
                        {locations.map((loc) => (
                            <motion.button
                                key={loc.id}
                                className="absolute w-4 h-4 -ml-2 -mt-2 group/marker z-10"
                                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                                whileHover={{ scale: 1.5 }}
                                onClick={() => setSelected(loc)}
                            >
                                <span className={`absolute inset-0 rounded-full animate-ping opacity-75 ${loc.type === 'HQ' ? 'bg-red-500' : 'bg-[var(--industrial-accent)]'}`} />
                                <span className={`relative block w-full h-full rounded-full border-2 border-white/50 ${loc.type === 'HQ' ? 'bg-red-600' : 'bg-[var(--industrial-accent)]'}`} />

                                {/* Label (Visible on hover or mobile) */}
                                <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-black/80 backdrop-blur-sm text-[10px] font-mono text-white opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none border border-white/10 uppercase">
                                    {loc.city}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Popover Card */}
                    <AnimatePresence>
                        {selected && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="absolute md:bottom-8 md:right-8 bottom-0 left-0 right-0 md:w-80 w-full bg-[var(--industrial-bg-primary)] border-t md:border border-[var(--industrial-accent)] p-6 shadow-2xl z-30"
                            >
                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute top-4 right-4 text-[var(--industrial-text-secondary)] hover:text-white"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="text-[var(--industrial-accent)] font-mono text-[10px] mb-2">LOCAL_NODE_INFO</div>
                                <h4 className="text-xl font-bold text-white mb-1">{selected.type} - {selected.city}</h4>
                                <div className="text-sm text-white/50 mb-4">{selected.country}</div>
                                <p className="text-sm text-[var(--industrial-text-secondary)] leading-relaxed">
                                    {selected.details}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* View Controls HUD */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                        <div className="w-8 h-8 border border-white/10 bg-black/20 flex items-center justify-center text-white/50 hover:bg-white/10 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </div>
                        <div className="w-8 h-8 border border-white/10 bg-black/20 flex items-center justify-center text-white/50 hover:bg-white/10 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalPresence;
