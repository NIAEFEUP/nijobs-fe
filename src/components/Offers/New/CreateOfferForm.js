
import React, { useCallback } from "react";
import { parseRequestErrors } from "../Form/OfferUtils";
import { newOffer } from "../../../services/offerService";
import useOfferForm from "../../../hooks/useOfferForm";
import OfferForm from "../Form/form-components/OfferForm";
import CreateOfferSchema from "./CreateOfferSchema";

export const CreateOfferControllerContext = React.createContext();

export const CreateOfferController = () => {
    const params = useOfferForm(CreateOfferSchema);

    const submit = useCallback(
        (data) => {
            params.setLoading(true);
            const [jobMinDuration, jobMaxDuration] = data.jobDuration;
            newOffer({
                ...data,
                vacancies: data.vacancies || undefined,
                contacts: data.contacts.map((val) => val.value),
                requirements: data.requirements.map((val) => (val, val.value)),
                isPaid: data.isPaid === "none" ? undefined : data.isPaid,
                jobStartDate: !data.jobStartDate ? undefined : data.jobStartDate,
                owner: data.owner || params.company,
                jobMinDuration,
                jobMaxDuration,
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
                showCompanyField: true,
                showHiddenField: true,
            },
        },
    };
};

const CreateOfferForm = () => <OfferForm title={"Create Form"} context={CreateOfferControllerContext} />;

export default CreateOfferForm;
