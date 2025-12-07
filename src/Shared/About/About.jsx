import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../../assets/about.svg';

const About = () => {
  return (
    <section className="w-11/12 mx-auto py-20 relative">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight">
            Empower Your Financial Journey
          </h2>
          <p className="text-gray-700 dark:text-gray-400 text-lg sm:text-xl mb-6">
            LoanLink is your complete loan management solution. Track applications, manage approvals, 
            and make informed decisions—all in one secure and intuitive platform. Designed for individuals 
            and businesses, LoanLink gives you full control of your financial growth.
          </p>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-xl bg-white dark:bg-card-dark shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="font-semibold text-lg text-primary mb-2">Smart Loan Tracking</h3>
              <p className="text-gray-600 dark:text-gray-500">
                Keep track of all your loan applications in one place with real-time updates.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="p-6 rounded-xl bg-white dark:bg-card-dark shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="font-semibold text-lg text-primary mb-2">Secure & Encrypted</h3>
              <p className="text-gray-600 dark:text-gray-500">
                All transactions and sensitive data are fully encrypted to ensure safety.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-6 rounded-xl bg-white dark:bg-card-dark shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="font-semibold text-lg text-primary mb-2">Analytics & Reports</h3>
              <p className="text-gray-600 dark:text-gray-500">
                Generate detailed reports and gain insights to make smarter lending decisions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="p-6 rounded-xl bg-white dark:bg-card-dark shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="font-semibold text-lg text-primary mb-2">User-Friendly Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-500">
                Intuitive dashboard designed for seamless navigation across all devices.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={aboutImg}
            alt="Loan Management Illustration"
            className="w-full max-w-lg rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Background Accent Shapes */}
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

export default About;
