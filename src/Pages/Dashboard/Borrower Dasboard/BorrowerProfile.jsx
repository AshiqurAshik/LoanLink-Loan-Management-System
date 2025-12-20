import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Auth/AuthContext';
import { updateProfile, updateEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../../Firebase.init';

const BorrowerProfile = ({ theme = 'light' }) => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) return <div className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Loading user info...</div>;

  const openModal = () => {
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

  // Classes for dark/light mode
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textPrimary = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const inputBg = theme === 'dark' ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300';
  const modalBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const buttonCancel = theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800';

  return (
    <div className={`${cardBg} p-6 rounded-lg shadow max-w-md mx-auto`}>
      {/* Avatar and basic info */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.photoURL || 'https://via.placeholder.com/80'}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border border-gray-300 shadow-sm"
        />
        <div>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>{user.displayName || 'User Name'}</h2>
          <p className={`text-sm ${textSecondary}`}>{user.email}</p>
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
          <div className={`${modalBg} p-6 rounded-lg shadow-md w-96 relative`}>
            <h3 className={`text-xl font-bold mb-4 ${textPrimary}`}>Update Profile</h3>

            <div className="flex flex-col gap-3">
              <div>
                <label className={`block text-sm font-medium ${textPrimary}`}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`mt-1 block w-full rounded-md p-2 ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${textPrimary}`}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full rounded-md p-2 ${inputBg}`}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded-lg transition ${buttonCancel}`}
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
