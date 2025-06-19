"use client";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { axiosService } from '@/services/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IEvents } from '@/interfaces/Events';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { IBidData } from '@/interfaces/bids';
import { checkAuth } from '@/services/helper';
import Whatsapp from '@/components/Whatsapp';

const Page = () => {
    const isInitialRender = useRef(true);
    const navigate = useRouter();
    const [events, setEvents] = useState<IEvents[]>();
    const [bids, setBids] = useState<IBidData[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [filterBids, setFilterBids] = useState<IBidData[]>();
    const [dataLoad, setDataLoad] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            eventId: undefined,
            eventName: '',
            eventDes: '',
            amount: undefined,
        },
        validationSchema: Yup.object({
            eventId: Yup.number().required('Event Required'),
            amount: Yup.number().required('Amount Required'),
        }),
        onSubmit: async (values) => {
            if (!checkAuth()) {
                toast.error("Please login to place a bid");
            } else {
                setLoading(true);
                try {
                    const res = await axiosService.post('/pay', values);
                    navigate.push(res.data);
                } finally {
                    setLoading(false);
                }
            }
        },
    });

    const initialize = useCallback(async () => {
        try {
            setDataLoad(true)
            const eventsResponse = await axiosService.get('/events');
            const bidsResponse = await axiosService.get('/get-bids');
            let fetchedEvents = eventsResponse.data;
            const fetchedBids = bidsResponse.data;

            // Sort events by date (closest to furthest)
            fetchedEvents = fetchedEvents.sort((a: IEvents, b: IEvents) => {
                const dateA = new Date(a.eventDateTime);
                const dateB = new Date(b.eventDateTime);
                const today = new Date();
                
                // Filter out past events
                const diffA = dateA.getTime() - today.getTime();
                const diffB = dateB.getTime() - today.getTime();
                
                // If both events are in the future, sort by closest date
                if (diffA > 0 && diffB > 0) {
                    return diffA - diffB;
                } 
                // If only one event is in the future, prioritize it
                else if (diffA > 0) {
                    return -1;
                } else if (diffB > 0) {
                    return 1;
                } 
                // If both are in the past, sort by closest to today
                else {
                    return Math.abs(diffA) - Math.abs(diffB);
                }
            });

            setEvents(fetchedEvents);
            setBids(fetchedBids);

            if (fetchedEvents.length > 0) {
                // Check if an event ID is specified in the URL
                const searchParams = new URLSearchParams(window.location.search);
                const eventIdFromUrl = searchParams.get("eventId");
                
                let defaultEvent = fetchedEvents[0]; // Default to first event
                
                // If eventId is in URL and exists in fetchedEvents, use it
                if (eventIdFromUrl) {
                    const eventIdNumber = Number(eventIdFromUrl);
                    const eventFromUrl = fetchedEvents.find((event: IEvents) => event.id === eventIdNumber);
                    if (eventFromUrl) {
                        defaultEvent = eventFromUrl;
                    }
                }
                
                formik.setFieldValue('eventId', defaultEvent.id);
                formik.setFieldValue('eventName', defaultEvent.title);
                formik.setFieldValue('eventDes', defaultEvent.description);

                // Filter bids by matching event title with eventInstance.event.title
                const filtered = fetchedBids.filter((bid: IBidData) => 
                    bid.eventInstance.event.title === defaultEvent.title);
                setFilterBids(filtered);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDataLoad(false)
        }
    }, [formik]);

    // Formik event handler for select change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEventId = Number(e.target.value);

        // Find the selected event details
        const selectedEvent = events?.find((event) => event.id === selectedEventId);
        if (selectedEvent) {
            formik.setFieldValue('eventId', selectedEvent.id);
            formik.setFieldValue('eventName', selectedEvent.title);
            formik.setFieldValue('eventDes', selectedEvent.description);

            // Filter bids by matching event title with eventInstance.event.title
            const filtered = bids?.filter((bid: IBidData) => 
                bid.eventInstance.event.title === selectedEvent.title);
            setFilterBids(filtered);
            
            // Update URL with the selected event ID while preserving other parameters
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('eventId', selectedEventId.toString());
            
            // Replace the current URL without causing a page reload
            const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.replaceState(null, "", newUrl);
        }
    };

    const checkForMessage = useCallback(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const messageParam = searchParams.get("message");
        if (messageParam) {
            toast.success(messageParam);
            
            // Remove only the message parameter, preserve others including eventId
            searchParams.delete("message");
            const newUrl = searchParams.toString()
                ? `${window.location.pathname}?${searchParams.toString()}`
                : window.location.pathname;

            window.history.replaceState(null, "", newUrl);
        }
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            initialize();
            checkForMessage();
            isInitialRender.current = false;
        }
    }, [initialize, checkForMessage]);

    return (
        <>
            <Header />
            <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-blue-900/10 relative overflow-hidden mt-20">
                {/* Decorative background elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-pulse delay-300"></div>
                
                {dataLoad ? (
                    <div className="flex justify-center items-center h-64 relative z-10">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent mx-auto"></div>
                            <p className="text-center mt-4 text-foreground/70 font-sans">Loading events...</p>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold font-serif text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4">
                                🎫 Get Your Tickets First!
                            </h1>
                            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                                Place your bid to secure priority access to the hottest events. The highest bidders get first access when tickets go live!
                            </p>
                        </div>
                        
                        {/* Event selection and bid form */}
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-white/30 hover:shadow-purple-300/50 transition-all duration-300">
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    {/* Event selection */}
                                    <div className="md:col-span-5 space-y-2">
                                        <label htmlFor="eventId" className="block text-sm font-semibold text-foreground/80 font-sans">
                                            🎪 Select Event
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="eventId"
                                                name="eventId"
                                                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-3 rounded-xl w-full appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 font-sans"
                                                onChange={handleSelectChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.eventId || ""}
                                            >
                                                {events?.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.title}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-600">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="h-5">
                                            {formik.touched.eventId && formik.errors.eventId ? (
                                                <div className="text-red-500 text-xs font-sans">{formik.errors.eventId}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* Bid amount */}
                                    <div className="md:col-span-5 space-y-2">
                                        <label htmlFor="amount" className="block text-sm font-semibold text-foreground/80 font-sans">
                                            💰 Your Bid Amount
                                        </label>
                                        <input
                                            id="amount"
                                            type="number"
                                            name="amount"
                                            required
                                            className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 font-sans"
                                            placeholder="Enter Amount ($)"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.amount !== undefined ? formik.values.amount : ""}
                                        />
                                        <div className="h-5">
                                            {formik.touched.amount && formik.errors.amount ? (
                                                <div className="text-red-500 text-xs font-sans">{formik.errors.amount}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* Submit button */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-sm font-medium text-foreground/80 invisible">
                                            Submit
                                        </label>
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl font-sans font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Bidding
                                                </span>
                                            ) : "⚡ Place Bid"}
                                        </button>
                                        <div className="h-5"></div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Bids leaderboard */}
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/30 hover:shadow-purple-300/50 transition-all duration-300">
                            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                <h2 className="text-xl font-bold font-serif flex items-center">
                                    🏆 Current Bids Leaderboard
                                </h2>
                                <p className="text-purple-100 text-sm font-sans mt-1">Top bidders get priority access to tickets</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-purple-50 to-pink-50 text-foreground">
                                        <tr>
                                            <th className="py-4 px-4 text-center font-semibold font-sans w-1/4">🥇 Ranking</th>
                                            <th className="py-4 px-4 text-center font-semibold font-sans w-1/2">👤 Name</th>
                                            <th className="py-4 px-4 text-center font-semibold font-sans w-1/4">💰 Bid Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterBids && filterBids.length > 0 ? (
                                            filterBids.map((bid, index) => (
                                                <tr key={index} className="border-t border-purple-100 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300">
                                                    <td className="py-4 px-4 text-center">
                                                        <span className={`inline-flex items-center justify-center h-10 w-10 rounded-full font-bold text-lg ${
                                                            index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg' : 
                                                            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg' : 
                                                            index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg' : 
                                                            'bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800'
                                                        }`}>
                                                            {index + 1}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-center font-semibold text-foreground font-sans">{bid.customer.nickName}</td>
                                                    <td className="py-4 px-4 text-center font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg">${bid.amount}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="text-center py-12 text-foreground/60">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4 opacity-50">
                                                            <span className="text-3xl">🎪</span>
                                                        </div>
                                                        <p className="text-lg font-semibold font-sans">No bids yet for this event</p>
                                                        <p className="text-sm text-foreground/50 font-sans mt-1">Be the first to place a bid and secure your priority access!</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
            <Whatsapp />
        </>
    );
};

export default Page;
