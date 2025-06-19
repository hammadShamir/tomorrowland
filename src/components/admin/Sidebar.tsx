'use client'

import { FaUser, FaTachometerAlt, FaChartBar, FaSignOutAlt, FaCalendarAlt, FaHome, FaEnvelope, FaUsersCog } from 'react-icons/fa'
import Link from 'next/link'
import React from 'react'
import { getUser, logout } from '@/services/helper'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
    const navigate = useRouter();
    const user = getUser();
    const savedUser = user ? JSON.parse(user) : null;
    const adminInfo = {
        name: user && savedUser?.fullName,
        email: user && savedUser?.email,
    }

    const handleLogout = () => {
        logout()
        navigate.push('/')
    }
    return (
        <section>
            {/* Desktop Sidebar */}
            <div className="bg-gradient-to-b from-purple-900 via-purple-800 to-pink-900 text-white h-screen w-64 fixed left-0 top-0 flex-col hidden md:flex shadow-2xl border-r border-purple-700/50">
                <div className="p-4 border-b border-purple-700/50 bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3">
                            <FaUser className="text-xl text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white font-serif">{adminInfo.name}</h2>
                            <p className="text-sm text-purple-200 font-sans">{adminInfo.email}</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-grow">
                    <ul className="py-4">
                        <li>
                            <Link href={'/admin/dashboard'} className="flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 group border-l-4 border-transparent hover:border-pink-400">
                                <FaTachometerAlt className="mr-3 text-purple-300 group-hover:text-pink-300 transition-colors" />
                                <span className="font-sans font-medium">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'} className="flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 group border-l-4 border-transparent hover:border-pink-400">
                                <FaHome className="mr-3 text-purple-300 group-hover:text-pink-300 transition-colors" />
                                <span className="font-sans font-medium">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/admin/accounts'} className="flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 group border-l-4 border-transparent hover:border-pink-400">
                                <FaChartBar className="mr-3 text-purple-300 group-hover:text-pink-300 transition-colors" />
                                <span className="font-sans font-medium">Accounts</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/admin/events'} className="flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 group border-l-4 border-transparent hover:border-pink-400">
                                <FaCalendarAlt className="mr-3 text-purple-300 group-hover:text-pink-300 transition-colors" />
                                <span className="font-sans font-medium">Events</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/admin/notifications'} className="flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 group border-l-4 border-transparent hover:border-pink-400">
                                <FaEnvelope className="mr-3 text-purple-300 group-hover:text-pink-300 transition-colors" />
                                <span className="font-sans font-medium">Email Notifications</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/admin/users'} className="flex items-center px-6 py-3 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300 group border-l-4 border-transparent hover:border-pink-400">
                                <FaUsersCog className="mr-3 text-purple-300 group-hover:text-pink-300 transition-colors" />
                                <span className="font-sans font-medium">User Management</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-purple-700/50">
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <FaSignOutAlt className="mr-3" />
                        <span className="font-sans font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Sidebar

