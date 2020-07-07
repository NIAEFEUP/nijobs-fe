import useSWR from "swr";

// TODO, change this to use the one defined in index.js coming from .env
const API_HOSTNAME = "http://localhost:8087";

export default () => {

    const getSession = async (key) => {
        const res = await fetch(key, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            if (res.status === 401) return {};
            throw { status: res.status };
        } else return (await res.json()).data;
    };

    const { data, error, isValidating, mutate } = useSWR(`${API_HOSTNAME}/auth/me`, getSession, {
        revalidateOnFocus: false,
        initialData: null,
    });

    return {
        data,
        error,
        isValidating,
        reset: () => mutate(null),
        revalidate: () => mutate(`${API_HOSTNAME}/auth/me`),
        isLoggedIn: (data && Object.keys(data).length !== 0) || false,
    };

};
