import React, { useState } from 'react';
import { CreateInstanceConfirmationModal } from '@/interfaces/Events';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const CreateInstanceConfirmation: React.FC<CreateInstanceConfirmationModal> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            await props.onConfirm(props.eventId);
        } finally {
            setIsLoading(false);
            props.onClose();
        }
    };
    
    if (!props.isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b border-white/20">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Create Event Instance
                    </h2>
                    <button 
                        onClick={props.onClose} 
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>
                
                <div className='p-6 space-y-6'>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full">
                            <FaExclamationTriangle className="text-yellow-400 text-4xl" />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
                        <h1 className='text-lg text-center text-white/90 font-semibold leading-relaxed mb-4'>
                            Are you sure you want to create a new instance of this event?
                        </h1>
                        
                        <p className="text-yellow-200/90 text-center text-sm leading-relaxed">
                            This action will clear all previous data and create a new instance of the event. 
                            <span className="block text-yellow-300 font-semibold mt-2">⚠️ This cannot be undone.</span>
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={props.onClose}
                            className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                                     text-white/90 hover:bg-white/30 transition-all duration-200 font-medium"
                        >
                            Cancel
                        </button>
                        
                        <button
                            disabled={isLoading}
                            type='button'
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                                     hover:to-pink-700 text-white rounded-xl flex items-center justify-center gap-2 
                                     font-semibold transition-all duration-200 hover:scale-105 shadow-lg 
                                     hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed 
                                     disabled:hover:scale-100"
                            onClick={handleConfirm}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating...
                                </>
                            ) : (
                                'Create Instance'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateInstanceConfirmation;