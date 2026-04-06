import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  "APGENCO", "AQUANOMICS", "BHEL", "BRBCL", "GSECL", "MAHAGENCO",
  "DAE", "HP", "INDIANOIL", "JESA", "JSW", "KARNATAKA POWER CORP", "LARSEN & TOUBRO",
  "NTPC", "NPCIL", "SAMSUNG", "SAMUDA CHEMICAL", "TANGEDCO", "THERMAX", "TSGENCO",
  "PRAJ", "THYSSENKRUPP", "ION EXCHANGE", "GI", "TATA", "AQUATECH",
  "WORLEY", "SHAPOORJI PALLONJI", "WIPRO", "PETROFAC"
];

const MarqueeRow: React.FC<{ items: string[]; direction?: 'left' | 'right' }> = ({ items, direction = 'left' }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((name, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-8 py-4 border border-[var(--industrial-border)] bg-[var(--industrial-bg-primary)] hover:border-[var(--industrial-accent)] transition-colors duration-300"
          >
            <span className="text-base font-bold text-white/70 tracking-widest uppercase whitespace-nowrap hover:text-white transition-colors">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const StrategicPartners: React.FC = () => {
  const row1 = clients.slice(0, 15);
  const row2 = clients.slice(15);

  return (
    <section className="py-24 bg-[var(--industrial-bg-secondary)] border-b border-[var(--industrial-border)] overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 uppercase tracking-tighter">
          Prestigious Clients
        </h2>
        <div className="w-12 h-1 bg-[var(--industrial-accent)]" />
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
};

export default StrategicPartners;
