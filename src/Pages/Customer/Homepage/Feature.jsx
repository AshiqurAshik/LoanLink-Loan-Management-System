import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '⚡',
    title: 'Fast Approval',
    description: 'Get your loan approved within minutes with our streamlined process.',
    color: 'from-[#FF6B6B] to-[#FF8787]',
  },
  {
    icon: '💳',
    title: 'Flexible Plans',
    description: 'Choose a repayment plan that suits your financial needs perfectly.',
    color: 'from-[#6BCB77] to-[#90DFAA]',
  },
  {
    icon: '🔒',
    title: 'Secure & Safe',
    description: 'We use top-level encryption to ensure your data is always protected.',
    color: 'from-[#4D96FF] to-[#6BA6FF]',
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'Our team is available anytime to help you with your queries.',
    color: 'from-[#FFD93D] to-[#FFE066]',
  },
];

const Feature = () => {
  const [theme, setTheme] = useState('light');

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
    <section className="w-full py-20">
      <div className="w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-extrabold ${
              theme === 'dark' ? 'text-[#003C8F]' : 'text-[#003C8F]'
            }`}
          >
            Why Choose Us
          </h2>
          <p
            className={`mt-3 text-lg ${
              theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-600'
            }`}
          >
            Discover why our services stand out in providing a premium financial experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative w-full rounded-3xl p-6 flex flex-col items-center text-center cursor-default border ${
                theme === 'dark'
                  ? 'bg-[#111B33]/60 border-[#1E293B] text-[#E2E8F0]'
                  : 'bg-white/80 border-gray-200 text-[#1F2937]'
              } backdrop-blur-md shadow-2xl transition-all duration-300`}
            >
              {/* Floating Icon */}
              <div
                className={`absolute -top-8 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr ${feature.color} text-white text-3xl shadow-lg`}
              >
                {feature.icon}
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
