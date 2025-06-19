'use client';
import AddEventModal from '@/components/admin/Modals/addEvent';
import DeleteEvent from '@/components/admin/Modals/DeleteEvent';
import EditEventModal from '@/components/admin/Modals/EditEvent';
import CreateInstanceConfirmation from '@/components/admin/Modals/CreateInstanceConfirmation';
import { IEvents } from '@/interfaces/Events';
import { axiosService } from '@/services/axios';
import { formatDate } from '@/services/helper';
import { useEffect, useState } from 'react';
import { FaSearch, FaTrash, FaEdit, FaSync } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataLoad, setDataLoad] = useState<boolean>(false);
    const [events, setEvents] = useState<IEvents[]>([]);
    const [editEvent, setEditEvent] = useState<IEvents>();
    const [deleteEventId, setDeleteEventId] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [creatingInstance, setCreatingInstance] = useState<number | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    
    const init = async () => {
        try {
            setDataLoad(true);
            const response = await axiosService.get(`/events`)
            setEvents(response.data);
        } finally {
            setDataLoad(false);
        }
    }
    
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsEditModalOpen(false);
        setIsConfirmModalOpen(false);
        init();
    };
    
    const handleDeleteModal = (id: number) => {
        setDeleteEventId(id);
        setIsDeleteModalOpen(true)
    }
    
    const handleEditModal = (event: IEvents) => {
        setIsEditModalOpen(true)
        setEditEvent(event)
    }
    
    const openConfirmModal = (eventId: number) => {
        setSelectedEventId(eventId);
        setIsConfirmModalOpen(true);
    }
    
    const handleCreateInstance = async (eventId: number) => {
        try {
            setCreatingInstance(eventId);
            await axiosService.post(`/event/${eventId}/create-instance`);
            init(); // Refresh the event list
        } catch (error) {
            console.error('Error creating event instance:', error);
            toast.error('Failed to create event instance. Please try again.');
        } finally {
            setCreatingInstance(null);
        }
    }
    
    useEffect(() => {
        init();
    }, []);
    
    return (
        <section className="space-y-6">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-serif text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2">
                    🎪 Event Management
                </h1>
                <p className="text-foreground/70 font-sans">Create, edit, and manage your events and instances</p>
            </div>

            {/* Search and Add Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            placeholder="Search events by name..."
                            className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 font-sans"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                    </div>
                    <button 
                        onClick={openModal} 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50 flex items-center gap-2"
                    >
                        <span>➕</span> Add New Event
                    </button>
                </div>
            </div>

            {dataLoad ? (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-12 border border-white/30 text-center">
                    <div className="flex flex-col items-center gap-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gradient-to-r from-purple-600 to-pink-600 border-t-transparent"></div>
                        <span className="text-foreground font-sans font-semibold">Loading events...</span>
                    </div>
                </div>
            ) : (
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/30">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold font-sans">Event Name</th>
                                    <th className="px-6 py-4 text-left font-bold font-sans">Description</th>
                                    <th className="px-6 py-4 text-left font-bold font-sans">Event Date</th>
                                    <th className="px-6 py-4 text-left font-bold font-sans">Instance ID</th>
                                    <th className="px-6 py-4 text-left font-bold font-sans">Amount</th>
                                    <th className="px-6 py-4 text-left font-bold font-sans">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-100">
                                {events.map((event, index) => (
                                    <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300">
                                        <td className="px-6 py-4 text-foreground font-semibold font-sans">{event.title}</td>
                                        <td className="px-6 py-4 text-foreground/80 font-sans max-w-xs truncate">{event.description}</td>
                                        <td className="px-6 py-4 text-foreground font-sans">
                                            {event.eventDateTime ? 
                                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    {formatDate(event.eventDateTime.toString())}
                                                </span> : 
                                                <span className="text-gray-400">Not set</span>
                                            }
                                        </td>
                                        <td className="px-6 py-4 text-foreground font-sans">
                                            {event.eventInstances && event.eventInstances.length > 0 ? (
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    #{event.eventInstances[0].id}
                                                </span>
                                            ) : (
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                                    No Instance
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-foreground font-sans">
                                            <span className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                                                ${event.amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                    onClick={() => handleDeleteModal(event.id)}
                                                    title="Delete Event"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                    onClick={() => handleEditModal(event)}
                                                    title="Edit Event"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={() => openConfirmModal(event.id)}
                                                    disabled={creatingInstance === event.id}
                                                    title="Create New Instance"
                                                >
                                                    {creatingInstance === event.id ? (
                                                        <span className="inline-block animate-spin">⌛</span>
                                                    ) : (
                                                        <FaSync />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Modals */}
                    <AddEventModal isOpen={isModalOpen} onClose={closeModal} />
                    {isEditModalOpen && editEvent && (
                        <EditEventModal isOpen={isEditModalOpen} onClose={closeModal} events={editEvent} />
                    )}
                    {isDeleteModalOpen && deleteEventId && (
                        <DeleteEvent id={deleteEventId} isOpen={isDeleteModalOpen} onClose={closeModal} />
                    )}
                    {isConfirmModalOpen && selectedEventId && (
                        <CreateInstanceConfirmation 
                            eventId={selectedEventId} 
                            isOpen={isConfirmModalOpen} 
                            onClose={() => setIsConfirmModalOpen(false)} 
                            onConfirm={handleCreateInstance}
                        />
                    )}
                </div>
            )}
        </section>
    )
}
export default Page