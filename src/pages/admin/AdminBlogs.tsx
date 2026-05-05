import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;
function adminHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-token': sessionStorage.getItem('adminToken') || '' };
}

interface Blog { _id?: string; title: string; date: string; summary: string; content: string; image: string; tags: string; }
const empty: Blog = { title: '', date: new Date().toISOString().split('T')[0], summary: '', content: '', image: '', tags: '' };

export default function AdminBlogs() {
  const [blogs, setBlogs]       = useState<Blog[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<Blog | null>(null);
  const [form, setForm]         = useState<Blog>(empty);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');

  const load = async () => {
    setLoading(true);
    try { const r = await fetch(`${API}/api/admin/blogs`, { headers: adminHeaders() }); setBlogs(Array.isArray(await r.json()) ? await (await fetch(`${API}/api/admin/blogs`, { headers: adminHeaders() })).json() : []); } catch { setBlogs([]); }
    try { const r = await fetch(`${API}/api/admin/blogs`, { headers: adminHeaders() }); const d = await r.json(); setBlogs(Array.isArray(d) ? d : []); } catch { setBlogs([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew  = () => { setEditing(null); setForm(empty); setError(''); setShowForm(true); };
  const openEdit = (b: Blog) => { setEditing(b); setForm({ ...b, tags: Array.isArray((b as any).tags) ? (b as any).tags.join(', ') : b.tags }); setError(''); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title || !form.summary) { setError('Title and summary are required.'); return; }
    setSaving(true); setError('');
    const payload = { ...form, tags: String(form.tags).split(',').map(t => t.trim()).filter(Boolean) };
    try {
      const url = editing?._id ? `${API}/api/admin/blogs/${editing._id}` : `${API}/api/admin/blogs`;
      const res = await fetch(url, { method: editing?._id ? 'PUT' : 'POST', headers: adminHeaders(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Save failed');
      setShowForm(false); load();
    } catch (err: any) { setError(err.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`${API}/api/admin/blogs/${id}`, { method: 'DELETE', headers: adminHeaders() });
    load();
  };

  const inp = 'w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors';
  const lbl = 'block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5';

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{blogs.length} posts published</p>
        </div>
        <button onClick={openNew} className="px-5 py-2.5 text-sm font-bold text-white rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors">+ New Post</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-300"><p className="text-4xl mb-3">📝</p><p>No blog posts yet.</p></div>
      ) : (
        <div className="space-y-3">
          {blogs.map((b, i) => (
            <motion.div key={b._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 items-start hover:border-gray-300 transition-colors shadow-sm">
              {b.image && <img src={b.image} alt="" className="w-20 h-14 object-cover rounded-lg shrink-0 bg-gray-100" onError={e => { e.currentTarget.style.display = 'none'; }} />}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-gray-900 font-semibold leading-tight">{b.title}</h3>
                    <p className="text-gray-400 text-xs font-mono mt-1">{b.date}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEdit(b)} className="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(b._id!)} className="text-xs px-3 py-1.5 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{b.summary}</p>
                {Array.isArray((b as any).tags) && (b as any).tags.length > 0 && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {(b as any).tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-mono text-emerald-700 border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowForm(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-white border-l border-gray-200 z-50 overflow-y-auto shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
                </div>
                <div className="space-y-4">
                  <div><label className={lbl}>Title *</label><input className={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Blog post title" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={lbl}>Date</label><input type="date" className={inp} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
                    <div><label className={lbl}>Tags (comma-separated)</label><input className={inp} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="ISO, Quality, News" /></div>
                  </div>
                  <div><label className={lbl}>Summary *</label><textarea className={`${inp} resize-none`} rows={3} value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} placeholder="Short description shown on the blog listing page" /></div>
                  <div><label className={lbl}>Full Content</label><textarea className={`${inp} resize-none`} rows={8} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Full blog post content. Use new lines for paragraphs." /></div>
                  <div>
                    <label className={lbl}>Cover Image URL</label>
                    <input className={inp} value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="/images/industrial-bridge.jpg" />
                    {form.image && <img src={form.image} alt="" className="mt-2 h-24 w-full object-cover rounded-lg bg-gray-100" onError={e => { e.currentTarget.style.display = 'none'; }} />}
                  </div>
                  {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving}
                      className="flex-1 py-3 text-sm font-bold text-white rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                      {saving ? 'Saving…' : editing ? 'Update Post' : 'Publish Post'}
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
