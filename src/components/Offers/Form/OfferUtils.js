import { generalHumanError, HumanValidationReasons, validationRulesGenerator } from "../../../utils";
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

export const OfferConstants = {
    ADMIN_REQUEST: "ADMIN_REQUEST",
    COMPANY_BLOCKED: "COMPANY_BLOCKED",
    COMPANY_REQUEST: "COMPANY_REQUEST",
};

export const isValidPublishEndDate = (publishDateRaw, publishEndDateRaw) => {
    const publishDate = Date.parse(publishDateRaw);
    const publishEndDate = Date.parse(publishEndDateRaw);
    return publishDate < publishEndDate && (publishEndDate - publishDate) / MONTH_IN_MS <= OFFER_MAX_LIFETIME_MONTHS;
};

export const defaultDates = {
    getPublishDate: () => new Date(),
    getPublishEndDate: () => new Date(Date.parse(new Date()) + (OFFER_MAX_LIFETIME_MONTHS * MONTH_IN_MS) - DAY_IN_MS),
};

export const generateValidationRule = validationRulesGenerator(CreateOfferConstants);

const HumanReadableErrors = Object.freeze({
    "no-company-found-with-id": (id) => `No company found with given ID: ${id}.`,
    "max-concurrent-offers-reached": (val) => `Maximum concurrent offers exceeded. You cannot have more than ${val} offers at a time.`,
    "must-be-int": () => "Must be an integer.",
    "company-blocked": () => "Company is blocked. Please contact the team to review this situation if you think this is a mistake.",
    "company-disabled": () => "Company is disabled. Please enable it or contact the team for help.",
    "must-be-ISO8601-date": () => HumanValidationReasons.DATE,
    "date-already-past": () => HumanValidationReasons.DATE_EXPIRED,
    "invalid-apply-url": () => "Invalid application URL. Ensure your URL starts with 'http(s):' or 'mailto:'",
});

export const getHumanError = (error) => generalHumanError(error, HumanReadableErrors);

export const parseRequestErrors = (err) => {
    const generalErrors = err.filter((error) => !error.param).map((error) => ({ message: getHumanError(error.msg) }));
    const paramErrors = err.filter((error) => !!error.param)
        .reduce((obj, cur) => ({ ...obj, [cur.param]: { message: getHumanError(cur.msg) } }), {});
    return {
        ...paramErrors,
        generalErrors,
    };
};
