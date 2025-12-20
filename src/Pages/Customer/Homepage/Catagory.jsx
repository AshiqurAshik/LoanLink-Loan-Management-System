import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { FaMoneyBillWave, FaHome, FaCar, FaGraduationCap, FaChartLine } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

const Catagory = () => {
  const [loans, setLoans] = useState([]);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  // Detect theme changes
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

  // Fetch loans
  useEffect(() => {
    fetch('https://loan-link-loan-management-server.vercel.app/loans')
      .then(res => res.json())
      .then(data => setLoans(data))
      .catch(err => console.error(err));
  }, []);

  // Fixed order of categories
  const categoryOrder = ['Personal', 'Home', 'Vehicle', 'Education', 'Business'];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Personal':
        return <FaMoneyBillWave className="text-5xl text-[#00B4D8]" />;
      case 'Home':
        return <FaHome className="text-5xl text-[#003C8F]" />;
      case 'Vehicle':
        return <FaCar className="text-5xl text-[#F97316]" />;
      case 'Education':
        return <FaGraduationCap className="text-5xl text-[#10B981]" />;
      case 'Business':
        return <FaChartLine className="text-5xl text-[#8B5CF6]" />;
      default:
        return <FaMoneyBillWave className="text-5xl" />;
    }
  };

  return (
    <section className="w-11/12 mx-auto py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#003C8F] to-[#00B4D8] bg-clip-text text-transparent drop-shadow-sm">
          Loan Categories
        </h2>
        <p className={`mt-2 text-base md:text-lg ${theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
          Explore our diverse loan categories and choose what suits your needs.
        </p>
      </div>

      {/* Categories Marquee */}
      <Marquee
        pauseOnHover={true}
        speed={50}
        gradient={false}
        autoFill={true}
      >
        <div className="flex gap-6 mr-6">
          {categoryOrder.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex-shrink-0 w-56 md:w-60 rounded-xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#111B33]/80 border border-[#1E293B] text-[#E2E8F0]'
                  : 'bg-white/90 border border-gray-200 text-[#1F2937]'
              } backdrop-blur-md shadow-lg`}
              onClick={() => navigate(`/category/${category.toLowerCase()}`)}
            >
              <div className="mb-3">{getCategoryIcon(category)}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-1">{category}</h3>
              <p className="text-sm md:text-base">{`View all ${category} loans available for you.`}</p>
            </motion.div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default Catagory;
