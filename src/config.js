export const INITIAL_API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME || "http://localhost:8087";

const locallyStoredAPIHostname = localStorage.getItem("devTools.API_HOSTNAME");

export default {
    API_HOSTNAME: locallyStoredAPIHostname || INITIAL_API_HOSTNAME,
};
