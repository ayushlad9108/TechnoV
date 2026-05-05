import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

type Step = 'form' | 'upload' | 'done';

const inputClass =
  'w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]';
const labelClass = 'block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]';

export default function GetQuote() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '',
    industry: '', valveType: '', quantity: '',
    specifications: '', timeline: '',
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1 — validate form and move to upload step
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // File selection
  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.');
      return;
    }
    setError('');
    setPdfFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  // Step 2 — send everything to server
  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      if (pdfFile) fd.append('pdf', pdfFile);
      // Link to logged-in user if available
      const userInfo = sessionStorage.getItem('userInfo');
      if (userInfo) {
        const u = JSON.parse(userInfo);
        if (u._id) fd.append('userId', u._id);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/quotes`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Submission failed');
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Skip PDF and submit without attachment
  const handleSkipPdf = async () => {
    setPdfFile(null);
    await handleFinalSubmit();
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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

          {/* Step indicator */}
          {step !== 'done' && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {['Details', 'Upload Drawing', 'Submitted'].map((label, i) => {
                const stepIndex = ['form', 'upload', 'done'].indexOf(step);
                const active = i === stepIndex;
                const done = i < stepIndex;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      done ? 'bg-green-500 text-white' :
                      active ? 'bg-[var(--industrial-accent)] text-white' :
                      'bg-[var(--industrial-border)] text-[var(--industrial-text-secondary)]'
                    }`}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className={`text-sm font-mono uppercase tracking-wider ${active ? 'text-[var(--industrial-accent)]' : 'text-[var(--industrial-text-secondary)]'}`}>
                      {label}
                    </span>
                    {i < 2 && <div className="w-8 h-px bg-[var(--industrial-border)]" />}
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Form ── */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]"
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} />
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
                      <option value="oil-gas">Oil & Gas</option>
                      <option value="chemical">Chemical Processing</option>
                      <option value="power">Power Generation</option>
                      <option value="water">Water & Wastewater</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Valve Type *</label>
                    <select name="valveType" required value={formData.valveType} onChange={handleChange} className={inputClass}>
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
                    <label className={labelClass}>Quantity *</label>
                    <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Required Timeline</label>
                    <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="e.g., 2-3 weeks" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Specifications & Requirements *</label>
                  <textarea
                    name="specifications" required rows={6}
                    value={formData.specifications} onChange={handleChange}
                    placeholder="Please provide details about size, pressure rating, material requirements, etc."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button type="submit" className="w-full px-6 py-4 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-sky-600 transition-colors font-medium text-lg">
                  Next — Upload Drawing (Optional) →
                </button>
              </form>
            </motion.div>
          )}

          {/* ── STEP 2: PDF Upload ── */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]"
            >
              <h2 className="text-2xl font-bold mb-2 text-[var(--industrial-text-primary)]">
                Upload Technical Drawing / Specification Sheet
              </h2>
              <p className="text-[var(--industrial-text-secondary)] mb-8">
                Attach a PDF with your technical drawing or spec sheet. This helps us give you a more accurate quote. You can also skip this step.
              </p>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-[var(--industrial-accent)] bg-[var(--industrial-accent)]/5'
                    : pdfFile
                    ? 'border-green-500 bg-green-500/5'
                    : 'border-[var(--industrial-border)] hover:border-[var(--industrial-accent)]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
                />
                {pdfFile ? (
                  <div>
                    <div className="text-5xl mb-4">📄</div>
                    <p className="text-green-400 font-bold text-lg">{pdfFile.name}</p>
                    <p className="text-[var(--industrial-text-secondary)] text-sm mt-1">
                      {(pdfFile.size / 1024).toFixed(1)} KB — Click to change
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-5xl mb-4">📁</div>
                    <p className="text-[var(--industrial-text-primary)] font-medium text-lg">
                      Drag & drop your PDF here
                    </p>
                    <p className="text-[var(--industrial-text-secondary)] text-sm mt-2">
                      or click to browse — Max 10 MB
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <p className="mt-4 text-red-400 text-sm bg-red-900/20 border border-red-500 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep('form')}
                  className="flex-1 px-6 py-3 bg-[var(--industrial-bg-tertiary)] text-[var(--industrial-text-primary)] rounded-lg hover:bg-[var(--industrial-bg-primary)] transition-colors font-medium border border-[var(--industrial-border)]"
                >
                  ← Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={submitting || !pdfFile}
                  className="flex-1 px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-sky-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : '📎 Submit with PDF'}
                </button>
                <button
                  onClick={handleSkipPdf}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-[var(--industrial-bg-secondary)] text-[var(--industrial-text-secondary)] rounded-lg hover:text-white transition-colors font-medium border border-[var(--industrial-border)] disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Skip & Submit →'}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Done ── */}
          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[var(--industrial-bg-secondary)] p-12 rounded-lg border border-green-500 text-center"
            >
              <div className="text-7xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-[var(--industrial-text-primary)] mb-4">Quote Request Submitted!</h2>
              <p className="text-[var(--industrial-text-secondary)] text-lg mb-2">
                Your request has been received and emailed to our sales team.
              </p>
              <p className="text-[var(--industrial-text-secondary)] mb-4">
                We'll get back to you at <span className="text-[var(--industrial-accent)]">{formData.email}</span> within 24 hours.
              </p>
              {pdfFile && (
                <p className="text-green-400 text-sm mb-6">
                  📎 PDF attached: {pdfFile.name}
                </p>
              )}
              {sessionStorage.getItem('userToken') ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                  <a href="/my-orders"
                    className="px-8 py-3 bg-[var(--industrial-accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                    📊 Track in My Dashboard
                  </a>
                  <button
                    onClick={() => {
                      setStep('form');
                      setFormData({ name: '', email: '', phone: '', company: '', industry: '', valveType: '', quantity: '', specifications: '', timeline: '' });
                      setPdfFile(null);
                    }}
                    className="px-8 py-3 border border-[var(--industrial-border)] text-[var(--industrial-text-secondary)] rounded-lg font-medium hover:text-[var(--industrial-text-primary)] transition-colors">
                    Submit Another
                  </button>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-[var(--industrial-text-secondary)]">
                    💡 <a href="/order-portal" className="text-[var(--industrial-accent)] hover:underline font-medium">Create an account</a> to track this request in your dashboard.
                  </p>
                  <button
                    onClick={() => {
                      setStep('form');
                      setFormData({ name: '', email: '', phone: '', company: '', industry: '', valveType: '', quantity: '', specifications: '', timeline: '' });
                      setPdfFile(null);
                    }}
                    className="px-8 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                    Submit Another Request
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
