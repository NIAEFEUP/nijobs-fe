export const INITIAL_API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME || "http://localhost:8087";
export const INITIAL_LOCATION_SERVICE_HOSTNAME = process.env.REACT_APP_LOCATION_SERVICE_HOSTNAME || "https://ni.fe.up.pt/nijobs/locations";

const locallyStoredAPIHostname = localStorage.getItem("devTools.API_HOSTNAME");
const locallyStoredLocationServiceHostname = localStorage.getItem("devTools.LOCATION_SERVICE_HOSTNAME");

export default {
    API_HOSTNAME: locallyStoredAPIHostname || INITIAL_API_HOSTNAME,
    LOCATION_SERVICE_HOSTNAME: locallyStoredLocationServiceHostname || INITIAL_LOCATION_SERVICE_HOSTNAME,
};
