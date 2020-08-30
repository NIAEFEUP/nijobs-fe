// TODO, change this to use the one defined in index.js coming from .env
import { API_HOSTNAME } from "../config";
const AUTH_ENDPOINT = `${API_HOSTNAME}/auth/login`;

export const login = async (email, password) => {

    const res = await fetch(AUTH_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw { status: res.status };


};
export const logout = () =>
    fetch(AUTH_ENDPOINT, {
        method: "DELETE",
        credentials: "include",
    });
