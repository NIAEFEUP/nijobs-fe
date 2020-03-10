// TODO, change this to use the one defined in index.js coming from .env
const API_HOSTNAME = "http://localhost:8087";

export const login = (email, password) =>
    fetch(`${API_HOSTNAME}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

export const logout = () =>
    fetch(`${API_HOSTNAME}/auth/login`, {
        method: "DELETE",
        credentials: "include",
    });
