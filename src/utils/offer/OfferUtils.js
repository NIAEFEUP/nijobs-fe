/* istanbul ignore file */

const HumanReadableErrors = Object.freeze({
    "insufficient-permissions": "You don't have sufficient permissions to do this action.",
    "offer-is-hidden": "An error occurred, because this offer is hidden.",
    "offer-blocked-by-admin": "An error occurred, because this offer was disabled by an admin.",
    "must-be-admin": "Only admin users can do this action.",
    "login-required": "You must be logged in to do this action.",
    "must-be-company": "You must be a company to do this action.",
    "company-blocked": "An error occurred, because your account was blocked by an admin.",
    "company-disabled": "An error occurred, because your account is disabled.",
});

export const getHumanError = (error) => HumanReadableErrors[error] || "An error occurred, please try again.";
