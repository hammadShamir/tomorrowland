"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';

interface AboutVideoProps {
  videoUrl?: string;
  fallbackImageUrl?: string;
}

const AboutVideo = ({ 
  videoUrl = "https://www.youtube.com/embed/hvIg3PTJWxs?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=0&loop=1&playlist=hvIg3PTJWxs",
  fallbackImageUrl = "https://weraveyou.com/wp-content/uploads/2022/08/Tomorrowland-2022-W3-04.jpg"
}: AboutVideoProps) => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 800);
        };
        
        checkScreenSize();
        
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <section className="relative h-[30rem] md:h-[600px] flex items-center justify-center text-center text-white">
            <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
                {isSmallScreen ? (
                    <Image 
                        src={fallbackImageUrl}
                        alt="Tomorrowland"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                ) : (
                    <iframe
                        className="w-[350%] xs:w-[301%] 400:w-[264%] sm:w-[180%] md:w-[185%] lg:w-[139%] xl:w-[100dvw] h-[100dvh]  absolute"
                        src={videoUrl}
                        allowFullScreen
                    ></iframe>
                )}
                <div className="bg-black opacity-50 absolute top-0 left-0 w-full h-full z-1"></div>
            </div>
        </section>
    );
};

export default AboutVideo;