import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyLoans = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  // ================= THEME LISTENER =================
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

  // ================= FETCH APPLICATIONS =================
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/applications/${encodeURIComponent(user.email)}`
        );
        if (!res.ok) {
          setApplications([]);
          return;
        }
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  // ================= CANCEL LOAN =================
  const handleCancel = async (loanId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this loan application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3000/applications/${loanId}`,
          {
            method: 'DELETE',
          }
        );

        if (res.ok) {
          setApplications((prev) =>
            prev.filter((app) => app._id !== loanId)
          );
          Swal.fire('Cancelled!', 'Your loan application has been cancelled.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to cancel application.', 'error');
        }
      } catch (err) {
        console.error('Error cancelling loan:', err);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  // ================= PAY FEE =================
  const handlePay = async (loanId) => {
    try {
      const res = await fetch(`http://localhost:3000/applications/${loanId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeStatus: 'Paid' }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === loanId ? { ...app, feeStatus: 'Paid' } : app
          )
        );
        Swal.fire('Success!', 'Payment successful.', 'success');
      }
    } catch (err) {
      console.error('Error paying fee:', err);
      Swal.fire('Error!', 'Payment failed.', 'error');
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark' ? 'bg-[#0A122A]' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p
            className={`mt-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Loading your applications...
          </p>
        </div>
      </div>
    );
  }

  // ================= NOT LOGGED IN =================
  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark' ? 'bg-[#0A122A]' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">Login Required</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ================= NO APPLICATIONS =================
  if (applications.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark' ? 'bg-[#0A122A]' : 'bg-gray-50'
        }`}
      >
        <div className="text-center p-6 rounded-xl shadow-md max-w-md bg-white dark:bg-[#111B33]">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold mb-2">No Applications Found</h2>
          <p className="mb-4">You haven't applied for any loans yet.</p>
          <button
            onClick={() => navigate('/all-loans')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Browse Loans
          </button>
        </div>
      </div>
    );
  }

  // ================= APPLICATION TABLE =================
  return (
    <div
      className={`min-h-screen p-6 ${
        theme === 'dark' ? 'bg-[#0A122A] text-white' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Loan Applications</h1>

        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table
            className={`min-w-full border ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <thead
              className={`${
                theme === 'dark'
                  ? 'bg-[#111B33] text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <tr>
                <th className="px-4 py-3 text-left">Loan Title</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Interest Rate</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Fee Status</th>
                <th className="px-4 py-3 text-left">Applied On</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, idx) => (
                <tr
                  key={app._id}
                  className={`${
                    idx % 2 === 0
                      ? theme === 'dark'
                        ? 'bg-[#111B33]'
                        : 'bg-white'
                      : theme === 'dark'
                      ? 'bg-[#0A122A]'
                      : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-3">{app.loanTitle}</td>
                  <td className="px-4 py-3">{Number(app.loanAmount).toLocaleString()}</td>
                  <td className="px-4 py-3">{app.interestRate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        app.status.toLowerCase() === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : app.status.toLowerCase() === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : app.status.toLowerCase() === 'cancelled'
                          ? 'bg-gray-300 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {app.feeStatus === 'Unpaid' ? (
                      <button
                        onClick={() => handlePay(app._id)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg"
                      >
                        Pay
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg">
                        Paid
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => navigate(`/all-loans/${app.loanId}`)}
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg"
                    >
                      View
                    </button>

                    {app.status.toLowerCase() === 'pending' && (
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyLoans;
