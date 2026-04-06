import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Industries', href: '/industries' },
        { name: 'Engineering', href: '/engineering' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b gpu-accelerated ${scrolled
                    ? 'bg-[var(--industrial-bg-primary)] border-[var(--industrial-border)] py-4'
                    : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-[var(--industrial-text-primary)] flex items-center gap-3">
                        <img src="/logo.png" alt="TechnoValves" className="h-10 w-auto" />
                        <span className="hidden sm:inline">TECHNOVALVES</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-base font-medium text-[var(--industrial-text-secondary)] hover:text-[var(--industrial-accent)] transition-colors uppercase tracking-wider"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/cart" className="relative text-[var(--industrial-text-secondary)] hover:text-[var(--industrial-accent)] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--industrial-accent)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link to="/get-quote" className="px-5 py-2 border border-[var(--industrial-accent)] text-[var(--industrial-accent)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--industrial-accent)] hover:text-white transition-all duration-300 rounded-sm">
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[var(--industrial-text-primary)]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[var(--industrial-bg-primary)] md:hidden pt-24 px-6"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-serif font-bold text-[var(--industrial-text-primary)] border-b border-[var(--industrial-border)] pb-4"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/get-quote" onClick={() => setMobileMenuOpen(false)} className="mt-4 py-4 bg-[var(--industrial-accent)] text-white font-bold uppercase tracking-widest w-full rounded-sm text-center">
                                Get Quote
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
