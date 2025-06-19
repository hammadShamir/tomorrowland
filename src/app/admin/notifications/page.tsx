'use client';
import { axiosService } from '@/services/axios';
import { useEffect, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { IEvents } from '@/interfaces/Events';
import { AxiosError } from 'axios';
import axios from 'axios';

interface EmailResponse {
  totalCustomers: number;
  successCount: number;
  failedCount: number;
  failedEmails: string[];
}

interface ApiErrorResponse {
  message: string;
  data?: Record<string, unknown>;
}

const EmailNotificationsPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [eventInstanceId, setEventInstanceId] = useState<number | undefined>(undefined);
  const [sendToAll, setSendToAll] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<IEvents[]>([]);
  const [dataLoad, setDataLoad] = useState(true);
  const [response, setResponse] = useState<EmailResponse | null>(null);
  const [testEmailAddress, setTestEmailAddress] = useState('');

  // Fetch events for the dropdown
  const fetchEvents = async () => {
    try {
      setDataLoad(true);
      const response = await axiosService.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events. Please refresh the page.');
    } finally {
      setDataLoad(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Custom axios call for test email without toast.promise
  const sendTestEmailWithoutToast = async (payload: {
    title: string;
    message: string;
    imageUrl?: string;
    eventInstanceId?: number;
    sendToAll: boolean;
    testEmailAddress?: string;
  }) => {
    const token = localStorage.getItem('token') || 
                  (typeof document !== 'undefined' ? 
                   document.cookie.split('token=')[1]?.split(';')[0] : '');
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    
    const response = await axios.post(`${baseURL}/admin/send-test-email`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  };

  // Custom axios call without toast.promise to avoid duplicate messages
  const sendEmailWithoutToast = async (payload: {
    title: string;
    message: string;
    imageUrl?: string;
    eventInstanceId?: number;
    sendToAll: boolean;
  }) => {
    const token = localStorage.getItem('token') || 
                  (typeof document !== 'undefined' ? 
                   document.cookie.split('token=')[1]?.split(';')[0] : '');
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    
    const response = await axios.post(`${baseURL}/admin/send-custom-email`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response;
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title.trim()) {
      toast.error('Email title is required');
      return;
    }
    
    if (!message.trim()) {
      toast.error('Email message is required');
      return;
    }
    
    if (!sendToAll && !eventInstanceId) {
      toast.error('Please select an event when not sending to all customers');
      return;
    }

    try {
      setIsLoading(true);
      
      const payload = {
        title,
        message,
        imageUrl: imageUrl.trim() || undefined,
        eventInstanceId: !sendToAll ? eventInstanceId : undefined,
        sendToAll
      };
      
      const response = await sendEmailWithoutToast(payload);
      
      setResponse(response.data.data);
      
      // Reset form after successful submission
      setTitle('');
      setMessage('');
      setImageUrl('');
      setEventInstanceId(undefined);
      setSendToAll(true);
      
    } catch (error: unknown) {
      console.error('Error sending emails:', error);
      const axiosError = error as AxiosError<ApiErrorResponse>;
      toast.error(
        axiosError.response?.data?.message || 
        'Failed to send emails. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Removed handlePreviewEmail function

  const handleSendTestEmail = async () => {
    // Form validation
    if (!title.trim()) {
      toast.error('Email title is required');
      return;
    }
    
    if (!message.trim()) {
      toast.error('Email message is required');
      return;
    }

    try {
      setIsLoading(true);
      
      const payload = {
        title,
        message,
        imageUrl: imageUrl.trim() || undefined,
        eventInstanceId: !sendToAll ? eventInstanceId : undefined,
        sendToAll,
        testEmailAddress: testEmailAddress.trim() || undefined
      };
      
      await sendTestEmailWithoutToast(payload);
      // Backend handles success message - no frontend toast needed
      
    } catch (error: unknown) {
      console.error('Error sending test email:', error);
      const axiosError = error as AxiosError<ApiErrorResponse>;
      toast.error(
        axiosError.response?.data?.message || 
        'Failed to send test email. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Removed togglePreviewMode function

  // Removed getSelectedEventName function as it's no longer needed

  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Email Notifications
        </h1>
        <p className="text-white/80">Create and send custom email notifications to your customers</p>
      </div>
      
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white/90 mb-2">Email Composer</h2>
          <p className="text-white/70">Design beautiful email notifications with custom content and targeting</p>
        </div>
        
        <form onSubmit={handleSendEmail} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white/90 mb-2">
              Email Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                       text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                       focus:border-purple-400/50 transition-all duration-300"
              placeholder="Enter email title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
              Email Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                       text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                       focus:border-purple-400/50 transition-all duration-300 resize-none"
              placeholder="Enter your message here..."
              required
            />
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-white/90 mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                       text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                       focus:border-purple-400/50 transition-all duration-300"
              placeholder="https://example.com/image.jpg"
            />
            <p className="mt-2 text-sm text-white/60">Add an image to your email by providing a public URL</p>
          </div>
          
          <div>
            <fieldset className="space-y-4">
              <legend className="block text-sm font-medium text-white/90 mb-3">
                Recipients
              </legend>
              <div className="space-y-3">
                <label className="flex items-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="recipients"
                    checked={sendToAll}
                    onChange={() => setSendToAll(true)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/20 border-white/30"
                  />
                  <span className="ml-3 text-white/90">Send to all customers</span>
                </label>
                
                <label className="flex items-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="recipients"
                    checked={!sendToAll}
                    onChange={() => setSendToAll(false)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/20 border-white/30"
                  />
                  <span className="ml-3 text-white/90">Send only to customers with bookings for a specific event</span>
                </label>
              </div>
            </fieldset>
          </div>
          
          {!sendToAll && (
            <div>
              <label htmlFor="eventInstanceId" className="block text-sm font-medium text-white/90 mb-2">
                Select Event *
              </label>
              <select
                id="eventInstanceId"
                value={eventInstanceId || ''}
                onChange={(e) => setEventInstanceId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                         text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                         focus:border-purple-400/50 transition-all duration-300"
                required={!sendToAll}
              >
                <option value="" className="bg-gray-800 text-white">-- Select an event --</option>
                {events.map((event) => (
                  event.eventInstances && event.eventInstances.length > 0 && (
                    <optgroup key={event.id} label={event.title} className="bg-gray-800">
                      {event.eventInstances.map(instance => (
                        <option key={instance.id} value={instance.id} className="bg-gray-800 text-white">
                          {event.title} - {instance.eventDate ? new Date(instance.eventDate).toLocaleDateString() : 'No date'} (${instance.amount})
                        </option>
                      ))}
                    </optgroup>
                  )
                ))}
              </select>
              {dataLoad && (
                <p className="mt-2 text-sm text-white/60">Loading events...</p>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleSendTestEmail}
              disabled={isLoading}
              type="button"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 
                       hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 
                       hover:scale-105 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 
                       disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Sending...' : '📧 Send Test Email'}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                       hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 
                       hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 
                       disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Sending...' : '🚀 Send Email'}
            </button>
          </div>
        </form>
      </div>

      {/* Test Email Section */}
      <div className="backdrop-blur-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl p-8 shadow-xl mb-8">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold text-white/90">Email Testing</h2>
          <span className="ml-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs px-3 py-1 rounded-full font-medium">
            TESTING TOOLS
          </span>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-yellow-200 mb-3 flex items-center">
            📧 Testing Options Available:
          </h3>
          <ul className="text-sm text-yellow-100/90 space-y-2">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span><strong>Send Test Email:</strong> Send actual test email to verify formatting and delivery</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>Test emails use sample data (recipient name: &quot;Test Recipient&quot;)</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>Test email subjects are prefixed with &quot;[TEST]&quot;</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="testEmailInput" className="block text-sm font-medium text-white/90 mb-2">
              Test Email Recipient (Optional)
            </label>
            <input
              type="email"
              id="testEmailInput"
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl 
                       text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 
                       focus:border-yellow-400/50 transition-all duration-300"
              placeholder="Enter email for testing (leave empty to use admin email)"
            />
            <p className="mt-2 text-xs text-white/60">
              Leave empty to send test email to admin&apos;s email address
            </p>
          </div>
          
          <button
            onClick={handleSendTestEmail}
            disabled={isLoading || !title.trim() || !message.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 
                     hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 
                     hover:scale-105 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 
                     disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? 'Sending...' : '📨 Send Test Email'}
          </button>
        </div>
      </div>

      {response && (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-white/90">
            <FaInfoCircle className="mr-3 text-purple-400" />
            Email Delivery Report
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 p-6 rounded-xl">
              <p className="text-sm text-blue-200/80 mb-2">Total Recipients</p>
              <p className="text-3xl font-bold text-white">{response.totalCustomers}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 p-6 rounded-xl">
              <p className="text-sm text-green-200/80 mb-2">Successfully Delivered</p>
              <p className="text-3xl font-bold text-green-300">{response.successCount}</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 p-6 rounded-xl">
              <p className="text-sm text-red-200/80 mb-2">Failed Deliveries</p>
              <p className="text-3xl font-bold text-red-300">{response.failedCount}</p>
            </div>
          </div>
          
          {response.failedEmails.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Failed Email Addresses:</h3>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl max-h-60 overflow-y-auto">
                <ul className="space-y-2">
                  {response.failedEmails.map((email, index) => (
                    <li key={index} className="text-red-300 bg-red-500/10 px-3 py-2 rounded-lg border border-red-400/30">
                      {email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default EmailNotificationsPage;