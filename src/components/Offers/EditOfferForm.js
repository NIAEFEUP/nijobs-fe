import React, { useCallback, useContext, useEffect } from "react";
import { parseRequestErrors } from "./New/CreateOfferUtils";
import OfferForm from "./New/form-components/OfferForm";
import { editOffer } from "../../services/offerService";
import { Redirect, useParams } from "react-router-dom";
import useOffer from "../../hooks/useOffer";
import useOfferForm from "../../hooks/useOfferForm";
import { INITIAL_JOB_DURATION } from "../../reducers/searchOffersReducer";

export const EditOfferControllerContext = React.createContext();

const parseOfferForm = ({
    jobMinDuration,
    jobMaxDuration,
    requirements,
    contacts,
    jobStartDate,
    isPaid,
    vacancies,
    ...offer }) => ({
    jobDuration: [
        jobMinDuration || INITIAL_JOB_DURATION,
        jobMaxDuration || INITIAL_JOB_DURATION + 1,
    ],
    isPaid: isPaid || "none",
    requirements: requirements.map((value) => ({ value })),
    contacts: contacts.map((value) => ({ value })),
    jobStartDate: jobStartDate || null,
    vacancies: vacancies || "",
    ...offer,
});

export const EditOfferController = () => {
    const { id } = useParams();
    const { offer, error: errorOffer, loading: loadingOffer } = useOffer(id);
    const redirectProps = { to: { pathname: "/not-found" } };
    const {
        reset,
        submit,
        setLoading,
        setRequestErrors,
        setOfferId,
        setSuccess,
        ...offerFormParams
    } = useOfferForm();

    useEffect(() => {
        if (offer) {
            reset(parseOfferForm(offer));
        }
    }, [offer, offerFormParams.getValues, reset]);

    const handleSubmit = useCallback(
        (data) => {
            setLoading(true);
            const [jobMinDuration, jobMaxDuration] = data.jobDuration;

            editOffer({
                offerId: id,
                ...data,
                vacancies: data.vacancies || undefined,
                contacts: data.contacts.map((val) => val.value),
                requirements: data.requirements.map((val) => (val, val.value)),
                isPaid: data.isPaid === "none" ? undefined : data.isPaid,
                jobStartDate: !data.jobStartDate ? undefined : data.jobStartDate,
                jobMinDuration,
                jobMaxDuration,
            })
                .then((obj) => {
                    setRequestErrors({});
                    setOfferId(obj._id);
                    setLoading(false);
                    setSuccess(true);
                })
                .catch((err) => {
                    const reqErrors = parseRequestErrors(err);
                    setRequestErrors(reqErrors);
                    setLoading(false);
                });
        },
        [id, setLoading, setOfferId, setRequestErrors, setSuccess],
    );

    return {
        controllerOptions: {
            initialValue: {
                ...offerFormParams,
                submit: submit(handleSubmit),
                reset,
                setLoading,
                setRequestErrors,
                setSuccess,
                offerId: id,
                errorOffer,
                loadingOffer,
                redirectProps,
            },
        },
    };
};

const EditOfferForm = () => {
    const {
        loadingOffer,
        errorOffer,
        redirectProps,
    } = useContext(EditOfferControllerContext);


    if (errorOffer) {
        return (
            <Redirect {...redirectProps} />
        );
    }

    return <OfferForm disabled={loadingOffer} context={EditOfferControllerContext} />;
};

export default EditOfferForm;
