import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  customerInfo: any;
  cart: any[];
  subtotal: number;
  gst: number;
  total: number;
}

export default function Bill() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [paymentDate, setPaymentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const paymentCompleted = sessionStorage.getItem('paymentCompleted');
    const storedInvoice = sessionStorage.getItem('invoiceData');
    const storedPaymentDate = sessionStorage.getItem('paymentDate');

    if (!paymentCompleted || !storedInvoice) {
      navigate('/cart');
      return;
    }

    setInvoiceData(JSON.parse(storedInvoice));
    if (storedPaymentDate) {
      setPaymentDate(new Date(storedPaymentDate).toLocaleString('en-IN'));
    }
  }, [navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download functionality will be implemented with PDF generation library');
  };

  const handleNewOrder = () => {
    // Clear session data
    sessionStorage.removeItem('invoiceData');
    sessionStorage.removeItem('paymentCompleted');
    sessionStorage.removeItem('paymentDate');
    navigate('/products');
  };

  if (!invoiceData) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-[var(--industrial-text-primary)] mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-[var(--industrial-text-secondary)]">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </motion.div>

        {/* Bill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white text-gray-900 p-8 rounded-lg shadow-lg print:shadow-none"
          id="bill"
        >
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  TECHNOVALVES
                </h2>
                <p className="text-sm text-gray-600">Industrial Valve Solutions</p>
                <p className="text-sm text-gray-600">Industrial Area, Sector 5</p>
                <p className="text-sm text-gray-600">Mumbai, Maharashtra 400001</p>
                <p className="text-sm text-gray-600">GST: 27XXXXX1234X1ZX</p>
              </div>
              <div className="text-right">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-4 font-bold">
                  PAID
                </div>
                <p className="text-sm text-gray-600">Invoice #</p>
                <p className="font-bold text-gray-900">{invoiceData.invoiceNumber}</p>
                <p className="text-sm text-gray-600 mt-2">Date</p>
                <p className="font-bold text-gray-900">{invoiceData.invoiceDate}</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Bill To:</h3>
            <p className="text-gray-900 font-semibold">{invoiceData.customerInfo.name}</p>
            {invoiceData.customerInfo.company && (
              <p className="text-gray-600">{invoiceData.customerInfo.company}</p>
            )}
            <p className="text-gray-600">{invoiceData.customerInfo.email}</p>
            <p className="text-gray-600">{invoiceData.customerInfo.phone}</p>
            {invoiceData.customerInfo.address && (
              <>
                <p className="text-gray-600 mt-2">{invoiceData.customerInfo.address}</p>
                <p className="text-gray-600">
                  {[
                    invoiceData.customerInfo.city,
                    invoiceData.customerInfo.state,
                    invoiceData.customerInfo.pincode
                  ].filter(Boolean).join(', ')}
                </p>
              </>
            )}
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className="text-left py-3 text-gray-900">Item</th>
                  <th className="text-center py-3 text-gray-900">Qty</th>
                  <th className="text-right py-3 text-gray-900">Price</th>
                  <th className="text-right py-3 text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.cart.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="py-3 text-gray-900">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </td>
                    <td className="text-center py-3 text-gray-900">{item.quantity}</td>
                    <td className="text-right py-3 text-gray-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </td>
                    <td className="text-right py-3 text-gray-900 font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-64">
              <div className="flex justify-between py-2 text-gray-900">
                <span>Subtotal:</span>
                <span>₹{invoiceData.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-900">
                <span>GST (18%):</span>
                <span>₹{invoiceData.gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-800 font-bold text-lg text-gray-900">
                <span>Total:</span>
                <span>₹{invoiceData.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Payment Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Payment Method:</p>
                <p className="font-semibold text-gray-900">UPI Payment</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Date:</p>
                <p className="font-semibold text-gray-900">{paymentDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-semibold text-green-600">Paid</p>
              </div>
              <div>
                <p className="text-gray-600">Transaction ID:</p>
                <p className="font-semibold text-gray-900">
                  TXN{Date.now().toString(36).toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
            <p className="mb-2">Thank you for your business!</p>
            <p>For any queries, contact us at info@technovalves.com or +91 22 1234 5678</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-8 print:hidden"
        >
          <button
            onClick={handlePrint}
            className="flex-1 px-6 py-3 bg-[var(--industrial-bg-secondary)] text-[var(--industrial-text-primary)] rounded-lg hover:bg-[var(--industrial-bg-tertiary)] transition-colors font-medium border border-[var(--industrial-border)]"
          >
            🖨️ Print Bill
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-3 bg-[var(--industrial-bg-secondary)] text-[var(--industrial-text-primary)] rounded-lg hover:bg-[var(--industrial-bg-tertiary)] transition-colors font-medium border border-[var(--industrial-border)]"
          >
            📥 Download PDF
          </button>
          <button
            onClick={handleNewOrder}
            className="flex-1 px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            🛒 New Order
          </button>
        </motion.div>
      </div>
    </div>
  );
}
