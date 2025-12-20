import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Auth/AuthContext';
import { updateProfile, updateEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../../Firebase.init';

const BorrowerProfile = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return <div>Loading user info...</div>;

  const openModal = () => {
    // Set default values from user before opening modal
    setName(user.displayName || '');
    setEmail(user.email || '');
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (user.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      if (user.email !== email) {
        await updateEmail(auth.currentUser, email);
      }
      toast.success('Profile updated successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Update failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
      {/* Avatar and basic info */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.photoURL || 'https://via.placeholder.com/80'}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border border-gray-300 shadow-sm"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.displayName || 'User Name'}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Update Button */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Update Profile
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
            <h3 className="text-xl font-bold mb-4">Update Profile</h3>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowerProfile;
