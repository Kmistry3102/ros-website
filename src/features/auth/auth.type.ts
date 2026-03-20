import { CommonFormData, ErrorTypes, RequestStatus } from "../commonapi.types";

export interface OTPData extends CommonFormData {
    otp?: string;
    accessToken?: string;
    isProfileSubmit?: boolean;
}

export interface AuthState {
    basicData: CommonFormData | null;
    basicStatus: RequestStatus;
    basicError: ErrorTypes;

    // Send Otp
    SendOtpStatus: RequestStatus;
    sendOtpError: ErrorTypes;

    // VerifyOtp
    verifyOtpData: OTPData | null;
    verifyOtpStatus: RequestStatus;
    verifyOtpError: ErrorTypes;

    SendEmailOtpStatus: RequestStatus;
    sendEmailOtpError: ErrorTypes;

    // VerifyOtp
    verifyEmailOtpData: OTPData | null;
    verifyEmailOtpStatus: RequestStatus;
    verifyEmailOtpError: ErrorTypes;

    // Resend Otp
    resendOtpStatus: RequestStatus,
    resendOtpError: ErrorTypes,

    user: OTPData | null;
}