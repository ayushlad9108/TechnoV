import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;
function userHeaders() {
  return { 'Content-Type': 'application/json', 'x-user-token': sessionStorage.getItem('userToken') || '' };
}

const STATUS_STEPS = [
  'Submitted',
  'Under Review',
  'Quotation Sent',
  'Approved',
  'In Production',
  'Dispatched',
  'Completed',
];

const STATUS_COLORS: Record<string, string> = {
  'Submitted':      'bg-slate-100 text-slate-700 border-slate-200',
  'Under Review':   'bg-blue-100 text-blue-700 border-blue-200',
  'Quotation Sent': 'bg-violet-100 text-violet-700 border-violet-200',
  'Approved':       'bg-emerald-100 text-emerald-700 border-emerald-200',
  'In Production':  'bg-amber-100 text-amber-700 border-amber-200',
  'Dispatched':     'bg-sky-100 text-sky-700 border-sky-200',
  'Completed':      'bg-green-100 text-green-700 border-green-200',
  'Cancelled':      'bg-red-100 text-red-700 border-red-200',
};

interface QuoteRequest {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  valveType: string;
  quantity: string;
  specifications: string;
  timeline: string;
  hasPdf: boolean;
  status: string;
  purchaseOrderNumber: string;
  workOrderNumber: string;
  statusHistory: { status: string; note: string; updatedAt: string }[];
  createdAt: string;
}

export default function MyOrders() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}');

  useEffect(() => {
    if (!sessionStorage.getItem('userToken')) { navigate('/order-portal'); return; }
    fetch(`${API}/api/user/requests`, { headers: userHeaders() })
      .then(r => r.json())
      .then(data => setRequests(Array.isArray(data) ? data : []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userInfo');
    navigate('/order-portal');
  };

  const stepIdx = (s: string) => STATUS_STEPS.indexOf(s);

  return (
    <div className="min-h-screen pt-20 pb-16" style={{ background: 'var(--industrial-bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between py-6 border-b mb-8" style={{ borderColor: 'var(--industrial-border)' }}>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--industrial-text-primary)' }}>My Quote Requests</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--industrial-text-secondary)' }}>
              Welcome, {userInfo.name}{userInfo.company ? ` · ${userInfo.company}` : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/get-quote"
              className="text-sm px-4 py-2 rounded-lg text-white font-medium transition-colors"
              style={{ background: 'var(--industrial-accent)' }}>
              + New Request
            </Link>
            <Link to="/" className="text-sm px-4 py-2 rounded-lg border transition-colors"
              style={{ borderColor: 'var(--industrial-border)', color: 'var(--industrial-text-secondary)' }}>
              ← Website
            </Link>
            <button onClick={logout} className="text-sm px-4 py-2 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition-colors">
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[var(--industrial-accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--industrial-text-secondary)' }}>
            <p className="text-5xl mb-4">📋</p>
            <p className="text-lg font-medium mb-2" style={{ color: 'var(--industrial-text-primary)' }}>No requests yet</p>
            <p className="text-sm mb-6">Submit a quote request and track it here.</p>
            <Link to="/get-quote"
              className="inline-block px-6 py-2.5 text-sm font-semibold text-white rounded-lg"
              style={{ background: 'var(--industrial-accent)' }}>
              Request a Quote
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req, i) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border rounded-xl overflow-hidden"
                style={{ background: 'var(--industrial-bg-secondary)', borderColor: 'var(--industrial-border)' }}
              >
                {/* Summary row */}
                <div
                  className="p-5 flex flex-wrap gap-4 items-center justify-between cursor-pointer hover:bg-[var(--industrial-bg-tertiary)] transition-colors"
                  onClick={() => setSelected(selected === req._id ? null : req._id)}
                >
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--industrial-text-secondary)' }}>Valve Type</p>
                      <p className="text-sm font-bold" style={{ color: 'var(--industrial-text-primary)' }}>{req.valveType || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--industrial-text-secondary)' }}>Industry</p>
                      <p className="text-sm" style={{ color: 'var(--industrial-text-primary)' }}>{req.industry || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--industrial-text-secondary)' }}>Quantity</p>
                      <p className="text-sm" style={{ color: 'var(--industrial-text-primary)' }}>{req.quantity || '—'}</p>
                    </div>
                    {req.purchaseOrderNumber && (
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--industrial-text-secondary)' }}>PO Number</p>
                        <p className="text-sm font-mono font-bold" style={{ color: 'var(--industrial-text-primary)' }}>{req.purchaseOrderNumber}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--industrial-text-secondary)' }}>Submitted</p>
                      <p className="text-sm" style={{ color: 'var(--industrial-text-primary)' }}>
                        {new Date(req.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {req.hasPdf && <span className="text-xs text-[var(--industrial-text-secondary)]">📎 PDF</span>}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_COLORS[req.status] || ''}`}>
                      {req.status}
                    </span>
                    <span style={{ color: 'var(--industrial-text-secondary)' }}>{selected === req._id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {selected === req._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t"
                      style={{ borderColor: 'var(--industrial-border)' }}
                    >
                      <div className="p-6 space-y-6">

                        {/* Progress tracker */}
                        <div>
                          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--industrial-text-secondary)' }}>Request Progress</p>
                          <div className="flex items-start gap-0 overflow-x-auto pb-2">
                            {STATUS_STEPS.map((step, idx) => {
                              const current = stepIdx(req.status);
                              const done    = idx <= current;
                              const active  = idx === current;
                              return (
                                <div key={step} className="flex items-center flex-1 min-w-0">
                                  <div className="flex flex-col items-center min-w-[60px]">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 transition-all flex-shrink-0 ${
                                      done
                                        ? 'border-[var(--industrial-accent)] bg-[var(--industrial-accent)] text-white'
                                        : 'border-[var(--industrial-border)] text-[var(--industrial-text-secondary)]'
                                    } ${active ? 'ring-4 ring-[var(--industrial-accent)]/20' : ''}`}>
                                      {done ? '✓' : idx + 1}
                                    </div>
                                    <p className={`text-[9px] font-mono mt-1 text-center leading-tight px-1 ${
                                      done ? 'text-[var(--industrial-accent)]' : 'text-[var(--industrial-text-secondary)]'
                                    }`}>{step}</p>
                                  </div>
                                  {idx < STATUS_STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 mb-4 mx-0.5 ${done && idx < current ? 'bg-[var(--industrial-accent)]' : 'bg-[var(--industrial-border)]'}`} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Specifications */}
                        <div>
                          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--industrial-text-secondary)' }}>Specifications</p>
                          <p className="text-sm leading-relaxed p-3 rounded-lg" style={{ color: 'var(--industrial-text-primary)', background: 'var(--industrial-bg-tertiary)' }}>
                            {req.specifications}
                          </p>
                        </div>

                        {/* Status history */}
                        {req.statusHistory?.length > 0 && (
                          <div>
                            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--industrial-text-secondary)' }}>Status Updates</p>
                            <div className="space-y-2">
                              {[...req.statusHistory].reverse().map((h, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                  <span className="text-[var(--industrial-accent)] font-mono text-xs mt-0.5 shrink-0">
                                    {new Date(h.updatedAt).toLocaleDateString('en-IN')}
                                  </span>
                                  <div>
                                    <span className="font-medium" style={{ color: 'var(--industrial-text-primary)' }}>{h.status}</span>
                                    {h.note && <span className="ml-2" style={{ color: 'var(--industrial-text-secondary)' }}>— {h.note}</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
