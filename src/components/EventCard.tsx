"use client";
import { ICard } from '@/types'
import React, { useState } from 'react'
import ConfirmationPopup from './ConfirmationPopup';

const EventCard: React.FC<ICard> = (card: ICard) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className='flex justify-center items-center cursor-pointer max-h-96 md:max-w-96 h-60 md:h-72 w-full'>
            <div
                className='w-full relative h-full rounded-2xl bg-no-repeat bg-cover bg-center overflow-hidden group shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 border border-purple-100/20'
                style={{
                    backgroundImage:
                        `url('${card.bgImg}')`,
                }}
            >
                <div className="relative top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-500 flex items-center justify-center flex-col gap-5 px-4">
                    <h2 className="font-[family-name:var(--font-primary)] font-bold text-xl md:text-2xl text-white text-center drop-shadow-lg">
                        {card.title}
                    </h2>
                    <h6 className="font-[family-name:var(--font-secondary)] text-center text-base font-normal text-white/90 line-clamp-3 drop-shadow-md">
                        {card.para}
                    </h6>
                    {
                        card.eventDate !== null ? (
                            <button 
                                onClick={() => setIsOpen(true)} 
                                className='font-[family-name:var(--font-secondary)] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 !text-white font-bold px-8 py-3 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300 border border-white/20 backdrop-blur-sm'
                            >
                                🎫 Book Now
                            </button>
                        ) : (
                            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30 shadow-lg">
                                <h2 className="font-[family-name:var(--font-primary)] text-lg md:text-xl text-white font-medium drop-shadow-md">
                                    🔜 Coming Soon
                                </h2>
                            </div>
                        )
                    }
                </div>

                {/* Background image with zoom effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 transform group-hover:scale-110"
                    style={{
                        backgroundImage:
                            `url('${card.bgImg}')`,
                    }}
                ></div>
            </div>
            {
                isOpen && <ConfirmationPopup setShowPopup={setIsOpen} eventId={card.eventId} />
            }
        </div>
    )
}

export default EventCard
