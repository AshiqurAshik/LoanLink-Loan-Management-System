import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Animated Icon */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-red-500 text-9xl mb-6"
      >
        <FaExclamationTriangle />
      </motion.div>

      {/* Error Text */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold text-gray-800 mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl text-gray-600 mb-6"
      >
        Oops! Page not found.
      </motion.p>

      {/* Back Home Button */}
      <motion.a
        href="/"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium shadow-lg"
      >
        Go Back Home
      </motion.a>
    </div>
  );
};

export default ErrorPage;
