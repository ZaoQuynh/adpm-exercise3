import axios from "axios";
import { ENDPOINTS, BASE_URL } from "../api";
import { useState } from 'react';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default function useUserServices() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetUserByEmail = async (email) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`${ENDPOINTS.GET_USER_BY_EMAIL}?email=${email}`);
            return response.data;
        } catch (error) {
            setError(error);
            console.error("Error fetching user by email:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (id, password) => {
        setLoading(true);
        try {
            const response = await apiClient.put(ENDPOINTS.UPDATE_PASSWORD, { id, password });
            return response.data;
        } catch (error) {
            setError(error);
            console.error("Error updating password:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleGetUserByEmail, handleUpdatePassword, loading, error };
}
