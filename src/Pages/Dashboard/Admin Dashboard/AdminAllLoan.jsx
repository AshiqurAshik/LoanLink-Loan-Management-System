import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AdminAllLoan = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem('token');

  // Fetch loans
  useEffect(() => {
    fetch('https://loan-link-loan-management-server.vercel.app/loans', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLoans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        Swal.fire('Error', 'Failed to fetch loans', 'error');
      });
  }, [token]);

  // Delete loan
  const handleDelete = (loanId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the loan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://loan-link-loan-management-server.vercel.app/loans/${loanId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(() => {
            setLoans(loans.filter((loan) => loan._id !== loanId));
            Swal.fire('Deleted!', 'Loan has been deleted.', 'success');
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // Open modal
  const handleEdit = (loan) => {
    setSelectedLoan(loan);
    setFormData({
      loanTitle: loan.loanTitle || '',
      description: loan.description || '',
      category: loan.category || '',
      interestRate: loan.interestRate || 0,
      maxLimit: loan.maxLimit || 0,
      availableEMIPlans: (loan.availableEMIPlans || []).join(', '),
      loanImage: loan.loanImage || '',
      showOnHome: loan.showOnHome || false,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Save updates
  const handleSave = () => {
    fetch(`https://loan-link-loan-management-server.vercel.app/loans/${selectedLoan._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        availableEMIPlans: formData.availableEMIPlans
          ? formData.availableEMIPlans.split(',').map((p) => p.trim())
          : [],
      }),
    })
      .then((res) => res.json())
      .then((updatedLoan) => {
        setLoans((prev) =>
          prev.map((loan) =>
            loan._id === selectedLoan._id ? updatedLoan : loan
          )
        );
        Swal.fire('Updated!', 'Loan details updated successfully.', 'success');
        setSelectedLoan(null);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <div className="text-center py-10">Loading loans...</div>;

  return (
    <div className="p-6 text-black">
      <h2 className="text-3xl font-bold mb-6">All Loans</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 shadow rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Interest Rate</th>
              <th className="px-4 py-2">Max Limit</th>
              <th className="px-4 py-2">EMI Plans</th>
              <th className="px-4 py-2">Show on Home</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={loan.loanImage}
                    alt={loan.loanTitle}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{loan.loanTitle}</td>
                <td className="px-4 py-2">{loan.description}</td>
                <td className="px-4 py-2">{loan.category}</td>
                <td className="px-4 py-2">{loan.interestRate}%</td>
                <td className="px-4 py-2">${loan.maxLimit}</td>
                <td className="px-4 py-2">
                  {(loan.availableEMIPlans || []).join(', ')}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={loan.showOnHome || false}
                    readOnly
                  />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="btn btn-sm bg-blue-600 text-white"
                    onClick={() => handleEdit(loan)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm bg-red-600 text-white"
                    onClick={() => handleDelete(loan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Update Loan</h3>
            <div className="flex flex-col gap-3">
              {['loanTitle', 'description', 'category', 'loanImage'].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className="border p-2 rounded"
                  />
                )
              )}
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                placeholder="Interest Rate"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="maxLimit"
                value={formData.maxLimit}
                onChange={handleChange}
                placeholder="Max Limit"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="availableEMIPlans"
                value={formData.availableEMIPlans}
                onChange={handleChange}
                placeholder="EMI Plans (comma separated)"
                className="border p-2 rounded"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="showOnHome"
                  checked={formData.showOnHome || false}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                Show on Home
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSelectedLoan(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllLoan;
