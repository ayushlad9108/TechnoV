import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Convert filename to readable label: "Gate_Valve_2.png" → "Gate Valve"
// Strips trailing numeric suffixes (_2, _3, _1, etc.) so duplicates show clean names
function fileToLabel(filename: string): string {
  return filename
    .replace(/\.png$/i, '')
    .replace(/_\d+$/, '')          // remove trailing _1, _2, _3 …
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

interface CategoryImage {
  file: string;   // filename only, e.g. "Gate_Valve.png"
  label: string;  // human-readable
}

interface ProductCategory {
  id: string;
  categoryName: string;       // shown below card
  folder: string;             // path prefix in /public
  images: CategoryImage[];
}

const productCategories: ProductCategory[] = [
  {
    id: 'ball-valves',
    categoryName: 'Ball Valves',
    folder: '/TechnoValves Final Photos/Ball Valves',
    images: [
      'Ball_Valve.png',
      'Ball_Check_Valve.png',
      'Cast_Iron_Flanged_Ball_Valve.png',
      'Electric_Actuated_3_Way_Ball_Valve.png',
      'Extended_Stem_Valves.png',
      'SS_Ball_Valve_1.png',
      'SS_Ball_Valve_2.png',
      'SS_Ball_Valve_3.png',
      'SS_Ball_Valve_4.png',
      'SS_Ball_Valve_5.png',
      'Stainless_Steel_Flanged_Ball_Valve.png',
      'Trunnion_Mounted_Ball_Valve.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'butterfly-valves',
    categoryName: 'Butterfly Valves',
    folder: '/TechnoValves Final Photos/Butterfly Valves',
    images: [
      'Butterfly_Valve.png',
      'Actuated_Valves.png',
      'Actuated_Valves_2.png',
      'Butterfly_Valve_2.png',
      'Butterfly_Valve_3.png',
      'Butterfly_Valve_4.png',
      'Cast_Iron_Butterfly_Valve.png',
      'Electric_Butterfly_Valve.png',
      'Electric_Operated_Butterfly_Valves.png',
      'Motorized_Butterfly_Valve.png',
      'Pneumatic_Actuated_Butterfly_Valve.png',
      'Pneumatic_Butterfly_Valve.png',
      'Triple_Offset_Butterfly_Valve.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'check-valves',
    categoryName: 'Check Valves',
    folder: '/TechnoValves Final Photos/Check Valves',
    images: [
      'Swing_Check_Valve.png',
      'Check_Non_Return_Valves.png',
      'Dual_Plate_Check_Valve.png',
      'Industrial_Check_Valve.png',
      'SS_Non_Return_Check_Valve.png',
      'Swing_Check_Valve_2.png',
      'Swing_Check_Valves_2.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'control-valves',
    categoryName: 'Control Valves',
    folder: '/TechnoValves Final Photos/Control Valves',
    images: [
      'Pneumatic_Control_Valves.png',
      'Electric_Control_Valves.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'gate-valves',
    categoryName: 'Gate Valves',
    folder: '/TechnoValves Final Photos/Gate Valves',
    images: [
      'Gate_Valve.png',
      '1000_NB_Gate_Valve.png',
      'Electric_Actuated_Gate_Valve.png',
      'Fabricated_Gate_Valve.png',
      'Forged_Steel_Gate_Valve.png',
      'Forged_Steel_Gate_Valves.png',
      'Gate_Valve_2.png',
      'Gate_Valve_3.png',
      'Gate_Valves_In_Super_Duplex.png',
      'Knife_Edge_Gate_Valve.png',
      'Knife_Gate_Valve.png',
      'Knife_Gate_Valve_2.png',
      'Knife_Gate_Valve_3.png',
      'SS_Forged_Gate_Valve.png',
      'Stainless_Steel_Gate_Valves.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'globe-valves',
    categoryName: 'Globe Valves',
    folder: '/TechnoValves Final Photos/Globe Valves',
    images: [
      'Globe_Valve.png',
      'Angle_Globe_Valve.png',
      'Flush_Bottom_Valve.png',
      'Globe_Valve_2.png',
      'Globe_Valve_3.png',
      'Globe_Valve_4.png',
      'Globe_Valve_For_Thermal_Fluids.png',
      'Jacketed_Globe_Valves.png',
      'Jacketed_Globe_Valves_2.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'diaphragm-valves',
    categoryName: 'Diaphragm Valves',
    folder: '/TechnoValves Final Photos/Diaphragm Valves',
    images: [
      'Diaphragm_Valve.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'dosing-systems',
    categoryName: 'Dosing Systems',
    folder: '/TechnoValves Final Photos/Dosing Systems',
    images: [
      'Dosing_Systems_And_Skid_Mounted_Packages_1.png',
      'Chemical_Dosing_Pumps.png',
      'Dosing_Systems_And_Skid_Mounted_Packages_2.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'industrial-valves',
    categoryName: 'Industrial Valves',
    folder: '/TechnoValves Final Photos/Industrial Valves',
    images: [
      'Jacketed_Valves_4.png',
      'Flanged_End_Ball_Valves_2.png',
      'Float_Valves.png',
      'Flush_Bottom_Valves_2.png',
      'SS_Jacketed_Valves.png',
      'Y_Valve_Flush_Bottom_With_Rtd_Sensor.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'agitators',
    categoryName: 'Agitators, Mixers & Strainers',
    folder: '/TechnoValves Final Photos/Agitators,Mixers and Strainers',
    images: [
      'Strainer_main.png',
      'Agitators_and_Mixers.png',
      'T_Type_Strainer.png',
      'Y_Type_Strainer.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'sensor-valves',
    categoryName: 'Sensor Valves',
    folder: '/TechnoValves Final Photos/Sensor Valves',
    images: [
      'RTD_Sensor_Valves.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
  {
    id: 'dampner',
    categoryName: 'Pulsation Dampner',
    folder: '/TechnoValves Final Photos/Dampner',
    images: [
      'Pulsation_Dampner.png',
    ].map(f => ({ file: f, label: fileToLabel(f) })),
  },
];

// ── Single category card ─────────────────────────────────────────────────────
function CategoryCard({ cat }: { cat: ProductCategory }) {
  const [imgIndex, setImgIndex] = useState(0);

  const current = cat.images[imgIndex];

  const handleViewMore = () => {
    setImgIndex(prev => (prev + 1) % cat.images.length);
  };

  return (
    <div className="flex flex-col">
      {/* Image Box */}
      <div
        className="relative overflow-hidden group"
        style={{
          background: '#f0f0f0',          aspectRatio: '4/3',
          border: '1.5px solid transparent',
          transition: 'border-color 0.25s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--industrial-accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
      >
        {/* Image label — top left (updates with current image) */}
        <span
          className="absolute top-3 left-3 z-10 font-semibold"
          style={{ fontSize: '0.62rem', color: 'var(--industrial-text-primary)', letterSpacing: '0.06em', lineHeight: 1.3, maxWidth: '60%' }}
        >
          {current.label.toUpperCase()}
        </span>

        {/* Logo — top right corner */}
        <img
          src="/logo 2.png"
          alt=""
          aria-hidden="true"
          className="absolute top-2.5 right-2.5 z-10 pointer-events-none select-none"
          style={{ width: '90px', height: 'auto', objectFit: 'contain', opacity: 0.9 }}
        />

        {/* Animated product image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current.file}
            src={`${cat.folder}/${current.file}`}
            alt={current.label}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              objectPosition: (cat.id === 'gate-valves' && current.file === 'Gate_Valve.png')
                ? '15% center'
                : 'center',
            }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.15'; }}
          />
        </AnimatePresence>


      </div>

      {/* Name & Button */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3
          className="font-bold"
          style={{ fontSize: '1.05rem', color: 'var(--industrial-accent)', lineHeight: 1.3 }}
        >
          {cat.categoryName}
        </h3>

        <button
          onClick={handleViewMore}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold text-xs transition-all"
          style={{ background: '#111', color: '#fff', cursor: 'pointer', letterSpacing: '0.01em' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--industrial-accent)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#111'; }}
        >
          View More
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Products() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--industrial-bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1
            className="font-bold leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: 'var(--industrial-text-primary)', lineHeight: 1.2 }}
          >
            Diverse Solutions Tailored
            <br />
            to your{' '}
            <span style={{ color: 'var(--industrial-accent)' }}>Every Need</span>
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {productCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
