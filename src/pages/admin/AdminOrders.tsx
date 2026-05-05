import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;
function adminHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-token': sessionStorage.getItem('adminToken') || '' };
}

const STATUS_STEPS = ['Order Placed','Order Confirmed','In Production','Quality Check','Dispatched','Delivered'];
const STATUS_COLORS: Record<string, string> = {
  'Order Placed':    'text-slate-600  border-slate-200  bg-slate-50',
  'Order Confirmed': 'text-blue-600   border-blue-200   bg-blue-50',
  'In Production':   'text-amber-600  border-amber-200  bg-amber-50',
  'Quality Check':   'text-purple-600 border-purple-200 bg-purple-50',
  'Dispatched':      'text-sky-600    border-sky-200    bg-sky-50',
  'Delivered':       'text-emerald-600 border-emerald-200 bg-emerald-50',
};

interface Order {
  _id: string; invoiceNumber: string; invoiceDate: string;
  purchaseOrderNumber: string; workOrderNumber: string;
  orderStatus: string; paymentStatus: string; adminNotes: string;
  total: number; subtotal: number; gst: number; cart: any[];
  customerInfo: { name: string; email: string; phone: string; company?: string; city?: string; state?: string };
  statusHistory: { status: string; note: string; updatedAt: string }[];
  createdAt: string;
}
interface EditState {
  orderStatus: string; purchaseOrderNumber: string; workOrderNumber: string;
  adminNotes: string; paymentStatus: string; statusNote: string;
}

