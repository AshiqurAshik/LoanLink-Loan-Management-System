import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManagerManageLoan = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Fetch loans
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch('http://localhost:3000/loans');
        const data = await res.json();
        setLoans(data);
        setFilteredLoans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  // Search filter
  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredLoans(
      loans.filter(
        (loan) =>
          loan.loanTitle.toLowerCase().includes(lower) ||
          loan.category.toLowerCase().includes(lower)
      )
    );
  }, [search, loans]);

  // Delete loan
  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This loan will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmed.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/loans/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to delete loan');

        setLoans(loans.filter((loan) => loan._id !== id));
        setFilteredLoans(filteredLoans.filter((loan) => loan._id !== id));

        Swal.fire('Deleted!', 'Loan has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  // Open update modal
  const openUpdateModal = (loan) => {
    setSelectedLoan({ ...loan }); // create copy for editing
    setUpdateModalOpen(true);
  };

  // Handle input change in modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedLoan((prev) => {
      let updatedValue = value;
      if (name === 'interestRate' || name === 'maxLimit') {
        updatedValue = Number(value);
      }
      return { ...prev, [name]: updatedValue };
    });
  };

  // Handle EMI Plans input
  const handleEMIChange = (e) => {
    const value = e.target.value;
    setSelectedLoan((prev) => ({
      ...prev,
      availableEMIPlans: value
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p),
    }));
  };

  // Handle update submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const { _id, ...updateData } = selectedLoan; // Remove _id from body
      const res = await fetch(`http://localhost:3000/loans/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) throw new Error('Failed to update loan');

      // Update frontend state
      const updatedLoans = loans.map((loan) =>
        loan._id === _id ? selectedLoan : loan
      );
      setLoans(updatedLoans);
      setFilteredLoans(updatedLoans);

      Swal.fire('Updated!', 'Loan has been updated.', 'success');
      setUpdateModalOpen(false);
      setSelectedLoan(null);
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading loans...</div>;
  }

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Loans</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
        />
      </div>

      {/* Loan Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Interest</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Max Limit</th>
              <th className="px-4 py-3 text-left">EMI Plans</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No loans found
                </td>
              </tr>
            ) : (
              filteredLoans.map((loan) => (
                <tr key={loan._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {loan.loanImage ? (
                      <img
                        src={loan.loanImage}
                        alt={loan.loanTitle}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{loan.loanTitle}</td>
                  <td className="px-4 py-3">{loan.interestRate}%</td>
                  <td className="px-4 py-3">{loan.category}</td>
                  <td className="px-4 py-3">${loan.maxLimit}</td>
                  <td className="px-4 py-3">
                    {loan.availableEMIPlans?.join(', ')} months
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => openUpdateModal(loan)}
                      className="px-3 py-1 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="px-3 py-1 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {updateModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative">
            <h2 className="text-2xl font-bold mb-4">Update Loan</h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <input
                type="text"
                name="loanTitle"
                value={selectedLoan.loanTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Loan Title"
                required
              />
              <input
                type="text"
                name="loanImage"
                value={selectedLoan.loanImage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Loan Image URL"
              />
              <textarea
                name="description"
                value={selectedLoan.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Description"
                rows={3}
              />
              <input
                type="text"
                name="category"
                value={selectedLoan.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Category"
              />
              <input
                type="number"
                name="interestRate"
                value={selectedLoan.interestRate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Interest Rate"
              />
              <input
                type="number"
                name="maxLimit"
                value={selectedLoan.maxLimit}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="Max Limit"
              />
              <input
                type="text"
                name="availableEMIPlans"
                value={selectedLoan.availableEMIPlans?.join(', ')}
                onChange={handleEMIChange}
                className="w-full px-4 py-2 border rounded-xl"
                placeholder="EMI Plans (comma separated)"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-400 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
                >
                  {updateLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerManageLoan;
