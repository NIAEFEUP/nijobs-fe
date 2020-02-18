export const ValidationReasons = Object.freeze({
    DEFAULT: "Invalid value.",
    REQUIRED: "Required field.",
    TOO_LONG: (len) => `Must not exceed ${len} characters.`,
    TOO_SHORT: (len) => `Must have at least ${len} characters.`,
    STRING: "Must be text.",
    DATE: "Must be a valid ISO8601 date.",
    INT: "Must be a number.",
    BOOLEAN: "Must be a boolean.",
    IN_ARRAY: (vals) => `Must be one of [${vals}].`,
    ARRAY_SIZE: (min, max) => `Must have a size between [${min},${max}].`,
    EMAIL: "Must be a valid email.",
    HAVE_NUMBER: "Must contain at least a number.",
    ALREADY_EXISTS: (variable) => `${variable} already exists.`,
    DATE_EXPIRED: "Date must not be in the past",
    MUST_BE_AFTER: (variable) => `Date must be after ${variable}`,
});

export const CompanyApplicationConstants = {
    password: {
        minLength: 8,
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
