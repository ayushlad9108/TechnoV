import React from 'react';
import { motion } from 'framer-motion';
import type { ValveProduct } from './products';

interface ValveCardProps {
    product: ValveProduct;
}

const ValveCard: React.FC<ValveCardProps> = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="group relative bg-[var(--industrial-bg-secondary)] border border-[var(--industrial-border)] rounded-lg overflow-hidden hover:border-[var(--industrial-accent)] transition-all duration-300 gpu-accelerated hover:shadow-[var(--glow-soft)]"
        >
            <div className="h-64 overflow-hidden relative bg-[var(--industrial-bg-tertiary)] flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8 transition-transform duration-500 md:group-hover:scale-105 gpu-accelerated"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--industrial-bg-secondary)] to-transparent opacity-80" />
            </div>

            <div className="p-6 relative z-10 -mt-12">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-serif font-bold text-[var(--industrial-text-primary)] leading-tight">
                        {product.name}
                    </h3>
                    <span className="text-[var(--industrial-accent)] text-xs font-mono tracking-widest border border-[var(--industrial-accent)] px-2 py-1 rounded">
                        {product.id.toUpperCase()}
                    </span>
                </div>

                <p className="text-[var(--industrial-text-secondary)] text-lg mb-6 leading-relaxed">
                    {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 border-t border-[var(--industrial-border)] pt-4">
                    <div>
                        <p className="text-sm text-[var(--industrial-text-secondary)] uppercase tracking-wider mb-1">Pressure</p>
                        <p className="text-base font-semibold text-[var(--industrial-text-primary)]">{product.pressureRating}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[var(--industrial-text-secondary)] uppercase tracking-wider mb-1">Material</p>
                        <p className="text-base font-semibold text-[var(--industrial-text-primary)]">{product.material}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {product.applications.map((app) => (
                        <span key={app} className="text-sm bg-[var(--industrial-bg-primary)] text-[var(--industrial-text-secondary)] px-3 py-1 rounded">
                            {app}
                        </span>
                    ))}
                </div>

                <button className="btn-industrial w-full py-3 text-[var(--industrial-text-primary)] text-base font-medium tracking-wide uppercase flex items-center justify-center gap-2 group-hover:text-white">
                    View Specifications
                    <svg className="w-4 h-4 transform md:group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

export default ValveCard;
