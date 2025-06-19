import { BookingPaymentCardProps } from '@/interfaces/booking'
import Image from 'next/image'
import React from 'react'

const BookingPaymentCard:React.FC<BookingPaymentCardProps> = (props) => {
    // Add a safety check to ensure the booking and its nested objects exist
    if (!props.booking || !props.booking.eventInstance || !props.booking.eventInstance.event) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6 hover:shadow-purple-300/50 transition-all duration-300">
                <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
                    <p className="ml-3 text-foreground/70 font-sans">Loading booking details...</p>
                </div>
            </div>
        );
    }
    
    // Determine button visibility based on hasTicket property
    const isPaid = props.booking.paymentStatus === 'paid';
    const hasTicket = props.booking.hasTicket;
    
    // Only show the payment button if hasTicket is true
    const showButton = hasTicket === true;
    
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-purple-300/50 transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full h-48">
                <Image
                    src={props.booking.eventInstance.event.bgImg}
                    alt={props.booking.eventInstance.event.title}
                    fill
                    className="object-cover"
                    quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                {isPaid && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {hasTicket ? '✅ Ticket Ready' : '⏳ Processing'}
                    </div>
                )}
            </div>

            <div className="p-6">
                <h5 className="mb-3 text-xl font-bold font-serif text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                    {props.booking.eventInstance.event.title}
                </h5>
                <p className="mb-4 font-sans text-foreground/70 text-sm leading-relaxed">
                    {props.booking.eventInstance.event.description}
                </p>
                
                {props.booking.eventInstance.eventDate && (
                    <div className="mb-3 flex items-center text-foreground/80">
                        <span className="text-purple-600 mr-2">📅</span>
                        <span className="font-sans text-sm">
                            {new Date(props.booking.eventInstance.eventDate).toLocaleDateString('en-US', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                )}
                
                {/* Only show amount if hasTicket is true */}
                {hasTicket && (
                    <div className="mb-4 flex items-center text-foreground/80">
                        <span className="text-pink-600 mr-2">💰</span>
                        <span className="font-sans font-semibold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                            ${props.booking.eventInstance.amount}
                        </span>
                    </div>
                )}
                
                <div className="flex flex-col space-y-3">
                    {isPaid && (
                        <div className={`flex items-center px-3 py-2 rounded-lg ${hasTicket ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                            <span className="mr-2">{hasTicket ? '🎫' : '⏳'}</span>
                            <p className={`text-sm font-sans font-medium ${hasTicket ? 'text-green-700' : 'text-yellow-700'}`}>
                                {hasTicket ? 'Your ticket is ready!' : 'Ticket is being processed...'}
                            </p>
                        </div>
                    )}
                    
                    {/* Only show payment button if hasTicket is true and not paid yet */}
                    {showButton && !isPaid && (
                        <button
                            onClick={() => !props.loading && props.handleBookingPayment(props.booking.id, props.booking.eventInstance.event.id)}
                            className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-sans font-semibold text-white transition-all duration-300 transform ${
                                props.loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-purple-300/50'
                            }`}
                            disabled={props.loading}
                        >
                            {props.loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    💳 Complete Payment
                                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookingPaymentCard
