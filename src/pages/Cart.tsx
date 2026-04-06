import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleProceedToInvoice = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/invoice');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-[var(--industrial-text-primary)] mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-[var(--industrial-text-secondary)] mb-6">
            Add some products to get started
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Browse Products
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[var(--industrial-text-primary)] mb-2">
            Shopping Cart
          </h1>
          <p className="text-[var(--industrial-text-secondary)]">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)] flex gap-6"
              >
                {/* Product Image */}
                <div className="w-32 h-32 bg-[var(--industrial-bg-tertiary)] rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--industrial-text-primary)]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[var(--industrial-text-secondary)]">
                        {item.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[var(--industrial-text-secondary)] hover:text-[var(--industrial-accent)] transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-[var(--industrial-text-secondary)] text-sm mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-[var(--industrial-bg-tertiary)] rounded-lg hover:bg-[var(--industrial-bg-primary)] transition-colors flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-[var(--industrial-text-primary)] font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-[var(--industrial-bg-tertiary)] rounded-lg hover:bg-[var(--industrial-bg-primary)] transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--industrial-accent)]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-[var(--industrial-text-secondary)]">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)] sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-[var(--industrial-text-primary)]">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[var(--industrial-text-secondary)]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[var(--industrial-text-secondary)]">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-[var(--industrial-border)] pt-3 flex justify-between">
                  <span className="text-lg font-bold text-[var(--industrial-text-primary)]">Total</span>
                  <span className="text-2xl font-bold text-[var(--industrial-accent)]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToInvoice}
                className="w-full px-6 py-3 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full px-6 py-3 bg-[var(--industrial-bg-tertiary)] text-[var(--industrial-text-primary)] rounded-lg hover:bg-[var(--industrial-bg-primary)] transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
