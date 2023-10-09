import config from "../config";
import Constants from "../utils/Constants";
import { measureTime } from "../utils/analytics";
import { TIMED_ACTIONS } from "../utils/analytics/constants";
const { API_HOSTNAME } = config;

export const editCompany = measureTime(TIMED_ACTIONS.OFFER_EDIT, async ({
    _id: id,
    name,
    contacts,
    bio,
    logo,
}) => {
    const formData = new FormData();

    if (logo) formData.append("logo", logo);
    formData.append("name", name);
    contacts.forEach((contact) => {
        formData.append("contacts", contact);
    });
    formData.append("bio", bio);

    try {
        const res = await fetch(`${API_HOSTNAME}/company/${id}/edit`, {
            method: "PUT",
            body: formData,
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }

        return json;
    } catch (error) {
        const errorArray = Array.isArray(error) ? error :
            [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

        throw errorArray;
    }
});
