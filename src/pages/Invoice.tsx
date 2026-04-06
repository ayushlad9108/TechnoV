import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Invoice() {
  const navigate = useNavigate();
  const { cart, getCartTotal } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const subtotal = getCartTotal();
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
  const invoiceDate = new Date().toLocaleDateString('en-IN');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleProceedToPayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const invoicePayload = { invoiceNumber, invoiceDate, customerInfo, cart, subtotal, gst, total };

    // Save order to MongoDB
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoicePayload),
      });
    } catch {
      console.warn('Could not save order to server');
    }

    sessionStorage.setItem('invoiceData', JSON.stringify(invoicePayload));
    navigate('/payment');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[var(--industrial-text-primary)] mb-2">
            Invoice
          </h1>
          <p className="text-[var(--industrial-text-secondary)]">
            Please review your order and provide billing details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)]">
              <h2 className="text-2xl font-bold mb-6 text-[var(--industrial-text-primary)]">
                Billing Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={customerInfo.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={customerInfo.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customerInfo.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={customerInfo.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                    Address
                  </label>
                  <textarea
                    name="address"
                    rows={3}
                    value={customerInfo.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)] resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--industrial-text-primary)]">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={customerInfo.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--industrial-bg-tertiary)] border border-[var(--industrial-border)] rounded-lg focus:outline-none focus:border-[var(--industrial-accent)] text-[var(--industrial-text-primary)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Invoice Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)]">
              <div className="mb-6 pb-6 border-b border-[var(--industrial-border)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--industrial-text-primary)]">
                      INVOICE
                    </h2>
                    <p className="text-sm text-[var(--industrial-text-secondary)]">
                      TechnoValves
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--industrial-text-secondary)]">
                      Invoice #: {invoiceNumber}
                    </p>
                    <p className="text-sm text-[var(--industrial-text-secondary)]">
                      Date: {invoiceDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="font-bold text-[var(--industrial-text-primary)] mb-3">
                  Items
                </h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="text-[var(--industrial-text-primary)] font-medium">
                          {item.name}
                        </p>
                        <p className="text-[var(--industrial-text-secondary)] text-xs">
                          Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="text-[var(--industrial-text-primary)] font-medium">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6 pb-6 border-b border-[var(--industrial-border)]">
                <div className="flex justify-between text-sm text-[var(--industrial-text-secondary)]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--industrial-text-secondary)]">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--industrial-border)]">
                  <span className="text-lg font-bold text-[var(--industrial-text-primary)]">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[var(--industrial-accent)]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full px-6 py-3 bg-[var(--industrial-bg-tertiary)] text-[var(--industrial-text-primary)] rounded-lg hover:bg-[var(--industrial-bg-primary)] transition-colors font-medium"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
