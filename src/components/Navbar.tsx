import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Products', href: '#products' },
        { name: 'Industries', href: '#industries' },
        { name: 'Engineering', href: '#engineering' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled
                    ? 'bg-[var(--industrial-bg-primary)]/90 backdrop-blur-md border-[var(--industrial-border)] py-4'
                    : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-serif font-bold tracking-tighter text-[var(--industrial-text-primary)] flex items-center gap-3">
                        <img src="/logo.png" alt="TechnoValves" className="h-10 w-auto" />
                        <span className="hidden sm:inline">TECHNOVALVES</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-[var(--industrial-text-secondary)] hover:text-[var(--industrial-accent)] transition-colors uppercase tracking-wider"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="px-5 py-2 border border-[var(--industrial-accent)] text-[var(--industrial-accent)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--industrial-accent)] hover:text-white transition-all duration-300 rounded-sm">
                            Get Quote
                        </button>
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
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-serif font-bold text-[var(--industrial-text-primary)] border-b border-[var(--industrial-border)] pb-4"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="mt-4 py-4 bg-[var(--industrial-accent)] text-white font-bold uppercase tracking-widest w-full rounded-sm">
                                Get Quote
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
