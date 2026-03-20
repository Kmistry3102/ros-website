import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, OTPData } from "./auth.type";

const initialState: AuthState = {

    // User registration state
    basicData: null,
    basicError: null,
    basicStatus: "idle",

    // Send Otp state
    sendOtpError: null,
    SendOtpStatus: "idle",

    // Verify state
    verifyOtpData: null,
    verifyOtpStatus: "idle",
    verifyOtpError: null,

    // Send Email Otp state
    sendEmailOtpError: null,
    SendEmailOtpStatus: "idle",

    // Verify Email state
    verifyEmailOtpData: null,
    verifyEmailOtpStatus: "idle",
    verifyEmailOtpError: null,

    // Resend State
    resendOtpStatus: "idle",
    resendOtpError: null,

    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        // Set user
        setUser(state, action: PayloadAction<OTPData>) {
            state.user = action.payload;
        },

        // User registration actions
        createSignupRequest(state, _action) {
            state.basicStatus = "loading";
            state.basicError = null;
        },
        createSignupSuccess(state, action) {
            state.basicData = action.payload;
            state.basicStatus = "success";
            state.basicError = null;
        },
        createSignupFailure(state, action) {
            state.basicData = null;
            state.basicStatus = "failed";
            state.basicError = action.payload;
        },
        resetSignupState(state) {
            state.basicData = null;
            state.basicError = null;
            state.basicStatus = "idle";
        },


        // Send Otp Request
        createSendOtpRequest(state, _action) {
            state.SendOtpStatus = "loading";
            state.sendOtpError = null;
        },
        createSendOtpSuccess(state, action) {
            state.SendOtpStatus = "success";
        },
        createSendOtpFailure(state, action) {
            state.SendOtpStatus = "failed";
            state.sendOtpError = action.payload;
        },

        // Verify Otp SLice
        verifyOtpRequest: (
            state,
            _action
        ) => {
            state.verifyOtpStatus = "loading";
            state.verifyOtpError = null;
        },

        verifyOtpSuccess: (state, action) => {
            state.verifyOtpStatus = "success";
            state.verifyOtpData = action.payload;

            localStorage.setItem('accessToken', action?.payload?.result?.accessToken)
        },

        verifyOtpFailure: (state, action: PayloadAction<string>) => {
            state.verifyOtpStatus = "failed";
            state.verifyOtpError = action.payload;
        },

        resetOtpState: (state) => {
            state.verifyOtpData = null;
            state.verifyOtpStatus = "idle";
            state.verifyOtpError = null;
        },

        // Resend OTP
        resendOtpRequest(state, _action) {
            state.resendOtpStatus = "loading";
            state.resendOtpError = null;
        },

        resendOtpSuccess(state) {
            state.resendOtpStatus = "success";
        },

        resendOtpFailure(state, action) {
            state.resendOtpStatus = "failed";
            state.resendOtpError = action.payload;
        },

        // Eamil
        // Send Otp Request
        createSendEmailOtpRequest(state, _action) {
            state.SendEmailOtpStatus = "loading";
            state.sendEmailOtpError = null;
        },
        createSendEmailOtpSuccess(state, action) {
            state.SendEmailOtpStatus = "success";
        },
        createSendEmailOtpFailure(state, action) {
            state.SendEmailOtpStatus = "failed";
            state.sendEmailOtpError = action.payload;
        },

        // Verify Otp SLice
        verifyEmailOtpRequest: (
            state,
            _action
        ) => {
            state.verifyEmailOtpStatus = "loading";
            state.verifyEmailOtpError = null;
        },

        verifyEmailOtpSuccess: (state, action) => {
            state.verifyEmailOtpStatus = "success";
            state.verifyEmailOtpData = action.payload;

            localStorage.setItem('accessToken', action?.payload?.result?.accessToken)
        },

        verifyEmailOtpFailure: (state, action: PayloadAction<string>) => {
            state.verifyEmailOtpStatus = "failed";
            state.verifyEmailOtpError = action.payload;
        },

        resetEmailOtpState: (state) => {
            state.verifyEmailOtpData = null;
            state.verifyEmailOtpStatus = "idle";
            state.verifyEmailOtpError = null;
        },
    },
});

export const {
    createSignupRequest,
    createSignupSuccess,
    createSignupFailure,
    resetSignupState,
    createSendOtpRequest,
    createSendOtpSuccess,
    createSendOtpFailure,
    verifyOtpRequest,
    verifyOtpSuccess,
    verifyOtpFailure,
    setUser,
    resetOtpState,
    resendOtpRequest,
    resendOtpSuccess,
    resendOtpFailure,
    createSendEmailOtpRequest,
    createSendEmailOtpSuccess,
    createSendEmailOtpFailure,
    verifyEmailOtpRequest,
    verifyEmailOtpSuccess,
    verifyEmailOtpFailure,
    resetEmailOtpState,
} = authSlice.actions;

export default authSlice.reducer;
