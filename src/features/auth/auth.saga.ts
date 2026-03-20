import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { OTPData } from "./auth.type";
import { resendOTPApi, sendEmailOtpApi, sendOtpApi, sigupApi, verifyEmailOTPApi, verifyOTPApi } from "./auth.api";
import { createSendEmailOtpFailure, createSendEmailOtpRequest, createSendEmailOtpSuccess, createSendOtpFailure, createSendOtpRequest, createSendOtpSuccess, createSignupFailure, createSignupRequest, createSignupSuccess, resendOtpFailure, resendOtpRequest, resendOtpSuccess, verifyEmailOtpFailure, verifyEmailOtpRequest, verifyEmailOtpSuccess, verifyOtpFailure, verifyOtpRequest, verifyOtpSuccess } from "./auth.slice";
import { CommonFormData } from "../commonapi.types";


// User registration saga
function* handleSignupSaga(
    action: PayloadAction<CommonFormData>
): Generator<any, void, any> {
    try {
        const response = yield call(sigupApi, action.payload);
        yield put(createSignupSuccess(response));
    } catch (error: any) {
        yield put(
            createSignupFailure(error.message || "An error occurred")
        );
    }
}

function* handlesendOtpSaga(
    action: PayloadAction<CommonFormData>
): Generator<any, void, any> {
    try {
        const response = yield call(sendOtpApi, action.payload);
        yield put(createSendOtpSuccess(response));
    } catch (error: any) {
        yield put(
            createSendOtpFailure(error.message || "An error occurred")
        );
    }
}

function* handleVerifyOtpSaga(
    action: PayloadAction<OTPData>
): Generator<any, void, any> {
    try {
        const response = yield call(verifyOTPApi, action.payload);
        const reqBody = response.result;
        yield put(verifyOtpSuccess(reqBody));
    } catch (error: any) {
        yield put(
            verifyOtpFailure(error.message || "An error occurred")
        );
    }
}

function* handleResendOtpSaga(
    action: PayloadAction<OTPData>
): Generator<any, void, any> {
    try {
        const response = yield call(resendOTPApi, action.payload);
        yield put(resendOtpSuccess(response));
    } catch (error: any) {
        yield put(
            resendOtpFailure(error.message || "An error occurred")
        );
    }
}

function* handlesendEmailOtpSaga(
    action: PayloadAction<CommonFormData>
): Generator<any, void, any> {
    try {
        const response = yield call(sendEmailOtpApi, action.payload);
        yield put(createSendEmailOtpSuccess(response));
    } catch (error: any) {
        yield put(
            createSendEmailOtpFailure(error.message || "An error occurred")
        );
    }
}

function* handleVerifyEmailOtpSaga(
    action: PayloadAction<OTPData>
): Generator<any, void, any> {
    try {
        const response = yield call(verifyEmailOTPApi, action.payload);
        const reqBody = response.result;
        yield put(verifyEmailOtpSuccess(reqBody));
    } catch (error: any) {
        yield put(
            verifyEmailOtpFailure(error.message || "An error occurred")
        );
    }
}

export default function* authSaga() {
    yield takeLatest(createSignupRequest.type, handleSignupSaga);
    yield takeLatest(createSendOtpRequest.type, handlesendOtpSaga);
    yield takeLatest(verifyOtpRequest.type, handleVerifyOtpSaga);
    yield takeLatest(resendOtpRequest.type, handleResendOtpSaga);
    yield takeLatest(createSendEmailOtpRequest.type, handlesendEmailOtpSaga);
    yield takeLatest(verifyEmailOtpRequest.type, handleVerifyEmailOtpSaga)

}
