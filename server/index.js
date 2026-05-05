require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

// ─── Razorpay ────────────────────────────────────────────────────────────────
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ─── Express ─────────────────────────────────────────────────────────────────
const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
}));
app.use(express.json());

// ─── Multer (PDF upload — memory storage so we can attach to email) ───────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
});

// ─── Nodemailer transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail({ subject, html, attachments = [], to }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email not configured — skipping send for:', subject);
    return;
  }
  const recipient = to || process.env.EMAIL_TO;
  try {
    const info = await transporter.sendMail({
      from: `"TechnoValves Website" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject,
      html,
      attachments,
    });
    console.log('✅ Email sent:', subject, '| ID:', info.messageId);
  } catch (err) {
    console.error('❌ Email send failed:', err.message, '| Subject:', subject);
  }
}

// ─── MongoDB ──────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ─── Schemas ──────────────────────────────────────────────────────────────────
const orderSchema = new mongoose.Schema({
  invoiceNumber: String,
  invoiceDate: String,
  customerInfo: {
    name: String, email: String, phone: String,
    company: String, address: String, city: String,
    state: String, pincode: String,
  },
  cart: Array,
  subtotal: Number,
  gst: Number,
  total: Number,
  paymentStatus: { type: String, default: 'pending' },
  razorpayPaymentId: { type: String, default: '' },
  // ── Order management fields ──
  purchaseOrderNumber: { type: String, default: '' },
  workOrderNumber:     { type: String, default: '' },
  orderStatus: {
    type: String,
    enum: ['Order Placed', 'Order Confirmed', 'In Production', 'Quality Check', 'Dispatched', 'Delivered'],
    default: 'Order Placed',
  },
  statusHistory: [{
    status: String,
    note: String,
    updatedAt: { type: Date, default: Date.now },
  }],
  adminNotes: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  company:  { type: String, default: '' },
  phone:    { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const contactSchema = new mongoose.Schema({
  name: String, email: String, phone: String,
  company: String, message: String,
  createdAt: { type: Date, default: Date.now },
});

const quoteSchema = new mongoose.Schema({
  name: String, email: String, phone: String,
  company: String, industry: String, valveType: String,
  quantity: String, specifications: String, timeline: String,
  createdAt: { type: Date, default: Date.now },
});

const inquirySchema = new mongoose.Schema({
  name: String, email: String, gender: String,
  age: Number, dob: String, state: String,
  industry: String, valves: [String],
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: String,
  date: String,
  summary: String,
  content: String,
  image: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  specifications: [String],
  price: Number,
  image: String,
  tag: String,
  spec: String,
  createdAt: { type: Date, default: Date.now },
});

const quoteRequestSchema = new mongoose.Schema({
  // Link to registered user (optional — guest submissions allowed)
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  // Form data
  name: String, email: String, phone: String,
  company: String, industry: String, valveType: String,
  quantity: String, specifications: String, timeline: String,
  hasPdf: { type: Boolean, default: false },
  // Status tracking
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Quotation Sent', 'Approved', 'In Production', 'Dispatched', 'Completed', 'Cancelled'],
    default: 'Submitted',
  },
  statusHistory: [{
    status: String,
    note: String,
    updatedAt: { type: Date, default: Date.now },
  }],
  adminNotes: { type: String, default: '' },
  purchaseOrderNumber: { type: String, default: '' },
  workOrderNumber:     { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const Order        = mongoose.model('Order',        orderSchema);
const Contact      = mongoose.model('Contact',      contactSchema);
const Quote        = mongoose.model('Quote',        quoteSchema);
const Inquiry      = mongoose.model('Inquiry',      inquirySchema);
const Blog         = mongoose.model('Blog',         blogSchema);
const Product      = mongoose.model('Product',      productSchema);
const User         = mongoose.model('User',         userSchema);
const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ── Orders ────────────────────────────────────────────────────────────────────
app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, id: order._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

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

// ── Razorpay ──────────────────────────────────────────────────────────────────
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, invoiceNumber } = req.body;
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: invoiceNumber.slice(0, 40),
    });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    const errMsg = err?.error?.description || err?.message || JSON.stringify(err);
    console.error('Razorpay order creation failed:', errMsg);
    res.status(500).json({ success: false, error: errMsg });
  }
});

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

    const order = await Order.findOneAndUpdate(
      { invoiceNumber },
      { paymentStatus: 'paid', razorpayPaymentId: razorpay_payment_id },
      { new: true }
    );

    // Send payment confirmation email
    if (order) {
      const itemsHtml = (order.cart || []).map(item =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
        </tr>`
      ).join('');

      await sendMail({
        subject: `✅ Payment Received — ${invoiceNumber}`,
        html: `
          <h2 style="color:#0EA5E9">Payment Confirmed — TechnoValves</h2>
          <p><strong>Invoice:</strong> ${invoiceNumber}</p>
          <p><strong>Customer:</strong> ${order.customerInfo?.name}</p>
          <p><strong>Email:</strong> ${order.customerInfo?.email}</p>
          <p><strong>Phone:</strong> ${order.customerInfo?.phone}</p>
          <p><strong>Company:</strong> ${order.customerInfo?.company || '—'}</p>
          <p><strong>Razorpay Payment ID:</strong> ${razorpay_payment_id}</p>
          <hr/>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="background:#f3f4f6">
                <th style="padding:8px;text-align:left">Item</th>
                <th style="padding:8px;text-align:center">Qty</th>
                <th style="padding:8px;text-align:right">Amount</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <hr/>
          <p><strong>Subtotal:</strong> ₹${order.subtotal?.toLocaleString('en-IN')}</p>
          <p><strong>GST (18%):</strong> ₹${order.gst?.toLocaleString('en-IN')}</p>
          <p style="font-size:18px"><strong>Total Paid:</strong> ₹${order.total?.toLocaleString('en-IN')}</p>
        `,
      });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Contact ───────────────────────────────────────────────────────────────────
app.post('/api/contacts', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    await sendMail({
      subject: `📩 New Contact — ${req.body.name}`,
      to: [process.env.EMAIL_TO, 'business@technovalves.org', 'sales@technovalves.org'].filter(Boolean).join(','),
      html: `
        <h2 style="color:#0EA5E9">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || '—'}</p>
        <p><strong>Company:</strong> ${req.body.company || '—'}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p style="background:#f3f4f6;padding:12px;border-radius:6px">${req.body.message}</p>
      `,
    });

    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Quote (with optional PDF attachment) ─────────────────────────────────────
app.post('/api/quotes', upload.single('pdf'), async (req, res) => {
  try {
    const data = req.body;

    // Save legacy quote
    await Quote.create(data);

    // Create trackable QuoteRequest (linked to user if logged in)
    const qr = await QuoteRequest.create({
      userId:   data.userId || null,
      name:     data.name,
      email:    data.email,
      phone:    data.phone,
      company:  data.company,
      industry: data.industry,
      valveType: data.valveType,
      quantity:  data.quantity,
      specifications: data.specifications,
      timeline:  data.timeline,
      hasPdf:    !!req.file,
      statusHistory: [{ status: 'Submitted', note: 'Quote request received', updatedAt: new Date() }],
    });

    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname || 'quote-document.pdf',
        content: req.file.buffer,
        contentType: 'application/pdf',
      });
    }

    await sendMail({
      subject: `📋 New Quote Request — ${data.name} (${data.company})`,
      to: 'business@technovalves.org,sales@technovalves.org',
      html: `
        <h2 style="color:#0EA5E9">New Quote Request — TechnoValves</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Industry:</strong> ${data.industry}</p>
        <p><strong>Valve Type:</strong> ${data.valveType}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
        <p><strong>Timeline:</strong> ${data.timeline || '—'}</p>
        <hr/>
        <p><strong>Specifications:</strong></p>
        <p style="background:#f3f4f6;padding:12px;border-radius:6px">${data.specifications}</p>
        ${req.file ? '<p>📎 <strong>PDF attached</strong></p>' : ''}
        <hr/>
        <p style="color:#888;font-size:12px">Request ID: ${qr._id}</p>
      `,
      attachments,
    });

    res.status(201).json({ success: true, id: qr._id, requestId: qr._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Inquiry ───────────────────────────────────────────────────────────────────
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    await sendMail({
      subject: `🔍 New Inquiry — ${req.body.name}`,
      html: `
        <h2 style="color:#0EA5E9">New Product Inquiry — TechnoValves</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Gender:</strong> ${req.body.gender}</p>
        <p><strong>Age:</strong> ${req.body.age}</p>
        <p><strong>Date of Birth:</strong> ${req.body.dob}</p>
        <p><strong>State:</strong> ${req.body.state}</p>
        <p><strong>Industry:</strong> ${req.body.industry}</p>
        <p><strong>Valve Types Required:</strong> ${(req.body.valves || []).join(', ')}</p>
      `,
    });

    res.status(201).json({ success: true, id: inquiry._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Blogs (public) ────────────────────────────────────────────────────────────
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Admin Auth ────────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'techno@1985';
  if (username === adminUser && password === adminPass) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

function adminAuth(req, res, next) {
  const auth = req.headers['x-admin-token'];
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'techno@1985';
  const expected = Buffer.from(`${adminUser}:${adminPass}`).toString('base64');
  if (auth === expected) return next();
  res.status(401).json({ success: false, error: 'Unauthorized' });
}

// ── Admin: Products CRUD ──────────────────────────────────────────────────────
app.get('/api/admin/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/products', adminAuth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/admin/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/admin/products/:id', adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Admin: Blogs CRUD ─────────────────────────────────────────────────────────
app.get('/api/admin/blogs', adminAuth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/blogs', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/admin/blogs/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/admin/blogs/:id', adminAuth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Admin: Orders (read-only) ─────────────────────────────────────────────────
app.get('/api/admin/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── User Auth ─────────────────────────────────────────────────────────────────
const bcrypt = require('bcryptjs');

app.post('/api/user/register', async (req, res) => {
  try {
    const { name, email, password, company, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, error: 'Name, email and password required' });
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ success: false, error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, company, phone });
    const token = Buffer.from(`user:${user._id}:${email}`).toString('base64');
    res.status(201).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, company: user.company } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, error: 'Invalid email or password' });
    const token = Buffer.from(`user:${user._id}:${email}`).toString('base64');
    res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, company: user.company } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

async function userAuth(req, res, next) {
  try {
    const token = req.headers['x-user-token'];
    if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts[0] !== 'user' || !parts[1]) return res.status(401).json({ success: false, error: 'Invalid token' });
    const user = await User.findById(parts[1]);
    if (!user) return res.status(401).json({ success: false, error: 'User not found' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  }
}

// ── User: My Orders ───────────────────────────────────────────────────────────
app.get('/api/user/orders', userAuth, async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { userId: req.user._id },
        { 'customerInfo.email': req.user.email },
      ]
    }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/user/orders/:invoiceNumber', userAuth, async (req, res) => {
  try {
    const order = await Order.findOne({
      invoiceNumber: req.params.invoiceNumber,
      $or: [{ userId: req.user._id }, { 'customerInfo.email': req.user.email }],
    });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Admin: Full Order Management ──────────────────────────────────────────────
app.get('/api/admin/orders', adminAuth, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 50 } = req.query;
    const query = {};
    if (status) query.orderStatus = status;
    if (search) {
      const re = new RegExp(search, 'i');
      query.$or = [
        { invoiceNumber: re },
        { purchaseOrderNumber: re },
        { workOrderNumber: re },
        { 'customerInfo.name': re },
        { 'customerInfo.email': re },
        { 'customerInfo.company': re },
        { 'customerInfo.phone': re },
      ];
    }
    const total  = await Order.countDocuments(query);
    const orders = await Order.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ orders, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/admin/orders/:id', adminAuth, async (req, res) => {
  try {
    const { orderStatus, purchaseOrderNumber, workOrderNumber, adminNotes, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    if (orderStatus && orderStatus !== order.orderStatus) {
      order.statusHistory.push({ status: orderStatus, note: req.body.statusNote || '', updatedAt: new Date() });
      order.orderStatus = orderStatus;
    }
    if (purchaseOrderNumber !== undefined) order.purchaseOrderNumber = purchaseOrderNumber;
    if (workOrderNumber     !== undefined) order.workOrderNumber     = workOrderNumber;
    if (adminNotes          !== undefined) order.adminNotes          = adminNotes;
    if (paymentStatus       !== undefined) order.paymentStatus       = paymentStatus;

    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Admin: Users ──────────────────────────────────────────────────────────────
app.get('/api/admin/users', adminAuth, async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};
    if (search) {
      const re = new RegExp(search, 'i');
      query.$or = [{ name: re }, { email: re }, { company: re }, { phone: re }];
    }
    const users = await User.find(query, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── User: My Quote Requests ───────────────────────────────────────────────────
app.get('/api/user/requests', userAuth, async (req, res) => {
  try {
    const requests = await QuoteRequest.find({
      $or: [{ userId: req.user._id }, { email: req.user.email }]
    }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Admin: Quote Requests ─────────────────────────────────────────────────────
app.get('/api/admin/requests', adminAuth, async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) {
      const re = new RegExp(search, 'i');
      query.$or = [
        { name: re }, { email: re }, { company: re },
        { phone: re }, { valveType: re }, { industry: re },
      ];
    }
    const requests = await QuoteRequest.find(query).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/admin/requests/:id', adminAuth, async (req, res) => {
  try {
    const { status, adminNotes, purchaseOrderNumber, workOrderNumber, statusNote } = req.body;
    const qr = await QuoteRequest.findById(req.params.id);
    if (!qr) return res.status(404).json({ success: false, error: 'Not found' });

    if (status && status !== qr.status) {
      qr.statusHistory.push({ status, note: statusNote || '', updatedAt: new Date() });
      qr.status = status;
    }
    if (adminNotes          !== undefined) qr.adminNotes          = adminNotes;
    if (purchaseOrderNumber !== undefined) qr.purchaseOrderNumber = purchaseOrderNumber;
    if (workOrderNumber     !== undefined) qr.workOrderNumber     = workOrderNumber;

    await qr.save();
    res.json({ success: true, request: qr });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
