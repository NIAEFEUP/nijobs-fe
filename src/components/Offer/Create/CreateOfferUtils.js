export const CreateOfferConstants = {
    password: {
        minLength: 8,
    },
    offerDescription: {
        minLength: 10,
        maxLength: 1500,
    },
    employmentType: {
        minLength: 2,
        maxLength: 50,
    },    
    offerTitle: {
        minLength: 2,
        maxLength: 50,
    },
};

export const generateValidationRule = (field, rule, reason) => {
    const validationConstraint = CreateOfferConstants[field][rule];
    const params = [validationConstraint];

    if (reason) params.push((typeof reason === "function") ? reason(validationConstraint) : reason);

    return params;
};

const HumanReadableErrors = Object.freeze({ 
    // TODO - errors ought to be different
    "email-already-exists": "The provided email is already associated to our platform.",
    "company-application-duplicate-email": "There is already an application associated with that email.",
});

export const getHumanError = (error) => HumanReadableErrors[error] || "An error occurred, please try again.";
