import { API_URL } from "../config/env";

import { saveToken } from '../services/authStorage';

export const Login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, 
        password 
    })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Login response data:", data); // Log the response data for debugging
    const token = data.token; // Store the token in the global variable
    await saveToken(token);
    return (data);
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};


export const Register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        username, 
        email,
        password 
    })
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.log("Token verification failed");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error during token verification:");
    return null;
  }
};
