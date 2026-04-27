import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline SVG Icons for self-contained functionality
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const QuoteIcon = ({ className }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H3.017V21H5.017Z" />
  </svg>
);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
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
    <section className="w-full relative py-16 overflow-hidden perspective-1000">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-25 mix-blend-multiply transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111B33]/70 border border-[#1E293B]' : 'bg-blue-200'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-25 mix-blend-multiply transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#111B33]/70 border border-[#1E293B]' : 'bg-cyan-200'}`}></div>
      </div>

      <div className="relative w-11/12 mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-[#003C8F] via-[#00B4D8] to-[#003C8F] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent drop-shadow-sm uppercase py-2">
              Customer Excellence
            </h2>
           
            <p className={`mt-6 text-lg max-w-xl mx-auto font-light leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Join thousands of satisfied clients who have accelerated their growth with our seamless financial solutions.
            </p>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center min-h-[400px]">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4 z-30 pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto p-4 rounded-full bg-white/40 dark:bg-slate-900/40 border border-white/20 backdrop-blur-2xl shadow-xl hover:shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-500 group"
            >
              <div className={`transition-transform duration-500 group-hover:-translate-x-1 ${theme === 'dark' ? 'text-white' : 'text-[#003C8F]'}`}>
                <ChevronLeft />
              </div>
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto p-4 rounded-full bg-white/40 dark:bg-slate-900/40 border border-white/20 backdrop-blur-2xl shadow-xl hover:shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-500 group"
            >
              <div className={`transition-transform duration-500 group-hover:translate-x-1 ${theme === 'dark' ? 'text-white' : 'text-[#003C8F]'}`}>
                <ChevronRight />
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center w-full overflow-visible py-6">
            <div className="flex items-center justify-center gap-0 relative w-full max-w-5xl h-[340px]">
              {feedbacks.map((fb, index) => {
                const position =
                  index === current
                    ? 'main'
                    : index === (current - 1 + total) % total
                    ? 'left'
                    : index === (current + 1) % total
                    ? 'right'
                    : 'hidden';

                if (position === 'hidden') return null;

                return (
                  <motion.div
                    key={index}
                    layout
                    animate={{
                      x: position === 'main' ? 0 : position === 'left' ? (isMobile ? -60 : -220) : (isMobile ? 60 : 220),
                      scale: position === 'main' ? 1 : 0.75,
                      rotateY: position === 'main' ? 0 : position === 'left' ? 25 : -25,
                      opacity: position === 'main' ? 1 : 0.35,
                      filter: position === 'main' ? 'blur(0px)' : 'blur(4px)',
                      zIndex: position === 'main' ? 20 : 10,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 120, 
                      damping: 20,
                      mass: 1.2
                    }}
                    className={`absolute p-6 md:p-10 rounded-[2.5rem] flex flex-col items-center text-center cursor-default group overflow-hidden w-[85%] md:w-[440px] h-full justify-center ${
                      theme === 'dark'
                        ? 'bg-slate-900/60 border border-white/10 text-slate-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]'
                        : 'bg-white/70 border border-slate-200 text-slate-900 shadow-[0_20px_40px_-10px_rgba(0,60,143,0.1)]'
                    } backdrop-blur-[30px] border-t-white/20`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-8 left-8 opacity-[0.05] pointer-events-none"
                    >
                      <QuoteIcon className="text-6xl text-blue-500" />
                    </motion.div>

                    <div className="relative z-10 flex flex-col items-center">
                      <p className="text-lg md:text-xl font-serif italic font-medium leading-[1.5] mb-8 tracking-tight px-2">
                        "{fb.message}"
                      </p>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6 opacity-40"></div>
                        <h4 className="text-xl font-black tracking-[0.15em] uppercase mb-0.5 drop-shadow-md">
                          {fb.name}
                        </h4>
                        <p className="text-[9px] font-black text-blue-500 tracking-[0.3em] uppercase opacity-80">
                          {fb.role}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          {feedbacks.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative py-3 group"
            >
              <div className={`h-1 transition-all duration-700 ease-[0.16,1,0.3,1] rounded-full overflow-hidden ${
                current === i ? 'w-10 bg-blue-500' : `w-3 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-300'} group-hover:bg-blue-300 group-hover:w-6`
              }`}>
                {current === i && (
                   <motion.div layoutId="indicator-glow" className="absolute inset-0 bg-blue-400 blur-sm opacity-50" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1200px; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 6s ease-in-out infinite;
        }
        section {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}} />
    </section>
  );
};

export default Feedback;