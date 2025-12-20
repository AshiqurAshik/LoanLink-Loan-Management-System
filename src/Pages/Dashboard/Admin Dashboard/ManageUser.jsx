import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suspendModal, setSuspendModal] = useState(null);
  const [suspendData, setSuspendData] = useState({ reason: "", feedback: "" });

  const token = localStorage.getItem("token");

  // Fetch users
  useEffect(() => {
    fetch("https://loan-link-loan-management-server.vercel.app/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  // Update role
  const handleUpdateRole = (userId, newRole) => {
    fetch(`https://loan-link-loan-management-server.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `User role changed to ${newRole}`,
        });
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      })
      .catch((err) => console.error(err));
  };

  // Handle suspend
  const handleSuspend = (userId, name) => {
    setSuspendModal({ userId, name });
    setSuspendData({ reason: "", feedback: "" });
  };

  const submitSuspend = () => {
    const { userId } = suspendModal;
    fetch(`https://loan-link-loan-management-server.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        role: "suspended",
        suspendReason: suspendData.reason,
        suspendFeedback: suspendData.feedback,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId
              ? { ...u, role: "suspended", suspendReason: suspendData.reason, suspendFeedback: suspendData.feedback }
              : u
          )
        );
        Swal.fire("User Suspended", "User has been suspended successfully.", "success");
        setSuspendModal(null);
      })
      .catch((err) => console.error(err));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6 text-black">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 shadow rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Role</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-blue-600 text-white"
                        : user.role === "manager"
                        ? "bg-green-600 text-white"
                        : user.role === "borrower"
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className={`btn btn-sm bg-blue-600 text-white border-none ${
                      user.role === "manager" || user.role === "suspended"
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                    onClick={() => handleUpdateRole(user._id, "manager")}
                    disabled={user.role === "manager" || user.role === "suspended"}
                  >
                    Make Manager
                  </button>

                  <button
                    type="button"
                    className={`btn btn-sm bg-green-600 text-white border-none ${
                      user.role === "borrower" || user.role === "suspended"
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-green-700"
                    }`}
                    onClick={() => handleUpdateRole(user._id, "borrower")}
                    disabled={user.role === "borrower" || user.role === "suspended"}
                  >
                    Make Borrower
                  </button>

                  <button
                    type="button"
                    className={`btn btn-sm bg-red-600 text-white border-none ${
                      user.role === "suspended" ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
                    }`}
                    onClick={() => handleSuspend(user._id, user.name)}
                    disabled={user.role === "suspended"}
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suspend Modal */}
      {suspendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-xl font-bold">Suspend {suspendModal.name}</h3>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Reason for suspension"
                value={suspendData.reason}
                onChange={(e) => setSuspendData((prev) => ({ ...prev, reason: e.target.value }))}
                className="border p-2 rounded"
              />
              <textarea
                placeholder="Feedback / details"
                value={suspendData.feedback}
                onChange={(e) => setSuspendData((prev) => ({ ...prev, feedback: e.target.value }))}
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSuspendModal(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitSuspend}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
