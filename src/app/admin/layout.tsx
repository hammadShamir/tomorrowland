'use client';
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/Sidebar'
import { Toaster } from 'react-hot-toast';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-blue-900/10 min-h-screen">
                {/* Decorative background elements */}
                <div className="fixed top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse pointer-events-none"></div>
                <div className="fixed bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-pulse delay-300 pointer-events-none"></div>
                
                <Toaster 
                    position="top-right" 
                    toastOptions={{
                        // Increased duration for all toasts
                        duration: 6000,
                        // Base style for all toasts
                        style: {
                            background: 'rgba(255, 255, 255, 0.95)', 
                            color: '#17121c', 
                            padding: '16px',
                            borderRadius: '12px',
                            fontWeight: '500',
                            fontSize: '16px',
                            boxShadow: '0 4px 15px rgba(139, 69, 19, 0.1)', 
                            maxWidth: '400px',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(139, 69, 19, 0.2)',
                        },
                        // Success toast styling
                        success: {
                            iconTheme: {
                                primary: '#10b981', 
                                secondary: '#ffffff', 
                            },
                            style: {
                                borderLeft: '6px solid #10b981', 
                                background: 'rgba(240, 253, 244, 0.95)',
                            },
                        },
                        // Error toast styling
                        error: {
                            duration: 8000,
                            iconTheme: {
                                primary: '#ef4444', 
                                secondary: '#ffffff', 
                            },
                            style: {
                                background: 'rgba(254, 242, 242, 0.98)', 
                                borderLeft: '6px solid #ef4444', 
                                color: '#17121c', 
                                padding: '18px 20px',
                                fontSize: '17px',
                                fontWeight: '600',
                                maxWidth: '450px',
                                boxShadow: '0 8px 20px rgba(239, 68, 68, 0.15)',
                            },
                        },
                    }}
                />
                <Sidebar />
                <div className="md:ml-64">
                    <Header />
                    <main className='p-4 md:p-6 min-h-screen'>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
}

export default layout