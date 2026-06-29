import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const VALID_DOMAINS = [
  'gmail.com', 'yahoo.com', 'yahoo.in', 'outlook.com', 'hotmail.com',
  'live.com', 'icloud.com', 'rediffmail.com', 'protonmail.com',
  'zoho.com', 'ymail.com', 'msn.com',
];

function validateEmail(email: string): string {
  if (!email) return 'Email is required.';
  const parts = email.split('@');
  if (parts.length !== 2) return 'Enter a valid email address.';
  const domain = parts[1].toLowerCase();
  if (!VALID_DOMAINS.includes(domain)) {
    return 'Please use a personal email (Gmail, Yahoo, Outlook, etc.).';
  }
  return '';
}

const inputClass =
  'w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]';
const labelClass = 'block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]';

export default function GetQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '',
    industry: '', valveType: '', quantity: '',
    specifications: '', timeline: '',
  });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') setEmailError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(formData.email);
    if (err) { setEmailError(err); return; }

    const subject = encodeURIComponent(`Quote Request from ${formData.name} - ${formData.company}`);
    const body = encodeURIComponent([
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Company: ${formData.company}`,
      ``,
      `Industry: ${formData.industry}`,
      `Valve Type: ${formData.valveType}`,
      `Quantity: ${formData.quantity}`,
      `Required Timeline: ${formData.timeline || 'Not specified'}`,
      ``,
      `Specifications & Requirements:`,
      formData.specifications,
    ].join('\n'));

    window.location.href = `mailto:marketing@technovalves.org?cc=sales@technovalves.org&subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', company: '', industry: '', valveType: '', quantity: '', specifications: '', timeline: '' });
    setEmailError('');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-[var(--industrial-text-primary)]">Request a Quote</h1>
          <p className="text-xl text-[var(--industrial-text-secondary)]">
            Tell us about your requirements and we'll provide a customized solution
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── Form ── */}
          {!submitted && (
            <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                      className={`${inputClass} ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="you@gmail.com" />
                    {emailError && <p className="mt-1.5 text-xs text-red-400">{emailError}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Company *</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Industry *</label>
                    <select name="industry" required value={formData.industry} onChange={handleChange} className={inputClass}>
                      <option value="">Select Industry</option>
                      <option value="Oil & Gas">Oil &amp; Gas</option>
                      <option value="Chemical Processing">Chemical Processing</option>
                      <option value="Power Generation">Power Generation</option>
                      <option value="Water & Wastewater">Water &amp; Wastewater</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Valve Type *</label>
                    <select name="valveType" required value={formData.valveType} onChange={handleChange} className={inputClass}>
                      <option value="">Select Valve Type</option>
                      <option value="Ball Valve">Ball Valve</option>
                      <option value="Gate Valve">Gate Valve</option>
                      <option value="Globe Valve">Globe Valve</option>
                      <option value="Check Valve / NRV">Check Valve / NRV</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Quantity *</label>
                    <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Required Timeline</label>
                    <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="e.g., 2-3 weeks" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Specifications &amp; Requirements *</label>
                  <textarea name="specifications" required rows={6} value={formData.specifications} onChange={handleChange}
                    placeholder="Please provide details about size, pressure rating, material requirements, etc."
                    className={`${inputClass} resize-none`} />
                </div>
                <button type="submit" className="w-full px-6 py-4 bg-[var(--industrial-accent)] text-white rounded-lg hover:opacity-90 transition-colors font-medium text-lg">
                  Submit Quote Request →
                </button>
              </form>
            </motion.div>
          )}

          {/* ── Done ── */}
          {submitted && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[var(--industrial-bg-secondary)] p-12 rounded-lg border border-green-500 text-center">
              <div className="text-7xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-[var(--industrial-text-primary)] mb-4">Email Client Opened!</h2>
              <p className="text-[var(--industrial-text-secondary)] text-lg mb-2">
                Your quote request is pre-filled and ready to send.
              </p>
              <p className="text-[var(--industrial-text-secondary)] mb-6">
                The email will be sent to{' '}
                <span className="text-[var(--industrial-accent)]">marketing@technovalves.org</span>
                {' '}and{' '}
                <span className="text-[var(--industrial-accent)]">sales@technovalves.org</span>.
              </p>
              <button onClick={resetForm}
                className="px-8 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                Submit Another Request
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
