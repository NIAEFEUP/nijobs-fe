import config from "../config";

import { login, logout } from "./auth";
const { API_HOSTNAME } = config;

describe("Auth Service", () => {
    it("Should send a POST request to authenticate the current session", async () => {
        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        const email = "email@test.com";
        const password = "password123";

        await login(email, password);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/auth/login`, expect.objectContaining({
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }));
    });

    it("Should return status code if not 200", async () => {
        fetch.mockResponse("", { status: 401 });

        const email = "email@test.com";
        const password = "password123";

        await expect(login(email, password)).rejects.toStrictEqual({ status: 401 });
    });

    it("Should send a DELETE request to log out the current session", async () => {
        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        await logout();

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/auth/login`, expect.objectContaining({
            method: "DELETE",
            credentials: "include",
        }));
    });
});
