import React, { useCallback, useContext } from "react";
import { parseRequestErrors } from "./New/CreateOfferUtils";
import OfferForm from "./New/form-components/OfferForm";
import { editOffer } from "../../services/offerService";
import { Redirect, useParams } from "react-router-dom";
import useOffer from "../../hooks/useOffer";
import useOfferForm from "../../hooks/useOfferForm";

export const EditOfferControllerContext = React.createContext();

export const EditOfferController = () => {
    const { id } = useParams();
    const { offer, error: errorOffer, loading: loadingOffer } = useOffer(id);
    const redirectProps = { to: { pathname: "/not-found" } };

    const params = useOfferForm(offer);

    console.log(offer, params);

    const submit = useCallback(
        (data) => {
            params.setLoading(true);

            editOffer({
                ...data,
                vacancies: data.vacancies || undefined,
                contacts: data.contacts.map((val) => val.value),
                requirements: data.requirements.map((val) => (val, val.value)),
                isPaid: data.isPaid === "none" ? undefined : data.isPaid,
                jobStartDate: !data.jobStartDate ? undefined : data.jobStartDate,
            })
                .then((obj) => {
                    params.setRequestErrors({});
                    params.setOfferId(obj._id);
                    params.setLoading(false);
                    params.setSuccess(true);
                })
                .catch((err) => {
                    const reqErrors = parseRequestErrors(err);
                    params.setRequestErrors(reqErrors);
                    params.setLoading(false);
                });
        },
        [params],
    );

    return {
        controllerOptions: {
            initialValue: {
                ...params,
                submit: params.submit(submit),
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
        // loadingOffer,
        errorOffer,
        redirectProps,
    } = useContext(EditOfferControllerContext);


    if (errorOffer) {
        return (
            <Redirect {...redirectProps} />
        );
    } else {
        return OfferForm(EditOfferControllerContext);
    }
};

export default EditOfferForm;
