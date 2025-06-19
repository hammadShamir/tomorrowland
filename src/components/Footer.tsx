"use client";
import { data } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

// Icon mapping
const iconMap = {
    email: MdOutlineMail,
    whatsapp: FaWhatsapp,
    telegram: FaTelegramPlane,
};

const Footer = () => {
    return (
        <footer className='bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-blue-900/10 relative overflow-hidden border-t border-purple-100/50 p-6 md:p-12 space-y-8'>
            {/* Decorative background elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-pulse delay-500"></div>
            
            <section className='max-w-screen-xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-y-6'>
                <div className='md:w-1/5'>
                    <Image
                        src={'/logo.png'}
                        alt='Logo'
                        width={120}
                        height={100}
                        className='transition-transform duration-300 hover:scale-110 drop-shadow-lg'
                    />
                </div>
                <nav className='md:w-3/5'>
                    <ul className='mx-auto bg-gradient-to-r from-purple-600 to-pink-600 px-6 md:px-8 py-3 rounded-full flex w-fit items-center gap-x-6 lg:gap-x-12 shadow-xl border border-white/20'>
                        {
                            data.menus.map((item, i) => {
                                return (
                                    <li key={i} className='text-sm md:text-base !text-white font-sans font-medium hover:!text-white/80 transition-colors duration-300'>
                                        <Link href={item.url} className='relative group !text-white'>
                                            {item.title}
                                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300'></span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <ul className='md:w-1/5 flex items-center justify-between gap-x-4 md:justify-end md:gap-x-3'>
                    {data.socialLinks.map((item, i) => {
                        const IconComponent = iconMap[item.iconType as keyof typeof iconMap];
                        return (
                            <li key={i} className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 p-3 lg:p-4 rounded-full shadow-lg hover:shadow-purple-300/50 transition-all duration-300 transform hover:scale-110 border border-white/20'>
                                <Link href={item.url} className='!text-white font-sans'>
                                    {IconComponent && <IconComponent className="text-lg !text-white" />}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className='relative z-10'>
                <div className='max-w-screen-xl mx-auto'>
                    <div className='h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-6'></div>
                    <p className='text-sm md:text-base text-center text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-sans font-medium'>
                        ✨ © 2025 gettomorrowlandtickets - Making Festival Dreams Come True ✨
                    </p>
                </div>
            </section>
        </footer>
    )
}

export default Footer
