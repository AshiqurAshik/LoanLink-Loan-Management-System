import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const feedbacks = [
  {
    name: 'Alice Johnson',
    role: 'Entrepreneur',
    message: 'The loan process was incredibly smooth and fast. Highly recommend!',
  },
  {
    name: 'Michael Smith',
    role: 'Freelancer',
    message: 'I received my loan in just 24 hours. Excellent service and very transparent process.',
  },
  {
    name: 'Sophia Lee',
    role: 'Small Business Owner',
    message: 'Professional team and hassle-free approval. The best platform I have used!',
  },
  {
    name: 'David Kim',
    role: 'Investor',
    message: 'Amazing platform, intuitive process and friendly staff. Highly satisfied!',
  },
  {
    name: 'Emma Wilson',
    role: 'Designer',
    message: 'Fast, reliable, and trustworthy. Everything was explained clearly and transparently.',
  },
  {
    name: 'John Doe',
    role: 'Startup Founder',
    message: 'Seamless experience from start to finish. Definitely recommend for small business owners.',
  },
];

const Feedback = () => {
  const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = feedbacks.length;

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dark mode observer
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

  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <section className="w-11/12 mx-auto py-20 relative">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#003C8F] to-[#00B4D8] bg-clip-text text-transparent drop-shadow-sm">
          Customer Feedback
        </h2>
        <p
          className={`mt-3 text-lg ${
            theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-600'
          }`}
        >
          Hear from our satisfied customers and see how we make loans easy.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-3 rounded-full bg-white/80 dark:bg-[#111B33]/80 backdrop-blur-md shadow-md hover:scale-110 transition"
        >
          <FaArrowLeft
            className={`${theme === 'dark' ? 'text-white' : 'text-[#003C8F]'} text-2xl`}
          />
        </button>

        <div className="flex items-center justify-center w-full overflow-hidden">
          <div className="flex items-center gap-6">
            {feedbacks.map((fb, index) => {
              const position =
                index === current
                  ? 'main'
                  : index === (current - 1 + total) % total
                  ? 'left'
                  : index === (current + 1) % total
                  ? 'right'
                  : 'hidden';

              return (
                <AnimatePresence key={index}>
                  {(position === 'main' || position === 'left' || position === 'right') && (
                    <motion.div
                      initial={{
                        x:
                          position === 'main'
                            ? 0
                            : position === 'left'
                            ? -120
                            : 120,
                        scale: position === 'main' ? 0.95 : 0.85,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        scale: position === 'main' ? 1 : 0.85,
                        opacity: position === 'main' ? 1 : 0.6,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className={`relative min-w-[320px] max-w-[320px] p-8 rounded-3xl flex flex-col items-center text-center cursor-default transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-[#111B33]/60 border border-[#1E293B] text-[#E2E8F0] shadow-[0_20px_40px_rgba(0,0,0,0.2)]'
                          : 'bg-white/90 border border-gray-200 text-[#1F2937] shadow-[0_15px_30px_rgba(0,60,143,0.1)]'
                      }`}
                      style={{
                        filter:
                          isMobile
                            ? 'none'
                            : position === 'main'
                            ? 'none'
                            : 'blur(4px) brightness(0.8)',
                      }}
                    >
                      <p className="text-lg italic">"{fb.message}"</p>
                      <h4 className="text-xl font-bold mt-4">{fb.name}</h4>
                      <p className="text-sm text-gray-400">{fb.role}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-3 rounded-full bg-white/80 dark:bg-[#111B33]/80 backdrop-blur-md shadow-md hover:scale-110 transition"
        >
          <FaArrowRight
            className={`${theme === 'dark' ? 'text-white' : 'text-[#003C8F]'} text-2xl`}
          />
        </button>
      </div>
    </section>
  );
};

export default Feedback;
