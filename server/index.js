require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
  ].filter(Boolean)
}));
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected:', process.env.MONGODB_URI))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Schemas ---
const orderSchema = new mongoose.Schema({
  invoiceNumber: String,
  invoiceDate: String,
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    company: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  cart: Array,
  subtotal: Number,
  gst: Number,
  total: Number,
  paymentStatus: { type: String, default: 'pending' },
  razorpayPaymentId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const quoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  industry: String,
  valveType: String,
  quantity: String,
  specifications: String,
  timeline: String,
  createdAt: { type: Date, default: Date.now },
});

const Order   = mongoose.model('Order',   orderSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Quote   = mongoose.model('Quote',   quoteSchema);

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  age: Number,
  dob: String,
  state: String,
  industry: String,
  valves: [String],
  createdAt: { type: Date, default: Date.now },
});
const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- Debug route (remove after fixing) ---
app.get('/api/debug-keys', (req, res) => {
  res.json({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret_length: process.env.RAZORPAY_KEY_SECRET?.length,
    key_secret_preview: process.env.RAZORPAY_KEY_SECRET?.slice(0, 4) + '...',
  });
});

// --- Routes ---

// Save order when proceeding to payment
app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, id: order._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Mark order as paid
app.patch('/api/orders/:invoiceNumber/paid', async (req, res) => {
  try {
    await Order.findOneAndUpdate(
      { invoiceNumber: req.params.invoiceNumber },
      { paymentStatus: 'paid' }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create Razorpay order
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, invoiceNumber } = req.body; // amount in INR
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: invoiceNumber.slice(0, 40), // Razorpay receipt max 40 chars
    });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    // Razorpay SDK throws objects, not Error instances
    const errMsg = err?.error?.description || err?.message || JSON.stringify(err);
    console.error('Razorpay order creation failed:', errMsg);
    res.status(500).json({ success: false, error: errMsg });
  }
});

// Verify Razorpay payment signature
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, invoiceNumber } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    await Order.findOneAndUpdate(
      { invoiceNumber },
      { paymentStatus: 'paid', razorpayPaymentId: razorpay_payment_id }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save contact form submission
app.post('/api/contacts', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save quote request
app.post('/api/quotes', async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json({ success: true, id: quote._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save inquiry form
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, id: inquiry._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
