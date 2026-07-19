import { motion } from 'framer-motion';
import { useState } from 'react';

// Accepted email domains
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
    return `Please use a personal email (e.g. Gmail, Yahoo, Outlook). Business emails are also accepted — contact us directly at marketing@technovalves.org.`;
  }
  return '';
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    if (name === 'email') setEmailError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(formData.email);
    if (err) { setEmailError(err); return; }

    const subject = encodeURIComponent(`Inquiry from ${formData.name}${formData.company ? ' - ' + formData.company : ''}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Company: ${formData.company || 'Not provided'}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:marketing@technovalves.org?cc=sales@technovalves.org&subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: '📍', title: 'Address',        details: ['Techno Valves', 'H-27, MIDC, Satpur Colony', 'Nashik, Maharashtra — 422012'] },
    { icon: '📞', title: 'Phone',          details: ['+91 87882 80766', '+91 96076 00918'] },
    { icon: '✉️', title: 'Email',          details: ['marketing@technovalves.org', 'sales@technovalves.org'] },
    { icon: '🕐', title: 'Business Hours', details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Sunday: 9:00 AM - 5:00 PM', 'Saturday: Closed'] },
  ];

  const inp = 'w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]';

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-[var(--industrial-text-primary)]">Contact Us</h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto">
            Get in touch with our team for inquiries, support, or partnership opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]">
              <h2 className="text-2xl font-bold mb-6 text-[var(--industrial-text-primary)]">Send us a Message</h2>

              {/* Success banner */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg flex items-start gap-3"
                >
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-green-400">Email client opened!</p>
                    <p className="text-sm text-[var(--industrial-text-secondary)] mt-0.5">
                      Your message is pre-filled and ready to send to <strong>marketing@technovalves.org</strong> and <strong>sales@technovalves.org</strong>. Just hit Send in your email client.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="text-xs text-[var(--industrial-accent)] mt-2 hover:underline">
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}

              {!submitted && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inp} placeholder="Your full name" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                      className={`${inp} ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="you@gmail.com" />
                    {emailError && (
                      <p className="mt-1.5 text-xs text-red-400">{emailError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inp} placeholder="+91 98765 43210" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className={inp} placeholder="Your company name" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">Message *</label>
                    <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                      className={`${inp} resize-none`} placeholder="Tell us about your requirements..." />
                  </div>

                  <button type="submit"
                    className="w-full px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:opacity-90 transition-colors font-medium">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            {contactInfo.map((info) => (
              <div key={info.title} className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)]">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{info.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--industrial-text-primary)]">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-[var(--industrial-text-secondary)]">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-lg border border-[var(--industrial-border)] overflow-hidden" style={{ height: '280px' }}>
              <iframe
                title="Techno Valves Location"
                width="100%" height="100%"
                style={{ border: 0 }}
                loading="lazy" allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Techno+Valves+H-27+MIDC+Satpur+Colony+Nashik+Maharashtra+422012&t=&z=16&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
