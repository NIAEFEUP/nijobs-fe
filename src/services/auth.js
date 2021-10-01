import config from "../config";
import { buildCancelableRequest } from "../utils";
const { API_HOSTNAME } = config;

const AUTH_ENDPOINT = `${API_HOSTNAME}/auth/login`;

export const login = buildCancelableRequest(async (email, password, { signal }) => {

    const res = await fetch(AUTH_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal,
    });

    if (!res.ok) throw { status: res.status };

});

export const logout = buildCancelableRequest(({ signal }) =>
    fetch(AUTH_ENDPOINT, {
        method: "DELETE",
        credentials: "include",
        signal,
    }));
