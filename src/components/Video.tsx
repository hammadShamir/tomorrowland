"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { getUser } from "@/services/helper";
import Cookies from "js-cookie";
import Image from 'next/image';

const Video = () => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const navigate = useRouter();

    const checkForMessage = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const message = searchParams.get("emailVerified");
        if (message) {
            const data = getUser();
            if (data) {
                const user = JSON.parse(data);
                user.emailVerified = true;
                Cookies.set("user", JSON.stringify(user), { expires: 7 });
            }
            toast.success(message);
            searchParams.delete("emailVerified");
            const newUrl = searchParams.toString()
                ? `${window.location.pathname}?${searchParams.toString()}`
                : window.location.pathname;

            window.history.replaceState(null, "", newUrl);
        }
    };

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 800);
        };
        
        checkScreenSize();
        
        window.addEventListener('resize', checkScreenSize);
        
        checkForMessage();
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <section id="home" className="relative h-[35rem] md:h-[600px] flex items-center justify-center text-center text-white">
            <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
                {isSmallScreen ? (
                    <Image 
                        src="https://weraveyou.com/wp-content/uploads/2022/08/Tomorrowland-2022-W3-04.jpg"
                        alt="Tomorrowland"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                ) : (
                    <iframe
                        className="w-[350%] xs:w-[301%] 400:w-[264%] sm:w-[180%] md:w-[185%] lg:w-[139%] xl:w-[120dvw] h-[120dvh] top-[-10dvh] absolute "
                        src="https://www.youtube.com/embed/hvIg3PTJWxs?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=0"
                        allowFullScreen
                    ></iframe>
                )}
                <div className="bg-black opacity-50 absolute top-0 left-0 w-full h-full z-1"></div>
            </div>
            <div className="mt-8 md:mt-16 video-content space-y-6 z-10 px-4 md:px-8 max-w-4xl mx-auto">
                {/* Concise Value Proposition */}
                <div className="space-y-4 mb-8">
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-primary)] text-white leading-tight drop-shadow-2xl">
                        Get Tomorrowland Tickets<br />
                        <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Before Anyone Else</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
                        🚀 Skip the queue with our advance booking technology
                    </p>
                </div>

                {/* Simple Call to Action */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate.push("#events")}
                        className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 !text-white font-bold py-4 px-8 rounded-xl text-lg shadow-2xl transform hover:scale-110 transition-all duration-300 border border-white/20 backdrop-blur-sm group"
                    >
                        <span className="relative z-10 !text-white">🎫 Get Your Tickets</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    <p className="text-sm text-white/80 drop-shadow-md">
                        ✨ All events available ✨ Instant delivery ✨ 500+ happy customers
                    </p>
                </div>
            </div>
        </section >
    );
};

export default Video;
