import React, { useState } from 'react'
import { DeleteEventModal } from '@/interfaces/Events'
import { FaTimes } from 'react-icons/fa'
import { axiosService } from '@/services/axios';
const DeleteEvent: React.FC<DeleteEventModal> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const res = await axiosService.put(`/event/${props.id}`)
            if (res) {
                props.onClose();
            }
        } finally {
            setIsLoading(false)
        }
    }
    if (!props.isOpen) return null
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b border-white/20">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                        Delete Event
                    </h2>
                    <button 
                        onClick={props.onClose} 
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>
                
                <div className='p-6 space-y-6'>
                    <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-6">
                        <h1 className='text-lg text-center text-white/90 font-semibold leading-relaxed'>
                            Are you sure you want to delete this event?
                        </h1>
                        <p className="text-red-300 text-center mt-3 text-sm">
                            ⚠️ This action cannot be undone
                        </p>
                    </div>

                    <button
                        disabled={isLoading}
                        type='submit'
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 
                                 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl 
                                 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25 
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        onClick={handleDelete}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Deleting...
                            </span>
                        ) : (
                            'Delete Event'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteEvent
