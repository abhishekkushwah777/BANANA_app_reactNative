import { API_URL } from "../config/env";
import { getToken } from "../services/authStorage";


export const validateUsername = async (username) => {
    try {
        const response = await fetch(
            `${API_URL}/api/services/validateusername?q=${encodeURIComponent(username)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        console.log("Username validation error:", error);
    }
};



export const sendOTP = async (email) => {
    try {
        const response = await fetch(
            `${API_URL}/api/email/sendotp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error sending OTP");
        }

        return data;

    } catch (error) {
        console.error("sendOTP error:", error);
        throw error;
    }
};



export const verifyOTP = async (email, otp) => {
    try {
        const response = await fetch(
            `${API_URL}/api/email/verifyotp`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
            })
        });
        const data = await response.json();

        if (!response.ok) {
            console.log(data.message || "Error sending OTP");
        }

        return data;
    } catch (error) {
        console.error("verify OTP error:", error);
        throw error;
    }
};


export const getNotifications = async () => {
    const token = await getToken();

    try {
        const response = await fetch(
            `${API_URL}/api/services/getnotifications`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message || "Error getting notifications ");
        }

        return data;
    } catch (error) {
        console.error("get notifications error:", error);
        throw error;
    }
}
