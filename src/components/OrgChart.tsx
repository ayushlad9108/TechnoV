import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Person {
  name: string;
  role: string;
  subtitle?: string;
  // To add a photo: set this to the image path e.g. "/team/sanjay-jadhav.jpg"
  // Place images in the public/team/ folder
  photo?: string;
}

interface Department {
  label: string;
  icon: string;
  members: Person[];
}

// ─── Organisation Data ────────────────────────────────────────────────────────
const leadership: Person[] = [
  {
    name: 'Mr. Sanjay Jadhav',
    role: 'Managing Director',
    photo: undefined,
  },
  {
    name: 'Mr. Ajay Joshi',
    role: 'CEO',
    subtitle: 'IIT Mumbai',
    photo: undefined,
  },
];

const departments: Department[] = [
  {
    label: 'Admin',
    icon: '🏢',
    members: [
      { name: 'Mrs. Sampada Parandkar', role: 'Business Development Manager' },
    ],
  },
  {
    label: 'Sales & Marketing',
    icon: '📈',
    members: [
      { name: 'Mr. Shashikant Shinde', role: 'Sales Executive' },
    ],
  },
  {
    label: 'Design & Engineering',
    icon: '⚙️',
    members: [
      { name: 'Mr. Amol Lahade',   role: 'Design Manager' },
      { name: 'Mr. Saurabh Singh', role: 'Sr. Design Engineer' },
      { name: 'Mr. Roshan Wagh',   role: 'Jr. Design Engineer' },
    ],
  },
  {
    label: 'Procurement',
    icon: '📦',
    members: [
      { name: 'Miss. Rupali Chordiya', role: 'Purchase Executive' },
      { name: 'Mrs. Yogesh Vetal',     role: 'Purchase Assistant' },
    ],
  },
  {
    label: 'Production',
    icon: '🔧',
    members: [
      { name: 'Mr. Santosh Thakur',   role: 'Production Engineer (Pump)' },
      { name: 'Mr. Dhananjay Chatur', role: 'Production Engineer (Valve)' },
    ],
  },
  {
    label: 'Quality',
    icon: '✅',
    members: [
      { name: 'Mr. Swapnaj Shinde', role: 'Quality Engineer' },
    ],
  },
  {
    label: 'Accounts',
    icon: '💼',
    members: [
      { name: 'Mrs. Ashwini Jadhav', role: 'Sr. Accountant' },
      { name: 'Mrs. Ankita Dhoke',   role: 'Jr. Accountant' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .replace(/^(Mr\.|Mrs\.|Miss\.|Ms\.|Dr\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

// Deterministic pastel-ish color from name string
const AVATAR_COLORS = [
  'from-emerald-600 to-teal-700',
  'from-sky-600 to-blue-700',
  'from-violet-600 to-purple-700',
  'from-rose-600 to-pink-700',
  'from-amber-500 to-orange-600',
  'from-cyan-600 to-sky-700',
  'from-indigo-600 to-violet-700',
];
function avatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Person Card ──────────────────────────────────────────────────────────────
interface PersonCardProps {
  person: Person;
  size?: 'large' | 'normal';
  delay?: number;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, size = 'normal', delay = 0 }) => {
  const isLarge = size === 'large';
  const photoSize = isLarge ? 'w-32 h-32' : 'w-24 h-24';
  const nameSize  = isLarge ? 'text-sm font-bold' : 'text-xs font-semibold';
  const roleSize  = isLarge ? 'text-xs' : 'text-[11px]';
  const gradient  = avatarGradient(person.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-2 group"
    >
      {/* Photo / Avatar */}
      <div className={`${photoSize} rounded-lg overflow-hidden relative flex-shrink-0 shadow-md ring-2 ring-transparent group-hover:ring-[var(--industrial-accent)] transition-all duration-300`}>
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className={`text-white font-bold ${isLarge ? 'text-3xl' : 'text-xl'}`}>
              {getInitials(person.name)}
            </span>
          </div>
        )}
        {/* Photo placeholder overlay — shown only when no photo */}
        {!person.photo && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <span className="text-white/0 group-hover:text-white/80 text-[10px] font-mono transition-all duration-300 text-center px-1">
              Add photo
            </span>
          </div>
        )}
      </div>

      {/* Name & Role */}
      <div className="text-center max-w-[120px]">
        <p className={`${nameSize} text-white leading-tight`}>{person.name}</p>
        {person.subtitle && (
          <p className="text-[10px] text-[var(--industrial-accent)] font-mono mt-0.5">{person.subtitle}</p>
        )}
        <p className={`${roleSize} text-[var(--industrial-text-secondary)] mt-0.5 leading-tight`}>{person.role}</p>
      </div>
    </motion.div>
  );
};

// ─── Department Section ───────────────────────────────────────────────────────
interface DeptSectionProps {
  dept: Department;
  sectionIndex: number;
}

const DeptSection: React.FC<DeptSectionProps> = ({ dept, sectionIndex }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: sectionIndex * 0.05 }}
    className="mb-12"
  >
    {/* Department label */}
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[var(--industrial-border)]">
      <span className="text-xl">{dept.icon}</span>
      <h3 className="text-lg font-bold text-white tracking-wide uppercase font-mono">
        {dept.label}
      </h3>
      <div className="flex-1 h-px bg-[var(--industrial-border)]" />
      <span className="text-xs text-[var(--industrial-text-secondary)] font-mono">
        {dept.members.length} {dept.members.length === 1 ? 'member' : 'members'}
      </span>
    </div>

    {/* Members grid */}
    <div className="flex flex-wrap gap-8">
      {dept.members.map((person, i) => (
        <PersonCard
          key={person.name}
          person={person}
          size="normal"
          delay={sectionIndex * 0.05 + i * 0.06}
        />
      ))}
    </div>
  </motion.div>
);

