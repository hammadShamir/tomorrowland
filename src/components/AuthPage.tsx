"use client";
import { axiosService } from '@/services/axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { checkForMessage } from '@/services/helper';
import { UserRoles } from '@/interfaces/user';
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';

// Auth modes
export enum AuthMode {
    LOGIN = 'login',
    SIGNUP = 'signup'
}

// Login flow states
enum LoginState {
    CREDENTIALS,
    OTP_VERIFICATION
}

interface AuthPageProps {
    initialMode?: AuthMode;
}

const AuthPage = ({ initialMode = AuthMode.LOGIN }: AuthPageProps) => {
    const isInitialRender = useRef(true);
    const navigate = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
    const [loginState, setLoginState] = useState<LoginState>(LoginState.CREDENTIALS);
    const [userEmail, setUserEmail] = useState<string>('');
    
    // OTP form for login
    const otpFormik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required('OTP is required')
                .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await axiosService.post('/auth/verify-login-otp', {
                    email: userEmail,
                    otp: values.otp
                });
                
                Cookies.set("token", res.data.token, { expires: 1 / 24 });
                Cookies.set("user", JSON.stringify(res.data.user), { expires: 1 / 24 });
                navigateWithRedirectURL(res.data.user.role);
            } catch (error) {
                console.error('OTP verification failed:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    // Login form
    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axiosService.post('/auth/request-login-otp', values);
                setUserEmail(values.email);
                setLoginState(LoginState.OTP_VERIFICATION);
            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                setLoading(false);
            }
        },
    });

    // Signup form
    const signupFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'Minimum 2 characters Required')
                .required('Required'),
            lastName: Yup.string()
                .min(2, 'Minimum 2 characters Required')
                .required('Required'),
            nickName: Yup.string()
                .min(4, 'Minimum 3 characters Required')
                .required('Required'),
            phone: Yup.string()
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
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
            const fullName = `${values.firstName} ${values.lastName}`;
            const payload = { ...values, fullName };
            try {
                await axiosService.post('/auth/sign-up', payload);
                setAuthMode(AuthMode.LOGIN);
            } finally {
                setLoading(false);
            }
        },
    });

    const navigateWithRedirectURL = (role: UserRoles) => {
        const redirectTo = (role === UserRoles.USER ? "/" : "/admin/dashboard");
        navigate.push(redirectTo);
    };
    
    const handleResendOtp = async () => {
        if (!userEmail) return;
        
        try {
            await axiosService.post('/auth/request-login-otp', {
                email: userEmail,
                password: loginFormik.values.password
            });
        } catch (error) {
            console.error('Failed to resend OTP:', error);
        }
    };

    const switchAuthMode = (mode: AuthMode) => {
        setAuthMode(mode);
        setLoginState(LoginState.CREDENTIALS);
        loginFormik.resetForm();
        signupFormik.resetForm();
        otpFormik.resetForm();
    };

    useEffect(() => {
        if (isInitialRender.current) {
            checkForMessage();
            isInitialRender.current = false;
        }
    }, []);

    // Content for the left panel based on auth mode
    const getLeftPanelContent = () => {
        if (authMode === AuthMode.LOGIN) {
            return {
                title: "Welcome Back!",
                subtitle: "Ready to get those tickets? 🎵",
                description: "Sign in to access your account and secure your spot at the world's most anticipated music festivals and events.",
                features: [
                    "🎫 Access your ticket history",
                    "⚡ Priority booking notifications", 
                    "✨ Exclusive member benefits",
                    "🔒 Secure payment options"
                ],
                cta: "New here?",
                ctaAction: "Create your account and join thousands of festival-goers",
                ctaButton: "Sign Up"
            };
        } else {
            return {
                title: "Join Our Community!",
                subtitle: "Your festival journey starts here 🚀",
                description: "Create an account to unlock exclusive access to tickets for the most incredible music festivals and events around the world.",
                features: [
                    "🎟️ Early access to ticket sales",
                    "🎯 Personalized event recommendations",
                    "👤 Secure profile management",
                    "🌟 Connect with fellow festival-goers"
                ],
                cta: "Already have an account?",
                ctaAction: "Sign in to continue your festival journey",
                ctaButton: "Sign In"
            };
        }
    };

    const leftContent = getLeftPanelContent();

    // OTP Verification Form
    const renderOtpForm = () => (
        <div className="w-full max-w-md space-y-6 text-center">
            <form onSubmit={otpFormik.handleSubmit} className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Verify Your Login</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We sent a verification code to <span className="font-semibold text-purple-600">{userEmail}</span>
                    </p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="otp"
                            required
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            className="w-full px-4 py-3 text-center text-2xl tracking-wider border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="000000"
                            onChange={otpFormik.handleChange}
                            onBlur={otpFormik.handleBlur}
                            value={otpFormik.values.otp}
                        />
                        {otpFormik.touched.otp && otpFormik.errors.otp && (
                            <p className="mt-1 text-sm text-red-600 text-left pl-2">{otpFormik.errors.otp}</p>
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50"
                    >
                        {loading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                </div>
                
                <div className="text-center space-y-2">
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                        Didn&apos;t receive the code? Resend
                    </button>
                    <br />
                    <button
                        type="button"
                        onClick={() => setLoginState(LoginState.CREDENTIALS)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        ← Back to login
                    </button>
                </div>
            </form>
            
            {/* Trust and Legal Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Authentication</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Your verification code is encrypted and expires in 10 minutes for security. We protect your account with industry-standard security measures.
                    </p>
                    <div className="flex justify-center space-x-4 text-xs">
                        <a href="/privacy-policy" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Privacy Policy
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="/terms-conditions" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Terms & Conditions
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="/data-protection" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Data Protection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    // Login Form
    const renderLoginForm = () => (
        <div className="w-full max-w-md space-y-6 text-center">
            <form onSubmit={loginFormik.handleSubmit} className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Welcome Back</h2>
                    <p className="text-gray-600 leading-relaxed">Sign in to your account and continue your festival journey</p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Email Address"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.email}
                        />
                        {loginFormik.touched.email && loginFormik.errors.email && (
                            <p className="mt-1 text-sm text-red-600 text-left pl-2">{loginFormik.errors.email}</p>
                        )}
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Password"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.password}
                        />
                        {loginFormik.touched.password && loginFormik.errors.password && (
                            <p className="mt-1 text-sm text-red-600 text-left pl-2">{loginFormik.errors.password}</p>
                        )}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>
                
                <div className="text-center">
                    <a href="/forget-password" className="text-sm text-purple-600 hover:text-purple-800">
                        Forgot your password?
                    </a>
                </div>
            </form>
            
            {/* Trust and Legal Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Authentication</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Safe, secure, and guaranteed. Join thousands of satisfied customers.
                    </p>
                    <div className="flex justify-center space-x-4 text-xs">
                        <a href="/privacy-policy" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Privacy Policy
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="/terms-conditions" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Terms & Conditions
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="/data-protection" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Data Protection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    // Signup Form
    const renderSignupForm = () => (
        <div className="w-full max-w-md space-y-6 text-center">
            <form onSubmit={signupFormik.handleSubmit} className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">Create Account</h2>
                    <p className="text-gray-600 leading-relaxed">Join us for exclusive ticket access to the world&apos;s best festivals</p>
                </div>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="First Name"
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                value={signupFormik.values.firstName}
                            />
                            {signupFormik.touched.firstName && signupFormik.errors.firstName && (
                                <p className="mt-1 text-sm text-red-600 text-left pl-2">{signupFormik.errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Last Name"
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                value={signupFormik.values.lastName}
                            />
                            {signupFormik.touched.lastName && signupFormik.errors.lastName && (
                                <p className="mt-1 text-sm text-red-600 text-left pl-2">{signupFormik.errors.lastName}</p>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <input
                            type="text"
                            name="nickName"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Nickname"
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            value={signupFormik.values.nickName}
                        />
                        {signupFormik.touched.nickName && signupFormik.errors.nickName && (
                            <p className="mt-1 text-sm text-red-600 text-left pl-2">{signupFormik.errors.nickName}</p>
                        )}
                    </div>
                    
                    <div>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Email Address"
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            value={signupFormik.values.email}
                        />
                        {signupFormik.touched.email && signupFormik.errors.email && (
                            <p className="mt-1 text-sm text-red-600 text-left pl-2">{signupFormik.errors.email}</p>
                        )}
                    </div>
                    
                    <div>
                        <PhoneInput
                            international
                            countryCallingCodeEditable={true}
                            defaultCountry="US"
                            name="phone"
                            value={signupFormik.values.phone}
                            onChange={(value) => signupFormik.setFieldValue("phone", value)}
                            onBlur={signupFormik.handleBlur}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        {signupFormik.touched.phone && signupFormik.errors.phone && (
                            <p className="mt-1 text-sm text-red-600 text-left pl-2">{signupFormik.errors.phone}</p>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Password"
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                value={signupFormik.values.password}
                            />
                            {signupFormik.touched.password && signupFormik.errors.password && (
                                <p className="mt-1 text-sm text-red-600 text-left pl-2">{signupFormik.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Confirm Password"
                                onChange={signupFormik.handleChange}
                                onBlur={signupFormik.handleBlur}
                                value={signupFormik.values.confirmPassword}
                            />
                            {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600 text-left pl-2">{signupFormik.errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-purple-300/50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
            </form>
            
            {/* Trust and Legal Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Registration</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Your personal information is encrypted and protected with advanced security measures. We never share your data with third parties without your consent.
                    </p>
                    <div className="flex justify-center space-x-4 text-xs">
                        <a href="/privacy-policy" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Privacy Policy
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="/terms-conditions" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Terms & Conditions
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="/data-protection" className="text-purple-600 hover:text-purple-800 hover:underline">
                            Data Protection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Marketing Content */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/signin-signup.jpg"
                        alt="Festival Background"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                {/* Decorative party elements */}
                <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-32 right-16 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-15 animate-pulse delay-500"></div>
                <div className="absolute top-1/3 right-32 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="relative z-10 flex flex-1 justify-center items-center px-12 py-16 text-white h-full min-h-screen">
                    <div className="max-w-md space-y-8 text-center w-full flex flex-col justify-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-white to-purple-100 bg-clip-text">{leftContent.title}</h1>
                            <p className="text-xl md:text-2xl text-purple-100 mb-6 font-medium">{leftContent.subtitle}</p>
                            <p className="text-purple-100 leading-relaxed text-lg opacity-90">{leftContent.description}</p>
                        </div>
                        
                        <ul className="space-y-4">
                            {leftContent.features.map((feature, index) => (
                                <li key={index} className="flex items-center justify-center space-x-3 group">
                                    <span className="text-purple-100 font-medium text-lg">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="pt-8 border-t border-purple-400/30">
                            <p className="text-purple-100 mb-2 text-lg font-semibold">{leftContent.cta}</p>
                            <p className="text-sm text-purple-200 mb-6 leading-relaxed">{leftContent.ctaAction}</p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => switchAuthMode(authMode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN)}
                                    className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm transform hover:scale-105 shadow-lg hover:shadow-white/20"
                                >
                                    {leftContent.ctaButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Auth Forms */}
            <div className="flex-1 lg:w-1/2 flex items-center justify-center px-6 sm:px-12 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20 overflow-y-auto relative">
                {/* Decorative background elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-pulse delay-300"></div>
                
                <div className="w-full max-w-md py-8 relative z-10">
                    {/* Mobile toggle buttons */}
                    <div className="lg:hidden mb-8 flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => switchAuthMode(AuthMode.LOGIN)}
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                                authMode === AuthMode.LOGIN
                                    ? 'bg-white text-purple-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => switchAuthMode(AuthMode.SIGNUP)}
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                                authMode === AuthMode.SIGNUP
                                    ? 'bg-white text-purple-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form Content */}
                    {authMode === AuthMode.LOGIN ? (
                        loginState === LoginState.CREDENTIALS ? renderLoginForm() : renderOtpForm()
                    ) : (
                        renderSignupForm()
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
