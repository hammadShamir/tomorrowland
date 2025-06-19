export interface IMyBooking {
    id: number;
    createAt: string;
    updatedAt: string;
    paymentStatus: string;
    hasTicket?: boolean;  // Added this property
    eventInstance: {
        id: number;
        eventId: number;
        startTime: string | null;
        endTime: string | null;
        eventDate: string;
        amount: number;
        event: {
            id: number;
            title: string;
            description: string;
            bgImg: string;
            status: string;
            createAt: string;
            updatedAt: string;
        };
    };
    customer: {
        id: number;
        fullName: string;
        nickName: string;
        email: string;
        phone: string;
        password: string;
        role: string;
        emailVerified: boolean;
        verificationToken: string | null;
        createAt: string;
        updatedAt: string;
    };
}

export interface BookingPaymentCardProps {
    booking: IMyBooking;
    loading: boolean;
    handleBookingPayment: (bookingId: number, eventId: number) => void;
}