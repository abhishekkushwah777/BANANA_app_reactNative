import { getToken } from "../services/authStorage";
import { API_URL } from "../config/env";


export const getUsers = async () => {

    const token = await getToken();

    const response = await fetch(`${API_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const users = await response.json();

    if (!response.ok) {
      throw new Error(users.message || "Failed to fetch users");
    }

    return users;
};