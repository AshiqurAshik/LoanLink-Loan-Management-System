import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Auth/AuthContext";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  // Detect theme (light/dark)
  useEffect(() => {
    const updateTheme = () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current);
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Fetch Loan Data
  useEffect(() => {
    fetch(`http://localhost:3000/loans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoan(data);
        setLoading(false);
      })
      .catch(() => {
        setLoan(null);
        setLoading(false);
      });
  }, [id]);

  // Apply Button
  const handleApplyNow = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login before applying for a loan.",
        confirmButtonColor: theme === "dark" ? "#00E0FF" : "#003C8F",
      });
      return;
    }

    navigate(`/apply-loan/${loan._id}`);
  };

  // Loading UI
  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === "dark" ? "bg-[#0A122A]" : "bg-[#F8FAFC]"
        }`}
      >
        <p
          className={`text-lg animate-pulse ${
            theme === "dark" ? "text-[#E2E8F0]" : "text-gray-600"
          }`}
        >
          Loading loan details...
        </p>
      </div>
    );
  }

  // Loan Not Found UI
  if (!loan) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          theme === "dark" ? "bg-[#0A122A]" : "bg-[#F8FAFC]"
        }`}
      >
        <p
          className={`text-lg ${
            theme === "dark" ? "text-[#E2E8F0]" : "text-gray-600"
          }`}
        >
          Loan not found.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 relative overflow-hidden ${
        theme === "dark" ? "bg-[#0A122A]" : "bg-[#F8FAFC]"
      }`}
    >
      {/* Floating glowing shapes */}
      <motion.div
        className="absolute top-0 left-0 w-60 h-60 bg-[#00E0FF]/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-0 w-72 h-72 bg-[#1E90FF]/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto w-11/12 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 px-5 py-3 rounded-lg font-semibold ${
            theme === "dark"
              ? "bg-[#1E90FF] text-[#0A122A] hover:bg-[#00E0FF]"
              : "bg-[#003C8F] text-white hover:bg-[#1E4C9A]"
          }`}
        >
          ← Back
        </button>

        <div
          className={`rounded-3xl shadow-2xl overflow-hidden ${
            theme === "dark"
              ? "bg-[#111B33] text-[#E2E8F0]"
              : "bg-white text-[#1F2937]"
          }`}
        >
          <div className="md:flex">
            {/* Left: Loan Image */}
            <motion.div className="md:w-1/2">
              <motion.img
                src={loan.loanImage}
                alt={loan.loanTitle}
                className="w-full h-full object-cover md:h-[500px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>

            {/* Right: Loan Info */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-bold mb-6">{loan.loanTitle}</h1>

              <p className="mb-3 text-lg">
                <strong>Category:</strong> {loan.category}
              </p>

              <p className="mb-3 text-lg">
                <strong>Interest Rate:</strong> {loan.interestRate}%
              </p>

              <p className="mb-3 text-lg">
                <strong>Max Limit:</strong> $
                {loan.maxLimit.toLocaleString()}
              </p>

              <p className="mb-3 text-lg">
                <strong>Description:</strong>{" "}
                {loan.description || "No description available."}
              </p>

              {loan.availableEMIPlans?.length > 0 && (
                <div className="mt-4">
                  <strong>Available EMI Plans:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {loan.availableEMIPlans.map((plan, i) => (
                      <li key={i} className="text-lg">
                        {plan} months
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleApplyNow}
                className={`mt-8 w-full py-4 rounded-2xl font-bold text-lg shadow-xl ${
                  theme === "dark"
                    ? "bg-[#00E0FF] text-[#0A122A] hover:bg-[#1E90FF]"
                    : "bg-[#003C8F] text-white hover:bg-[#1E4C9A]"
                }`}
              >
                Apply Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
