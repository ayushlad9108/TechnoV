import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;

export default function UserLogin() {
  const [tab, setTab]           = useState<'login' | 'register'>('login');
  const [form, setForm]         = useState({ name: '', email: '', password: '', company: '', phone: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const endpoint = tab === 'login' ? '/api/user/login' : '/api/user/register';
      const res  = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      sessionStorage.setItem('userToken', data.token);
      sessionStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate('/my-orders');
    } catch (err: any) { setError(err.message); }
    setLoading(false);
  };

  const inp = 'w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg text-[var(--industrial-text-primary)] text-sm focus:outline-none focus:border-[var(--industrial-accent)] transition-colors';

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center" style={{ background: 'var(--industrial-bg-primary)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="TechnoValves" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold" style={{ color: 'var(--industrial-text-primary)' }}>Order Portal</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--industrial-text-secondary)' }}>Track your orders and invoices</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden border border-[var(--industrial-border)] mb-6">
          {(['login', 'register'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }}
              className="flex-1 py-2.5 text-sm font-semibold capitalize transition-colors"
              style={{
                background: tab === t ? 'var(--industrial-accent)' : 'var(--industrial-bg-secondary)',
                color: tab === t ? '#fff' : 'var(--industrial-text-secondary)',
              }}>
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4 bg-[var(--industrial-bg-secondary)] border border-[var(--industrial-border)] rounded-xl p-6">
          {tab === 'register' && (
            <>
              <div>
                <label className="block text-xs font-mono text-[var(--industrial-text-secondary)] uppercase tracking-widest mb-1.5">Full Name *</label>
                <input name="name" required value={form.name} onChange={handle} className={inp} placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[var(--industrial-text-secondary)] uppercase tracking-widest mb-1.5">Company</label>
                  <input name="company" value={form.company} onChange={handle} className={inp} placeholder="BHEL Ltd." />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--industrial-text-secondary)] uppercase tracking-widest mb-1.5">Phone</label>
                  <input name="phone" value={form.phone} onChange={handle} className={inp} placeholder="+91 98765 43210" />
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-xs font-mono text-[var(--industrial-text-secondary)] uppercase tracking-widest mb-1.5">Email *</label>
            <input name="email" type="email" required value={form.email} onChange={handle} className={inp} placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-xs font-mono text-[var(--industrial-text-secondary)] uppercase tracking-widest mb-1.5">Password *</label>
            <input name="password" type="password" required value={form.password} onChange={handle} className={inp} placeholder="••••••••" />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-4 py-2">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--industrial-accent)' }}>
            {loading ? 'Please wait…' : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--industrial-text-secondary)' }}>
          <Link to="/" className="hover:underline">← Back to website</Link>
        </p>
      </motion.div>
    </div>
  );
}
