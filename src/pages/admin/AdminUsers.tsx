import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;
function adminHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-token': sessionStorage.getItem('adminToken') || '' };
}

interface User { _id: string; name: string; email: string; company: string; phone: string; createdAt: string; }

export default function AdminUsers() {
  const [users, setUsers]     = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  const load = async (q = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('search', q);
      const res  = await fetch(`${API}/api/admin/users?${params}`, { headers: adminHeaders() });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch { setUsers([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { const t = setTimeout(() => load(search), 350); return () => clearTimeout(t); }, [search]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-400 text-sm mt-1">{users.length} registered users</p>
        </div>
      </div>

      <div className="relative mb-6">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, company, phone…"
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : users.length === 0 ? (
        <div className="text-center py-20 text-gray-300"><p className="text-4xl mb-3">👤</p><p>No users found</p></div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['User', 'Company', 'Phone', 'Joined'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-mono text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <motion.tr key={u._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="text-gray-900 font-medium">{u.name}</p>
                    <p className="text-gray-400 text-xs">{u.email}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{u.company || '—'}</td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{u.phone || '—'}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs font-mono">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
