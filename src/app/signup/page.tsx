"use client";
import AuthPage, { AuthMode } from '@/components/AuthPage';

const Page = () => {
    return <AuthPage initialMode={AuthMode.SIGNUP} />;
};

export default Page;
