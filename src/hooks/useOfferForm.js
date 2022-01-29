import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useFieldArray, useWatch, useForm } from "react-hook-form";
import CreateOfferSchema from "../components/Offers/New/CreateOfferSchema";
import { defaultDates } from "../components/Offers/Form/OfferUtils";
import useFieldSelector from "../components/utils/offers/useFieldSelector";
import useTechSelector from "../components/utils/offers/useTechSelector";
import { INITIAL_JOB_DURATION } from "../reducers/searchOffersReducer";
import useSession from "./useSession";

export default (defaultValues) => {
    const { handleSubmit, formState, control, setValue, getValues, clearErrors, reset } = useForm({
        mode: "all",
        resolver: yupResolver(CreateOfferSchema),
        reValidateMode: "onChange",
        defaultValues: {
            title: "",
            publishDate: defaultDates.getPublishDate(),
            publishEndDate: defaultDates.getPublishEndDate(),
            jobDuration: [INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1],
            jobStartDate: null,
            description: "",
            descriptionText: "",
            contacts: [{ value: "" }],
            isPaid: "none",
            vacancies: "",
            jobType: "",
            fields: [],
            technologies: [],
            location: null,
            requirements: [{ value: "" }],
            isHidden: false,
            owner: "",
            ...defaultValues,
        },
    });

    const DEFAULT_VALUE = { value: "" };

    const fields = useWatch({ control });

    const { fields: requirements, append: appendRequirement, remove: removeRequirement } = useFieldArray({
        control,
        name: "requirements",
    });

    const handleAppendRequirement = () => appendRequirement(DEFAULT_VALUE);

    const { fields: contacts, append: appendContact, remove: removeContact } = useFieldArray({
        control,
        name: "contacts",
    });

    const handleAppendContact = () => appendContact(DEFAULT_VALUE);

    const [loading, setLoading] = React.useState(false);

    const fieldsSelectorProps = useFieldSelector(fields.fields, (fields) => setValue("fields", fields));
    const techSelectorProps = useTechSelector(fields.technologies, (fields) => setValue("technologies", fields));

    const session = useSession();

    const isAdmin = session.data?.isAdmin;
    const company = session.data?.company?._id;
    const companyUnfinishedRegistration = session.data?.company?.hasFinishedRegistration === false;
    const isLoggedIn = session.isLoggedIn;

    const [success, setSuccess] = React.useState(false);
    const [offerId, setOfferId] = React.useState();
    const [requestErrors, setRequestErrors] = React.useState({});

    useEffect(() => {
        if (!isLoggedIn) {
            clearErrors();
        }
    },
    [clearErrors, isLoggedIn]);

    return {
        success,
        setSuccess,
        offerId,
        setOfferId,
        requestErrors,
        setRequestErrors,
        submit: handleSubmit,
        reset,
        control,
        contacts,
        requirements,
        fields,
        formState,
        errors: formState.errors,
        appendContact: handleAppendContact,
        removeContact,
        appendRequirement: handleAppendRequirement,
        removeRequirement,
        getValues,
        setValue,
        loading,
        setLoading,
        isAdmin,
        company,
        isLoggedIn,
        companyUnfinishedRegistration,
        fieldsSelectorProps,
        techSelectorProps,
    };
};
