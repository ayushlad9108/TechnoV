import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroContinuation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="flex flex-col lg:flex-row overflow-hidden"
      style={{ background: 'var(--industrial-bg-primary)' }}
    >
      {/* ── Left: text, vertically centered ── */}
      <div
        className="flex items-center lg:w-1/2 px-10 lg:px-16 py-20"
      >
        <div className="w-full max-w-lg">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[1.1] mb-6"
            style={{
              color: 'var(--industrial-text-primary)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Engineered to perform
            <br />
            <span style={{ color: 'var(--industrial-accent)' }}>
              where failure is not
            </span>
            <br />
            an option.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg font-light leading-relaxed mb-10"
            style={{ color: 'var(--industrial-text-secondary)' }}
          >
            Since 1985, Techno Valves has manufactured Ball Valves, Gate Valves,
            Globe Valves &amp; NRV for India's most demanding industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              to="/products"
              className="px-8 py-3.5 text-sm font-semibold text-white rounded-sm transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--industrial-accent)' }}
            >
              Explore Products
            </Link>
            <Link
              to="/get-quote"
              className="px-8 py-3.5 text-sm font-semibold rounded-sm border transition-all duration-300"
              style={{
                borderColor: 'var(--industrial-border)',
                color: 'var(--industrial-text-primary)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--industrial-accent)';
                (e.currentTarget as HTMLElement).style.color = 'var(--industrial-accent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--industrial-border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--industrial-text-primary)';
              }}
            >
              Get a Quote
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-10 pt-8 border-t"
            style={{ borderColor: 'var(--industrial-border)' }}
          >
            {[
              { val: '40+',  label: 'Years of Manufacturing' },
              { val: '150+', label: 'Prestigious Clients' },
              { val: '6',    label: 'Export Countries' },
              { val: 'ISO',  label: '9001:2015 Certified' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <div className="text-2xl font-bold font-mono" style={{ color: 'var(--industrial-text-primary)' }}>{s.val}</div>
                <div className="text-xs font-mono tracking-wider mt-1" style={{ color: 'var(--industrial-text-secondary)' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Right: valve image, natural proportions ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="lg:w-1/2 flex items-center justify-center"
        style={{ background: 'var(--industrial-bg-primary)' }}
      >
        <img
          src="/Valve Image.png"
          alt="Industrial Valve"
          className="w-full h-auto block"
          style={{ background: '#e8eaed' }}
        />
      </motion.div>

    </section>
  );
};

export default HeroContinuation;
