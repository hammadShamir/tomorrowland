"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { axiosService } from '@/services/axios';

const Page = () => {
    const isInitialRender = useRef(true);
    const navigate = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            verificationToken: ''
        },
        validationSchema: Yup.object({
            verificationToken: Yup.string()
                .required('Token Required'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(20, 'Must be 20 characters or less')
                .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Must contain at least one number')
                .matches(/[^\w\s]/, 'Must contain at least one special character (e.g., ., !, @, #, $, etc.)')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await axiosService.put('/reset-password', values)
                if (res.meta.status === 200) {
                    navigate.push('/login');
                }
            } finally {
                setLoading(false);
            }
        },
    });

    const checkForMessage = useCallback(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const message = searchParams.get("token");
        if (message) {
            formik.setFieldValue("verificationToken", message);
            searchParams.delete("token");
            const newUrl = searchParams.toString()
                ? `${window.location.pathname}?${searchParams.toString()}`
                : window.location.pathname;

            window.history.replaceState(null, "", newUrl);
        }
    }, [formik]);

    useEffect(() => {
        if (isInitialRender.current) {
            checkForMessage();
            isInitialRender.current = false;
        }
    }, [checkForMessage]);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/15 pointer-events-none z-0"></div>
            <main className="relative w-full min-h-screen flex flex-col md:flex-row justify-center items-center bg-background">
                <div className="flex-1 h-screen relative overflow-hidden">
                    <Image
                        src={'/signin-signup.jpg'}
                        alt="Sign In Sign Up Image"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
                </div>
                <div className="flex-1 h-screen bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 backdrop-blur-sm flex justify-center items-center relative z-10">
                    <form onSubmit={formik.handleSubmit} className="bg-white/80 backdrop-blur-md border border-white/30 shadow-2xl md:max-w-lg w-11/12 md:w-10/12 flex flex-col justify-center items-center py-8 px-6 gap-y-6 rounded-2xl hover:shadow-purple-300/50 transition-all duration-300">
                        <div className="text-center mb-2">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔐</span>
                            </div>
                            <h1 className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold font-serif">Update Password</h1>
                            <p className="text-foreground/70 mt-2 font-sans">Create a new secure password for your account</p>
                        </div>
                        
                        <div className='md:max-w-md w-full'>
                            <input
                                type="password"
                                name="password"
                                required
                                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-3 md:p-4 rounded-xl w-full font-sans placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                placeholder='New Password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className='text-red-500 text-sm mt-1'>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        
                        <div className='md:max-w-md w-full'>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-3 md:p-4 rounded-xl w-full font-sans placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                placeholder='Confirm New Password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className='text-red-500 text-sm mt-1'>{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                        
                        <div className='md:max-w-md w-full'>
                            {formik.touched.verificationToken && formik.errors.verificationToken ? (
                                <div className='text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3'>
                                    {formik.errors.verificationToken}
                                </div>
                            ) : null}
                        </div>
                        
                        <button type='submit' className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-3 rounded-xl font-sans text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50 w-full md:w-auto' disabled={loading}>
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </span>
                            ) : 'Update Password'}
                        </button>
                        
                        <p className="text-sm md:text-base text-center text-foreground/70 font-sans">
                            Remember your password?{' '}
                            <Link href="/login" className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold hover:underline transition-all duration-300">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Page;
