import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;
function adminHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-token': sessionStorage.getItem('adminToken') || '' };
}

const STATUS_OPTIONS = ['Submitted','Under Review','Quotation Sent','Approved','In Production','Dispatched','Completed','Cancelled'];
const STATUS_COLORS: Record<string, string> = {
  'Submitted':      'text-slate-600  border-slate-200  bg-slate-50',
  'Under Review':   'text-blue-600   border-blue-200   bg-blue-50',
  'Quotation Sent': 'text-violet-600 border-violet-200 bg-violet-50',
  'Approved':       'text-emerald-600 border-emerald-200 bg-emerald-50',
  'In Production':  'text-amber-600  border-amber-200  bg-amber-50',
  'Dispatched':     'text-sky-600    border-sky-200    bg-sky-50',
  'Completed':      'text-green-600  border-green-200  bg-green-50',
  'Cancelled':      'text-red-600    border-red-200    bg-red-50',
};

interface QR {
  _id: string; name: string; email: string; phone: string; company: string;
  industry: string; valveType: string; quantity: string; specifications: string;
  timeline: string; hasPdf: boolean; status: string;
  purchaseOrderNumber: string; workOrderNumber: string; adminNotes: string;
  statusHistory: { status: string; note: string; updatedAt: string }[];
  createdAt: string;
}
interface EditState {
  status: string; adminNotes: string;
  purchaseOrderNumber: string; workOrderNumber: string; statusNote: string;
}

export default function AdminRequests() {
  const [items, setItems]       = useState<QR[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<QR | null>(null);
  const [editing, setEditing]   = useState<EditState | null>(null);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState('');

  const load = useCallback(async (q = search, s = statusFilter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('search', q);
      if (s) params.set('status', s);
      const res  = await fetch(`${API}/api/admin/requests?${params}`, { headers: adminHeaders() });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setItems([]); }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { load(); }, []);
  useEffect(() => { const t = setTimeout(() => load(search, statusFilter), 350); return () => clearTimeout(t); }, [search, statusFilter]);

  const openEdit = (item: QR) => {
    setSelected(item);
    setEditing({ status: item.status, adminNotes: item.adminNotes || '', purchaseOrderNumber: item.purchaseOrderNumber || '', workOrderNumber: item.workOrderNumber || '', statusNote: '' });
    setSaveMsg('');
  };

  const handleSave = async () => {
    if (!selected || !editing) return;
    setSaving(true); setSaveMsg('');
    try {
      const res  = await fetch(`${API}/api/admin/requests/${selected._id}`, { method: 'PUT', headers: adminHeaders(), body: JSON.stringify(editing) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSaveMsg('✅ Saved'); load(search, statusFilter); setSelected(data.request);
    } catch (err: any) { setSaveMsg(`❌ ${err.message}`); }
    setSaving(false);
  };

  const inp = 'w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors';
  const lbl = 'block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ── Left: list ── */}
      <div className="flex flex-col w-full max-w-sm border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Quote Requests</h1>
            <p className="text-gray-400 text-xs font-mono">{items.length} total</p>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, company…"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setStatusFilter('')}
              className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${!statusFilter ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400 hover:text-gray-700'}`}>ALL</button>
            {STATUS_OPTIONS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s === statusFilter ? '' : s)}
                className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${statusFilter === s ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400 hover:text-gray-700'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 text-gray-300"><p className="text-3xl mb-2">📋</p><p className="text-sm">No requests found</p></div>
          ) : items.map((item, i) => (
            <motion.div key={item._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              onClick={() => openEdit(item)}
              className={`px-4 py-3.5 border-b border-gray-100 cursor-pointer transition-colors ${selected?._id === item._id ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-gray-50'}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-gray-900 font-semibold text-sm truncate">{item.name}</p>
                  <p className="text-gray-400 text-xs truncate">{item.company || item.email}</p>
                  <p className="text-gray-300 text-[10px] font-mono mt-0.5">{item.valveType} · {item.quantity}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border inline-block ${STATUS_COLORS[item.status] || ''}`}>{item.status}</span>
                  <p className="text-gray-300 text-[10px] font-mono mt-1">{new Date(item.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Right: detail ── */}
      <div className="flex-1 overflow-y-auto">
        {!selected ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <p className="text-5xl mb-3">👈</p>
            <p className="text-sm">Select a request to manage it</p>
          </div>
        ) : (
          <div className="p-6 space-y-5 max-w-2xl">

            {/* Header */}
            <div>
              <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
              <p className="text-gray-500 text-sm">{selected.company} · {selected.email} · {selected.phone}</p>
              <p className="text-gray-400 text-xs font-mono mt-0.5">{new Date(selected.createdAt).toLocaleDateString('en-IN')}</p>
            </div>

            {/* Request details */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-2 gap-3 text-sm shadow-sm">
              {[
                ['Industry',  selected.industry],
                ['Valve Type', selected.valveType],
                ['Quantity',  selected.quantity],
                ['Timeline',  selected.timeline || '—'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{k}</p>
                  <p className="text-gray-700 mt-0.5">{v}</p>
                </div>
              ))}
              {selected.hasPdf && (
                <div className="col-span-2">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Attachment</p>
                  <p className="text-gray-700 mt-0.5">📎 PDF document attached</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Specifications</p>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.specifications}</p>
            </div>

            {/* Edit form */}
            {editing && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Manage Request</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lbl}>Status</label>
                    <select className={inp} value={editing.status} onChange={e => setEditing(ed => ed && ({ ...ed, status: e.target.value }))}>
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div><label className={lbl}>PO Number</label>
                    <input className={inp} value={editing.purchaseOrderNumber} onChange={e => setEditing(ed => ed && ({ ...ed, purchaseOrderNumber: e.target.value }))} placeholder="PO-2025-001" />
                  </div>
                  <div><label className={lbl}>Work Order No.</label>
                    <input className={inp} value={editing.workOrderNumber} onChange={e => setEditing(ed => ed && ({ ...ed, workOrderNumber: e.target.value }))} placeholder="WO-2025-001" />
                  </div>
                </div>
                <div><label className={lbl}>Status Note (visible to customer)</label>
                  <input className={inp} value={editing.statusNote} onChange={e => setEditing(ed => ed && ({ ...ed, statusNote: e.target.value }))} placeholder="e.g. Quotation emailed, please check inbox" />
                </div>
                <div><label className={lbl}>Internal Notes</label>
                  <textarea className={`${inp} resize-none`} rows={2} value={editing.adminNotes} onChange={e => setEditing(ed => ed && ({ ...ed, adminNotes: e.target.value }))} placeholder="Internal notes (not visible to customer)" />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleSave} disabled={saving}
                    className="px-6 py-2.5 text-sm font-bold text-white rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors">
                    {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                  {saveMsg && <span className="text-sm text-gray-500">{saveMsg}</span>}
                </div>
              </div>
            )}

            {/* Status history */}
            {selected.statusHistory?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">Status History</p>
                <div className="space-y-2">
                  {[...selected.statusHistory].reverse().map((h, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-blue-500 font-mono text-xs shrink-0 mt-0.5">{new Date(h.updatedAt).toLocaleDateString('en-IN')}</span>
                      <div>
                        <span className="text-gray-900 font-medium">{h.status}</span>
                        {h.note && <span className="text-gray-400 ml-2">— {h.note}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
