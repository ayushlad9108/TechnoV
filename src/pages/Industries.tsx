import { motion } from 'framer-motion';

export default function Industries() {
  const industries = [
    {
      name: 'Oil & Gas',
      description: 'Critical flow control solutions for upstream, midstream, and downstream operations',
      applications: ['Refineries', 'Pipelines', 'Offshore Platforms', 'Storage Facilities'],
      image: '/images/industry-oil-gas.jpg'
    },
    {
      name: 'Chemical Processing',
      description: 'Corrosion-resistant valves for aggressive chemical environments',
      applications: ['Petrochemicals', 'Pharmaceuticals', 'Specialty Chemicals', 'Fertilizers'],
      image: '/images/industry-chemical.jpg'
    },
    {
      name: 'Power Generation',
      description: 'High-temperature, high-pressure valves for power plants',
      applications: ['Thermal Power', 'Nuclear Power', 'Renewable Energy', 'Cogeneration'],
      image: '/images/industry-power.jpg'
    },
    {
      name: 'Water & Wastewater',
      description: 'Durable valves for municipal and industrial water systems',
      applications: ['Treatment Plants', 'Distribution', 'Desalination', 'Irrigation'],
      image: '/images/industry-water.jpg'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-[var(--industrial-text-primary)]">
            Industries We Serve
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto">
            Delivering specialized valve solutions across critical industrial sectors
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="space-y-12">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 bg-[var(--industrial-bg-secondary)] rounded-lg overflow-hidden border border-[var(--industrial-border)] hover:border-[var(--industrial-accent)] transition-all`}
            >
              {/* Image */}
              <div className="lg:w-1/2 h-80 bg-[var(--industrial-bg-tertiary)] flex items-center justify-center">
                <img 
                  src={industry.image} 
                  alt={industry.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="20"%3E' + industry.name + '%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* Content */}
              <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-[var(--industrial-text-primary)]">
                  {industry.name}
                </h2>
                <p className="text-lg text-[var(--industrial-text-secondary)] mb-6">
                  {industry.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-3 text-[var(--industrial-text-primary)]">
                  Key Applications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {industry.applications.map((app, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 p-3 bg-[var(--industrial-bg-tertiary)] rounded-lg"
                    >
                      <div className="w-2 h-2 bg-[var(--industrial-accent)] rounded-full"></div>
                      <span className="text-[var(--industrial-text-primary)]">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
