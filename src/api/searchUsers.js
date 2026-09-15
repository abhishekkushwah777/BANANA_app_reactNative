import { API_URL } from "../config/env";
import { getToken } from "../services/authStorage";

export async function searchUsers(text){
    try {
        const token = await getToken();
        const response = await fetch(
            `${API_URL}/api/search/username?q=${encodeURIComponent(text)}`,
            {method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }}
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error fetching users", error)
    }
}