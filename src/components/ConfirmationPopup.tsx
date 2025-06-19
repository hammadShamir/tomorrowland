import { axiosService } from "@/services/axios";
import { checkAuth, getUser } from "@/services/helper";
import { ConfirmationPopupProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = (props) => {
    const navigate = useRouter();
    const user = checkAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleBooking = async () => {
        try {
            const data = getUser();
            if (data) {
                const user = JSON.parse(data);
                
                // Check if user is an admin
                if (user.role === 'admin') {
                    setErrorMessage("Admin accounts cannot book events. Please use a customer account.");
                    toast.error("Admin accounts cannot book events");
                    return;
                }
                
                const payload = {
                    customerId: user.id,
                    eventId: props.eventId
                }
                await axiosService.post('/booking', payload)
                props.setShowPopup(false)
                navigate.push('/my-booking')
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("An error occurred while processing your booking");
        }
    }
    return (
        <div className='fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center'>
            <div className="absolute w-full h-full bg-black opacity-80"></div>
            <div className='relative max-w-md md:w-full w-11/12 h-72 bg-white shadow-lg rounded-3xl'>
                <div className='relative h-1/3 w-full bg-secondary rounded-t-3xl flex justify-center'>
                    <Image
                        src={"/confirmation.png"}
                        height={100}
                        width={100}
                        alt="Confirmation"
                    />
                    <button className=" absolute right-4 top-4" onClick={() => props.setShowPopup(false)}>
                        <ImCross className="text-white" />
                    </button>
                </div>
                {
                    user ? (
                        <div className='p-4 space-y-3 md:w-3/4 mx-auto'>
                            <h3 className='text-2xl text-secondary text-center font-bold font-[family-name:var(--font-primary)]'>
                                {errorMessage ? "Cannot Proceed" : "Hang On a Sec!"}
                            </h3>
                            <p className='text-base font-[family-name:var(--font-secondary)] text-center text-gray-500 font-bold leading-tight'>
                                {errorMessage ? errorMessage : "Ready to rock and roll? Confirm Your choice, and let's make some magic happens!"}
                            </p>
                            <div className='flex justify-center items-center gap-x-4'>
                                {!errorMessage && (
                                    <>
                                        <button className='bg-secondary px-4 py-2 rounded text-white font-[family-name:var(--font-secondary)]' onClick={handleBooking}>Count Me In</button>
                                        <button className='bg-accentColor px-4 py-2 rounded font-[family-name:var(--font-secondary)]' onClick={() => props.setShowPopup(false)}>Let Me Rethink</button>
                                    </>
                                )}
                                {errorMessage && (
                                    <button className='bg-accentColor px-4 py-2 rounded font-[family-name:var(--font-secondary)]' onClick={() => props.setShowPopup(false)}>Close</button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='p-4 space-y-3 md:w-3/4 mx-auto'>
                            <h3 className='text-2xl text-secondary text-center font-bold font-[family-name:var(--font-primary)]'>Login Required for this Action</h3>
                            <div className='flex justify-center items-center gap-x-4'>
                                <Link href={'/login'} className='text-center flex-1 bg-secondary px-4 py-2 rounded text-white font-[family-name:var(--font-secondary)]'>Login</Link>
                                <button className='flex-1 bg-accentColor px-4 py-2 rounded font-[family-name:var(--font-secondary)]' onClick={() => props.setShowPopup(false)}>Let Me Rethink</button>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default ConfirmationPopup
