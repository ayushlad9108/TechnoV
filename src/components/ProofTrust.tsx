import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 10, suffix: '+', label: 'YEARS EXPERIENCE', isNumber: true },
  { value: 30, suffix: '+', label: 'PRESTIGIOUS CLIENTS', isNumber: true },
  { value: 500, suffix: '+', label: 'PROJECTS DELIVERED', isNumber: true },
  { value: 'ISO', suffix: '', label: '9001:2015 CERTIFIED', isNumber: false },
];

const CountUp: React.FC<{ target: number; suffix: string; started: boolean }> = ({ target, suffix, started }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);

  return <>{count}{suffix}</>;
};

const Typewriter: React.FC<{ text: string; started: boolean }> = ({ text, started }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [started, text]);

  return <>{displayed}<span className="animate-pulse">|</span></>;
};

const ProofTrust: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-[var(--industrial-bg-primary)] border-t border-[var(--industrial-border)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--industrial-border)]/30">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                {stat.isNumber
                  ? <CountUp target={stat.value as number} suffix={stat.suffix} started={inView} />
                  : <>{stat.value}</>
                }
              </span>
              <span className="text-sm font-mono text-[var(--industrial-accent)] tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofTrust;
