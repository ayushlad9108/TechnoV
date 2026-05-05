import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '580px' }}
    >
      {/* Full-screen video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src="/processed_Petrochemical_refinery_at_202604260910.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Minimal overlay — just enough for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.32) 100%)',
        }}
      />

      {/* Text — centred, shifted above centre */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 2, paddingBottom: '12vh' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-medium text-white/60 uppercase tracking-[0.28em] mb-5"
          style={{ fontSize: 'clamp(0.55rem, 1vw, 0.72rem)' }}
        >
          Precision &nbsp;·&nbsp; Performance &nbsp;·&nbsp; Progress
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-white text-center leading-none select-none"
          style={{
            fontSize: 'clamp(3rem, 9.5vw, 8.5rem)',
            letterSpacing: '-0.025em',
            textShadow: '0 2px 28px rgba(0,0,0,0.5)',
          }}
        >
          TECHNOVALVES
        </motion.h1>
      </div>
    </section>
  );
};

export default HeroVideo;
