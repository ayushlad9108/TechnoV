import { useState } from 'react';
import { motion } from 'framer-motion';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

const VALVE_OPTIONS = ['Ball Valve', 'Gate Valve', 'Control Valve'];

interface FormData {
  name: string;
  email: string;
  gender: string;
  age: string;
  dob: string;
  state: string;
  industry: string;
  valves: string[];
}

const initialForm: FormData = {
  name: '', email: '', gender: '', age: '', dob: '', state: '', industry: '', valves: [],
};

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValveChange = (valve: string) => {
    setFormData(prev => ({
      ...prev,
      valves: prev.valves.includes(valve)
        ? prev.valves.filter(v => v !== valve)
        : [...prev.valves, valve],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      console.warn('Could not save inquiry to server');
    }

    setSubmittedData(formData);
    setLoading(false);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setSubmittedData(null);
    setError('');
  };

  const inputClass = "w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]";
  const labelClass = "block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]";

  return (
    <div className="max-w-3xl mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)] space-y-6"
      >
        <h2 className="text-2xl font-bold text-[var(--industrial-text-primary)]">Inquiry Form</h2>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>Gender *</label>
          <div className="flex gap-6 mt-1">
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g} className="flex items-center gap-2 text-[var(--industrial-text-secondary)] cursor-pointer">
                <input
                  type="radio" name="gender" value={g} required
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="accent-[var(--industrial-accent)]"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Age & DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Age *</label>
            <input type="number" name="age" required min={18} max={100} value={formData.age} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Date of Birth *</label>
            <input type="date" name="dob" required value={formData.dob} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* State & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>State *</label>
            <select name="state" required value={formData.state} onChange={handleChange} className={inputClass}>
              <option value="">Select State</option>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Industry Type *</label>
            <select name="industry" required value={formData.industry} onChange={handleChange} className={inputClass}>
              <option value="">Select Industry</option>
              <option value="Oil & Gas">Oil & Gas</option>
              <option value="Power">Power</option>
              <option value="Chemical">Chemical</option>
              <option value="Water">Water</option>
            </select>
          </div>
        </div>

        {/* Valve Type Checkboxes */}
        <div>
          <label className={labelClass}>Required Valve Type *</label>
          <div className="flex flex-wrap gap-4 mt-1">
            {VALVE_OPTIONS.map(valve => (
              <label key={valve} className="flex items-center gap-2 text-[var(--industrial-text-secondary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.valves.includes(valve)}
                  onChange={() => handleValveChange(valve)}
                  className="accent-[var(--industrial-accent)] w-4 h-4"
                />
                {valve}
              </label>
            ))}
          </div>
          {formData.valves.length === 0 && (
            <p className="text-xs text-[var(--industrial-text-secondary)] mt-1">Select at least one valve type</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || formData.valves.length === 0}
          className="w-full px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </motion.form>

      {/* Submitted Data Display */}
      {submittedData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-accent)]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[var(--industrial-text-primary)]">✅ Submitted Details</h3>
            <button onClick={handleReset} className="text-sm text-[var(--industrial-accent)] hover:underline">
              Submit Another
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              ['Name', submittedData.name],
              ['Email', submittedData.email],
              ['Gender', submittedData.gender],
              ['Age', submittedData.age],
              ['Date of Birth', submittedData.dob],
              ['State', submittedData.state],
              ['Industry', submittedData.industry],
            ].map(([label, value]) => (
              <div key={label} className="bg-[var(--industrial-bg-tertiary)] p-3 rounded-lg">
                <p className="text-[var(--industrial-text-secondary)] text-xs uppercase tracking-wide mb-1">{label}</p>
                <p className="text-[var(--industrial-text-primary)] font-medium">{value}</p>
              </div>
            ))}
            <div className="bg-[var(--industrial-bg-tertiary)] p-3 rounded-lg md:col-span-2">
              <p className="text-[var(--industrial-text-secondary)] text-xs uppercase tracking-wide mb-1">Valve Types</p>
              <p className="text-[var(--industrial-text-primary)] font-medium">{submittedData.valves.join(', ')}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
