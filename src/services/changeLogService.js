import Constants from "../utils/Constants";
import { buildCancelableRequest } from "../utils";

export const fetchReleases = buildCancelableRequest(async ({ signal } = {}) => {
    try {
        const res = await fetch(
            "https://api.github.com/repos/NIAEFEUP/nijobs-fe/releases",
            {
                method: "GET",
                signal,
            }
        );
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }

        return json;
    } catch (error) {
        const errorArray = Array.isArray(error)
            ? error
            : [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

        throw errorArray;
    }
});
