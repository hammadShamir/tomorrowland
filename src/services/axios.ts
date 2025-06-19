import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, Method } from 'axios';
import { toast } from 'react-hot-toast';
import { checkAuth } from './helper';

// Define the base URL for your API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = checkAuth()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Generic request handler with toast.promise
const request = async (
    method: Method,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
) => {
    if (method === 'GET') {
        // Skip toast entirely for GET requests
        const response = await axiosInstance.request({
            method,
            url,
            data,
            ...config,
        });
        return { data: response.data.data, meta: response.data.meta };
    }

    // Use toast.promise for other methods
    return await toast.promise(
        axiosInstance.request({
            method,
            url,
            data,
            ...config,
        }),
        {
            loading: 'Loading...',
            success: (response) => {
                const successMessage = response?.data?.meta?.message || 'Request successful!';
                return successMessage;
            },
            error: (err) => {
                const errorMessage = err?.response?.data?.message || 'An unexpected error occurred!';
                return errorMessage;
            },
        }
    ).then((response) => {
        // Return response data directly
        return { data: response.data.data, meta: response.data.meta };
    });
};



// Exported Axios Service functions
export const axiosService = {
    get: (url: string, config?: AxiosRequestConfig) => request('GET', url, undefined, config),
    post: (url: string, data?: unknown, config?: AxiosRequestConfig) => request('POST', url, data, config),
    put: (url: string, data?: unknown, config?: AxiosRequestConfig) => request('PUT', url, data, config),
    patch: (url: string, data?: unknown, config?: AxiosRequestConfig) => request('PATCH', url, data, config),
    delete: (url: string, config?: AxiosRequestConfig) => request('DELETE', url, undefined, config),
};
