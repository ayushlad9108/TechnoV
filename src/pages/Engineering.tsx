import { motion } from 'framer-motion';

export default function Engineering() {
  const capabilities = [
    {
      title: 'Custom Design',
      description: 'Tailored valve solutions for unique industrial requirements',
      icon: '⚙️'
    },
    {
      title: 'Material Selection',
      description: 'Expert guidance on materials for extreme conditions',
      icon: '🔬'
    },
    {
      title: 'Performance Testing',
      description: 'Rigorous testing protocols ensuring reliability',
      icon: '📊'
    },
    {
      title: 'Technical Support',
      description: '24/7 engineering support for critical applications',
      icon: '🛠️'
    }
  ];

  const services = [
    'Valve Sizing & Selection',
    'Flow Analysis & Simulation',
    'Material Compatibility Studies',
    'Pressure & Temperature Ratings',
    'Custom Actuator Integration',
    'Retrofit & Upgrade Solutions'
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
            Engineering Excellence
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto">
            Precision engineering solutions for the most demanding industrial applications
          </p>
        </motion.div>

        {/* Hero Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16 rounded-lg overflow-hidden"
        >
          <img
            src="/images/industrial-bridge.jpg"
            alt="Engineering Excellence"
            className="w-full h-96 object-cover"
          />
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--industrial-bg-secondary)] p-6 rounded-lg border border-[var(--industrial-border)] hover:border-[var(--industrial-accent)] transition-all"
            >
              <div className="text-4xl mb-4">{capability.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[var(--industrial-text-primary)]">
                {capability.title}
              </h3>
              <p className="text-[var(--industrial-text-secondary)]">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--industrial-bg-secondary)] p-8 rounded-lg border border-[var(--industrial-border)]"
        >
          <h2 className="text-3xl font-bold mb-6 text-[var(--industrial-text-primary)]">
            Engineering Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-[var(--industrial-bg-tertiary)] rounded-lg"
              >
                <div className="w-2 h-2 bg-[var(--industrial-accent)] rounded-full"></div>
                <span className="text-[var(--industrial-text-primary)]">{service}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
