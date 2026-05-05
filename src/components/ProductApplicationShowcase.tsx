import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const showcaseProducts = [
  {
    id: 'ball-valve-001',
    name: '2PC Ball Valve',
    category: 'Ball Valves',
    description: 'Zero-leakage performance in critical flow control systems.',
    spec: 'PN100 / Class 600',
    price: 25000,
    image: '/background-remover (1)/2PC-350NB BALL VALVE.png',
  },
  {
    id: 'ball-valve-004',
    name: 'Pneumatic Ball Valve',
    category: 'Ball Valves',
    description: 'Pneumatically actuated for high-cycle automated applications.',
    spec: 'PN63 / Class 400',
    price: 42000,
    image: '/background-remover (1)/4_way_pneumatic_ball_valve.png',
  },
  {
    id: 'ball-valve-006',
    name: 'Jacketed Ball Valve',
    category: 'Ball Valves',
    description: 'Steam-jacketed to maintain media temperature and prevent solidification.',
    spec: 'PN40 / Class 300',
    price: 48000,
    image: '/background-remover (1)/Jacketed Ball valve.png',
  },
];

const industries = [
  { name: 'Oil & Gas',           image: '/images/industry-oil-gas.jpg',   desc: 'Upstream, midstream & downstream flow control' },
  { name: 'Power Generation',    image: '/images/industry-power.jpg',     desc: 'High-temp, high-pressure steam service' },
  { name: 'Chemical Processing', image: '/images/industry-chemical.jpg',  desc: 'Corrosion-resistant solutions for aggressive media' },
  { name: 'Water & Wastewater',  image: '/images/industry-water.jpg',     desc: 'Municipal and industrial water systems' },
];

const ProductApplicationShowcase: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* ── SECTION 1: Products ── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'var(--industrial-bg-secondary)' }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--industrial-border) 1px, transparent 1px), linear-gradient(90deg, var(--industrial-border) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold"
                style={{ color: 'var(--industrial-text-primary)', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
              >
                Engineered Solutions
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-mono tracking-wider transition-colors duration-200"
                style={{ color: 'var(--industrial-text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--industrial-accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--industrial-text-secondary)')}
              >
                View all products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden border transition-all duration-500"
                style={{
                  background: 'var(--industrial-bg-primary)',
                  borderColor: 'var(--industrial-border)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--industrial-accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--industrial-border)')}
              >
                {/* Image */}
                <div className="h-56 overflow-hidden" style={{ background: 'var(--industrial-bg-secondary)' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="text-xs font-mono mb-1" style={{ color: 'var(--industrial-accent)' }}>{p.category}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--industrial-text-primary)' }}>{p.name}</h3>
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--industrial-text-secondary)' }}>{p.description}</p>
                  <div className="text-xs font-mono mb-5 px-2 py-1 inline-block" style={{ color: 'var(--industrial-text-secondary)', background: 'var(--industrial-bg-secondary)' }}>
                    {p.spec}
                  </div>
                  <div className="flex items-center justify-end pt-4 border-t" style={{ borderColor: 'var(--industrial-border)' }}>
                    <button
                      onClick={() => window.location.href = '/get-quote'}
                      className="px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                      style={{ background: 'var(--industrial-accent)' }}
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Industries — Tesla-style full-bleed cards ── */}
      <section
        className="relative overflow-hidden pb-16"
        style={{ background: 'var(--industrial-bg-primary)' }}
      >
        {/* Header */}
        <div className="container mx-auto px-6 pt-24 pb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold"
            style={{ color: 'var(--industrial-text-primary)', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
          >
            Deployed Across
            <br />
            <span style={{ color: 'var(--industrial-accent)' }}>Critical Sectors</span>
          </motion.h2>
        </div>

        {/* Full-bleed industry cards — 2 columns, tall */}
        <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-80 md:h-96 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* BG image */}
              <img
                src={ind.image}
                alt={ind.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                  opacity: hovered === i ? 0.95 : 0.75,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <motion.div
                  animate={{ y: hovered === i ? -8 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{ind.name}</h3>
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="text-sm text-white/70"
                      >
                        {ind.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: 'var(--industrial-accent)' }}
              />
            </motion.div>
          ))}
        </div>
        </div>
      </section>
    </>
  );
};

export default ProductApplicationShowcase;
