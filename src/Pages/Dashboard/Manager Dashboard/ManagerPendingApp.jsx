import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManagerPendingApp = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch pending applications
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch('https://loan-link-loan-management-server.vercel.app/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // ✅ FIX: status is lowercase
        const pendingApps = data.filter(app => app.status === 'pending');
        setApplications(pendingApps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [token]);

  // Approve loan
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `https://loan-link-loan-management-server.vercel.app/applications/${id}/approve`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to approve application');

      Swal.fire('Approved!', 'Loan has been approved.', 'success');
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  // Reject loan
  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `https://loan-link-loan-management-server.vercel.app/applications/${id}/reject`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to reject application');

      Swal.fire('Rejected', 'Loan has been rejected.', 'info');
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Pending Loan Applications
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Loan ID</th>
              <th className="px-4 py-3 text-left">Borrower</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No pending applications
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {app.loanId?.slice(-6) || app._id.slice(-6)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{app.fullName}</div>
                    <div className="text-xs text-gray-500">
                      {app.borrowerEmail}
                    </div>
                  </td>

                  <td className="px-4 py-3">${app.loanAmount}</td>

                  <td className="px-4 py-3">
                    {new Date(app.date).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(app._id)}
                      className="px-3 py-1 rounded-xl bg-green-600 text-white hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(app._id)}
                      className="px-3 py-1 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => setSelectedApp(app)}
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
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
            <h3 className="text-xl font-bold">Loan Application Details</h3>

            <div className="space-y-2 text-sm">
              <p><strong>Borrower:</strong> {selectedApp.fullName}</p>
              <p><strong>Email:</strong> {selectedApp.borrowerEmail}</p>
              <p><strong>Loan Title:</strong> {selectedApp.loanTitle}</p>
              <p><strong>Amount:</strong> ${selectedApp.loanAmount}</p>
              <p><strong>Interest Rate:</strong> {selectedApp.interestRate}</p>
              <p><strong>Reason:</strong> {selectedApp.reason}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p>
                <strong>Date Applied:</strong>{' '}
                {new Date(selectedApp.date).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setSelectedApp(null)}
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

export default ManagerPendingApp;
