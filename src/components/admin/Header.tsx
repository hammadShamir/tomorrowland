'use client'

import { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes, FaTachometerAlt, FaChartBar, FaCalendarAlt, FaHome, FaSignOutAlt, FaEnvelope, FaUsersCog } from 'react-icons/fa'
import { usePathname, useRouter } from 'next/navigation'
import UserMenu from '../UserMenu'
import { logout } from '@/services/helper'
import Link from 'next/link'

const Header = () => {
    const navigate = useRouter();
    const pathname = usePathname().replace('/admin/', '');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleLogout = () => {
        logout()
        navigate.push('/')
    }

    // Close mobile menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="border-l border-purple-300/30 bg-gradient-to-r from-white via-purple-50/50 to-pink-50/50 backdrop-blur-md text-foreground shadow-xl py-4 px-6 flex justify-between items-center relative border-b border-purple-200/50">
            {/* Left side */}
            <div className="flex items-center">
                <button onClick={toggleMobileMenu} className="mr-4 md:hidden p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-300">
                    {isMobileMenuOpen ? <FaTimes className="text-xl text-purple-600" /> : <FaBars className="text-xl text-purple-600" />}
                </button>
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-sm">🎪</span>
                    </div>
                    <h1 className="text-xl font-bold font-serif text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text uppercase">
                        {pathname || 'Admin'}
                    </h1>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <UserMenu onLogout={handleLogout} />
                </div>
            </div>

            {/* Mobile Menu (shown conditionally) */}
            {isMobileMenuOpen && (
                <div 
                    ref={mobileMenuRef}
                    className="absolute top-full left-0 w-full bg-gradient-to-b from-purple-900 via-purple-800 to-pink-900 shadow-2xl z-50 md:hidden backdrop-blur-md border-t border-purple-600/50"
                >
                    <nav className="py-2">
                        <ul>
                            <li>
                                <Link 
                                    href="/admin/dashboard" 
                                    className="flex items-center px-6 py-3 text-white hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaTachometerAlt className="mr-3 text-purple-300" />
                                    <span className="font-sans font-medium">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/" 
                                    className="flex items-center px-6 py-3 text-white hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaHome className="mr-3 text-purple-300" />
                                    <span className="font-sans font-medium">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/admin/accounts" 
                                    className="flex items-center px-6 py-3 text-white hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaChartBar className="mr-3 text-purple-300" />
                                    <span className="font-sans font-medium">Accounts</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/admin/events" 
                                    className="flex items-center px-6 py-3 text-white hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaCalendarAlt className="mr-3 text-purple-300" />
                                    <span className="font-sans font-medium">Events</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/admin/notifications" 
                                    className="flex items-center px-6 py-3 text-white hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaEnvelope className="mr-3 text-purple-300" />
                                    <span className="font-sans font-medium">Email Notifications</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/admin/users" 
                                    className="flex items-center px-6 py-3 text-white hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 transition-all duration-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaUsersCog className="mr-3 text-purple-300" />
                                    <span className="font-sans font-medium">User Management</span>
                                </Link>
                            </li>
                            <li className="border-t border-purple-600/50 mt-2 pt-2">
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center w-full text-left px-6 py-3 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 mx-2 rounded-lg transition-all duration-300"
                                >
                                    <FaSignOutAlt className="mr-3" />
                                    <span className="font-sans font-medium">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header

