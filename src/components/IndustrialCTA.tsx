import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const IndustrialCTA: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-t"
      style={{ background: 'var(--industrial-bg-primary)', borderColor: 'var(--industrial-border)' }}
    >
      {/* Parallax BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] z-0 pointer-events-none">
        <img
          src="/images/industrial-bridge.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.12 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, var(--industrial-bg-primary) 80%)',
          }}
        />
      </motion.div>

      {/* Animated accent lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.06 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.2 }}
            className="absolute left-0 right-0 h-px origin-left"
            style={{
              background: 'var(--industrial-accent)',
              top: `${30 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold tracking-tight mb-6 leading-none"
          style={{ color: 'var(--industrial-text-primary)', fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
        >
          Engineered for
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--industrial-accent), var(--industrial-highlight))' }}
          >
            Reliability.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base font-light max-w-2xl mx-auto mb-14 leading-relaxed"
          style={{ color: 'var(--industrial-text-secondary)' }}
        >
          Precision you can trust. Performance you can measure.
          Experience four decades of industrial flow control expertise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/products"
            className="px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: 'var(--industrial-accent)' }}
          >
            Explore Valve Solutions
          </Link>
          <a
            href="/TechnoValves-Brochure.pdf"
            download
            className="px-10 py-4 text-sm font-bold uppercase tracking-widest border transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: 'var(--industrial-border)',
              color: 'var(--industrial-text-primary)',
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
            Download Brochure
          </a>
          <Link
            to="/get-quote"
            className="px-10 py-4 text-sm font-bold uppercase tracking-widest border transition-all duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: 'var(--industrial-border)',
              color: 'var(--industrial-text-primary)',
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
            Request a Quote
          </Link>
        </motion.div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-20 pt-10 border-t"
          style={{ borderColor: 'var(--industrial-border)' }}
        >
          {['ISO 9001:2015', 'API 6D / 600'].map((cert, i) => (
            <motion.span
              key={cert}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: 'var(--industrial-text-secondary)' }}
            >
              {cert}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrialCTA;
