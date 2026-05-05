import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroContinuation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--industrial-bg-primary)' }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src="/images/industrial-bridge.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, var(--industrial-bg-primary) 40%, transparent 100%), linear-gradient(to top, var(--industrial-bg-primary) 0%, transparent 40%)',
          }}
        />
      </motion.div>

      {/* Animated grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--industrial-border) 1px, transparent 1px), linear-gradient(90deg, var(--industrial-border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 relative z-10 py-32"
      >
        <div className="max-w-5xl">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[1.1] mb-8"
            style={{
              color: 'var(--industrial-text-primary)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
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

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="text-base md:text-lg font-light max-w-2xl leading-relaxed mb-12"
            style={{ color: 'var(--industrial-text-secondary)' }}
          >
            Since 1985, Techno Valves has manufactured Ball Valves, Gate Valves,
            Globe Valves &amp; NRV for India's most demanding industries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="px-8 py-3.5 text-sm font-semibold text-white rounded-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'var(--industrial-accent)' }}
            >
              Explore Products
            </Link>
            <Link
              to="/get-quote"
              className="px-8 py-3.5 text-sm font-semibold rounded-sm border transition-all duration-300 hover:-translate-y-0.5"
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

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-10 mt-20 pt-10 border-t"
            style={{ borderColor: 'var(--industrial-border)' }}
          >
            {[
              { val: '40+', label: 'Years of Manufacturing' },
              { val: '150+', label: 'Prestigious Clients' },
              { val: '6',   label: 'Export Countries' },
              { val: 'ISO', label: '9001:2015 Certified' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="text-3xl font-bold font-mono" style={{ color: 'var(--industrial-text-primary)' }}>{s.val}</div>
                <div className="text-xs font-mono tracking-wider mt-1" style={{ color: 'var(--industrial-text-secondary)' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroContinuation;
