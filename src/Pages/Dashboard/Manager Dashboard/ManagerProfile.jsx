import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../../Auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Firebase.init';

const ManagerProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading profile...
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
        <img
          src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-indigo-500 mb-4 object-cover"
        />

        <h2 className="text-2xl font-bold text-gray-800">Manager</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-gray-500 mb-4 capitalize">Manager</p>

        <div className="w-full mt-6 space-y-3 text-gray-700">
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">Email</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">Role</span>
            <span>Manager</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default ManagerProfile;
