import useSWR from "swr";

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

    const { data, error, mutate } = useSWR(`${API_HOSTNAME}/auth/me`, getSession, {
        // revalidateOnFocus: false,
        onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
            if (error.status === 401) return;

            // retry after 5 seconds
            setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
        },
    });

    return {
        data,
        error,
        update: () => mutate({}),
    };

};
