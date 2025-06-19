export interface ISingIN {
    email: string;
    password: string
}

export interface ISignUP extends ISingIN {
    fullname: string;
    phone: string
    confirmPassword: string
}

// New interfaces for OTP verification
export interface ILoginOtpRequest {
    email: string;
    password: string;
}

export interface IVerifyLoginOtp {
    email: string;
    otp: string;
}