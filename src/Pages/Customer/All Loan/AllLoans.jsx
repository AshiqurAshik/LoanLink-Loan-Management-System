import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState('');
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

  // Fetch loans WITHOUT JWT (public endpoint)
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch(
          'https://loan-link-loan-management-server.vercel.app/loans',
        );
        // No Authorization header needed since it's a public endpoint

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to fetch loans');
          setLoans([]);
        } else {
          // Ensure loans is an array
          setLoans(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching loans:', err);
        setError('Error fetching loans');
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === 'dark' ? 'bg-[#0A122A]' : 'bg-[#F8FAFC]'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Premium Circular Animation */}
          <div className="relative flex items-center justify-center">
            {/* Outer pulse ring */}
            <div className="absolute h-16 w-16 animate-ping rounded-full bg-blue-500/20"></div>

            {/* Rotating gradient border */}
            <div className="h-14 w-14 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>

            {/* Center circle with icon */}
            <div
              className={`absolute flex h-10 w-10 items-center justify-center rounded-full shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="height: 1em; width: 1em; M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-2">
            <p
              className={`text-xl font-medium tracking-wide animate-pulse ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Processing Application...
            </p>
            <p
              className={`text-sm font-light uppercase tracking-widest ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Securely fetching loan data
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === 'dark' ? 'bg-[#0A122A]' : 'bg-[#F8FAFC]'
        }`}
      >
        <p
          className={`text-lg ${theme === 'dark' ? 'text-[#E2E8F0]' : 'text-gray-500'}`}
        >
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-[#0A122A]' : 'bg-[#F8FAFC]'
      } p-8 min-h-screen flex flex-col items-center`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-11/12">
        {Array.isArray(loans) && loans.length > 0 ? (
          loans.map((loan, index) => (
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
                    <span className="font-medium">Category:</span>{' '}
                    {loan.category}
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
                    {loan.maxLimit}
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
                  onClick={() => navigate(`/all-loans/${loan._id}`)}
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
          ))
        ) : (
          <p
            className={`col-span-full text-center ${
              theme === 'dark' ? 'text-[#94A3B8]' : 'text-gray-500'
            }`}
          >
            No loans found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllLoans;
