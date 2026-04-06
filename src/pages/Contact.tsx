import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save to MongoDB
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      console.warn('Could not save contact to server');
    }

    const subject = encodeURIComponent(`Inquiry from ${formData.name} - ${formData.company}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Company: ${formData.company}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:info@technovalves.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: ['Techno Valves', 'Nashik, Maharashtra', 'India — 422001']
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+91 22 1234 5678', '+91 22 8765 4321']
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['info@technovalves.com', 'sales@technovalves.com']
    },
    {
      icon: '🕐',
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM']
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-[var(--industrial-text-primary)]">
            Contact Us
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto">
            Get in touch with our team for inquiries, support, or partnership opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]">
              <h2 className="text-2xl font-bold mb-6 text-[var(--industrial-text-primary)]">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)]"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{info.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--industrial-text-primary)]">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-[var(--industrial-text-secondary)]">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)]">
              <div className="h-64 bg-[var(--industrial-bg-tertiary)] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-[var(--industrial-text-secondary)]">Map Location</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
