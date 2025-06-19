"use client";
import { axiosService } from '@/services/axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const Page = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await axiosService.post('/forgot-password', values)
                if (res.meta.status === 200) {
                    setSuccess(true);
                }
            } finally {
                setLoading(false);
            }
        },
    });

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
                    {success ? (
                        <div className="bg-white/80 backdrop-blur-md border border-white/30 shadow-2xl md:max-w-lg w-11/12 md:w-10/12 flex flex-col justify-center items-center py-8 px-6 gap-y-6 rounded-2xl hover:shadow-purple-300/50 transition-all duration-300 text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-2">
                                <span className="text-3xl">📧</span>
                            </div>
                            <h1 className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold font-serif">Email Sent!</h1>
                            <p className="text-foreground/70 text-base font-sans leading-relaxed">
                                We&apos;ve sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
                            </p>
                            <Link href="/login" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-sans text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50">
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className="bg-white/80 backdrop-blur-md border border-white/30 shadow-2xl md:max-w-lg w-11/12 md:w-10/12 flex flex-col justify-center items-center py-8 px-6 gap-y-6 rounded-2xl hover:shadow-purple-300/50 transition-all duration-300">
                            <div className="text-center mb-2">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔑</span>
                                </div>
                                <h1 className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold font-serif">Forgot Password?</h1>
                                <p className="text-foreground/70 text-base text-center font-sans mt-4 leading-relaxed">
                                    Enter your email address and we&apos;ll send you a link to reset your password.
                                </p>
                            </div>
                            
                            <div className='md:max-w-md w-full'>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-3 md:p-4 rounded-xl w-full font-sans placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    placeholder='Email Address'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-red-500 text-sm mt-1'>{formik.errors.email}</div>
                                ) : null}
                            </div>
                            
                            <button type='submit' className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-3 rounded-xl font-sans text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50 w-full md:w-auto' disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : 'Send Reset Link'}
                            </button>
                            
                            <div className="flex flex-col gap-y-2 text-center">
                                <p className="text-sm md:text-base text-foreground/70 font-sans">
                                    Remember your password?{' '}
                                    <Link href="/login" className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold hover:underline transition-all duration-300">
                                        Sign In
                                    </Link>
                                </p>
                                <p className="text-sm md:text-base text-foreground/70 font-sans">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/signup" className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold hover:underline transition-all duration-300">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </>
    );
};

export default Page;
