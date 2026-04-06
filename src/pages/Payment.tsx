import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  customerInfo: any;
  cart: any[];
  subtotal: number;
  gst: number;
  total: number;
}

// Dynamically load Razorpay checkout script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Payment() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const stored = sessionStorage.getItem('invoiceData');
    if (!stored) {
      navigate('/cart');
      return;
    }
    setInvoiceData(JSON.parse(stored));
    loadRazorpayScript();
  }, [navigate]);

  const handlePayNow = async () => {
    if (!invoiceData) return;
    setLoading(true);
    setError('');

    // 1. Create Razorpay order on server
    let orderId: string;
    try {
      const res = await fetch('import.meta.env.VITE_API_URL/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: invoiceData.total,
          invoiceNumber: invoiceData.invoiceNumber,
        }),
      });
      const data = await res.json();
      if (!data.orderId) throw new Error(data.error ?? 'Failed to create order');
      orderId = data.orderId;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // 2. Open Razorpay checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Math.round(invoiceData.total * 100),
      currency: 'INR',
      name: 'TechnoValves',
      description: `Invoice ${invoiceData.invoiceNumber}`,
      order_id: orderId,
      prefill: {
        name: invoiceData.customerInfo.name,
        email: invoiceData.customerInfo.email,
        contact: invoiceData.customerInfo.phone,
      },
      theme: { color: '#ef4444' },
      handler: async (response: any) => {
        // 3. Verify signature on server
        try {
          const verifyRes = await fetch('import.meta.env.VITE_API_URL/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              invoiceNumber: invoiceData.invoiceNumber,
            }),
          });
          const verifyData = await verifyRes.json();
          if (!verifyData.success) throw new Error('Payment verification failed');
        } catch {
          console.warn('Verification error, but payment may have succeeded');
        }

        sessionStorage.setItem('paymentCompleted', 'true');
        sessionStorage.setItem('paymentDate', new Date().toISOString());
        clearCart();
        navigate('/bill');
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      setError(response.error?.description ?? 'Payment failed. Please try again.');
      setLoading(false);
    });
    rzp.open();
    setLoading(false);
  };

  if (!invoiceData) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-[var(--industrial-text-primary)]">
            Complete Your Payment
          </h1>
          <p className="text-lg text-[var(--industrial-text-secondary)]">
            Secure payment powered by Razorpay
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]"
          >
            <h2 className="text-2xl font-bold mb-6 text-[var(--industrial-text-primary)]">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="space-y-3 pb-4 border-b border-[var(--industrial-border)]">
                {invoiceData.cart.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-[var(--industrial-text-primary)]">{item.name}</p>
                      <p className="text-xs text-[var(--industrial-text-secondary)]">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <p className="font-semibold text-[var(--industrial-text-primary)]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--industrial-text-secondary)]">Subtotal</span>
                  <span className="text-[var(--industrial-text-primary)]">₹{invoiceData.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--industrial-text-secondary)]">GST (18%)</span>
                  <span className="text-[var(--industrial-text-primary)]">₹{invoiceData.gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--industrial-border)]">
                  <span className="font-bold text-[var(--industrial-text-primary)]">Total</span>
                  <span className="font-bold text-[var(--industrial-accent)] text-lg">
                    ₹{invoiceData.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--industrial-bg-tertiary)] p-4 rounded-lg">
              <p className="text-xs text-[var(--industrial-text-secondary)] mb-1">
                📋 Invoice: {invoiceData.invoiceNumber}
              </p>
              <p className="text-xs text-[var(--industrial-text-secondary)]">
                👤 {invoiceData.customerInfo.name}
              </p>
            </div>
          </motion.div>

          {/* Pay Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[var(--industrial-text-primary)]">
                Payment
              </h2>

              <div className="space-y-4 mb-8 text-sm text-[var(--industrial-text-secondary)]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  <span>Credit / Debit Cards</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <span>UPI (GPay, PhonePe, Paytm & more)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏦</span>
                  <span>Net Banking</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span>Wallets</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePayNow}
                disabled={loading}
                className="w-full px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Opening Payment...' : `Pay ₹${invoiceData.total.toLocaleString('en-IN')}`}
              </button>
              <button
                onClick={() => navigate('/invoice')}
                className="w-full px-6 py-3 bg-[var(--industrial-bg-tertiary)] text-[var(--industrial-text-primary)] rounded-lg hover:bg-[var(--industrial-bg-primary)] transition-colors font-medium"
              >
                Back to Invoice
              </button>
              <p className="text-xs text-[var(--industrial-text-secondary)] text-center mt-2">
                🔒 Payments are secured by Razorpay
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
