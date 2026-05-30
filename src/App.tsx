import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Industries from './pages/Industries';
import Engineering from './pages/Engineering';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import Blogs from './pages/Blogs';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen selection:bg-[var(--accent)] selection:text-white"
          style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/about"       element={<About />} />
              <Route path="/products"    element={<Products />} />
              <Route path="/industries"  element={<Industries />} />
              <Route path="/engineering" element={<Engineering />} />
              <Route path="/contact"     element={<Contact />} />
              <Route path="/get-quote"   element={<GetQuote />} />
              <Route path="/inquiry"     element={<Inquiry />} />
              <Route path="/blogs"       element={<Blogs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
