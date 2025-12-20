import React from 'react';
import { motion } from 'framer-motion';
import bannerImg1 from '../../../assets/b1 (1).svg'; 
import bannerImg2 from '../../../assets/b1 (2).svg'; 

const Banner = () => {
  return (
    <section className="relative w-full py-25 flex items-center justify-center bg-gradient-to-r from-primary to-medium-blue overflow-hidden">
      <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Simplify Your Loans with <span className="text-info">LoanLink</span>
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Track, approve, and manage loans seamlessly. Secure, smart, and optimized for modern finance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/all-loans"
              className="px-6 py-3 rounded-lg bg-info text-white font-semibold shadow-xl hover:bg-info/90 transition-all"
            >
              Get Started
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="px-6 py-3 rounded-lg border border-white/70 text-white font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>

        {/* Right Images */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 relative flex justify-center lg:justify-end items-center gap-6"
        >
          {/* Layered Image 1 */}
          <motion.img
            src={bannerImg1}
            alt="Loan illustration 1"
            className="w-52 lg:w-64 z-10 rounded-xl shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Layered Image 2 */}
          <motion.img
            src={bannerImg2}
            alt="Loan illustration 2"
            className="w-48 lg:w-60 z-20 absolute lg:relative -right-8 lg:right-0 top-4 rounded-xl shadow-2xl"
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-10 left-10 w-60 h-60 bg-info/20 rounded-full blur-3xl animate-pulse"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ repeat: Infinity, duration: 12, yoyo: true }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-info/30 rounded-full blur-3xl animate-pulse"
        initial={{ scale: 0 }}
        animate={{ scale: 1.3 }}
        transition={{ repeat: Infinity, duration: 15, yoyo: true }}
      />
    </section>
  );
};

export default Banner;
