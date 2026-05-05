import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string[];
  price: number;
  image: string;
}

// background-remover (1) = Ball Valves (named files)
// background-remover     = Gate / Globe / NRV + additional Ball Valves (NZ5 series)
const products: Product[] = [
  // ── Ball Valves — named images ────────────────────────────────────────────
  {
    id: 'bv-001', name: '2PC Ball Valve', category: 'Ball Valves',
    description: 'Two-piece ball valve engineered for zero-leakage performance in critical flow control systems.',
    specifications: ['Size: 1" - 24"', 'Pressure: 150-2500 PSI', 'Material: Stainless Steel'],
    price: 0, image: '/background-remover (1)/2PC-350NB BALL VALVE.png',
  },
  {
    id: 'bv-002', name: '3PC Ball Valve', category: 'Ball Valves',
    description: 'Three-piece ball valve offering easy maintenance and full bore flow with superior sealing.',
    specifications: ['Size: 0.5" - 12"', 'Pressure: 150-1500 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover (1)/3 PC BALL VALVE.png',
  },
  {
    id: 'bv-003', name: '4-Way Ball Valve', category: 'Ball Valves',
    description: 'Four-way ball valve for complex flow diversion and mixing applications in industrial systems.',
    specifications: ['Size: 1" - 8"', 'Pressure: 150-600 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover (1)/4 way ball valve.png',
  },
  {
    id: 'bv-004', name: 'Pneumatic Ball Valve', category: 'Ball Valves',
    description: 'Pneumatically actuated ball valve for automated flow control in high-cycle applications.',
    specifications: ['Size: 0.5" - 16"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel / SS'],
    price: 0, image: '/background-remover (1)/4_way_pneumatic_ball_valve.png',
  },
  {
    id: 'bv-005', name: 'Extended Stem Ball Valve', category: 'Ball Valves',
    description: 'Extended stem design for insulated pipelines and cryogenic service applications.',
    specifications: ['Size: 1" - 12"', 'Pressure: 150-2500 PSI', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover (1)/Extended_Ball_Valve.png',
  },
  {
    id: 'bv-006', name: 'Jacketed Ball Valve', category: 'Ball Valves',
    description: 'Steam-jacketed ball valve to maintain media temperature and prevent solidification.',
    specifications: ['Size: 1" - 8"', 'Pressure: 150-600 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover (1)/Jacketed Ball valve.png',
  },
  {
    id: 'bv-007', name: 'Wafer Ball Valve', category: 'Ball Valves',
    description: 'Compact wafer-style ball valve for space-constrained installations with full bore flow.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-300 PSI', 'Material: Cast Iron / SS'],
    price: 0, image: '/background-remover (1)/Wafer Ball Valve.png',
  },
  {
    id: 'bv-008', name: 'Socket Weld Ball Valve', category: 'Ball Valves',
    description: 'Socket weld end ball valve for high-pressure small bore piping systems.',
    specifications: ['Size: 0.5" - 2"', 'Pressure: 150-2500 PSI', 'Material: Forged Steel'],
    price: 0, image: '/background-remover (1)/Socket Weld Ball Valve (2).png',
  },
  {
    id: 'bv-009', name: 'Pneumatic Semi Offset Valve', category: 'Ball Valves',
    description: 'Semi-offset pneumatic ball valve for precise throttling and automated process control.',
    specifications: ['Size: 1" - 12"', 'Pressure: 150-900 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover (1)/Pneumatic Semi Offset Ball Valve.png',
  },
  {
    id: 'bv-010', name: 'Steam Jacketed Ball Valve', category: 'Ball Valves',
    description: 'Heavy-duty steam-jacketed ball valve for high-viscosity and solidifying media.',
    specifications: ['Size: 1" - 6"', 'Pressure: 150-600 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover (1)/steam-jacketed- Ball valves.png',
  },
  {
    id: 'bv-011', name: 'Industrial Ball Valve', category: 'Ball Valves',
    description: 'Heavy-duty industrial ball valve for demanding on-off service in process plants.',
    specifications: ['Size: 2" - 20"', 'Pressure: 150-1500 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover (1)/BALL VALVE.png',
  },
  {
    id: 'bv-012', name: 'Flanged Ball Valve — Class 300', category: 'Ball Valves',
    description: 'Class 300 flanged ball valve for medium-high pressure service in oil and gas applications.',
    specifications: ['Size: 1" - 16"', 'Class: 300', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover (1)/NZ5_4789.png',
  },
  {
    id: 'bv-013', name: 'Flanged Ball Valve — Class 600', category: 'Ball Valves',
    description: 'Class 600 flanged ball valve for high-pressure service in refineries and power plants.',
    specifications: ['Size: 1" - 12"', 'Class: 600', 'Material: Carbon Steel / Alloy Steel'],
    price: 0, image: '/background-remover (1)/NZ5_4797.png',
  },
  {
    id: 'bv-014', name: 'Trunnion Mounted Ball Valve', category: 'Ball Valves',
    description: 'Trunnion mounted ball valve for large bore, high-pressure pipeline isolation service.',
    specifications: ['Size: 4" - 36"', 'Pressure: 150-2500 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover (1)/NZ5_4801.png',
  },
  {
    id: 'bv-015', name: 'Cryogenic Ball Valve', category: 'Ball Valves',
    description: 'Extended bonnet cryogenic ball valve for LNG and low-temperature service down to -196°C.',
    specifications: ['Size: 0.5" - 8"', 'Temp: -196°C to +200°C', 'Material: SS 316L'],
    price: 0, image: '/background-remover (1)/NZ5_4803.png',
  },
  {
    id: 'bv-016', name: 'Forged Steel Ball Valve', category: 'Ball Valves',
    description: 'High-integrity forged steel ball valve for Class 800 service in refineries and petrochemical plants.',
    specifications: ['Size: 0.5" - 2"', 'Class: 800', 'Material: Forged Steel A105'],
    price: 0, image: '/background-remover (1)/large (2).png',
  },
  {
    id: 'bv-017', name: 'Ball Valve — High Pressure Series', category: 'Ball Valves',
    description: 'High-pressure ball valve series for critical isolation in upstream oil and gas service.',
    specifications: ['Size: 0.5" - 4"', 'Class: 1500', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover (1)/PHOTO-2021-07-28-17-44-09.png',
  },
  {
    id: 'bv-018', name: 'Ball Valve — Compact Series', category: 'Ball Valves',
    description: 'Compact ball valve for instrumentation and utility service in process plants.',
    specifications: ['Size: 0.25" - 1"', 'Pressure: 150-1500 PSI', 'Material: SS 316'],
    price: 0, image: '/background-remover (1)/3.png',
  },
  {
    id: 'bv-019', name: 'Ball Valve — Full Port Series', category: 'Ball Valves',
    description: 'Full port ball valve for piggable pipelines with zero restriction to flow.',
    specifications: ['Size: 1" - 12"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover (1)/4.png',
  },
  {
    id: 'bv-020', name: 'Ball Valve — 4-Way Pneumatic', category: 'Ball Valves',
    description: '4-way pneumatic ball valve for complex flow routing in automated process systems.',
    specifications: ['Size: 0.5" - 4"', 'Pressure: 150-600 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover (1)/4wbv.png',
  },
  // ── Gate Valves ───────────────────────────────────────────────────────────
  {
    id: 'gv-001', name: 'Gate Valve — Flanged', category: 'Gate Valves',
    description: 'Flanged gate valve for reliable on-off control in demanding industrial pipeline environments.',
    specifications: ['Size: 2" - 36"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4779.png',
  },
  {
    id: 'gv-002', name: 'Gate Valve — Rising Stem', category: 'Gate Valves',
    description: 'Rising stem gate valve providing visual indication of valve position for safe operation.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-600 PSI', 'Material: Cast Steel'],
    price: 0, image: '/background-remover/NZ5_4780.png',
  },
  {
    id: 'gv-003', name: 'Gate Valve — Non-Rising Stem', category: 'Gate Valves',
    description: 'Non-rising stem gate valve ideal for underground and space-constrained installations.',
    specifications: ['Size: 2" - 16"', 'Pressure: 150-300 PSI', 'Material: Ductile Iron'],
    price: 0, image: '/background-remover/NZ5_4782.png',
  },
  {
    id: 'gv-004', name: 'Gate Valve — High Pressure', category: 'Gate Valves',
    description: 'High-pressure gate valve for steam and high-temperature service in power plants.',
    specifications: ['Size: 1" - 12"', 'Pressure: 900-2500 PSI', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4784.png',
  },
  {
    id: 'gv-005', name: 'Gate Valve — Stainless Steel', category: 'Gate Valves',
    description: 'Stainless steel gate valve for corrosive media and hygienic process applications.',
    specifications: ['Size: 0.5" - 8"', 'Pressure: 150-1500 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover/NZ5_4786.png',
  },
  {
    id: 'gv-006', name: 'Gate Valve — Forged Steel', category: 'Gate Valves',
    description: 'Forged steel gate valve for high-integrity service in oil and gas and petrochemical plants.',
    specifications: ['Size: 0.5" - 4"', 'Pressure: 150-2500 PSI', 'Material: Forged Steel A105'],
    price: 0, image: '/background-remover/NZ5_4787.png',
  },
  {
    id: 'gv-007', name: 'Gate Valve — Slab Type', category: 'Gate Valves',
    description: 'Slab gate valve with through-conduit design for pipeline and pigging applications.',
    specifications: ['Size: 2" - 30"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4788.png',
  },
  {
    id: 'gv-008', name: 'Gate Valve — Knife Type', category: 'Gate Valves',
    description: 'Knife gate valve for slurry, pulp, and wastewater applications requiring tight shutoff.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-300 PSI', 'Material: SS / Cast Iron'],
    price: 0, image: '/background-remover/NZ5_4789.png',
  },
  {
    id: 'gv-009', name: 'Gate Valve — Class 300', category: 'Gate Valves',
    description: 'Class 300 flanged gate valve for medium-high pressure pipeline isolation service.',
    specifications: ['Size: 2" - 24"', 'Class: 300', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4790.png',
  },
  {
    id: 'gv-010', name: 'Gate Valve — Class 600', category: 'Gate Valves',
    description: 'Class 600 flanged gate valve for high-pressure, high-temperature service in power plants.',
    specifications: ['Size: 2" - 16"', 'Class: 600', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4791.png',
  },
  {
    id: 'gv-011', name: 'Gate Valve — Pressure Seal', category: 'Gate Valves',
    description: 'Pressure seal bonnet gate valve for high-pressure, high-temperature power plant service.',
    specifications: ['Size: 2" - 24"', 'Class: 900-2500', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4792.png',
  },
  {
    id: 'gv-012', name: 'Gate Valve — Parallel Slide', category: 'Gate Valves',
    description: 'Parallel slide gate valve for steam service with spring-loaded seats for tight shutoff.',
    specifications: ['Size: 2" - 24"', 'Pressure: 600-2500 PSI', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4793.png',
  },
  {
    id: 'gv-013', name: 'Gate Valve — RTJ Ends', category: 'Gate Valves',
    description: 'Ring type joint gate valve for high-pressure wellhead and subsea applications.',
    specifications: ['Size: 2" - 12"', 'Class: 1500-2500', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4794.png',
  },
  {
    id: 'gv-014', name: 'Gate Valve — SW/BW Ends', category: 'Gate Valves',
    description: 'Forged gate valve with socket weld or butt weld ends for small bore high-pressure lines.',
    specifications: ['Size: 0.5" - 2"', 'Class: 800-1500', 'Material: Forged Steel A105'],
    price: 0, image: '/background-remover/NZ5_4795.png',
  },
  {
    id: 'gv-015', name: 'Gate Valve — Actuated', category: 'Gate Valves',
    description: 'Motor or pneumatic actuated gate valve for remote operation in automated process systems.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4796.png',
  },
  // ── Globe Valves ──────────────────────────────────────────────────────────
  {
    id: 'glv-001', name: 'Globe Control Valve', category: 'Globe Valves',
    description: 'Precision flow control for demanding processes with optimized throttling performance.',
    specifications: ['Size: 0.5" - 12"', 'Pressure: 150-1500 PSI', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4797.png',
  },
  {
    id: 'glv-002', name: 'Globe Valve — Flanged', category: 'Globe Valves',
    description: 'Flanged globe valve for precise throttling and flow regulation in process pipelines.',
    specifications: ['Size: 0.5" - 16"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4798.png',
  },
  {
    id: 'glv-003', name: 'Globe Valve — Stainless Steel', category: 'Globe Valves',
    description: 'Stainless steel globe valve for corrosive and high-purity fluid service.',
    specifications: ['Size: 0.5" - 8"', 'Pressure: 150-1500 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover/NZ5_4799.png',
  },
  {
    id: 'glv-004', name: 'Globe Valve — High Temperature', category: 'Globe Valves',
    description: 'High-temperature globe valve for steam service and superheated fluid applications.',
    specifications: ['Size: 1" - 12"', 'Pressure: 600-2500 PSI', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4800.png',
  },
  {
    id: 'glv-005', name: 'Globe Valve — Angle Type', category: 'Globe Valves',
    description: 'Angle globe valve for applications requiring 90° flow direction change with throttling.',
    specifications: ['Size: 0.5" - 6"', 'Pressure: 150-1500 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4801.png',
  },
  {
    id: 'glv-006', name: 'Globe Valve — Needle Type', category: 'Globe Valves',
    description: 'Needle globe valve for fine flow control and metering in instrumentation lines.',
    specifications: ['Size: 0.25" - 2"', 'Pressure: 150-6000 PSI', 'Material: SS 316'],
    price: 0, image: '/background-remover/NZ5_4802.png',
  },
  {
    id: 'glv-007', name: 'Globe Valve — Bellows Sealed', category: 'Globe Valves',
    description: 'Bellows sealed globe valve for zero fugitive emissions in toxic and hazardous fluid service.',
    specifications: ['Size: 0.5" - 6"', 'Pressure: 150-1500 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover/NZ5_4803.png',
  },
  {
    id: 'glv-008', name: 'Globe Valve — Y-Pattern', category: 'Globe Valves',
    description: 'Y-pattern globe valve with low pressure drop for throttling in high-flow applications.',
    specifications: ['Size: 0.5" - 8"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4804.png',
  },
  {
    id: 'glv-009', name: 'Globe Valve — Pressure Seal', category: 'Globe Valves',
    description: 'Pressure seal bonnet globe valve for critical throttling in high-pressure steam systems.',
    specifications: ['Size: 1" - 12"', 'Class: 900-2500', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4805.png',
  },
  {
    id: 'glv-010', name: 'Globe Valve — Class 300', category: 'Globe Valves',
    description: 'Class 300 flanged globe valve for medium-high pressure throttling and flow regulation.',
    specifications: ['Size: 0.5" - 12"', 'Class: 300', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4806.png',
  },
  {
    id: 'glv-011', name: 'Globe Valve — Class 600', category: 'Globe Valves',
    description: 'Class 600 flanged globe valve for high-pressure steam and process fluid throttling.',
    specifications: ['Size: 0.5" - 8"', 'Class: 600', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4807.png',
  },
  {
    id: 'glv-012', name: 'Globe Valve — SW/BW Ends', category: 'Globe Valves',
    description: 'Forged globe valve for socket weld or butt weld connections in high-pressure instrument lines.',
    specifications: ['Size: 0.5" - 2"', 'Class: 800-1500', 'Material: Forged Steel A105'],
    price: 0, image: '/background-remover/NZ5_4808.png',
  },
  {
    id: 'glv-013', name: 'Globe Valve — Actuated', category: 'Globe Valves',
    description: 'Pneumatically actuated globe valve for automated throttling and control in process plants.',
    specifications: ['Size: 0.5" - 8"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel / SS'],
    price: 0, image: '/background-remover/NZ5_4809.png',
  },
  // ── NRV / Check Valves ────────────────────────────────────────────────────
  {
    id: 'nrv-001', name: 'Swing Check Valve', category: 'NRV / Check Valves',
    description: 'Swing type non-return valve preventing backflow in horizontal and vertical pipelines.',
    specifications: ['Size: 0.5" - 24"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4810.png',
  },
  {
    id: 'nrv-002', name: 'Lift Check Valve', category: 'NRV / Check Valves',
    description: 'Lift type check valve for high-pressure service with positive shutoff against backflow.',
    specifications: ['Size: 0.5" - 8"', 'Pressure: 150-2500 PSI', 'Material: Forged Steel'],
    price: 0, image: '/background-remover/NZ5_4811.png',
  },
  {
    id: 'nrv-003', name: 'Dual Plate Check Valve', category: 'NRV / Check Valves',
    description: 'Dual plate wafer check valve with spring-loaded discs for low pressure drop.',
    specifications: ['Size: 2" - 36"', 'Pressure: 150-600 PSI', 'Material: Carbon Steel / SS'],
    price: 0, image: '/background-remover/NZ5_4812.png',
  },
  {
    id: 'nrv-004', name: 'Piston Check Valve', category: 'NRV / Check Valves',
    description: 'Piston type check valve for smooth, chatter-free operation in pulsating flow systems.',
    specifications: ['Size: 0.5" - 6"', 'Pressure: 150-1500 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover/NZ5_4813.png',
  },
  {
    id: 'nrv-005', name: 'Ball Check Valve', category: 'NRV / Check Valves',
    description: 'Ball type check valve for viscous fluids and slurry applications with self-cleaning action.',
    specifications: ['Size: 0.5" - 4"', 'Pressure: 150-600 PSI', 'Material: Cast Iron / SS'],
    price: 0, image: '/background-remover/NZ5_4814.png',
  },
  {
    id: 'nrv-006', name: 'Tilting Disc Check Valve', category: 'NRV / Check Valves',
    description: 'Tilting disc check valve for large diameter pipelines with minimal water hammer effect.',
    specifications: ['Size: 4" - 48"', 'Pressure: 150-600 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4815.png',
  },
  {
    id: 'nrv-007', name: 'Wafer Check Valve', category: 'NRV / Check Valves',
    description: 'Wafer type check valve for compact installation between flanges in tight spaces.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-600 PSI', 'Material: Carbon Steel / SS'],
    price: 0, image: '/background-remover/NZ5_4816.png',
  },
  {
    id: 'nrv-008', name: 'Nozzle Check Valve', category: 'NRV / Check Valves',
    description: 'Nozzle type check valve for high-velocity flow with minimal pressure drop and water hammer.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4817.png',
  },
  {
    id: 'nrv-009', name: 'Foot Valve with Strainer', category: 'NRV / Check Valves',
    description: 'Foot valve with integral strainer for pump suction lines to prevent backflow and debris ingress.',
    specifications: ['Size: 1" - 12"', 'Pressure: 150 PSI', 'Material: Cast Iron / SS'],
    price: 0, image: '/background-remover/NZ5_4818.png',
  },
  {
    id: 'nrv-010', name: 'Forged Check Valve — SW/BW', category: 'NRV / Check Valves',
    description: 'Forged piston check valve for socket weld or butt weld connections in high-pressure service.',
    specifications: ['Size: 0.5" - 2"', 'Class: 800-1500', 'Material: Forged Steel A105'],
    price: 0, image: '/background-remover/NZ5_4819.png',
  },
  {
    id: 'nrv-011', name: 'Check Valve — High Pressure', category: 'NRV / Check Valves',
    description: 'High-pressure check valve for critical backflow prevention in refinery and power plant service.',
    specifications: ['Size: 0.5" - 8"', 'Class: 600-2500', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4820.png',
  },
  {
    id: 'nrv-012', name: 'Check Valve — Stainless Steel', category: 'NRV / Check Valves',
    description: 'Stainless steel check valve for corrosive media and hygienic process applications.',
    specifications: ['Size: 0.5" - 8"', 'Pressure: 150-1500 PSI', 'Material: SS 316L'],
    price: 0, image: '/background-remover/NZ5_4821.png',
  },
  {
    id: 'nrv-013', name: 'Check Valve — Class 300', category: 'NRV / Check Valves',
    description: 'Class 300 flanged check valve for medium-high pressure backflow prevention service.',
    specifications: ['Size: 2" - 24"', 'Class: 300', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4822.png',
  },
  {
    id: 'nrv-014', name: 'Check Valve — Class 600', category: 'NRV / Check Valves',
    description: 'Class 600 flanged check valve for high-pressure service in power and petrochemical plants.',
    specifications: ['Size: 2" - 16"', 'Class: 600', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4823.png',
  },
  {
    id: 'nrv-015', name: 'Check Valve — Pressure Seal', category: 'NRV / Check Valves',
    description: 'Pressure seal bonnet check valve for high-pressure, high-temperature power plant service.',
    specifications: ['Size: 2" - 16"', 'Class: 900-2500', 'Material: Alloy Steel'],
    price: 0, image: '/background-remover/NZ5_4825.png',
  },
  {
    id: 'nrv-016', name: 'Check Valve — Y-Pattern', category: 'NRV / Check Valves',
    description: 'Y-pattern check valve with low pressure drop for high-flow pipeline applications.',
    specifications: ['Size: 0.5" - 8"', 'Pressure: 150-900 PSI', 'Material: Carbon Steel'],
    price: 0, image: '/background-remover/NZ5_4826.png',
  },
  {
    id: 'nrv-017', name: 'Check Valve — Actuated', category: 'NRV / Check Valves',
    description: 'Actuated check valve with spring-assisted closure for fast response in pump discharge lines.',
    specifications: ['Size: 2" - 24"', 'Pressure: 150-600 PSI', 'Material: Carbon Steel / SS'],
    price: 0, image: '/background-remover/NZ5_4827.png',
  },
  {
    id: 'nrv-018', name: 'Check Valve — Compact Series', category: 'NRV / Check Valves',
    description: 'Compact check valve for instrumentation and utility service in process plants.',
    specifications: ['Size: 0.25" - 1"', 'Pressure: 150-1500 PSI', 'Material: SS 316'],
    price: 0, image: '/background-remover/NZ5_4828.png',
  },
  {
    id: 'nrv-019', name: 'Check Valve — Flanged Series', category: 'NRV / Check Valves',
    description: 'Flanged check valve for general industrial service with reliable backflow prevention.',
    specifications: ['Size: 2" - 36"', 'Pressure: 150-600 PSI', 'Material: Cast Steel'],
    price: 0, image: '/background-remover/NZ5_4829.png',
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

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
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto mb-6">
            Industrial-grade valves engineered for reliability and performance
          </p>
          <a
            href="/Valves Specifications and Dimensions.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[var(--industrial-border)] text-sm font-medium text-[var(--industrial-text-secondary)] hover:text-[var(--industrial-accent)] hover:border-[var(--industrial-accent)] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Specifications & Dimensions
          </a>
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

                {/* CTA */}
                <div className="flex items-center justify-end pt-4 border-t border-[var(--industrial-border)]">
                  <button
                    onClick={() => navigate('/get-quote')}
                    className="px-6 py-2 bg-[var(--industrial-accent)] text-white rounded-lg hover:opacity-90 transition-colors font-medium"
                  >
                    Request Quote
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
