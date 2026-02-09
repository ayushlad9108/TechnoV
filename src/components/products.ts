export interface ValveProduct {
  id: string;
  name: string;
  description: string;
  pressureRating: string;
  material: string;
  image: string;
  applications: string[];
}

export const products: ValveProduct[] = [
  {
    id: 'bv-100',
    name: 'Titan Ball Valve',
    description: 'High-pressure ball valve engineered for zero-leakage performance in critical flow control systems.',
    pressureRating: 'PN100 / Class 600',
    material: 'Forged Carbon Steel (ASTM A105)',
    image: '/images/valve-ball.png',
    applications: ['Oil & Gas', 'Petrochemical', 'Power Generation']
  },
  {
    id: 'gv-200',
    name: 'Precision Gate Valve',
    description: 'Robust gate valve designed for minimal pressure drop and reliable on/off service in harsh environments.',
    pressureRating: 'PN160 / Class 900',
    material: 'Stainless Steel (316L)',
    image: '/images/valve-gate.png',
    applications: ['Water Treatment', 'Mining', 'Process Industry']
  },
  {
    id: 'glv-300',
    name: 'Control Globe Valve',
    description: 'Precision regulation valve with optimized flow characteristics for accurate throttling applications.',
    pressureRating: 'PN40 / Class 300',
    material: 'Alloy Steel (ASTM A182 F22)',
    image: '/images/valve-globe.png',
    applications: ['Steam Systems', 'Chemical Processing', 'HVAC']
  }
];
