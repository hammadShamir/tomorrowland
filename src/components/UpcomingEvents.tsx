"use client";
import EventCard from "@/components/EventCard";
import { IEvents } from "@/interfaces/Events";
import { axiosService } from "@/services/axios";
import { useEffect, useState } from "react";

const UpcomingEvents = () => {
    const [data, setData] = useState<IEvents[]>();
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchEvents = async () => {
        try {
            setLoading(true)
            const { data } = await axiosService.get('/events');
            setData(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchEvents()
    }, [])
    
    return (
        <section id="events" className="py-12 md:py-24 relative bg-gradient-to-br from-purple-900/5 via-pink-900/3 to-blue-900/5 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-15 animate-pulse"></div>
            <div className="absolute bottom-16 right-16 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse delay-500"></div>
            
            <div className="w-full max-w-7xl px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl md:text-4xl font-bold mb-4">
                        🎪 Upcoming Events
                    </h2>
                    <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                        Don&apos;t miss out on the world&apos;s most epic electronic music festivals
                    </p>
                </div>
                {
                    loading ? (
                        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                            <div className="flex items-center justify-center w-full h-48 bg-primary/20 rounded-xl sm:w-96 ">
                                <svg className="w-10 h-10 text-primary/40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                            </div>
                            <div className="flex items-center justify-center w-full h-48 bg-primary/20 rounded-xl sm:w-96 ">
                                <svg className="w-10 h-10 text-primary/40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 0 0 1 .028 1.011Z" />
                                </svg>
                            </div>
                            <div className="flex items-center justify-center w-full h-48 bg-primary/20 rounded-xl sm:w-96">
                                <svg className="w-10 h-10 text-primary/40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            {
                                data?.map((item, index) => {
                                    return (
                                        <EventCard
                                            key={index}
                                            title={item.title}
                                            para={item.description}
                                            bgImg={item.bgImg}
                                            eventId={item.id}
                                            eventDate={item.eventDateTime}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default UpcomingEvents
