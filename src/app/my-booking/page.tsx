"use client";
import BookingPaymentCard from '@/components/BookingPaymentCard';
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Whatsapp from '@/components/Whatsapp';
import { IMyBooking } from '@/interfaces/booking';
import { axiosService } from '@/services/axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {
    const navigate = useRouter();
    const [loading, setLoading] = React.useState<{ [key: number]: boolean }>({});
    const [mybookings, setMyBookings] = React.useState<IMyBooking[]>([]);
    const [dataLoad, setDataLoad] = React.useState<boolean>(true);
    
    const initialize = async () => {
        try {
            setDataLoad(true);
            const response = await axiosService.get('/booking');
            
            // Log the response data for debugging
            console.log("API Response:", response);
            
            let bookingsData: IMyBooking[] = [];
            
            if (response && response.data) {
                if (response.data.success && Array.isArray(response.data.data)) {
                    bookingsData = response.data.data;
                } 
                else if (Array.isArray(response.data)) {
                    bookingsData = response.data;
                }
            }
            
            if (bookingsData.length > 0) {
                const validBookings = bookingsData.filter((booking: IMyBooking) => 
                    booking && 
                    booking.eventInstance && 
                    booking.eventInstance.event &&
                    booking.eventInstance.event.bgImg
                );
                
                console.log("Valid bookings:", validBookings);
                setMyBookings(validBookings);
            } else {
                console.error("No bookings found in the API response");
                setMyBookings([]);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setMyBookings([]);
        } finally {
            setDataLoad(false);
        }
    };
    
    React.useEffect(() => {
        initialize();
    }, []);
    
    const handleBookingPayment = async (bookingId: number, eventId: number) => {
        try {
            setLoading(prev => ({ ...prev, [bookingId]: true }));
            const res = await axiosService.put('/booking-payment', {
                bookingId: bookingId,
                eventId: eventId
            });
            navigate.push(res.data);
        } catch (error) {
            console.error("Payment error:", error);
        } finally {
            setLoading(prev => ({ ...prev, [bookingId]: false }));
        }
    }
    
    return (
        <React.Fragment>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-blue-900/10 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-pulse delay-300"></div>
                
                {dataLoad ? (
                    <section className="min-h-screen flex justify-center items-center relative z-10">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 max-w-md w-11/12">
                            <div className="flex flex-col items-center gap-y-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
                                <span className="text-foreground font-sans font-semibold">Loading your bookings...</span>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="min-h-screen pt-20 pb-12 relative z-10">
                        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Page Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold font-serif text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4">
                                    🎫 My Bookings
                                </h1>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed font-sans">
                                    Manage your event bookings and complete payments to secure your tickets
                                </p>
                            </div>

                            {mybookings.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mybookings.map((booking, index) => (
                                        <BookingPaymentCard 
                                            key={`booking-${booking.id}-${index}`} 
                                            booking={booking} 
                                            loading={loading[booking.id] || false} 
                                            handleBookingPayment={handleBookingPayment} 
                                        />
                                    ))}
                                </div>
                            ) : (
                                <section className="flex justify-center items-center min-h-[50vh]">
                                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 max-w-md w-full text-center hover:shadow-purple-300/50 transition-all duration-300">
                                        <div className="flex flex-col items-center gap-y-6">
                                            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center opacity-80">
                                                <span className="text-3xl">🎪</span>
                                            </div>
                                            <div>
                                                <h3 className='font-serif text-2xl md:text-3xl text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4'>
                                                    No bookings yet
                                                </h3>
                                                <p className="text-foreground/70 font-sans mb-6">
                                                    Start your journey by bidding on exciting events and securing your tickets!
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => navigate.push('/#events')} 
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-sans text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50"
                                            >
                                                🎫 Browse Events
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </section>
                )}
            </div>
            <Footer />
            <Whatsapp />
        </React.Fragment>
    )
}

export default Page