// ─── Main Export ──────────────────────────────────────────────────────────────
const OrgChart: React.FC = () => {
  const [showPhotoTip, setShowPhotoTip] = useState(false);

  return (
    <section className="py-20 border-t border-[var(--industrial-border)]"
      style={{ background: 'var(--industrial-bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[var(--industrial-accent)] font-mono text-xs tracking-widest uppercase mb-3 block">
            The Team
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Who We Are
          </h2>
          <p className="text-[var(--industrial-text-secondary)] max-w-lg mx-auto text-base">
            The people behind four decades of precision valve manufacturing.
          </p>

          {/* Photo tip toggle */}
          <button
            onClick={() => setShowPhotoTip(v => !v)}
            className="mt-5 inline-flex items-center gap-2 text-xs font-mono text-[var(--industrial-accent)] border border-[var(--industrial-accent)]/40 px-3 py-1.5 rounded hover:bg-[var(--industrial-accent)]/10 transition-colors"
          >
            <span>📷</span>
            <span>How to add team photos</span>
          </button>

          {showPhotoTip && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-left text-xs text-[var(--industrial-text-secondary)] bg-[var(--industrial-bg-secondary)] border border-[var(--industrial-border)] rounded-xl px-5 py-4 max-w-lg mx-auto space-y-1.5"
            >
              <p className="font-semibold text-white mb-2">Adding photos is simple:</p>
              <p>1. Place image files in <code className="text-[var(--industrial-accent)] bg-black/30 px-1 rounded">public/team/</code></p>
              <p>2. Open <code className="text-[var(--industrial-accent)] bg-black/30 px-1 rounded">src/components/OrgChart.tsx</code></p>
              <p>3. Find the person and set their <code className="text-[var(--industrial-accent)] bg-black/30 px-1 rounded">photo</code> field:</p>
              <pre className="bg-black/40 rounded p-2 mt-1 text-[10px] text-emerald-400 overflow-x-auto">{`{ name: 'Mr. Sanjay Jadhav',\n  role: 'Managing Director',\n  photo: '/team/sanjay-jadhav.jpg' }`}</pre>
              <p className="text-[var(--industrial-text-secondary)] mt-1">Hover any card to see the "Add photo" prompt.</p>
            </motion.div>
          )}
        </motion.div>

        {/* ── Leadership ── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-[var(--industrial-accent)]/40">
            <span className="text-xl">👑</span>
            <h3 className="text-lg font-bold text-white tracking-wide uppercase font-mono">
              Leadership
            </h3>
          </div>
          <div className="flex flex-wrap gap-10">
            {leadership.map((person, i) => (
              <PersonCard
                key={person.name}
                person={person}
                size="large"
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* ── Departments ── */}
        {departments.map((dept, i) => (
          <DeptSection key={dept.label} dept={dept} sectionIndex={i} />
        ))}

      </div>
    </section>
  );
};

export default OrgChart;
