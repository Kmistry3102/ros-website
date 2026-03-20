import { apiRequest } from "@/api/request";
import { CommonFormData } from "../commonapi.types";
import { OTPData } from "./auth.type";


export const sigupApi = async (data: CommonFormData) => {
  return await apiRequest({
    method: "POST",
    url: "/users/ros/sign-up",
    data,
  });
};

export const sendOtpApi = async (data: CommonFormData) => {
  const response = await apiRequest({
    method: "POST",
    url: "/users/public/send-web-otp",
    data,
  });
  return response;
};

export const verifyOTPApi = async (payload: OTPData) => {
  const response = await apiRequest({
    method: "POST",
    url: "/users/public/verify-web-otp",
    data: payload,
  });
  return response;
};

export const resendOTPApi = async (payload: OTPData) => {
  const response = await apiRequest({
    method: "POST",
    url: "/users/public/resend-web-otp",
    data: payload,
  });
  return response;
};

export const sendEmailOtpApi = async (data: CommonFormData) => {
  const response = await apiRequest({
    method: "POST",
    url: "/users/public/email/send-web-otp/login",
    data,
  });
  return response;
};

export const verifyEmailOTPApi = async (payload: OTPData) => {
  const response = await apiRequest({
    method: "POST",
    url: "/users/public/email/verify-web-otp",
    data: payload,
  });
  return response;
};