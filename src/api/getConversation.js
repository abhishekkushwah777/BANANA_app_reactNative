import { API_URL } from "../config/env";

import { getToken } from "../services/authStorage";


export async function getConversation(userId) {

    const token = await getToken(); // Retrieve the token from storage
    
    const response = await fetch(`${API_URL}/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create conversation");
      }

      return {
        conversation: data.conversation,
        messages: data.messages,
      };
}