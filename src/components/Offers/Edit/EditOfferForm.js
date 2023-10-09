import React, { useCallback, useContext, useEffect, useState } from "react";
import { OfferConstants, parseApplyURL, parseRequestErrors } from "../Form/OfferUtils";
import OfferForm from "../Form/form-components/OfferForm";
import { editOffer } from "../../../services/offerService";
import { Redirect, useLocation, useParams } from "react-router-dom";
import useOffer from "../../../hooks/useOffer";
import useOfferForm from "../../../hooks/useOfferForm";
import { INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";
import useSession from "../../../hooks/useSession";
import EditOfferSchema from "./EditOfferSchema";
import { CardContent, CircularProgress, Grid } from "@material-ui/core";

export const EditOfferControllerContext = React.createContext();

function parseDescription(rawDescription) {
    const temp = document.createElement("span");
    temp.innerHTML = rawDescription;
    const description = temp.textContent || temp.innerText;
    temp.remove();
    return description;
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
    applyURL,
    ...offer
}) => ({
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
    applyURL: applyURL?.startsWith("mailto:") ? applyURL.substring(7) : applyURL,
    ...offer,
});

export const EditOfferController = () => {
    const { id } = useParams();
    const { offer, error: errorOffer, loading: loadingOffer } = useOffer(id);
    const { data: user, isValidating } = useSession();
    const canEditRaceControl = false;

    // This portion of code is used to remove race conditions between useState of canEdit and useEffect
    // If the value of useState is false by default, this condition will be wrongly verified, resulting in unwanted redirects
    const shouldRevalidateEditingPermissions = useCallback(() => {
        const blocked = offer?.isHidden && offer?.hiddenReason !== OfferConstants.COMPANY_REQUEST;
        return !blocked && (
            (offer?.owner === user?.company?._id) || user?.isAdmin);
    }, [offer, user]);

    const [canEdit, setCanEdit] = useState(undefined);

    useEffect(() => {
        if (!isValidating && !loadingOffer) setCanEdit(shouldRevalidateEditingPermissions());
    }, [isValidating, loadingOffer, shouldRevalidateEditingPermissions]);

    const location = useLocation();

    const redirectProps = {
        to: {
            pathname: "/",
            state: {
                from: location,
                message: "You are not authorized to edit this offer.",
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
    } = useOfferForm(EditOfferSchema);

    useEffect(() => {
        if (offer && !isValidating && canEdit) {
            reset(parseOfferForm(offer));
        }
    }, [canEdit, isValidating, offer, reset]);

    const handleSubmit = useCallback(
        (data) => {
            setLoading(true);
            const [jobMinDuration, jobMaxDuration] = data.jobDuration;
            const publishDateChanged = data.publishDate.getTime() !== new Date(offer?.publishDate).getTime();
            const publishEndDateChanged = data.publishEndDate.getTime() !== new Date(offer?.publishEndDate).getTime();
            editOffer({
                offerId: id,
                ...data,
                vacancies: data.vacancies || null,
                publishDate: publishDateChanged ? data.publishDate : undefined,
                publishEndDate: publishEndDateChanged ? data.publishEndDate : undefined,
                contacts: data.contacts.map((val) => val.value),
                requirements: data.requirements.map((val) => val.value),
                isPaid: data.isPaid === "none" ? null : data.isPaid,
                jobStartDate: !data.jobStartDate ? null : data.jobStartDate,
                applyURL: parseApplyURL(data.applyURL),
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
        [id, offer, setLoading, setOfferId, setRequestErrors, setSuccess],
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
                canEditRaceControl,
            },
        },
    };
};

const EditOfferForm = () => {
    const {
        loadingOffer,
        errorOffer,
        redirectProps,
        canEdit,
    } = useContext(EditOfferControllerContext);

    if (canEdit === undefined)
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <Grid item xs={3}>
                    <CardContent>
                        <CircularProgress  />
                    </CardContent>
                </Grid>
            </Grid>
        );

    if (errorOffer || canEdit === false) {
        return <Redirect {...redirectProps} />;
    }

    return <OfferForm title={"Edit Offer"} disabled={loadingOffer} context={EditOfferControllerContext} />;
};

export default EditOfferForm;
