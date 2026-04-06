import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string[];
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 'ball-valve-001',
    name: '2PC Ball Valve',
    category: 'Ball Valves',
    description: 'Two-piece ball valve for zero-leakage performance in critical flow control systems.',
    specifications: ['Size: 1" - 24"', 'Pressure: 150-2500 PSI', 'Material: Stainless Steel'],
    price: 25000,
    image: '/ball%20balve/2PC-350NB BALL VALVE.jpg'
  },
  {
    id: 'ball-valve-002',
    name: '3PC Ball Valve',
    category: 'Ball Valves',
    description: 'Three-piece ball valve offering easy maintenance and full bore flow.',
    specifications: ['Size: 0.5" - 12"', 'Pressure: 150-1500 PSI', 'Material: SS 316L'],
    price: 28000,
    image: '/ball%20balve/3 PC BALL VALVE.jpeg'
  },
  {
    id: 'ball-valve-003',
    name: '4-Way Ball Valve',
    category: 'Ball Valves',
    description: 'Four-way ball valve for complex flow diversion and mixing applications.',
    specifications: ['Size: 1" - 8"', 'Pressure: 150-600 PSI', 'Material: SS 316L'],
    price: 32000,
    image: '/ball%20balve/4 way ball valve.jpg'
  },
  {
    id: 'ball-valve-004',
    name: 'Pneumatic Ball Valve',
    category: 'Ball Valves',
    description: 'Pneumatically actuated ball valve for automated flow control in high-cycle applications.',
    specifications: ['Size: 0.5" - 16"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel / SS'],
    price: 42000,
    image: '/ball%20balve/4_way_pneumatic_ball_valve.jpg'
  },
  {
    id: 'ball-valve-005',
    name: 'Extended Stem Ball Valve',
    category: 'Ball Valves',
    description: 'Extended stem design for insulated pipelines and cryogenic service.',
    specifications: ['Size: 1" - 12"', 'Pressure: 150-2500 PSI', 'Material: Alloy Steel'],
    price: 38000,
    image: '/ball%20balve/Extended_Ball_Valve.png'
  },
  {
    id: 'ball-valve-006',
    name: 'Jacketed Ball Valve',
    category: 'Ball Valves',
    description: 'Steam-jacketed ball valve to maintain media temperature and prevent solidification.',
    specifications: ['Size: 1" - 8"', 'Pressure: 150-600 PSI', 'Material: SS 316L'],
    price: 48000,
    image: '/ball%20balve/Jacketed Ball valve.jpeg'
  },
  {
    id: 'ball-valve-007',
    name: 'Wafer Ball Valve',
    category: 'Ball Valves',
    description: 'Compact wafer-style ball valve for space-constrained installations.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-300 PSI', 'Material: Cast Iron / SS'],
    price: 18000,
    image: '/ball%20balve/Wafer Ball Valve.jpeg'
  },
  {
    id: 'ball-valve-008',
    name: 'Socket Weld Ball Valve',
    category: 'Ball Valves',
    description: 'Socket weld end ball valve for high-pressure small bore piping systems.',
    specifications: ['Size: 0.5" - 2"', 'Pressure: 150-2500 PSI', 'Material: Forged Steel'],
    price: 22000,
    image: '/ball%20balve/Socket Weld Ball Valve (2).jpeg'
  },
  {
    id: 'ball-valve-009',
    name: 'Pneumatic Semi Offset Valve',
    category: 'Ball Valves',
    description: 'Semi-offset pneumatic ball valve for precise throttling and automated process control.',
    specifications: ['Size: 1" - 12"', 'Pressure: 150-900 PSI', 'Material: SS 316L'],
    price: 45000,
    image: '/ball%20balve/Pneumatic Semi Offset Ball Valve.jpg'
  },
  {
    id: 'gate-valve-001',
    name: 'Gate Valve Series',
    category: 'Gate Valves',
    description: 'Reliable gate valve for on-off control in demanding industrial environments.',
    specifications: ['Size: 2" - 36"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 35000,
    image: '/images/valve-gate.png'
  },
  {
    id: 'globe-valve-001',
    name: 'Globe Control Valve',
    category: 'Globe Valves',
    description: 'Precision flow control for demanding processes with optimized throttling.',
    specifications: ['Size: 0.5" - 12"', 'Pressure: 150-1500 PSI', 'Material: Alloy Steel'],
    price: 45000,
    image: '/images/valve-globe.png'
  }
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleBuyNow = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-[var(--industrial-text-primary)]">
            Our Products
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto">
            Industrial-grade valves engineered for reliability and performance
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[var(--industrial-accent)] text-white'
                  : 'bg-[var(--industrial-bg-secondary)] text-[var(--industrial-text-secondary)] hover:bg-[var(--industrial-bg-tertiary)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--industrial-bg-secondary)] rounded-lg overflow-hidden border border-[var(--industrial-border)] hover:border-[var(--industrial-accent)] transition-all"
            >
              {/* Product Image */}
              <div className="h-64 bg-[var(--industrial-bg-tertiary)] flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23374151" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="16"%3EProduct Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="text-sm text-[var(--industrial-accent)] mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[var(--industrial-text-primary)]">
                  {product.name}
                </h3>
                <p className="text-[var(--industrial-text-secondary)] mb-4">
                  {product.description}
                </p>

                {/* Specifications */}
                <ul className="space-y-1 mb-4">
                  {product.specifications.map((spec, i) => (
                    <li key={i} className="text-sm text-[var(--industrial-text-secondary)]">
                      • {spec}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--industrial-border)]">
                  <div className="text-2xl font-bold text-[var(--industrial-accent)]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="px-6 py-2 bg-[var(--industrial-accent)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
