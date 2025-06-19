"use client";
import AuthPage, { AuthMode } from '@/components/AuthPage';

const Page = () => {
    return <AuthPage initialMode={AuthMode.LOGIN} />;
};

export default Page;