export default function AdminOrders() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<Order | null>(null);
  const [editing, setEditing]   = useState<EditState | null>(null);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState('');

  const load = useCallback(async (q = search, s = statusFilter) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (q) params.set('search', q);
      if (s) params.set('status', s);
      const res  = await fetch(`${API}/api/admin/orders?${params}`, { headers: adminHeaders() });
      const data = await res.json();
      setOrders(data.orders || []); setTotal(data.total || 0);
    } catch { setOrders([]); }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { load(); }, []);
  useEffect(() => { const t = setTimeout(() => load(search, statusFilter), 350); return () => clearTimeout(t); }, [search, statusFilter]);

  const openEdit = (order: Order) => {
    setSelected(order);
    setEditing({ orderStatus: order.orderStatus, purchaseOrderNumber: order.purchaseOrderNumber || '', workOrderNumber: order.workOrderNumber || '', adminNotes: order.adminNotes || '', paymentStatus: order.paymentStatus, statusNote: '' });
    setSaveMsg('');
  };

  const handleSave = async () => {
    if (!selected || !editing) return;
    setSaving(true); setSaveMsg('');
    try {
      const res  = await fetch(`${API}/api/admin/orders/${selected._id}`, { method: 'PUT', headers: adminHeaders(), body: JSON.stringify(editing) });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSaveMsg('✅ Saved'); load(search, statusFilter); setSelected(data.order);
    } catch (err: any) { setSaveMsg(`❌ ${err.message}`); }
    setSaving(false);
  };

  const inp = 'w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors';
  const lbl = 'block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ── Left: Order list ── */}
      <div className="flex flex-col w-full max-w-sm border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Orders</h1>
            <p className="text-gray-400 text-xs font-mono">{total} total</p>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, company, PO…"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setStatusFilter('')}
              className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${!statusFilter ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400 hover:text-gray-700'}`}>ALL</button>
            {STATUS_STEPS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s === statusFilter ? '' : s)}
                className={`text-[9px] font-mono px-2 py-1 rounded border transition-colors ${statusFilter === s ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400 hover:text-gray-700'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 text-gray-300"><p className="text-3xl mb-2">📦</p><p className="text-sm">No orders found</p></div>
          ) : orders.map((o, i) => (
            <motion.div key={o._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              onClick={() => openEdit(o)}
              className={`px-4 py-3.5 border-b border-gray-100 cursor-pointer transition-colors ${selected?._id === o._id ? 'bg-blue-50 border-l-2 border-l-blue-600' : 'hover:bg-gray-50'}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-gray-900 font-semibold text-sm truncate">{o.customerInfo?.name}</p>
                  <p className="text-gray-400 text-xs truncate">{o.customerInfo?.company || o.customerInfo?.email}</p>
                  <p className="text-gray-300 text-[10px] font-mono mt-0.5">{o.invoiceNumber}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gray-900 text-sm font-mono font-semibold">₹{Number(o.total).toLocaleString('en-IN')}</p>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border mt-1 inline-block ${STATUS_COLORS[o.orderStatus] || ''}`}>{o.orderStatus}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Right: Detail / edit ── */}
      <div className="flex-1 overflow-y-auto">
        {!selected ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <p className="text-5xl mb-3">👈</p>
            <p className="text-sm">Select an order to manage it</p>
          </div>
        ) : (
          <div className="p-6 space-y-5 max-w-2xl">

            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selected.invoiceNumber}</h2>
                <p className="text-gray-500 text-sm">{selected.customerInfo?.name} {selected.customerInfo?.company && `· ${selected.customerInfo.company}`}</p>
                <p className="text-gray-400 text-xs font-mono mt-0.5">{selected.invoiceDate}</p>
              </div>
              <p className="text-xl font-bold font-mono text-gray-900">₹{Number(selected.total).toLocaleString('en-IN')}</p>
            </div>

            {/* Customer info */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-2 gap-3 text-sm shadow-sm">
              {[['Email', selected.customerInfo?.email], ['Phone', selected.customerInfo?.phone], ['Company', selected.customerInfo?.company], ['Location', [selected.customerInfo?.city, selected.customerInfo?.state].filter(Boolean).join(', ')]].map(([k, v]) => v ? (
                <div key={k as string}>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{k}</p>
                  <p className="text-gray-700 mt-0.5">{v}</p>
                </div>
              ) : null)}
            </div>

            {/* Items */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest px-4 py-3 border-b border-gray-100 bg-gray-50">Items</p>
              {selected.cart?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between px-4 py-2.5 border-b border-gray-100 last:border-0 text-sm">
                  <span className="text-gray-700">{item.name} <span className="text-gray-400">× {item.quantity}</span></span>
                  <span className="text-gray-900 font-mono">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="px-4 py-3 flex justify-between text-sm font-bold border-t border-gray-100 bg-gray-50">
                <span className="text-gray-700">Total</span>
                <span className="text-blue-600">₹{Number(selected.total).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Edit form */}
            {editing && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">Manage Order</p>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={lbl}>Order Status</label>
                    <select className={inp} value={editing.orderStatus} onChange={e => setEditing(ed => ed && ({ ...ed, orderStatus: e.target.value }))}>
                      {STATUS_STEPS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div><label className={lbl}>Payment Status</label>
                    <select className={inp} value={editing.paymentStatus} onChange={e => setEditing(ed => ed && ({ ...ed, paymentStatus: e.target.value }))}>
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div><label className={lbl}>Purchase Order No.</label><input className={inp} value={editing.purchaseOrderNumber} onChange={e => setEditing(ed => ed && ({ ...ed, purchaseOrderNumber: e.target.value }))} placeholder="PO-2025-001" /></div>
                  <div><label className={lbl}>Work Order No.</label><input className={inp} value={editing.workOrderNumber} onChange={e => setEditing(ed => ed && ({ ...ed, workOrderNumber: e.target.value }))} placeholder="WO-2025-001" /></div>
                </div>
                <div><label className={lbl}>Status Note (visible to customer)</label><input className={inp} value={editing.statusNote} onChange={e => setEditing(ed => ed && ({ ...ed, statusNote: e.target.value }))} placeholder="e.g. Dispatched via DTDC, tracking: XYZ123" /></div>
                <div><label className={lbl}>Internal Admin Notes</label><textarea className={`${inp} resize-none`} rows={2} value={editing.adminNotes} onChange={e => setEditing(ed => ed && ({ ...ed, adminNotes: e.target.value }))} placeholder="Internal notes (not visible to customer)" /></div>
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
