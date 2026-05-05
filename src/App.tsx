import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Industries from './pages/Industries';
import Engineering from './pages/Engineering';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';
import Cart from './pages/Cart';
import Invoice from './pages/Invoice';
import Payment from './pages/Payment';
import Bill from './pages/Bill';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import Blogs from './pages/Blogs';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminRequests from './pages/admin/AdminRequests';
import UserLogin from './pages/user/UserLogin';
import MyOrders from './pages/user/MyOrders';

function BackToHome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePop = () => {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <Routes>
            {/* ── Admin routes (no Navbar/Footer) ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="requests"  element={<AdminRequests />} />
              <Route path="products"  element={<AdminProducts />} />
              <Route path="blogs"     element={<AdminBlogs />} />
              <Route path="orders"    element={<AdminOrders />} />
              <Route path="users"     element={<AdminUsers />} />
            </Route>

            {/* ── User portal (no Navbar/Footer) ── */}
            <Route path="/order-portal" element={<UserLogin />} />
            <Route path="/my-orders"    element={<MyOrders />} />

            {/* ── Public routes (with Navbar/Footer) ── */}
            <Route path="/*" element={
              <div className="min-h-screen selection:bg-[var(--accent)] selection:text-white" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <BackToHome />
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/"           element={<Home />} />
                    <Route path="/about"      element={<About />} />
                    <Route path="/products"   element={<Products />} />
                    <Route path="/industries" element={<Industries />} />
                    <Route path="/engineering" element={<Engineering />} />
                    <Route path="/contact"    element={<Contact />} />
                    <Route path="/get-quote"  element={<GetQuote />} />
                    <Route path="/cart"       element={<Cart />} />
                    <Route path="/invoice"    element={<Invoice />} />
                    <Route path="/payment"    element={<Payment />} />
                    <Route path="/bill"       element={<Bill />} />
                    <Route path="/inquiry"    element={<Inquiry />} />
                    <Route path="/blogs"      element={<Blogs />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
