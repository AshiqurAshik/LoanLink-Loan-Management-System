import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    icon: '💰',
    title: 'Choose Your Loan',
    description:
      'Browse through our curated list of premium loans and select the one that fits your financial needs.',
  },
  {
    icon: '📝',
    title: 'Apply Online',
    description:
      'Fill out a simple online application form with your details and documents.',
  },
  {
    icon: '✅',
    title: 'Get Approved',
    description:
      'Our team reviews your application and approves it quickly, keeping you informed at every step.',
  },
  {
    icon: '💳',
    title: 'Receive Funds',
    description:
      'Once approved, the funds will be transferred to your account seamlessly and securely.',
  },
];

const Tutorial = () => {
  const [theme, setTheme] = useState('light');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); 

  // Observe theme changes
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme =
        document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-11/12 mx-auto py-20" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#003C8F] to-[#00B4D8] bg-clip-text text-transparent drop-shadow-sm">
          How It Works
        </h2>
        <p
          className={`mt-3 text-lg ${
            theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-600'
          }`}
        >
          A simple 4-step process to get your loans approved quickly and
          securely.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
            className={`relative rounded-2xl p-8 flex flex-col items-center text-center cursor-default transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-[#111B33]/70 border border-[#1E293B] text-[#E2E8F0]'
                : 'bg-white/90 border border-gray-200 text-[#1F2937]'
            } backdrop-blur-lg shadow-lg hover:shadow-2xl`}
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-sm">{step.description}</p>

            {/* Step number */}
            <div
              className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg ${
                theme === 'dark'
                  ? 'bg-[#1E90FF]/30 text-[#0A122A]'
                  : 'bg-[#003C8F]/20 text-[#003C8F]'
              }`}
            >
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Tutorial;
