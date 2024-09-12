import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../api";
import { useState } from 'react';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default function useOtpServices() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendOtp = async (email, type) => {
        setLoading(true);
        try {
            const response = await apiClient.post(ENDPOINTS.SEND_OTP, { email, type });
            return response.data;
        } catch (error) {
            setError(error);
            console.error("Error sending OTP:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (email, type, otp) => {
        setLoading(true);
        try {
            const response = await apiClient.post(ENDPOINTS.VERIFY_OTP, { email, type, otp });
            return response.data;
        } catch (error) {
            setError(error);
            console.error("Error verifying OTP:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleSendOtp, handleVerifyOtp, loading, error };
}
