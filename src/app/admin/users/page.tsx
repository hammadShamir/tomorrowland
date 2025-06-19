'use client';
import { useState } from 'react';
import { axiosService } from '@/services/axios';
import { MdDelete } from 'react-icons/md';

const UsersManagementPage = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleDeleteAllUsers = async () => {
    try {
      setIsDeleting(true);
      await axiosService.delete('/admin/users');
      closeConfirmModal();
    } catch (error) {
      console.error('Error deleting users:', error);
      // Toast errors are handled by axios service
    } finally {
      setIsDeleting(false);
    }
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          User Management
        </h1>
        <p className="text-white/80">Manage system users and perform bulk operations</p>
      </div>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white/90 mb-3">Delete All Non-Admin Users</h2>
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-6">
            <p className="text-white/90 mb-4">
              This action will permanently delete all regular users from the system. Admin accounts will be preserved.
              <span className="block text-red-300 font-semibold mt-2">⚠️ This action cannot be undone.</span>
            </p>
            <button
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
                       text-white px-6 py-3 rounded-xl flex items-center gap-3 font-semibold 
                       transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              onClick={openConfirmModal}
              disabled={isDeleting}
            >
              <MdDelete className="text-xl" /> 
              {isDeleting ? 'Processing...' : 'Delete All Users'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Confirm Deletion
              </h2>
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-6 mb-6">
                <p className="text-white/90 leading-relaxed">
                  Are you sure you want to delete <strong>ALL non-admin users</strong>? This will remove all user accounts
                  except for administrators.
                </p>
                <p className="text-red-300 font-semibold mt-3">
                  ⚠️ This action is irreversible and cannot be undone.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                           text-white/90 hover:bg-white/30 transition-all duration-200 font-medium"
                  onClick={closeConfirmModal}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 
                           hover:to-red-800 text-white rounded-xl flex items-center justify-center gap-2 
                           font-semibold transition-all duration-200 hover:scale-105 shadow-lg 
                           hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed 
                           disabled:hover:scale-100"
                  onClick={handleDeleteAllUsers}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    'Confirm Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UsersManagementPage;
