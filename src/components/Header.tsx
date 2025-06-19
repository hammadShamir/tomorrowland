"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CgMenu } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { IMenuLinks } from '@/types';
import MobileMenu from './MobileMenu';
import { data } from '@/data';
import { useRouter } from 'next/navigation';
import { checkAuth, logout } from '@/services/helper';
import UserMenu from './UserMenu';
import EmailVerificationToast from './EmailVerification';
const Header = () => {
    const navigate = useRouter();
    const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!checkAuth());
    const handleLogOut = () => {
        logout();
        setIsLoggedIn(false);
        navigate.push('/');
    }
    return (
        <header className='fixed top-0 left-0 w-full z-50'>
            <section className='bg-gradient-to-r from-white via-purple-50/50 to-pink-50/50 backdrop-blur-md w-full px-8 py-2 md:py-3 shadow-xl border-b border-purple-100/50'>
                <div className='max-w-screen-xl mx-auto flex items-center justify-between'>
                    <div className='flex items-center gap-20 md:gap-36 lg:gap-40'>
                        <Link href={'/'} className='group flex-shrink-0'>
                            <Image
                                src={'/logo.png'}
                                alt='Logo'
                                width={90}
                                height={90}
                                className='transition-transform duration-300 group-hover:scale-110 drop-shadow-lg'
                            />
                        </Link>
                        
                        <nav className='hidden md:block'>
                            <ul className='flex items-center gap-x-8 lg:gap-x-16'>
                            {
                                data.menus.map((item: IMenuLinks, Index: number) => {
                                    return (
                                        <li key={Index} className='font-sans text-lg font-medium text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 relative group'>
                                            <Link href={item.url.startsWith('/') ? item.url : `/${item.url}`} className='relative'>
                                                {item.title}
                                                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300'></span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        </nav>
                    </div>

                    <div className='flex items-center gap-x-4'>
                        <Link href={'/bids'} className='font-sans border-2 border-purple-300 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl text-base font-semibold text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:!text-white hover:border-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hidden md:block'>
                            🚀 Priority Access
                        </Link>
                        {
                            isLoggedIn ? (
                                <UserMenu onLogout={handleLogOut} />
                            ) : (
                                <div className='hidden md:flex items-center gap-x-6'>
                                    <Link href={'/login'} className='font-sans text-lg font-medium text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all duration-300 relative group'>
                                        Sign In
                                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300'></span>
                                    </Link>
                                    <Link href={'/signup'} className='font-sans bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 !text-white px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50 border border-white/20'>
                                        Get Started
                                    </Link>
                                </div>
                            )
                        }
                    </div>

                    <button className='md:hidden p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-300' onClick={() => setIsMobileMenu(!isMobileMenu)}>
                        {
                            isMobileMenu ? 
                            <RxCross1 className='text-2xl text-purple-600' /> : 
                            <CgMenu className='text-2xl text-purple-600' />
                        }
                    </button>
                </div>
                <MobileMenu isMobileMenu={isMobileMenu} setIsMobileMenu={setIsMobileMenu} />
            </section>
            <EmailVerificationToast />
        </header>
    )
}

export default Header
