'use client';
import CredentialsModal from '@/components/admin/CredentialsModal';
import { IReleaseUsers, sendCredentials } from '@/interfaces/admin';
import { axiosService } from '@/services/axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';

const Page = () => {
  const isInitialRender = useRef(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IReleaseUsers | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLoad, setDataLoad] = useState<boolean>(true);
  const [users, setUsers] = useState<IReleaseUsers[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 10;

  const openModal = (user: IReleaseUsers) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleRelease = async (payload: sendCredentials) => {
    try {
      setIsLoading(true);
      await axiosService.post('/auth/release-accounts', {
        id: payload.id,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        email: payload.email,
        password: payload.password,
        eventName: payload.eventName,
        eventInstanceId: payload.eventInstanceId,
      })
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== payload.id));
    } finally {
      setSelectedUser(null);
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  const fetchUsers = React.useCallback(async () => {
    try {
      setDataLoad(true);
      const response = await axiosService.get(`/auth/customers-with-tickets`, {
        params: { limit, offset },
      });

      // Ensure response contains expected data
      const { data, meta } = response;

      // Check if `data` is an array, otherwise default to an empty array
      if (!Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        return;
      }

      setUsers((prevUsers) => [...prevUsers, ...data]);

      if (meta?.totalCount <= limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setDataLoad(false);
    }
  }, [limit, offset]);


  useEffect(() => {
    if (isInitialRender.current) {
      fetchUsers();
      isInitialRender.current = false;
    }

  }, [fetchUsers]);

  const fetchMoreData = () => {
    if (hasMore) {
      setOffset((prevOffset) => prevOffset + limit);
      fetchUsers();
    }
  };

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) =>
      user.customerFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.eventName
    );
  }, [searchTerm, users]);

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Customer Accounts
        </h1>
        <p className="text-gray-600">Manage customer credentials and event bookings</p>
      </div>

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                     text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     focus:border-purple-400/50 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
        </div>
      </div>

      {dataLoad ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-white/80 mt-4">Loading accounts...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
            <p className="text-white/80 text-lg">No accounts found</p>
            <p className="text-white/60 mt-2">Try adjusting your search criteria</p>
          </div>
        </div>
      ) : (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-white/90">{user.customerFullName}</td>
                    <td className="px-6 py-4 text-white/80">{user.customerEmail}</td>
                    <td className="px-6 py-4 text-white/80">{user.customerPhone}</td>
                    <td className="px-6 py-4 text-white/80">{user.eventName}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openModal(user)}
                        className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 
                                 hover:to-pink-600 text-white rounded-lg transition-all duration-200 
                                 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                        title="View Credentials"
                      >
                        <FaEye className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {hasMore && (
            <div className="flex justify-center p-6 border-t border-white/10">
              <button
                onClick={fetchMoreData}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                         hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 
                         hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
      
      {isModalOpen && selectedUser && (
        <CredentialsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onRelease={handleRelease}
          user={selectedUser}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default Page;
