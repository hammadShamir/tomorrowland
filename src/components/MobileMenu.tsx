'use client';
import Link from "next/link"
import { IMenuLinks, IMobileMenu } from "@/types"
import { data } from "@/data"
import { useState } from "react";
import { checkAuth, logout } from "@/services/helper";
import { useRouter } from 'next/navigation';

const MobileMenu: React.FC<IMobileMenu> = ({ isMobileMenu, setIsMobileMenu }) => {
    const navigate = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!checkAuth());
    const handleLogOut = () => {
        logout();
        setIsLoggedIn(false);
        setIsMobileMenu(false)
        navigate.push('/');
    }
    return (
        <nav className={`z-50 md:hidden h-screen absolute mt-2 bg-white right-0 overflow-hidden transition-all duration-500  ${isMobileMenu ? 'w-full' : 'w-0'}`}>
            <ul className='flex flex-col items-center gap-y-8 lg:gap-x-16  text-xl text-textSecondary mt-10'>
                {
                    data.menus.map((item: IMenuLinks, Index: number) => {
                        return (
                            <li
                                onClick={() => setIsMobileMenu(false)}
                                key={Index}
                                className='font-[family-name:var(--font-secondary)] text-xl text-textSecondary hover:text-primary'>
                                <Link href={item.url.startsWith('/') ? item.url : `/${item.url}`}>{item.title}</Link>
                            </li>
                        )
                    })
                }
                {
                    isLoggedIn ? (
                        <li className='hover:text-primary'>
                            <Link onClick={() => setIsMobileMenu(false)} href={'/my-booking'} className=' font-[family-name:var(--font-secondary)] text-xl text-textSecondary hover:text-primary'>My Bookings</Link>
                        </li>
                    ) : (
                        <>
                            <li className='hover:text-primary'>
                                <Link onClick={() => setIsMobileMenu(false)} href={'/login'} className=' font-[family-name:var(--font-secondary)] text-xl text-textSecondary hover:text-primary'>Sign In</Link>
                            </li>
                            <li className='hover:text-primary'>
                                <Link onClick={() => setIsMobileMenu(false)} href={'/signup'} className='font-[family-name:var(--font-secondary)] border border-foreground px-4 py-2 rounded-lg text-xl text-secondary hover:bg-secondary hover:text-white hover:border-primary'>Get Started</Link>
                            </li>
                        </>
                    )
                }

                <li className='hover:text-primary'>
                    <Link onClick={() => setIsMobileMenu(false)} href={'/bids'} className='font-[family-name:var(--font-secondary)] border border-foreground px-4 py-2 rounded-lg text-xl text-secondary hover:bg-secondary hover:text-white hover:border-primary'>Priority Access</Link>
                </li>
                {
                    isLoggedIn &&
                    <li className='hover:text-primary'>
                        <button onClick={() => handleLogOut()} className='font-[family-name:var(--font-secondary)] border border-foreground px-4 py-2 rounded-lg text-xl text-secondary hover:bg-secondary hover:text-white hover:border-primary'>Log Out</button>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default MobileMenu
