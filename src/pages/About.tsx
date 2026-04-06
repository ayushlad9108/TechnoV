import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--industrial-bg-primary)] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-[var(--industrial-accent)] font-mono text-sm tracking-widest uppercase mb-4 block">
            Est. 2015 — Nashik, Maharashtra
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            About <span className="text-[var(--industrial-accent)]">Techno Valves</span>
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            A leading supplier and trader of high-performance industrial valves, serving India's most critical industries since 2015.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative w-full aspect-video bg-[var(--industrial-bg-secondary)] border border-[var(--industrial-border)] rounded-sm overflow-hidden">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/industrial-bridge.jpg"
            >
              <source src="/TechnoValves.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-sm text-[var(--industrial-text-secondary)] mt-3 font-mono tracking-wider">
            TECHNO VALVES — COMPANY OVERVIEW
          </p>
        </motion.div>

        {/* Company Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Who We Are</h2>
            <div className="space-y-4 text-lg text-[var(--industrial-text-secondary)] leading-relaxed">
              <p>
                Established in 2015, Techno Valves has gained immense expertise in supplying and trading of Ball Valves, Industrial Ball Valves, Gate Valves, Globe Valves and a wide range of industrial flow control products.
              </p>
              <p>
                Located in Nashik, Maharashtra, we are one of the leading sellers of industrial valves in India, trusted by over 30 prestigious clients including BHEL, NTPC, TATA, Larsen & Toubro, MAHAGENCO and many more.
              </p>
              <p>
                Our products are exported to UAE, Saudi Arabia, United Kingdom, United States, Singapore, Australia and South Africa.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { label: 'Established',   value: '2015' },
              { label: 'Headquarters',  value: 'Nashik, Maharashtra, India' },
              { label: 'Specialisation', value: 'Ball, Gate & Globe Valves' },
              { label: 'Clients',       value: '30+ Prestigious Companies' },
              { label: 'Export Markets', value: '8+ Countries Worldwide' },
              { label: 'Certification', value: 'ISO 9001:2015' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-start border-b border-[var(--industrial-border)] pb-4">
                <span className="text-sm font-mono text-[var(--industrial-accent)] uppercase tracking-wider">{item.label}</span>
                <span className="text-base font-semibold text-white text-right max-w-xs">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--industrial-border)] border border-[var(--industrial-border)]"
        >
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '30+', label: 'Prestigious Clients' },
            { value: '8+',  label: 'Export Countries' },
            { value: 'ISO', label: '9001:2015 Certified' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--industrial-bg-secondary)] p-10 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--industrial-accent)] font-mono mb-2">{stat.value}</div>
              <div className="text-sm text-[var(--industrial-text-secondary)] uppercase tracking-widest font-mono">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
