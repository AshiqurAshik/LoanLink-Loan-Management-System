import React from 'react';
import { motion } from 'framer-motion';
import contactImg from '../../assets/call.svg';

const Contact = () => {
  return (
    <section className="w-11/12 mx-auto py-24 relative z-0">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 bg-card-dark dark:bg-card-dark p-10 rounded-3xl shadow-2xl"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-highlight-blue mb-6">
            Get in Touch
          </h2>
          <p className="text-text-secondary dark:text-text-secondary mb-8 text-lg sm:text-xl">
            Have questions or need support? Fill out the form below and our team will get back to you promptly.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 rounded-xl bg-deep-navy text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-info transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-xl bg-deep-navy text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-info transition-all"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full p-4 rounded-xl bg-deep-navy text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-info transition-all"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 rounded-xl bg-info text-deep-navy font-bold hover:bg-info/90 shadow-xl transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Right: Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="w-full max-w-lg rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 bg-info/20 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ repeat: Infinity, duration: 12, repeatType: 'reverse' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-60 h-60 bg-info/30 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1.3 }}
        transition={{ repeat: Infinity, duration: 15, repeatType: 'reverse' }}
      />
    </section>
  );
};

export default Contact;
