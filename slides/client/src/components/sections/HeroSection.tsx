import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';
import Button from '../Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-accent-500/20 rounded-full blur-xl"
        animate={{ y: [-20, 20, -20], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-primary-400/20 rounded-full blur-xl"
        animate={{ y: [20, -20, 20], rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <motion.div
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            Step Into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
              Comfort
            </span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our premium collection of sliders, slippers, and sandals crafted for ultimate comfort and style
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
                onClick={() => window.location.href = '/products'}
              >
                🛍️ Shop Collection
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
              >
                📖 Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;