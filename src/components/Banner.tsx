import { IBanner } from '@/types'
// import { IoHome } from "react-icons/io5";
// import { IoIosArrowForward } from "react-icons/io";
// import Link from 'next/link';
const Banner: React.FC<IBanner> = (banner) => {
    console.log(banner.bgImg)
    return (
        <section className="h-[calc(100vh-300px)] bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.bgImg})` }}>
            <div className='h-full w-full bg-black bg-opacity-40 text-background flex flex-col md:flex-row justify-center gap-y-4 md:justify-around items-center text-center md:text-left'>
                <div className='space-y-4'>
                    <h1 className='font-serif text-5xl font-bold text-white'>{banner.title}</h1>
                    <p className='font-sans text-xl md:w-3/4 text-white'>{banner.para}</p>
                    <button className='font-sans border border-white px-4 py-1 rounded text-xl text-white hover:bg-secondary hover:text-white hover:border-secondary'>Book Now</button>
                </div>
                <div className='flex items-center gap-x-3 text-white'>
                        {/* <IoHome className='text-base mb-1' />
                        <Link href={banner.href} className='font-sans text-base'>HOME</Link>
                        <IoIosArrowForward className='text-base' />
                        <span className='font-sans text-base'>{banner.page}</span> */}
                </div>
            </div>
        </section>
    )
}

export default Banner
