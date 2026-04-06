import React from 'react';
import { products, type ValveProduct } from './products';
import { motion } from 'framer-motion';
import ValveCard from './ValveCard';

const applications = [
    { name: "Oil & Gas Extraction", icon: "M13 10V3L4 14h7v7l9-11h-7z", image: "/images/industry-oil-gas.jpg" },
    { name: "Power Generation", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", image: "/images/industry-power.jpg" },
    { name: "Chemical Processing", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", image: "/images/industry-chemical.jpg" },
    { name: "Water Desalination", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", image: "/images/industry-water.jpg" },
];

const ProductApplicationShowcase: React.FC = () => {
    return (
        <section className="py-32 bg-[var(--industrial-bg-secondary)] relative overflow-hidden">
            {/* Technical Grid Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `linear-gradient(var(--industrial-border) 1px, transparent 1px), linear-gradient(90deg, var(--industrial-border) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <span className="text-[var(--industrial-accent)] font-mono text-base tracking-widest uppercase mb-2 block">
                            High-Performance Inventory
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                            Engineered Solutions
                        </h2>
                    </div>
                    <p className="text-[var(--industrial-text-secondary)] text-lg max-w-md text-right md:mt-0 mt-6">
                        From standard high-pressure isolation to custom control solutions, we engineer valves for every critical application.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {products.map((product: ValveProduct) => (
                        <ValveCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Applications Strip - Visual Cards */}
                <div className="border-t border-[var(--industrial-border)] pt-16">
                    <h3 className="text-2xl font-bold text-white mb-10 text-left md:text-center">Deployed In</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {applications.map((app, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.01 }}
                                className="relative h-64 border border-[var(--industrial-border)] group overflow-hidden cursor-pointer bg-[var(--industrial-bg-primary)] gpu-accelerated"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 md:group-hover:scale-105 opacity-60 mix-blend-overlay md:group-hover:opacity-80 gpu-accelerated"
                                    style={{ backgroundImage: `url('${app.image}')` }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--industrial-bg-primary)] via-transparent to-transparent opacity-90" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center z-10">
                                    <div className="w-12 h-12 mb-4 text-[var(--industrial-accent)] transition-all duration-300 transform group-hover:-translate-y-2">
                                        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={app.icon} />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold text-white tracking-wide uppercase">{app.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductApplicationShowcase;
