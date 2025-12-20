import React, { useEffect, useState } from 'react';

const ManagerApproveApp = () => {
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await fetch('https://loan-link-loan-management-server.vercel.app/applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        // ✅ FIX: lowercase status
        const approved = data.filter(app => app.status === 'approved');
        setApprovedLoans(approved);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApproved();
  }, [token]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading approved loans...
      </div>
    );
  }

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Approved Loans
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Loan ID</th>
              <th className="px-4 py-3 text-left">Borrower</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Approved At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {approvedLoans.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No approved loans
                </td>
              </tr>
            ) : (
              approvedLoans.map((loan) => (
                <tr key={loan._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {loan.loanId?.slice(-6) || loan._id.slice(-6)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{loan.fullName}</div>
                    <div className="text-xs text-gray-500">
                      {loan.borrowerEmail}
                    </div>
                  </td>

                  <td className="px-4 py-3">${loan.loanAmount}</td>

                  <td className="px-4 py-3">
                    {loan.approvedAt
                      ? new Date(loan.approvedAt).toLocaleDateString()
                      : '-'}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="px-3 py-1 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
            <h3 className="text-xl font-bold">Approved Loan Details</h3>

            <div className="space-y-2 text-sm">
              <p><strong>Borrower:</strong> {selectedLoan.fullName}</p>
              <p><strong>Email:</strong> {selectedLoan.borrowerEmail}</p>
              <p><strong>Loan Title:</strong> {selectedLoan.loanTitle}</p>
              <p><strong>Amount:</strong> ${selectedLoan.loanAmount}</p>
              <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}</p>
              <p><strong>Reason:</strong> {selectedLoan.reason}</p>
              <p><strong>Status:</strong> {selectedLoan.status}</p>
              <p>
                <strong>Approved At:</strong>{' '}
                {new Date(selectedLoan.approvedAt).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setSelectedLoan(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerApproveApp;
