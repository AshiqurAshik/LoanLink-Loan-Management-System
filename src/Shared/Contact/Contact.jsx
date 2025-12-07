import React from 'react';
import { motion } from 'framer-motion';
import contactImg from '../../../assets/contact-illustration.svg';

const Contact = () => {
  return (
    <section className="w-11/12 mx-auto py-20 relative">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-8">
            Have questions or need support? Fill out the form below and our team will get back to you promptly.
          </p>

          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full rounded-lg bg-white dark:bg-card-dark border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full rounded-lg bg-white dark:bg-card-dark border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">Message</span>
              </label>
              <textarea
                placeholder="Your message..."
                className="textarea textarea-bordered w-full rounded-lg bg-white dark:bg-card-dark border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                rows={5}
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-info text-white font-semibold hover:bg-info/90 shadow-lg transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Right: Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={contactImg}
            alt="Contact illustration"
            className="w-full max-w-lg rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Background Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-48 h-48 bg-info/20 rounded-full blur-3xl animate-pulse"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ repeat: Infinity, duration: 12, yoyo: true }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-60 h-60 bg-info/30 rounded-full blur-3xl animate-pulse"
        initial={{ scale: 0 }}
        animate={{ scale: 1.3 }}
        transition={{ repeat: Infinity, duration: 15, yoyo: true }}
      />
    </section>
  );
};

export default Contact;
