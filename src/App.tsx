import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
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
      <CartProvider>
        <div className="min-h-screen bg-[var(--industrial-bg-primary)] text-[var(--industrial-text-primary)] selection:bg-[var(--industrial-accent)] selection:text-white">
          <BackToHome />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/engineering" element={<Engineering />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-quote" element={<GetQuote />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/bill" element={<Bill />} />
              <Route path="/inquiry" element={<Inquiry />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
