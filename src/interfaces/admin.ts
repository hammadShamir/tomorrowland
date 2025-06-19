interface Event {
    id: number;
    title: string;
    description: string;
    bgImg: string;
    eventDateTime: string;
    amount: number;
    createAt: string;
    updatedAt: string;
}

interface Booking {
    id: number;
    createAt: string;
    updatedAt: string;
    paymentStatus: string;
    event: Event;
}

export interface Customer {
    id: number;
    fullName: string;
    nickName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    isVerfified: boolean;
    createAt: string;
    updatedAt: string;
    booking: Booking[];
}

export interface IReleaseUsers {
    userId:number;
    userEmail: string;
    userPassword: string;
    customerFullName: string;
    customerEmail: string;
    customerPhone: string;
    eventName: string;
    eventInstanceId: number;
}

export interface sendCredentials {
    id:number
    customerName: string,
    customerEmail:string,
    email: string,
    password: string,
    eventName:string,
    eventInstanceId: number,
}