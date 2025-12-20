import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Auth/AuthContext";

const ApplyLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to apply for a loan.",
        confirmButtonColor: "#003C8F",
      }).then(() => navigate("/login"));
    }
  }, [user, navigate]);

  // Detect theme
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };
    updateTheme();
  }, []);

  // Fetch loan details
  useEffect(() => {
    fetch(`http://localhost:3000/loans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoan(data);
        setLoading(false);

        reset({
          borrowerEmail: user?.email || "",
          loanTitle: data.loanTitle,
          interestRate: data.interestRate + "%",
        });
      })
      .catch(() => setLoading(false));
  }, [id, user, reset]);

  const onSubmit = async (formData) => {
    if (!loan) return;
    setSubmitting(true);

    const payload = {
      ...formData,
      loanId: loan._id,
      date: new Date(),
      status: "pending",
      feeStatus: "unpaid",
    };

    try {
      const res = await fetch("http://localhost:3000/apply-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await res.json();

      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your loan application has been sent.",
        confirmButtonColor: theme === "dark" ? "#00E0FF" : "#003C8F",
      });
      reset();
      navigate("/all-loans"); // redirect after submit
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
        confirmButtonColor: theme === "dark" ? "#00E0FF" : "#003C8F",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        Loading loan details...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-[#0A122A] text-[#E2E8F0]" : "bg-[#F8FAFC]"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-3xl shadow-xl ${
          theme === "dark" ? "bg-[#111B33]" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">
          Apply for {loan.loanTitle}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Auto-filled fields */}
          <div>
            <label className="label">Borrower Email</label>
            <input
              {...register("borrowerEmail")}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Loan Title</label>
            <input
              {...register("loanTitle")}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Interest Rate</label>
            <input
              {...register("interestRate")}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* User input fields */}
          <div>
            <label className="label">Full Name</label>
            <input
              {...register("fullName", { required: "Full Name is required" })}
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="label">Phone</label>
            <input
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter valid phone number",
                },
              })}
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="label">NID / Passport</label>
            <input
              {...register("nid", { required: "NID / Passport is required" })}
              placeholder="NID / Passport"
              className="input input-bordered w-full"
            />
            {errors.nid && (
              <p className="text-red-500">{errors.nid.message}</p>
            )}
          </div>

          <div>
            <label className="label">Income Source</label>
            <input
              {...register("incomeSource", {
                required: "Income Source is required",
              })}
              placeholder="Income Source"
              className="input input-bordered w-full"
            />
            {errors.incomeSource && (
              <p className="text-red-500">{errors.incomeSource.message}</p>
            )}
          </div>

          <div>
            <label className="label">Monthly Income</label>
            <input
              {...register("monthlyIncome", {
                required: "Monthly Income is required",
                min: { value: 1, message: "Income must be positive" },
              })}
              type="number"
              placeholder="Monthly Income"
              className="input input-bordered w-full"
            />
            {errors.monthlyIncome && (
              <p className="text-red-500">{errors.monthlyIncome.message}</p>
            )}
          </div>

          <div>
            <label className="label">Loan Amount</label>
            <input
              {...register("loanAmount", {
                required: "Loan Amount is required",
                min: { value: 1, message: "Loan must be positive" },
              })}
              type="number"
              placeholder="Loan Amount"
              className="input input-bordered w-full"
            />
            {errors.loanAmount && (
              <p className="text-red-500">{errors.loanAmount.message}</p>
            )}
          </div>

          <div>
            <label className="label">Reason for Loan</label>
            <textarea
              {...register("reason", { required: "Reason is required" })}
              placeholder="Reason for loan"
              className="textarea textarea-bordered w-full"
            />
            {errors.reason && (
              <p className="text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-xl font-bold text-lg shadow-xl ${
              theme === "dark"
                ? "bg-[#00E0FF] text-[#0A122A] hover:bg-[#1E90FF]"
                : "bg-[#003C8F] text-white hover:bg-[#1E4C9A]"
            } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
