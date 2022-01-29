import React, { useCallback, useContext, useEffect } from "react";
import { parseRequestErrors } from "../Form/OfferUtils";
import OfferForm from "../Form/form-components/OfferForm";
import { editOffer } from "../../../services/offerService";
import { Redirect, useLocation, useParams } from "react-router-dom";
import useOffer from "../../../hooks/useOffer";
import useOfferForm from "../../../hooks/useOfferForm";
import { INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";
import useSession from "../../../hooks/useSession";

export const EditOfferControllerContext = React.createContext();

function parseDescription(description) {
    const temp = document.createElement("span");
    temp.innerHTML = description;
    return temp.textContent || temp.innerText;
}

const parseOfferForm = ({
    jobMinDuration,
    jobMaxDuration,
    requirements,
    contacts,
    jobStartDate,
    isPaid,
    vacancies,
    description,
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
    description,
    descriptionText: parseDescription(description),
    ...offer,
});

export const EditOfferController = () => {
    const { id } = useParams();
    const { offer, error: errorOffer, loading: loadingOffer } = useOffer(id);
    const { data: user, isValidating } = useSession();

    const canEdit = offer?.owner === user?.company?._id || user?.isAdmin;

    const location = useLocation();

    const redirectProps = {
        to: {
            pathname: "/",
            state: {
                from: location,
                message: "You are not authorized to edit this offer",
            },
        },
    };

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
        if (offer && !isValidating && canEdit) {
            reset(parseOfferForm(offer));
        }
    }, [canEdit, isValidating, offer, reset]);

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
                user,
                isValidating,
                canEdit,
            },
        },
    };
};

const EditOfferForm = () => {
    const {
        loadingOffer,
        errorOffer,
        redirectProps,
        isValidating,
        canEdit,
    } = useContext(EditOfferControllerContext);

    if (errorOffer || (!loadingOffer && !isValidating && !canEdit)) {
        return (
            <Redirect {...redirectProps} />
        );
    }

    return <OfferForm title={"Edit Offer"} disabled={loadingOffer} context={EditOfferControllerContext} />;
};

export default EditOfferForm;
