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
    id: 'bv-2pc',
    name: '2PC Ball Valve',
    description: 'Two-piece ball valve engineered for zero-leakage performance in critical flow control systems.',
    pressureRating: 'PN100 / Class 600',
    material: 'Forged Carbon Steel (ASTM A105)',
    image: '/ball%20balve/2PC-350NB BALL VALVE.jpg',
    applications: ['Oil & Gas', 'Petrochemical', 'Power Generation']
  },
  {
    id: 'bv-3pc',
    name: '3PC Ball Valve',
    description: 'Three-piece ball valve offering easy maintenance and full bore flow with superior sealing.',
    pressureRating: 'PN160 / Class 900',
    material: 'Stainless Steel (316L)',
    image: '/ball%20balve/3 PC BALL VALVE.jpeg',
    applications: ['Chemical Processing', 'Pharmaceuticals', 'Food Industry']
  },
  {
    id: 'bv-4way',
    name: '4-Way Ball Valve',
    description: 'Four-way ball valve for complex flow diversion and mixing applications in industrial systems.',
    pressureRating: 'PN40 / Class 300',
    material: 'Stainless Steel (316L)',
    image: '/ball%20balve/4 way ball valve.jpg',
    applications: ['Process Industry', 'HVAC', 'Water Treatment']
  },
  {
    id: 'bv-pneumatic',
    name: 'Pneumatic Ball Valve',
    description: 'Pneumatically actuated ball valve for automated flow control in high-cycle applications.',
    pressureRating: 'PN63 / Class 400',
    material: 'Carbon Steel / SS',
    image: '/ball%20balve/4_way_pneumatic_ball_valve.jpg',
    applications: ['Automation', 'Oil & Gas', 'Power Plants']
  },
  {
    id: 'bv-extended',
    name: 'Extended Stem Ball Valve',
    description: 'Extended stem design for insulated pipelines and cryogenic service applications.',
    pressureRating: 'PN100 / Class 600',
    material: 'Alloy Steel (ASTM A182)',
    image: '/ball%20balve/Extended_Ball_Valve.png',
    applications: ['Cryogenic', 'LNG', 'Deep Insulation Lines']
  },
  {
    id: 'bv-jacketed',
    name: 'Jacketed Ball Valve',
    description: 'Steam-jacketed ball valve to maintain media temperature and prevent solidification.',
    pressureRating: 'PN40 / Class 300',
    material: 'Stainless Steel (316L)',
    image: '/ball%20balve/Jacketed Ball valve.jpeg',
    applications: ['Bitumen', 'Sulphur', 'Polymer Lines']
  },
  {
    id: 'bv-wafer',
    name: 'Wafer Ball Valve',
    description: 'Compact wafer-style ball valve for space-constrained installations with full bore flow.',
    pressureRating: 'PN25 / Class 150',
    material: 'Cast Iron / SS',
    image: '/ball%20balve/Wafer Ball Valve.jpeg',
    applications: ['Water Treatment', 'HVAC', 'General Industry']
  },
  {
    id: 'bv-socket',
    name: 'Socket Weld Ball Valve',
    description: 'Socket weld end ball valve for high-pressure small bore piping systems.',
    pressureRating: 'PN160 / Class 900',
    material: 'Forged Steel (ASTM A105)',
    image: '/ball%20balve/Socket Weld Ball Valve (2).jpeg',
    applications: ['High Pressure Lines', 'Refineries', 'Petrochemical']
  },
  {
    id: 'bv-semi-offset',
    name: 'Pneumatic Semi Offset Valve',
    description: 'Semi-offset pneumatic ball valve for precise throttling and automated process control.',
    pressureRating: 'PN63 / Class 400',
    material: 'Stainless Steel (316L)',
    image: '/ball%20balve/Pneumatic Semi Offset Ball Valve.jpg',
    applications: ['Process Automation', 'Chemical Plants', 'Power Generation']
  },
];
