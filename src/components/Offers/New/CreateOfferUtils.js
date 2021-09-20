import { validationRulesGenerator } from "../../../utils";
import { DAY_IN_MS, MONTH_IN_MS, OFFER_MAX_LIFETIME_MONTHS } from "../../../utils/TimeUtils";
import { MAX_FIELDS, MIN_FIELDS } from "../../utils/offers/FieldOptions";
import { MAX_TECHNOLOGIES, MIN_TECHNOLOGIES } from "../../utils/offers/TechOptions";


export const CreateOfferConstants = {
    title: {
        maxLength: 90,
    },
    description: {
        maxLength: 1500,
    },
    technologies: {
        minLength: MIN_TECHNOLOGIES,
        maxLength: MAX_TECHNOLOGIES,
    },
    fields: {
        minLength: MIN_FIELDS,
        maxLength: MAX_FIELDS,
    },
    contacts: {
        minLength: 1,
    },
    requirements: {
        minLength: 1,
    },

};

export const isValidPublishEndDate = (publishDateRaw, publishEndDateRaw) => {
    const publishDate = Date.parse(publishDateRaw);
    const publishEndDate = Date.parse(publishEndDateRaw);
    return publishDate < publishEndDate && (publishEndDate - publishDate) / MONTH_IN_MS <= OFFER_MAX_LIFETIME_MONTHS;
};

export const defaultDates = {
    publishDate: () => new Date(),
    publishEndDate: () => new Date(Date.parse(new Date()) + (OFFER_MAX_LIFETIME_MONTHS * MONTH_IN_MS) - DAY_IN_MS),
};

export const generateValidationRule = validationRulesGenerator(CreateOfferConstants);

const HumanReadableErrors = Object.freeze({
    // TODO
});

export const getHumanError = (error) => HumanReadableErrors[error] || "An error occurred, please try again.";
