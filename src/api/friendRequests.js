import { getToken } from "../services/authStorage";
import { API_URL } from "../config/env";

export async function addFriend(UserId) {
    try {
        const token = await getToken();
        const otherUserId = UserId;

        const response = await fetch(
            `${API_URL}/api/services/addFriend`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    otherUserId,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to send friend request");
        }

        return data;

    } catch (error) {
        console.error("Add friend error:", error);
        throw error;
    }
};

export async function acceptRequest(relationshipId) {
    try {
        const response = await fetch(
            `${API_URL}/api/services/acceptrequest?q=${encodeURIComponent(relationshipId)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "failed to accept friend request");
        }

        return data;

    } catch (error) {
        console.error("Add friend error:", error);
        throw error;
    }
};
