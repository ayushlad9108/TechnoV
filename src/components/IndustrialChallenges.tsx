import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const challenges = [
  { id: '01', title: 'Extreme Pressure',  description: 'Handling localized spikes up to 20,000 PSI without structural deformation or seal compromise.', highlight: 'Structural Integrity' },
  { id: '02', title: 'Thermal Extremes',  description: 'Operating flawlessly from cryogenic depths (−196°C) to superheated steam (+800°C).', highlight: 'Thermal Stability' },
  { id: '03', title: 'Corrosive Media',   description: 'Resisting aggressive chemical attack through advanced metallurgy and proprietary coatings.', highlight: 'Material Science' },
  { id: '04', title: 'Zero Leakage',      description: 'Meeting fugitive emission standards where environmental safety is non-negotiable.', highlight: 'Triple-Seal Tech' },
];

const IndustrialChallenges: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--industrial-bg-secondary)' }}
    >
      {/* Parallax BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/industrial-challenges.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.09 }}
        />
        <div className="absolute inset-0" style={{ background: 'var(--industrial-bg-secondary)', opacity: 0.85 }} />
      </motion.div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--industrial-border) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-tight"
            style={{ color: 'var(--industrial-text-primary)', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
          >
            Industry doesn't ask for permission.
            <br />
            <span style={{ color: 'var(--industrial-accent)' }}>It demands resilience.</span>
          </motion.h2>
        </div>

        {/* Challenge cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--industrial-border)]">
          {challenges.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-10 overflow-hidden cursor-default"
              style={{ background: 'var(--industrial-bg-secondary)' }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, var(--industrial-accent)/5%, transparent)' }}
              />

              {/* Number */}
              <span
                className="absolute top-8 right-8 font-mono text-6xl font-bold opacity-[0.06] select-none"
                style={{ color: 'var(--industrial-text-primary)' }}
              >
                {c.id}
              </span>

              {/* Accent bar — animates in on scroll */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className="w-10 h-0.5 mb-6 origin-left"
                style={{ background: 'var(--industrial-accent)' }}
              />

              <h3
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: 'var(--industrial-text-primary)' }}
              >
                {c.title}
              </h3>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--industrial-text-secondary)' }}>
                {c.description}
              </p>
              <div
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                style={{ color: 'var(--industrial-accent)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--industrial-accent)' }} />
                {c.highlight}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrialChallenges;
