
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroValveAnimation from './components/HeroValveAnimation';
import HeroContinuation from './components/HeroContinuation';
import IndustrialChallenges from './components/IndustrialChallenges';
import EngineeringResponse from './components/EngineeringResponse';
import ProductApplicationShowcase from './components/ProductApplicationShowcase';
import GlobalPresence from './components/GlobalPresence';
import StrategicPartners from './components/StrategicPartners';
import ProofTrust from './components/ProofTrust';
import BrandPhilosophy from './components/BrandPhilosophy';
import IndustrialCTA from './components/IndustrialCTA';

function App() {
  return (
    <div className="min-h-screen bg-[var(--industrial-bg-primary)] text-[var(--industrial-text-primary)] selection:bg-[var(--industrial-accent)] selection:text-white">
      <Navbar />

      <main>
        <HeroValveAnimation />
        <HeroContinuation />
        <IndustrialChallenges />
        <EngineeringResponse />
        <ProductApplicationShowcase />
        <GlobalPresence />
        <StrategicPartners />
        <ProofTrust />
        <BrandPhilosophy />
        <IndustrialCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
