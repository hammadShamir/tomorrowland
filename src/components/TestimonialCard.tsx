"use client";
import { IReviewCard } from "@/types";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
const TestimonialCard: React.FC<IReviewCard> = (card) => {
    return (
        <div className='relative max-w-sm mx-auto bg-gradient-to-br from-white to-purple-50 border border-purple-100 min-h-60 p-8 rounded-3xl shadow-2xl z-0 flex justify-center items-center hover:shadow-purple-200/50 transition-all duration-300 group'>
            <div className='bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full absolute left-4 top-[-24px] flex justify-center items-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                <FaQuoteLeft className="!text-white text-sm" />
            </div>
            <div className='bg-gradient-to-r from-pink-500 to-purple-500 w-12 h-12 rounded-full absolute right-4 bottom-[-24px] flex justify-center items-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                <FaQuoteRight className="!text-white text-sm" />
            </div>
            <div className="space-y-4">
                <div className="flex items-center gap-x-4">
                    <div className="relative">
                        <Image
                            className="rounded-full border-3 border-purple-200 shadow-lg"
                            src={card.img}
                            alt="Avatar"
                            width={50}
                            height={50}
                        />
                    </div>
                    <div>
                        <h3 className="text-bold text-lg font-sans font-semibold text-gray-800">{card.name}</h3>
                        <p className="text-sm font-sans text-purple-600 font-medium">📍 {card.title}</p>
                    </div>
                </div>
                <p className="font-sans text-base text-gray-700 leading-relaxed italic">
                    &quot;{card.des}&quot;
                </p>
                <div className="flex justify-center">
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg">⭐</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard
