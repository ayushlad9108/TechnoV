import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer
            className="border-t pt-16 pb-8"
            style={{
                background: 'var(--industrial-bg-secondary)',
                borderColor: 'var(--industrial-border)',
            }}
            id="contact"
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div
                            className="text-2xl font-display font-bold tracking-tight mb-6 flex items-center gap-3"
                            style={{ color: 'var(--industrial-text-primary)' }}
                        >
                            <img src="/logo.png" alt="TechnoValves" className="h-10 w-auto" />
                            TECHNOVALVES
                        </div>
                        <p
                            className="text-base leading-relaxed mb-6"
                            style={{ color: 'var(--industrial-text-secondary)' }}
                        >
                            Established in 1985, Techno Valves is a precision-driven industrial valve
                            manufacturer — Ball Valves, Gate Valves, Globe Valves, NRV and more. Based in
                            Satpur MIDC, Nashik, Maharashtra, India.
                        </p>
                        <div className="flex gap-4">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-white"
                                style={{
                                    background: 'var(--industrial-bg-primary)',
                                    color: 'var(--industrial-text-secondary)',
                                    border: '1px solid var(--industrial-border)',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--industrial-accent)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'var(--industrial-bg-primary)')}
                            >
                                <span className="font-bold text-xs">Li</span>
                            </div>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:text-white"
                                style={{
                                    background: 'var(--industrial-bg-primary)',
                                    color: 'var(--industrial-text-secondary)',
                                    border: '1px solid var(--industrial-border)',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--industrial-accent)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'var(--industrial-bg-primary)')}
                            >
                                <span className="font-bold text-xs">X</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4
                            className="font-bold uppercase tracking-widest text-sm mb-6"
                            style={{ color: 'var(--industrial-text-primary)' }}
                        >
                            Quick Links
                        </h4>
                        <ul className="space-y-4 text-base" style={{ color: 'var(--industrial-text-secondary)' }}>
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Our Products', href: '/products' },
                                { label: 'Industries Served', href: '/industries' },
                                { label: 'Engineering', href: '/engineering' },
                                { label: 'Blogs', href: '/blogs' },
                            ].map(l => (
                                <li key={l.label}>
                                    <Link
                                        to={l.href}
                                        className="transition-colors hover:text-[var(--industrial-accent)]"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Design Certifications */}
                    <div>
                        <h4
                            className="font-bold uppercase tracking-widest text-sm mb-6"
                            style={{ color: 'var(--industrial-text-primary)' }}
                        >
                            Design Certifications
                        </h4>
                        <ul className="space-y-4 text-base" style={{ color: 'var(--industrial-text-secondary)' }}>
                            {[
                                { dot: 'var(--industrial-highlight)', label: 'ISO 9001:2015' },
                                { dot: 'var(--industrial-accent)',    label: 'API 6D / 600' },
                            ].map(c => (
                                <li key={c.label} className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ background: c.dot }}
                                    />
                                    {c.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4
                            className="font-bold uppercase tracking-widest text-sm mb-6"
                            style={{ color: 'var(--industrial-text-primary)' }}
                        >
                            Contact
                        </h4>
                        <ul className="space-y-4 text-base" style={{ color: 'var(--industrial-text-secondary)' }}>
                            <li>
                                <span
                                    className="block text-xs uppercase mb-1"
                                    style={{ color: 'var(--industrial-text-secondary)', opacity: 0.6 }}
                                >
                                    Office
                                </span>
                                Satpur MIDC, Nashik, Maharashtra, India
                            </li>
                            <li>
                                <span
                                    className="block text-xs uppercase mb-1"
                                    style={{ color: 'var(--industrial-text-secondary)', opacity: 0.6 }}
                                >
                                    Phone
                                </span>
                                <a
                                    href="tel:+918788280766"
                                    className="hover:text-[var(--industrial-accent)] transition-colors"
                                >
                                    +91 87882 80766
                                </a>
                            </li>
                            <li>
                                <span
                                    className="block text-xs uppercase mb-1"
                                    style={{ color: 'var(--industrial-text-secondary)', opacity: 0.6 }}
                                >
                                    Business
                                </span>
                                <a
                                    href="mailto:business@technovalves.org"
                                    className="hover:text-[var(--industrial-accent)] transition-colors"
                                >
                                    business@technovalves.org
                                </a>
                            </li>
                            <li>
                                <span
                                    className="block text-xs uppercase mb-1"
                                    style={{ color: 'var(--industrial-text-secondary)', opacity: 0.6 }}
                                >
                                    Sales
                                </span>
                                <a
                                    href="mailto:sales@technovalves.org"
                                    className="hover:text-[var(--industrial-accent)] transition-colors"
                                >
                                    sales@technovalves.org
                                </a>
                            </li>
                            <li>
                                <span
                                    className="block text-xs uppercase mb-1"
                                    style={{ color: 'var(--industrial-text-secondary)', opacity: 0.6 }}
                                >
                                    Est.
                                </span>
                                1985
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4"
                    style={{
                        borderColor: 'var(--industrial-border)',
                        color: 'var(--industrial-text-secondary)',
                    }}
                >
                    <p>&copy; {new Date().getFullYear()} Techno Valves, Nashik. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--industrial-accent)] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[var(--industrial-accent)] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
