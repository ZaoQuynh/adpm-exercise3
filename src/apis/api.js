const BASE_URL = "https://admp-api.onrender.com/api/v1";

export const ENDPOINTS = {
    // Authorization & Authentication
    LOGIN: `/auth/login`,
    REGISTER: `/auth/register`,
    // OTP
    SEND_OTP: `/otp/send`,
    VERIFY_OTP: `/otp/verify`,
    // Users
    GET_USER_BY_EMAIL: `/user/get-by-email`,
    UPDATE_PASSWORD: `/user/update-password`,
}