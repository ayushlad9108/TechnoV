import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;
function adminHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-token': sessionStorage.getItem('adminToken') || '' };
}

interface Product {
  _id?: string;
  name: string; category: string; description: string;
  specifications: string; price: number | string;
  image: string; tag: string; spec: string;
}

const empty: Product = { name: '', category: 'Ball Valves', description: '', specifications: '', price: '', image: '', tag: '', spec: '' };
const CATEGORIES = ['Ball Valves', 'Gate Valves', 'Globe Valves', 'NRV', 'Other'];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<Product | null>(null);
  const [form, setForm]         = useState<Product>(empty);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/products`, { headers: adminHeaders() });
      setProducts(Array.isArray(await res.json()) ? await (await fetch(`${API}/api/admin/products`, { headers: adminHeaders() })).json() : []);
    } catch { setProducts([]); }
    // simpler:
    try {
      const r = await fetch(`${API}/api/admin/products`, { headers: adminHeaders() });
      const d = await r.json();
      setProducts(Array.isArray(d) ? d : []);
    } catch { setProducts([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(null); setForm(empty); setError(''); setShowForm(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ ...p, specifications: Array.isArray((p as any).specifications) ? (p as any).specifications.join(', ') : p.specifications });
    setError(''); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) { setError('Name and price are required.'); return; }
    setSaving(true); setError('');
    const payload = { ...form, price: Number(form.price), specifications: String(form.specifications).split(',').map(s => s.trim()).filter(Boolean) };
    try {
      const url    = editing?._id ? `${API}/api/admin/products/${editing._id}` : `${API}/api/admin/products`;
      const method = editing?._id ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, headers: adminHeaders(), body: JSON.stringify(payload) });
      const data   = await res.json();
      if (!data.success) throw new Error(data.error || 'Save failed');
      setShowForm(false); load();
    } catch (err: any) { setError(err.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`${API}/api/admin/products/${id}`, { method: 'DELETE', headers: adminHeaders() });
    load();
  };

  const inp = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors';
  const lbl = 'block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} products in database</p>
        </div>
        <button onClick={openNew}
          className="px-5 py-2.5 text-sm font-bold text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
          + Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-300"><p className="text-4xl mb-3">🔧</p><p>No products yet.</p></div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Product', 'Category', 'Price', 'Tag', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-mono text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <motion.tr key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image && <img src={p.image} alt="" className="w-10 h-10 object-contain rounded bg-gray-100 p-1" onError={e => { e.currentTarget.style.display = 'none'; }} />}
                      <span className="text-gray-900 font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3 text-gray-900 font-mono">₹{Number(p.price).toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3">
                    {p.tag && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600 text-white">{p.tag}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors">Edit</button>
                      <button onClick={() => handleDelete(p._id!)} className="text-xs px-3 py-1.5 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowForm(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-white border-l border-gray-200 z-50 overflow-y-auto shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">{editing ? 'Edit Product' : 'Add Product'}</h2>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lbl}>Name *</label><input className={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="2PC Ball Valve" /></div>
                    <div><label className={lbl}>Category</label>
                      <select className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div><label className={lbl}>Description</label><textarea className={`${inp} resize-none`} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lbl}>Price (₹) *</label><input type="number" className={inp} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="25000" /></div>
                    <div><label className={lbl}>Tag</label><input className={inp} value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} placeholder="Best Seller" /></div>
                  </div>
                  <div><label className={lbl}>Pressure / Class Spec</label><input className={inp} value={form.spec} onChange={e => setForm(f => ({ ...f, spec: e.target.value }))} placeholder="PN100 / Class 600" /></div>
                  <div><label className={lbl}>Specifications (comma-separated)</label><input className={inp} value={form.specifications as string} onChange={e => setForm(f => ({ ...f, specifications: e.target.value }))} /></div>
                  <div>
                    <label className={lbl}>Image URL or Path</label>
                    <input className={inp} value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="/ball balve/2PC-350NB BALL VALVE.jpg" />
                    {form.image && <img src={form.image} alt="" className="mt-2 h-20 object-contain rounded bg-gray-100 p-2" onError={e => { e.currentTarget.style.display = 'none'; }} />}
                  </div>
                  {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving}
                      className="flex-1 py-3 text-sm font-bold text-white rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors">
                      {saving ? 'Saving…' : editing ? 'Update Product' : 'Add Product'}
                    </button>
                    <button onClick={() => setShowForm(false)} className="px-5 py-3 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors">Cancel</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
