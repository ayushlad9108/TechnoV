import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GetQuote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    valveType: '',
    quantity: '',
    specifications: '',
    timeline: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save to MongoDB
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      console.warn('Could not save quote to server');
    }

    const subject = encodeURIComponent(`Quote Request from ${formData.name} - ${formData.company}`);
    const body = encodeURIComponent(
      `Quote Request Details:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Company: ${formData.company}\n` +
      `Industry: ${formData.industry}\n` +
      `Valve Type: ${formData.valveType}\n` +
      `Quantity: ${formData.quantity}\n` +
      `Timeline: ${formData.timeline}\n\n` +
      `Specifications:\n${formData.specifications}`
    );
    
    window.location.href = `mailto:sales@technovalves.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-[var(--industrial-text-primary)]">
            Request a Quote
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)]">
            Tell us about your requirements and we'll provide a customized solution
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Industry *
                </label>
                <select
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                >
                  <option value="">Select Industry</option>
                  <option value="oil-gas">Oil & Gas</option>
                  <option value="chemical">Chemical Processing</option>
                  <option value="power">Power Generation</option>
                  <option value="water">Water & Wastewater</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Valve Type *
                </label>
                <select
                  name="valveType"
                  required
                  value={formData.valveType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                >
                  <option value="">Select Valve Type</option>
                  <option value="ball">Ball Valve</option>
                  <option value="gate">Gate Valve</option>
                  <option value="globe">Globe Valve</option>
                  <option value="check">Check Valve</option>
                  <option value="butterfly">Butterfly Valve</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Quantity *
                </label>
                <input
                  type="text"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                  Required Timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g., 2-3 weeks"
                  className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                Specifications & Requirements *
              </label>
              <textarea
                name="specifications"
                required
                rows={6}
                value={formData.specifications}
                onChange={handleChange}
                placeholder="Please provide details about size, pressure rating, material requirements, etc."
                className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
            >
              Submit Quote Request
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
