import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const pillars = [
  { icon: '⚙️', title: 'Precision First',    desc: 'Every component machined to micron-level tolerances. No shortcuts, no compromises.' },
  { icon: '🔬', title: 'Material Mastery',   desc: 'Inconel, Hastelloy, Duplex SS — we select materials that outlast the harshest environments.' },
  { icon: '✅', title: '100% Tested',        desc: 'Hydrostatic, pneumatic, and fugitive emission tests on every single valve before it ships.' },
  { icon: '🌍', title: 'Global Standards',   desc: 'API 6D, ISO 9001:2015, NACE MR0175 — built to the world\'s most demanding specifications.' },
];

const BrandPhilosophy: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32"
      style={{ background: 'var(--industrial-bg-secondary)' }}
    >
      {/* Parallax BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] z-0 pointer-events-none">
        <img
          src="/images/perf-aware.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.1 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, var(--industrial-bg-secondary) 0%, transparent 25%, transparent 75%, var(--industrial-bg-secondary) 100%)',
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Quote block */}
        <motion.div
          style={{ y: textY }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-16 h-0.5 mx-auto mb-10"
            style={{ background: 'var(--industrial-accent)' }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-tight mb-6"
            style={{ color: 'var(--industrial-text-primary)', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
          >
            We don't just manufacture valves.
            <br />
            <em className="not-italic" style={{ color: 'var(--industrial-accent)' }}>
              We engineer confidence.
            </em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base font-light leading-relaxed"
            style={{ color: 'var(--industrial-text-secondary)' }}
          >
            In an industry where a single failure can be catastrophic, we choose to over-engineer.
            From the drawing board to the final pressure test, every Techno Valves product is built
            with a singular purpose: to perform flawlessly when it matters most.
          </motion.p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--industrial-border)]">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group p-8 flex flex-col gap-4 transition-colors duration-300"
              style={{ background: 'var(--industrial-bg-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--industrial-bg-primary)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--industrial-bg-secondary)')}
            >
              <span className="text-3xl">{p.icon}</span>
              <h4 className="text-lg font-bold" style={{ color: 'var(--industrial-text-primary)' }}>{p.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--industrial-text-secondary)' }}>{p.desc}</p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                className="w-8 h-0.5 mt-auto origin-left"
                style={{ background: 'var(--industrial-accent)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-wider transition-colors duration-200"
            style={{ color: 'var(--industrial-text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--industrial-accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--industrial-text-secondary)')}
          >
            Learn about our story
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandPhilosophy;
