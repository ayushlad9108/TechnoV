import React from 'react';

const stats = [
    { value: "35+", label: "YEARS EXPERIENCE" },
    { value: "50+", label: "COUNTRIES SERVED" },
    { value: "ISO", label: "9001:2015 CERTIFIED" },
    { value: "API", label: "6D / 609 COMPLIANT" },
];

const ProofTrust: React.FC = () => {
    return (
        <section className="py-20 bg-[var(--industrial-bg-primary)] border-t border-[var(--industrial-border)]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--industrial-border)]/30">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">{stat.value}</span>
                            <span className="text-xs font-mono text-[var(--industrial-accent)] tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProofTrust;
