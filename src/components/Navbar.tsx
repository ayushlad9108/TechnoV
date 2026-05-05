import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled]         = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginMenuOpen, setLoginMenuOpen]   = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const loginRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMobileMenuOpen(false); setLoginMenuOpen(false); }, [location.pathname]);

    // Close login dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
                setLoginMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const navLinks = [
        { name: 'Home',        href: '/' },
        { name: 'Products',    href: '/products' },
        { name: 'Industries',  href: '/industries' },
        { name: 'About Us',    href: '/about' },
        { name: 'Engineering', href: '/engineering' },
        { name: 'Blogs',       href: '/blogs' },
        { name: 'Contact',     href: '/contact' },
    ];

    const isDark = theme === 'dark';
    const isHome = location.pathname === '/';

    const navBg   = scrolled
        ? isDark ? 'bg-[#0A0F14] border-[#1E293B]' : 'bg-white border-gray-200'
        : 'bg-transparent border-transparent';
    const linkCls = scrolled
        ? isDark ? 'text-white/80 hover:text-white' : 'text-gray-800 hover:text-blue-600'
        : isDark || isHome ? 'text-white/85 hover:text-white' : 'text-gray-800 hover:text-blue-600';
    const logoCls = scrolled
        ? isDark ? 'text-white' : 'text-gray-900'
        : isDark || isHome ? 'text-white' : 'text-gray-900';
    const iconCls = scrolled
        ? isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-blue-600'
        : isDark || isHome ? 'text-white/85 hover:text-white' : 'text-gray-600 hover:text-blue-600';

    const isLoggedIn = !!sessionStorage.getItem('userToken');
    const userInfo   = isLoggedIn ? JSON.parse(sessionStorage.getItem('userInfo') || '{}') : null;

    const handleUserLogout = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userInfo');
        navigate('/');
    };

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

                    {/* Right Controls */}
                    <div className="hidden md:flex items-center gap-3">

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors duration-200 ${iconCls}`}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                            {isDark ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* Login dropdown */}
                        <div ref={loginRef} className="relative">
                            {isLoggedIn ? (
                                // Logged-in user menu
                                <div className="relative">
                                    <button
                                        onClick={() => setLoginMenuOpen(v => !v)}
                                        className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                                            scrolled
                                                ? isDark ? 'border-[#1E293B] text-white/80 hover:text-white' : 'border-gray-200 text-gray-700 hover:text-gray-900'
                                                : isDark || isHome ? 'border-white/30 text-white/80 hover:text-white' : 'border-gray-300 text-gray-700 hover:text-gray-900'
                                        }`}>
                                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                                            {userInfo?.name?.[0]?.toUpperCase() || 'U'}
                                        </span>
                                        <span className="hidden lg:inline max-w-[100px] truncate">{userInfo?.name}</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <AnimatePresence>
                                        {loginMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                                            >
                                                <Link to="/my-orders" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    📋 My Requests
                                                </Link>
                                                <div className="border-t border-gray-100" />
                                                <button onClick={handleUserLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                                    🚪 Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                // Not logged in — show dropdown
                                <div className="relative">
                                    <button
                                        onClick={() => setLoginMenuOpen(v => !v)}
                                        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                                            scrolled
                                                ? isDark ? 'border-[#1E293B] text-white/80 hover:text-white' : 'border-gray-200 text-gray-700 hover:text-gray-900'
                                                : isDark || isHome ? 'border-white/30 text-white/80 hover:text-white' : 'border-gray-300 text-gray-700 hover:text-gray-900'
                                        }`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Login
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <AnimatePresence>
                                        {loginMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                                            >
                                                <div className="px-4 py-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100">
                                                    Sign In As
                                                </div>
                                                <Link to="/order-portal" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                                                    <span className="text-lg">👤</span>
                                                    <div>
                                                        <p className="font-semibold">Customer</p>
                                                        <p className="text-xs text-gray-400">Track your requests</p>
                                                    </div>
                                                </Link>
                                                <div className="border-t border-gray-100" />
                                                <Link to="/admin/login" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <span className="text-lg">🔐</span>
                                                    <div>
                                                        <p className="font-semibold">Admin</p>
                                                        <p className="text-xs text-gray-400">Manage the platform</p>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Get In Touch CTA */}
                        <Link to="/get-quote"
                            className="px-5 py-2 rounded-sm font-sans font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                            Get In Touch
                        </Link>
                    </div>

                    {/* Mobile: theme toggle + hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors duration-200 ${iconCls}`} aria-label="Toggle theme">
                            {isDark ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
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
                        <div className="mt-6 flex flex-col gap-3">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/my-orders" className="py-3 text-center font-sans font-semibold text-sm border border-gray-200 rounded-sm text-gray-700">
                                        📋 My Requests
                                    </Link>
                                    <button onClick={handleUserLogout} className="py-3 text-center font-sans font-semibold text-sm border border-red-200 rounded-sm text-red-500">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/order-portal" className="py-3 text-center font-sans font-semibold text-sm border border-gray-200 rounded-sm text-gray-700">
                                        👤 Customer Login
                                    </Link>
                                    <Link to="/admin/login" className="py-3 text-center font-sans font-semibold text-sm border border-gray-200 rounded-sm text-gray-700">
                                        🔐 Admin Login
                                    </Link>
                                </>
                            )}
                            <Link to="/get-quote"
                                className="py-4 text-center font-sans font-bold text-sm text-white rounded-sm bg-blue-600 hover:bg-blue-700 transition-colors">
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
