"use client";
import { IFAQs } from "@/types";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Accordion: React.FC<IFAQs> = (faqs: IFAQs) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className={`${isOpen ? "mb-2" : "mb-4"} bg-gradient-to-r from-white to-purple-50 border border-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
            <div className="flex justify-between items-start p-6 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
                <h3 className="text-gray-800 font-sans text-base md:text-lg font-semibold pr-4 group-hover:text-purple-700 transition-colors leading-relaxed">
                    {faqs.question}
                </h3>
                <button className="flex-shrink-0 p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover:from-pink-500 group-hover:to-purple-500">
                    {
                        !isOpen ? <IoIosArrowDown className="text-lg" /> : <IoIosArrowUp className="text-lg" />
                    }
                </button>
            </div>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 pb-6 border-t border-purple-100/50">
                    <p className="max-w-screen-lg font-sans text-base text-gray-700 leading-relaxed mt-4">
                        {faqs.answer}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Accordion
