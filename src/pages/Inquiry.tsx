import { motion } from 'framer-motion';
import InquiryForm from '../components/InquiryForm';

export default function Inquiry() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-[var(--industrial-text-primary)]">
            Product Inquiry
          </h1>
          <p className="text-xl text-[var(--industrial-text-secondary)] max-w-3xl mx-auto">
            Fill in your details and we'll get back to you with the right valve solution
          </p>
        </motion.div>
        <InquiryForm />
      </div>
    </div>
  );
}
