import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Login failed');
      sessionStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm px-4"
      >
        <div className="text-center mb-10">
          <img src="/logo.png" alt="TechnoValves" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1 font-mono">TECHNOVALVES · SECURE ACCESS</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Username</label>
            <input
              type="text" value={username} onChange={e => setUsername(e.target.value)}
              required autoFocus placeholder="admin"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              required placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90 disabled:opacity-50 bg-blue-600">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 mt-6 font-mono">Not accessible to the public</p>
      </motion.div>
    </div>
  );
}
