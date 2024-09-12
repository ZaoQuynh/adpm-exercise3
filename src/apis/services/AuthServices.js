import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../api";
import { useState } from 'react';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default function useAuthServices() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await apiClient.post(ENDPOINTS.LOGIN, { username, password });
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return response.data;
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
            console.error("Error logging in:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (fullName, email, phoneNumber, username, password) => {
        setLoading(true);
        try {
            const response = await apiClient.post(ENDPOINTS.REGISTER, {
                fullName, email, phoneNumber, username, password
            });
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return response.data;
        } catch (err) {
            setError(err.response ? err.response.data : "An error occurred");
            console.error("Error registering:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, handleRegister, loading, error };
}
