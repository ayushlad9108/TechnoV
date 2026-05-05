import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;
function adminHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-token': sessionStorage.getItem('adminToken') || '' };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, blogs: 0, products: 0, users: 0 });

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/admin/orders`,   { headers: adminHeaders() }).then(r => r.json()),
      fetch(`${API}/api/admin/blogs`,    { headers: adminHeaders() }).then(r => r.json()),
      fetch(`${API}/api/admin/products`, { headers: adminHeaders() }).then(r => r.json()),
      fetch(`${API}/api/admin/users`,    { headers: adminHeaders() }).then(r => r.json()),
    ]).then(([orders, blogs, products, users]) => {
      setStats({
        orders:   orders?.total   ?? (Array.isArray(orders)   ? orders.length   : 0),
        blogs:    Array.isArray(blogs)    ? blogs.length    : 0,
        products: Array.isArray(products) ? products.length : 0,
        users:    Array.isArray(users)    ? users.length    : 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Orders',  value: stats.orders,   icon: '📦', href: '/admin/orders',   bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-100' },
    { label: 'Registered Users', value: stats.users, icon: '👥', href: '/admin/users',    bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
    { label: 'Blog Posts',    value: stats.blogs,    icon: '📝', href: '/admin/blogs',    bg: 'bg-emerald-50',text: 'text-emerald-600',border: 'border-emerald-100' },
    { label: 'Products (DB)', value: stats.products, icon: '🔧', href: '/admin/products', bg: 'bg-amber-50',  text: 'text-amber-600',  border: 'border-amber-100' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Admin</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link to={card.href}
              className={`block ${card.bg} border ${card.border} rounded-xl p-5 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{card.icon}</span>
                <span className={`text-3xl font-bold font-mono ${card.text}`}>{card.value}</span>
              </div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-5">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
            + Add Product
          </Link>
          <Link to="/admin/blogs"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors">
            + New Blog Post
          </Link>
          <Link to="/" target="_blank"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors">
            View Website ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
