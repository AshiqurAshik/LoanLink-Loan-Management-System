import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';

const ManagerAddLoan = () => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      availableEMIPlans: ['']
    }
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Convert comma-separated EMI plans to array if string
      if (typeof data.availableEMIPlans === 'string') {
        data.availableEMIPlans = data.availableEMIPlans.split(',').map(p => p.trim());
      }

      data.date = new Date();
      data.showOnHome = !!data.showOnHome;

      const res = await fetch('http://localhost:3000/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || 'Failed to add loan');

      Swal.fire({
        icon: 'success',
        title: 'Loan Added',
        text: 'Loan has been added successfully!',
        confirmButtonColor: '#4f46e5',
      });

      reset();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition";

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Loan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Loan Image */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Loan Image (URL)</label>
          <input
            className={inputClass}
            placeholder="https://example.com/image.jpg"
            {...register('loanImage', { required: 'Loan Image is required' })}
          />
          {errors.loanImage && <p className="text-red-500 text-sm mt-1">{errors.loanImage.message}</p>}
        </div>

        {/* Loan Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Loan Title</label>
          <input
            className={inputClass}
            placeholder="Short-Term Loan"
            {...register('loanTitle', { required: 'Loan Title is required' })}
          />
          {errors.loanTitle && <p className="text-red-500 text-sm mt-1">{errors.loanTitle.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className={inputClass + " resize-none h-24"}
            placeholder="Fast cash for short-term needs with quick EMI plans."
            {...register('description', { required: 'Description is required' })}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <input
            className={inputClass}
            placeholder="Personal"
            {...register('category', { required: 'Category is required' })}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            className={inputClass}
            placeholder="12"
            {...register('interestRate', { required: 'Interest Rate is required' })}
          />
          {errors.interestRate && <p className="text-red-500 text-sm mt-1">{errors.interestRate.message}</p>}
        </div>

        {/* Max Limit */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Max Loan Limit</label>
          <input
            type="number"
            className={inputClass}
            placeholder="40000"
            {...register('maxLimit', { required: 'Max Limit is required' })}
          />
          {errors.maxLimit && <p className="text-red-500 text-sm mt-1">{errors.maxLimit.message}</p>}
        </div>

        {/* Available EMI Plans */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Available EMI Plans (comma separated)</label>
          <input
            className={inputClass}
            placeholder="3, 6, 12"
            {...register('availableEMIPlans', { required: 'EMI Plans are required' })}
          />
          {errors.availableEMIPlans && <p className="text-red-500 text-sm mt-1">{errors.availableEMIPlans.message}</p>}
        </div>

        {/* Show on Home */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('showOnHome')} className="w-5 h-5 accent-indigo-500" />
          <label className="font-medium text-gray-700">Show on Home</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Loan'}
        </button>
      </form>
    </div>
  );
};

export default ManagerAddLoan;
