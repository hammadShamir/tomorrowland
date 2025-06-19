import { IReleaseUsers, sendCredentials } from '@/interfaces/admin'
import { FaTimes } from 'react-icons/fa'

interface CredentialsModalProps {
  isOpen: boolean
  onClose: () => void
  onRelease: (payload: sendCredentials) => void
  user: IReleaseUsers
  isLoading: boolean
}

export default function CredentialsModal({ isOpen, onClose, onRelease, user, isLoading }: CredentialsModalProps) {
  if (!isOpen || !user) return null
  const payload: sendCredentials = {
    id: user.userId,
    customerName: user.customerFullName,
    customerEmail: user.customerEmail,
    email: user.userEmail,
    password: user.userPassword,
    eventName: user.eventName,
    eventInstanceId: user.eventInstanceId,
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white/90">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {payload.customerName}&apos;s Credentials
            </span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-medium">Username:</span>
                <span className="text-white/90 font-mono bg-white/10 px-3 py-1 rounded-lg">
                  {payload.email}
                </span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80 font-medium">Password:</span>
                <span className="text-white/90 font-mono bg-white/10 px-3 py-1 rounded-lg">
                  {payload.password}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-white/20">
          <button
            disabled={isLoading}
            onClick={() => onRelease(payload)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                     hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl 
                     transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25 
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Releasing...
              </span>
            ) : (
              'Release Credentials'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

