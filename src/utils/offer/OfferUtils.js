/* istanbul ignore file */

import { generalHumanError } from "..";

const HumanReadableErrors = Object.freeze({
    "insufficient-permissions": "You don't have sufficient permissions to do this action.",
    "offer-is-hidden": "An error occurred, because this offer is hidden.",
    "offer-blocked-by-admin": "An error occurred, because this offer was disabled by an admin.",
    "must-be-admin": "Only admin users can do this action.",
    "login-required": "You must be logged in to do this action.",
    "must-be-company": "You must be a company to do this action.",
    "company-blocked": "An error occurred, because your account was blocked by an admin.",
    "company-disabled": "An error occurred, because your account is disabled.",
    "max-concurrent-offers-reached": (val) => `Maximum concurrent offers exceeded. You cannot have more than ${val} offers at a time.`,
});

export const getHumanError = (error) => generalHumanError(error, HumanReadableErrors);

export const validApplyURL = (val) => {
    const httpRegex = /^https?:\/\/\S+\.\S+$/;
    const emailRegex = /^mailto:(\S+@\S+)$/;

    return httpRegex.test(val) || emailRegex.test(val) || (val === "");
};
