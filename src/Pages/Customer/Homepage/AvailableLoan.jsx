import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const AvailableLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // Add theme state
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch('https://loan-link-loan-management-server.vercel.app/loans')
      .then((res) => res.json())
      .then((data) => {
        setLoans(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching loans:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen`}
      >
        <p
          className={`text-lg animate-pulse`}
        >
          Loading available loans...
        </p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-14"> {/* Removed bg color */}

      {/* PREMIUM HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#003C8F] to-[#00B4D8] bg-clip-text text-transparent drop-shadow-sm">
          Explore Our Exclusive Loan Plans
        </h2>
        <p
          className={`text-lg mt-3 ${theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-600'}`}
        >
          Select from a curated range of premium loan options tailored for your
          financial needs.
        </p>
      </div>

      {/* PREMIUM GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loans.map((loan, index) => (
          <motion.div
            key={loan._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow:
                theme === 'dark'
                  ? '0 20px 40px rgba(30,144,255,0.4)'
                  : '0 15px 30px rgba(0,60,143,0.2)',
            }}
            className={`relative w-full rounded-2xl border overflow-hidden cursor-pointer flex flex-col ${
              theme === 'dark'
                ? 'bg-[#111B33] border-[#1E293B]'
                : 'bg-white border-[#E5E7EB]'
            }`}
            onClick={() => navigate(`/loan-details/${loan._id}`)}
          >
            {/* Loan Image */}
            <div className="relative">
              <motion.img
                src={loan.loanImage}
                alt={loan.loanTitle}
                className="w-full h-48 object-cover"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === 'dark'
                    ? 'from-black/50 via-transparent'
                    : 'from-black/20 via-transparent'
                }`}
              />
            </div>

            {/* Loan Info */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3
                  className={`text-xl font-bold mb-2 truncate ${
                    theme === 'dark' ? 'text-[#E2E8F0]' : 'text-[#1F2937]'
                  }`}
                >
                  {loan.loanTitle}
                </h3>
                <p
                  className={`text-sm mb-1 ${
                    theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-500'
                  }`}
                >
                  <span className="font-medium">Category:</span> {loan.category}
                </p>
                <p
                  className={`text-sm mb-1 ${
                    theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-500'
                  }`}
                >
                  <span className="font-medium">Interest:</span>{' '}
                  {loan.interestRate}%
                </p>
                <p
                  className={`text-sm mb-3 ${
                    theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-500'
                  }`}
                >
                  <span className="font-medium">Max Limit:</span> $
                  {loan.maxLimit.toLocaleString()}
                </p>
              </div>

              {/* View Details Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`w-full py-2 rounded-xl font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-[#1E90FF] hover:bg-[#00E0FF] text-[#0A122A] shadow-xl'
                    : 'bg-[#003C8F] hover:bg-[#1E4C9A] text-white shadow-lg'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/loan-details/${loan._id}`);
                }}
              >
                View Details
              </motion.button>
            </div>

            {/* Dark mode floating shapes */}
            {theme === 'dark' && (
              <>
                <motion.div
                  className="absolute top-2 left-2 w-10 h-10 bg-[#00E0FF]/20 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-4 right-4 w-12 h-12 bg-[#1E90FF]/20 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* SEE MORE BUTTON */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/all-loans')}
          className="px-8 py-3 bg-gradient-to-r from-[#003C8F] to-[#00B4D8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all tracking-wide"
        >
          See More →
        </button>
      </div>
    </div>
  );
};

export default AvailableLoan;
