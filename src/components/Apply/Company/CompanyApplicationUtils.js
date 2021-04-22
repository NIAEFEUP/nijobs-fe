export const CompanyApplicationConstants = {
    password: {
        minLength: 8,
        hasNumber: /\d/,
    },
    motivation: {
        minLength: 10,
        maxLength: 1500,
    },
    companyName: {
        minLength: 2,
        maxLength: 50,
    },
};

export const generateValidationRule = (field, rule, reason) => {
    const validationConstraint = CompanyApplicationConstants[field][rule];
    const params = [validationConstraint];

    if (reason) params.push((typeof reason === "function") ? reason(validationConstraint) : reason);

    return params;
};

const HumanReadableErrors = Object.freeze({
    "email-already-exists": "The provided email is already associated to our platform.",
    "company-application-duplicate-email": "There is already an application associated with that email.",
});

export const getHumanError = (error) => HumanReadableErrors[error] || "An error occurred, please try again.";
