"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { FaUser, FaSignOutAlt, FaClipboardList, FaTachometerAlt, FaUsers, FaHome, FaCalendarAlt, FaEnvelope, FaUsersCog } from "react-icons/fa";
import { UserMenuProps, UserRoles } from "@/interfaces/user";
import { getUser } from "@/services/helper";
import { DashboardMenuItem } from "@/types";

const UserMenu: React.FC<UserMenuProps> = (props) => {
    const [Menus, setMenus] = useState<DashboardMenuItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // User Dashboard Menus
    const userDashboardMenus = useMemo<DashboardMenuItem[]>(() => [
        {
            title: "My Bookings",
            href: "/my-booking",
            icon: <FaClipboardList className="h-4 w-4 mr-2" />,
        },
    ], []);

    // Admin Dashboard Menus
    const adminDashboardMenus = useMemo<DashboardMenuItem[]>(() => [
        {
            title: "Home",
            href: "/",
            icon: <FaHome className="h-4 w-4 mr-2 text-secondary" />,
        },
        {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: <FaTachometerAlt className="h-4 w-4 mr-2 text-secondary" />,
        },
        {
            title: "Accounts",
            href: "/admin/accounts",
            icon: <FaUsers className="h-4 w-4 mr-2 text-secondary" />,
        },
        {
            title: "Events",
            href: "/admin/events",
            icon: <FaCalendarAlt className="h-4 w-4 mr-2 text-secondary" />,
        },
        {
            title: "Email Notifications",
            href: "/admin/notifications",
            icon: <FaEnvelope className="h-4 w-4 mr-2 text-secondary" />,
        },
        {
            title: "User Management",
            href: "/admin/users",
            icon: <FaUsersCog className="h-4 w-4 mr-2 text-secondary" />,
        },
    ], []);

    useEffect(() => {
        const user = getUser();
        const role = user ? JSON.parse(user).role : null;
        if (role === UserRoles.USER) {
            setMenus(userDashboardMenus);
        } else if (role === UserRoles.ADMIN) {
            setMenus(adminDashboardMenus);
        } else {
            const updatedAdminMenus = adminDashboardMenus.filter(
                (menu) => menu.href !== "/admin/admins"
            );
            setMenus(updatedAdminMenus);
        }
    }, [userDashboardMenus, adminDashboardMenus]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden md:flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <FaUser className="h-5 w-5 text-secondary" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {Menus.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            {menu.icon}
                            {menu.title}
                        </Link>
                    ))}
                    <button
                        onClick={props.onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                        <FaSignOutAlt className="h-4 w-4 mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
