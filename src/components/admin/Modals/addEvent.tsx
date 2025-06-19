import React, { useState } from 'react';
import { AddEventsModal } from '@/interfaces/Events';
import { FaTimes } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosService } from '@/services/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddEventModal: React.FC<AddEventsModal> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            bgImg: '',
            eventDateTime: new Date(),
            amount: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(4, 'Minimum 4 characters required')
                .required('Required'),
            description: Yup.string()
                .min(4, 'Minimum 4 characters required')
                .required('Required'),
            bgImg: Yup.string().optional(),
            eventDateTime: Yup.date().nullable().optional(),
            amount: Yup.number().required('Required'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await axiosService.post('/events', values);
                props.onClose();
            } finally {
                setIsLoading(false);
            }
        },
    });

    if (!props.isOpen) return null;

    return (
        <div className=" bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg">
                <div className="flex justify-between items-center p-6 border-b border-white/20">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Add New Event
                    </h2>
                    <button 
                        onClick={props.onClose} 
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>
                
                <form onSubmit={formik.handleSubmit} className='p-6 space-y-6 max-h-96 overflow-y-auto'>
                    <div className='space-y-2'>
                        <label htmlFor="title" className="block text-sm font-medium text-white/90">
                            Event Name *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name='title'
                            className='w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                                     text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                                     focus:border-purple-400/50 transition-all duration-300'
                            placeholder="Enter event name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title && (
                            <div className='text-red-300 text-sm mt-1'>{formik.errors.title}</div>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="eventDateTime" className="block text-sm font-medium text-white/90">
                            Event Date & Time
                        </label>
                        <div className='w-full'>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    formik.setFieldValue('eventDateTime', date);
                                }}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                className='w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                                         text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                                         focus:border-purple-400/50 transition-all duration-300'
                                placeholderText="Select date and time"
                            />
                            {formik.touched.eventDateTime && formik.errors.eventDateTime && (
                                <div className='text-red-300 text-sm mt-1'>{String(formik.errors.eventDateTime)}</div>
                            )}
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="bgImg" className="block text-sm font-medium text-white/90">
                            Event Image URL
                        </label>
                        <input
                            type="text"
                            id='bgImg'
                            name='bgImg'
                            className='w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                                     text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                                     focus:border-purple-400/50 transition-all duration-300'
                            placeholder="https://example.com/image.jpg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bgImg}
                        />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="amount" className="block text-sm font-medium text-white/90">
                            Ticket Price *
                        </label>
                        <input
                            type="number"
                            id='amount'
                            name='amount'
                            className='w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                                     text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                                     focus:border-purple-400/50 transition-all duration-300'
                            placeholder="Enter ticket price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amount}
                        />
                        {formik.touched.amount && formik.errors.amount && (
                            <div className='text-red-300 text-sm mt-1'>{formik.errors.amount}</div>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="description" className="block text-sm font-medium text-white/90">
                            Event Description *
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            className='w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                                     text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                                     focus:border-purple-400/50 transition-all duration-300 resize-none'
                            placeholder="Enter event description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        ></textarea>
                        {formik.touched.description && formik.errors.description && (
                            <div className='text-red-300 text-sm mt-1'>{formik.errors.description}</div>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={isLoading}
                            type='submit'
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                                     hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl 
                                     transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25 
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating...
                                </span>
                            ) : (
                                'Create Event'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;
