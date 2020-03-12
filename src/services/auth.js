// TODO, change this to use the one defined in index.js coming from .env
const API_HOSTNAME = "http://localhost:8087";

import { sleep } from "../hooks/useSession";

export const login = async (email, password) => {

    await sleep(5000);

    await fetch(`${API_HOSTNAME}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

};
export const logout = () =>
    fetch(`${API_HOSTNAME}/auth/login`, {
        method: "DELETE",
        credentials: "include",
    });
