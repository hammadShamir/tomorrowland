'use client';

import { axiosService } from "@/services/axios";
import { checkAuth, getUser } from "@/services/helper";
import { useEffect, useState, useCallback } from "react";
import { useSafeSearchParams } from "./SearchParamsProvider";

const EmailVerificationToast = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();

  // Get search parameters to detect changes in URL
  const searchParams = useSafeSearchParams();

  const handleSendEmail = async () => {
    try {
      const res = await axiosService.post('/auth/send-verification', { email: userEmail });
      if (res.meta.status === 200) {
        setIsEmailSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update the user data with verified status
  const updateUserVerificationStatus = useCallback(() => {
    const data = getUser();
    if (data) {
      try {
        const user = JSON.parse(data);
        user.emailVerified = true;
        
        // Update the user data in storage
        localStorage.setItem('user', JSON.stringify(user));
        
        // If using cookies, you may need to update the cookie as well
        if (typeof document !== 'undefined') {
          document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${60*60*24}`;
        }
      } catch (error) {
        console.log('Error updating user verification status', error);
      }
    }
  }, []);

  // Function to check verification status from user data
  const checkVerificationStatus = useCallback(() => {
    setIsLoggedIn(!!checkAuth());
    
    const data = getUser();
    if (data) {
      try {
        const user = JSON.parse(data);
        setIsEmailVerified(user.emailVerified);
        setUserEmail(user.email);
      } catch (error) {
        console.log('Error parsing user data', error);
      }
    }
    
    // Check if we've been redirected from an email verification link
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      setIsEmailVerified(true);
      
      // Update user data in localStorage/cookies with verified status
      updateUserVerificationStatus();
    }
  }, [searchParams, updateUserVerificationStatus]);

  useEffect(() => {
    // Check verification status whenever the component mounts
    checkVerificationStatus();
  }, [checkVerificationStatus]);

  // Hide toast if user is logged out or email is verified
  if (!isLoggedIn || isEmailVerified) return null;

  return (
    <div className="w-full bg-secondary bg-opacity-70 text-white p-2 shadow-md z-50">
      {isEmailSent ? (
        <p className="text-center font-[family-name:var(--font-secondary)]">Email sent successfully ✔️</p>
      ) : (
        <div className="flex justify-center gap-x-6 items-center">
          <p className="font-[family-name:var(--font-secondary)]">Please verify your email</p>
          <button 
            onClick={handleSendEmail} 
            className="font-[family-name:var(--font-secondary)] bg-white text-secondary px-2 py-1 rounded font-semibold"
          >
            Send Email
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationToast;
