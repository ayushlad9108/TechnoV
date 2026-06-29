import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled]             = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

    const navLinks = [
        { name: 'Home',        href: '/' },
        { name: 'Products',    href: '/products' },
        { name: 'Industries',  href: '/industries' },
        { name: 'About Us',    href: '/about' },
        { name: 'Engineering', href: '/engineering' },
        { name: 'Blogs',       href: '/blogs' },
        { name: 'Contact',     href: '/contact' },
    ];

    const navBg  = scrolled ? 'bg-white border-gray-200' : 'bg-transparent border-transparent';
    const linkCls = scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-800 hover:text-blue-600';
    const logoCls = scrolled ? 'text-gray-900' : 'text-gray-900';
    const iconCls = scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-gray-600 hover:text-blue-600';

    return (
        <>
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b backdrop-blur-sm ${navBg}`}
                style={{ paddingTop: scrolled ? '14px' : '20px', paddingBottom: scrolled ? '14px' : '20px' }}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className={`flex items-center gap-3 font-display font-bold text-xl tracking-tight transition-colors duration-200 ${logoCls}`}>
                        <img src="/logo.png" alt="TechnoValves" className="h-9 w-auto" />
                        <span className="hidden sm:inline">TECHNOVALVES</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link key={link.name} to={link.href}
                                    className={`text-sm font-sans font-medium transition-colors duration-200 ${isActive ? 'text-blue-500' : linkCls}`}>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Controls — desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/get-quote"
                            className="px-5 py-2 rounded-sm font-sans font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                            Get In Touch
                        </Link>
                    </div>

                    {/* Mobile: hamburger only */}
                    <div className="md:hidden flex items-center">
                        <button className={`p-2 transition-colors duration-200 ${iconCls}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.28 }}
                        className="fixed inset-0 z-40 md:hidden pt-20 px-6 flex flex-col bg-white"
                    >
                        <div className="flex flex-col gap-1 mt-4">
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.href}
                                    className="py-4 font-display font-bold text-2xl border-b border-gray-100 text-gray-900 hover:text-blue-600 transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Link to="/get-quote"
                                className="block py-4 text-center font-sans font-bold text-sm text-white rounded-sm bg-blue-600 hover:bg-blue-700 transition-colors">
                                Get In Touch
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
