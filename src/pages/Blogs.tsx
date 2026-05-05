import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Blog {
  _id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  createdAt: string;
}

// Static seed blogs shown when server has no data yet
const SEED_BLOGS: Blog[] = [
  {
    _id: '1',
    title: 'TechnoValves at PETROTECH 2025 — New Delhi',
    date: '2025-03-15',
    summary: 'We participated in PETROTECH 2025, India\'s premier oil & gas technology exhibition, showcasing our latest high-pressure ball valve series to 200+ industry leaders.',
    content: `TechnoValves proudly participated in PETROTECH 2025 held at Bharat Mandapam, New Delhi. Our team showcased the newly launched PN160 3PC Ball Valve series and the Steam-Jacketed Ball Valve range, drawing significant interest from procurement teams at ONGC, BPCL, and HPCL.\n\nKey highlights from the event:\n• Live demonstration of our pneumatic actuator integration\n• Technical sessions on fugitive emission compliance\n• Signed MoUs with 3 new distribution partners\n\nThe event reinforced our commitment to serving India's energy sector with world-class valve solutions.`,
    image: '/images/Gemini_Generated_Image_trnjlntrnjlntrnj (1).png',
    tags: ['Exhibition', 'Oil & Gas', 'PETROTECH'],
    createdAt: '2025-03-15T10:00:00Z',
  },
  {
    _id: '2',
    title: 'ISO 9001:2015 Recertification Achieved',
    date: '2025-02-10',
    summary: 'TechnoValves successfully completed its ISO 9001:2015 recertification audit, reaffirming our commitment to quality management across all operations.',
    content: `We are proud to announce the successful completion of our ISO 9001:2015 recertification audit conducted by Bureau Veritas. The audit covered all aspects of our quality management system including procurement, testing, documentation, and customer service.\n\nThe auditors specifically commended our:\n• 100% hydrostatic testing protocol\n• Traceability system for raw materials\n• Customer complaint resolution process\n\nThis certification reinforces our position as a trusted supplier to critical industries including power generation, petrochemicals, and water treatment.`,
    image: '/images/Gemini_Generated_Image_f1o348f1o348f1o3 (1).png',
    tags: ['Certification', 'Quality', 'ISO'],
    createdAt: '2025-02-10T09:00:00Z',
  },
  {
    _id: '3',
    title: 'New Partnership with BHEL for Power Plant Valves',
    date: '2025-01-20',
    summary: 'TechnoValves has been empanelled as an approved vendor for BHEL\'s thermal power plant projects, covering supply of high-temperature gate and globe valves.',
    content: `TechnoValves has been officially empanelled as an approved vendor by Bharat Heavy Electricals Limited (BHEL) for the supply of high-temperature, high-pressure gate valves and globe valves for their upcoming thermal power plant projects.\n\nThis empanelment covers:\n• Class 600 and Class 900 gate valves in alloy steel\n• Globe control valves for steam service\n• Extended stem ball valves for insulated lines\n\nThis partnership marks a significant milestone in our journey and validates the quality and reliability of our products at the highest levels of Indian industry.`,
    image: '/images/Gemini_Generated_Image_d7a57gd7a57gd7a5 (1).png',
    tags: ['Partnership', 'BHEL', 'Power Generation'],
    createdAt: '2025-01-20T08:00:00Z',
  },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selected, setSelected] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs`)
      .then(r => r.json())
      .then(data => {
        setBlogs(Array.isArray(data) && data.length > 0 ? data : SEED_BLOGS);
      })
      .catch(() => setBlogs(SEED_BLOGS))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-[var(--industrial-accent)] font-mono text-sm tracking-widest uppercase mb-3 block">
            News &amp; Events
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--industrial-text-primary)] mb-4">
            Latest from TechnoValves
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-2xl">
            Events, certifications, partnerships and industry updates from our team.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-[var(--industrial-accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : selected ? (
          /* ── Blog Detail View ── */
          <motion.div
            key={selected._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-[var(--industrial-accent)] mb-8 hover:underline font-mono text-sm uppercase tracking-wider"
            >
              ← Back to all posts
            </button>

            <div className="bg-[var(--industrial-bg-secondary)] rounded-lg border border-[var(--industrial-border)] overflow-hidden">
              <div className="h-72 overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-[var(--industrial-accent)] border border-[var(--industrial-accent)] px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--industrial-text-primary)] mb-3">
                  {selected.title}
                </h2>
                <p className="text-sm font-mono text-[var(--industrial-text-secondary)] mb-8">
                  {formatDate(selected.date || selected.createdAt)}
                </p>
                <div className="prose prose-invert max-w-none">
                  {selected.content.split('\n').map((para, i) => (
                    para.trim() ? (
                      <p key={i} className="text-[var(--industrial-text-secondary)] text-lg leading-relaxed mb-4">
                        {para}
                      </p>
                    ) : <br key={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Blog Grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => { setSelected(blog); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[var(--industrial-bg-secondary)] rounded-lg border border-[var(--industrial-border)] hover:border-[var(--industrial-accent)] transition-all cursor-pointer group overflow-hidden"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-[var(--industrial-bg-primary)]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs font-mono text-[var(--industrial-accent)] border border-[var(--industrial-accent)]/50 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[var(--industrial-text-primary)] mb-2 group-hover:text-[var(--industrial-accent)] transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs font-mono text-[var(--industrial-text-secondary)] mb-3">
                    {formatDate(blog.date || blog.createdAt)}
                  </p>

                  <p className="text-[var(--industrial-text-secondary)] text-sm leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-[var(--industrial-accent)] text-sm font-medium group-hover:gap-2 transition-all">
                    Read more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
