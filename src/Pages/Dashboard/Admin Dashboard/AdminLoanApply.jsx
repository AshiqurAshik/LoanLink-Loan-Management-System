import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AdminLoanApply = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch applications
  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3000/applications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setApplications(data);
          setFilteredApps(data);
        } else {
          setApplications([]);
          setFilteredApps([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setApplications([]);
        setFilteredApps([]);
        setLoading(false);
        Swal.fire('Error', 'Failed to fetch applications', 'error');
      });
  }, [token]);

  // Filter applications by status
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredApps(applications);
    } else {
      setFilteredApps(
        applications.filter((app) => app.status === statusFilter)
      );
    }
  }, [statusFilter, applications]);

  // Update application status
  const handleStatusChange = (appId, newStatus) => {
    fetch(`http://localhost:3000/applications/${appId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updatedApp) => {
        setApplications((prev) =>
          prev.map((app) => (app._id === appId ? updatedApp : app))
        );
        Swal.fire('Success', `Application ${newStatus}`, 'success');
        setSelectedApp((prev) =>
          prev && prev._id === appId ? updatedApp : prev
        );
      })
      .catch((err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to update status', 'error');
      });
  };

  if (loading) {
    return <div className="text-center py-10">Loading applications...</div>;
  }

  return (
    <div className="space-y-6 text-black">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Loan Applications</h2>

        <select
          className="
    border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-56
    bg-white text-gray-700 font-medium
    shadow-sm hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
    transition-all duration-200
    cursor-pointer
  "
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Loan ID</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Loan Title</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{app.loanId?.slice(-6)}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{app.fullName}</div>
                    <div className="text-xs text-gray-500">
                      {app.borrowerEmail}
                    </div>
                  </td>
                  <td className="px-4 py-3">{app.loanTitle}</td>
                  <td className="px-4 py-3">৳{app.loanAmount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : app.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primary/90"
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
          <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-3">
            <h3 className="text-xl font-bold">Loan Application Details</h3>

            <p>
              <strong>Name:</strong> {selectedApp.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedApp.borrowerEmail}
            </p>
            <p>
              <strong>Phone:</strong> {selectedApp.phone}
            </p>
            <p>
              <strong>NID:</strong> {selectedApp.nid}
            </p>

            <hr />

            <p>
              <strong>Loan Title:</strong> {selectedApp.loanTitle}
            </p>
            <p>
              <strong>Loan Amount:</strong> ৳{selectedApp.loanAmount}
            </p>
            <p>
              <strong>Interest Rate:</strong> {selectedApp.interestRate}
            </p>
            <p>
              <strong>Monthly Income:</strong> ৳{selectedApp.monthlyIncome}
            </p>
            <p>
              <strong>Income Source:</strong> {selectedApp.incomeSource}
            </p>
            <p>
              <strong>Reason:</strong> {selectedApp.reason}
            </p>
            <p>
              <strong>Applied Date:</strong>{' '}
              {new Date(selectedApp.date).toLocaleString()}
            </p>

            {/* Approve/Reject Buttons */}
            {selectedApp.status === 'Pending' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    handleStatusChange(selectedApp._id, 'approved')
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedApp._id, 'Rejected')
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}

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

export default AdminLoanApply;
