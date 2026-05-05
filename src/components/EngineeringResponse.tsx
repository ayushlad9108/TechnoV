import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const responses = [
  { title: 'Precision Machining', desc: 'Manufacturing to micron-level tolerances using 5-axis CNC technology, ensuring perfect component mating and seal integrity.', stat: '±0.005mm TOLERANCE' },
  { title: 'Advanced Metallurgy', desc: 'Utilizing Inconel, Hastelloy, and Duplex Stainless Steels to resist hydrogen embrittlement and chloride stress corrosion.', stat: 'NACE MR0175 COMPLIANT' },
  { title: 'Rigorous Testing',    desc: 'Every valve undergoes hydrostatic, pneumatic, and fugitive emission testing beyond industry standards before shipment.', stat: '100% INSPECTION RATE' },
];

const EngineeringResponse: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--industrial-bg-primary)' }}
    >
      <div className="flex flex-col lg:flex-row">

        {/* ── Left: image panel ── */}
        <div
          className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12"
          style={{ background: 'var(--industrial-bg-primary)' }}
        >
          <motion.img
            src="/images/valve-response.png"
            alt="Industrial Valves"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-auto object-contain rounded-sm"
            style={{ maxHeight: '480px' }}
          />
        </div>

        {/* ── Right: content panel ── */}
        <div
          className="lg:w-1/2 flex items-center px-8 lg:px-14 py-16 lg:py-24"
          style={{ background: 'var(--industrial-bg-primary)' }}
        >
          <div className="w-full max-w-lg">

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold mb-10 leading-tight"
              style={{ color: 'var(--industrial-text-primary)', fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)' }}
            >
              Our Response to
              <br />
              <span style={{ color: 'var(--industrial-accent)' }}>Unforgiving Conditions.</span>
            </motion.h2>

            {/* Response items */}
            <div className="space-y-8">
              {responses.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group pl-5 border-l-2 transition-colors duration-300"
                  style={{ borderColor: 'var(--industrial-border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--industrial-accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--industrial-border)')}
                >
                  <h4 className="text-base font-bold mb-1.5" style={{ color: 'var(--industrial-text-primary)' }}>
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed mb-2.5" style={{ color: 'var(--industrial-text-secondary)' }}>
                    {item.desc}
                  </p>
                  <span
                    className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded"
                    style={{ color: 'var(--industrial-accent)', background: 'var(--industrial-bg-secondary)' }}
                  >
                    {item.stat}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringResponse;
