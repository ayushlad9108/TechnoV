import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0b0e11] border-t border-[var(--industrial-border)] pt-16 pb-8" id="contact">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="text-2xl font-serif font-bold tracking-tighter text-[var(--industrial-text-primary)] mb-6 flex items-center gap-3">
                            <img src="/logo.png" alt="TechnoValves" className="h-10 w-auto" />
                            TECHNOVALVES
                        </div>
                        <p className="text-[var(--industrial-text-secondary)] text-base leading-relaxed mb-6">
                            Established in 2015, Techno Valves is a leading supplier & trader of industrial valves — Ball Valves, Gate Valves, Globe Valves and more. Based in Nashik, Maharashtra, India.
                        </p>
                        <div className="flex gap-4 text-[var(--industrial-text-secondary)]">
                            <div className="w-8 h-8 bg-[var(--industrial-bg-secondary)] rounded-full flex items-center justify-center hover:bg-[var(--industrial-accent)] hover:text-white transition-colors cursor-pointer">
                                <span className="font-bold text-xs">Li</span>
                            </div>
                            <div className="w-8 h-8 bg-[var(--industrial-bg-secondary)] rounded-full flex items-center justify-center hover:bg-[var(--industrial-accent)] hover:text-white transition-colors cursor-pointer">
                                <span className="font-bold text-xs">X</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[var(--industrial-text-primary)] font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-base text-[var(--industrial-text-secondary)]">
                            <li><a href="#" className="hover:text-[var(--industrial-accent)] transition-colors">About Us</a></li>
                            <li><a href="#products" className="hover:text-[var(--industrial-accent)] transition-colors">Our Products</a></li>
                            <li><a href="#industries" className="hover:text-[var(--industrial-accent)] transition-colors">Industries Served</a></li>
                            <li><a href="#" className="hover:text-[var(--industrial-accent)] transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[var(--industrial-text-primary)] font-bold uppercase tracking-widest text-sm mb-6">Certifications</h4>
                        <ul className="space-y-4 text-base text-[var(--industrial-text-secondary)]">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[var(--industrial-accent)] rounded-full"></span> API 6D / 600
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[var(--industrial-highlight)] rounded-full"></span> ISO 9001:2015
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> CE / PED
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span> ATEX Certified
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[var(--industrial-text-primary)] font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
                        <ul className="space-y-4 text-base text-[var(--industrial-text-secondary)]">
                            <li>
                                <span className="block text-xs uppercase text-gray-500 mb-1">Office</span>
                                Nashik, Maharashtra, India
                            </li>
                            <li>
                                <span className="block text-xs uppercase text-gray-500 mb-1">Sales</span>
                                <a href="mailto:sales@technovalves.com" className="hover:text-[var(--industrial-accent)] transition-colors">sales@technovalves.com</a>
                            </li>
                            <li>
                                <span className="block text-xs uppercase text-gray-500 mb-1">Est.</span>
                                2015
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[var(--industrial-border)] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} Techno Valves, Nashik. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--industrial-text-secondary)] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[var(--industrial-text-secondary)] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
