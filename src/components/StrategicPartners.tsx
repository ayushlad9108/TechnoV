import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: 'APGENCO',             logo: '/images/APGENCO.png',             ext: 'png'  },
  { name: 'AQUANOMICS',          logo: '/images/AQUANOMICS.jpeg',          ext: 'jpeg' },
  { name: 'AQUATECH',            logo: '/images/AQUATECH.png',             ext: 'png'  },
  { name: 'BHEL',                logo: '/images/BHEL.png',                 ext: 'png'  },
  { name: 'BRBCL',               logo: '/images/BRBCL.jpeg',               ext: 'jpeg' },
  { name: 'DAE',                 logo: '/images/DAE.jpeg',                 ext: 'jpeg' },
  { name: 'GI',                  logo: '/images/GI.png',                   ext: 'png'  },
  { name: 'GSECL',               logo: '/images/GSECL.jpeg',               ext: 'jpeg' },
  { name: 'HP',                  logo: '/images/HP.png',                   ext: 'png'  },
  { name: 'INDIANOIL',           logo: '/images/INDIANOIL.png',            ext: 'png'  },
  { name: 'ION EXCHANGE',        logo: '/images/ION EXCHANGE.png',         ext: 'png'  },
  { name: 'JESA',                logo: '/images/JESA.png',                 ext: 'png'  },
  { name: 'JSW',                 logo: '/images/JSW.png',                  ext: 'png'  },
  { name: 'KARNATAKA POWER CORP',logo: '/images/KARNATAKA POWER CORP.jpeg',ext: 'jpeg' },
  { name: 'LARSEN & TOUBRO',     logo: '/images/LARSEN & TOUBRO.png',      ext: 'png'  },
  { name: 'MAHAGENCO',           logo: '/images/MAHAGENCO.png',            ext: 'png'  },
  { name: 'NPCIL',               logo: '/images/NPCIL.png',                ext: 'png'  },
  { name: 'NTPC',                logo: '/images/NTPC.png',                 ext: 'png'  },
  { name: 'PETROFAC',            logo: '/images/PETROFAC.png',             ext: 'png'  },
  { name: 'PRAJ',                logo: '/images/PRAJ.png',                 ext: 'png'  },
  { name: 'SAMSUNG',             logo: '/images/SAMSUNG.jpeg',             ext: 'jpeg' },
  { name: 'SAMUDA CHEMICAL',     logo: '/images/SAMUDA CHEMICAL.jpeg',     ext: 'jpeg' },
  { name: 'SHAPOORJI PALLONJI',  logo: '/images/SHAPOORJI PALLONJI.png',   ext: 'png'  },
  { name: 'TANGEDCO',            logo: '/images/TANGEDCO.png',             ext: 'png'  },
  { name: 'TATA',                logo: '/images/TATA.png',                 ext: 'png'  },
  { name: 'THERMAX',             logo: '/images/THERMAX.png',              ext: 'png'  },
  { name: 'THYSSENKRUPP',        logo: '/images/THYSSENKRUPP.png',         ext: 'png'  },
  { name: 'TSGENCO',             logo: '/images/TSGENCO.jpeg',             ext: 'jpeg' },
  { name: 'WIPRO',               logo: '/images/WIPRO.png',                ext: 'png'  },
  { name: 'WORLEY',              logo: '/images/WORLEY.png',               ext: 'png'  },
];

interface LogoCardProps {
  client: typeof clients[0];
  index: number;
}

const LogoCard: React.FC<LogoCardProps> = ({ client, index }) => (
  <div
    key={index}
    className="flex-shrink-0 flex items-center justify-center px-8 py-5 border border-[var(--industrial-border)] bg-[var(--industrial-bg-primary)] hover:border-[var(--industrial-accent)] transition-colors duration-300 group"
    style={{ minWidth: '160px', height: '80px' }}
  >
    <img
      src={client.logo}
      alt={client.name}
      className="max-h-10 max-w-[120px] w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      style={{ filter: 'none' }}
      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.8'; }}
      onError={e => {
        // Fallback to text if image fails
        const parent = e.currentTarget.parentElement;
        if (parent) {
          e.currentTarget.style.display = 'none';
          const span = document.createElement('span');
          span.className = 'text-xs font-bold tracking-widest uppercase text-[var(--industrial-text-secondary)]';
          span.textContent = client.name;
          parent.appendChild(span);
        }
      }}
    />
  </div>
);

interface MarqueeRowProps {
  items: typeof clients;
  direction?: 'left' | 'right';
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = 'left' }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-0 w-max"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((client, i) => (
          <LogoCard key={`${client.name}-${i}`} client={client} index={i} />
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
        <h2
          className="text-4xl md:text-5xl font-display font-bold mb-2 uppercase tracking-tighter"
          style={{ color: 'var(--industrial-text-primary)' }}
        >
          Prestigious Clients
        </h2>
        <div className="w-12 h-1 bg-[var(--industrial-accent)]" />
      </div>

      <div className="flex flex-col gap-0">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
};

export default StrategicPartners;
