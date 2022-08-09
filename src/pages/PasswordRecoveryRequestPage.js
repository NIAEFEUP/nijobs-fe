import React, { useContext } from "react";

import useToggle from "../hooks/useToggle";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordRequestSchema from "../components/PasswordRecovery/PasswordRequestSchema";
import PasswordRequestForm from "../components/PasswordRecovery/PasswordRequestForm";
import PasswordRequestConfirmation from "../components/PasswordRecovery/PasswordRequestConfirmation";

export const PasswordRecoveryRequestContext = React.createContext();

export const PasswordRecoveryRequestController = ({
    showConfirmation,
}) => {
    const [showConfirmationModal, toggleConfirmationModal] = useToggle(showConfirmation);

    const { handleSubmit, reset, formState: { errors }, control } = useForm({
        mode: "onBlur",
        resolver: yupResolver(PasswordRequestSchema),
        reValidateMode: "onChange",
        shouldUnregister: false,
        defaultValues: {
            email: "",
        },
    });

    return {
        showConfirmationModal,
        controllerOptions: {
            initialValue: {
                handleSubmit,
                showConfirmationModal,
                toggleConfirmationModal,
                control,
                errors,
                reset,
            },
        },
    };
};


const PasswordRecoveryRequestPage = () => {

    const { showConfirmationModal } = useContext(PasswordRecoveryRequestContext);

    return (
        <React.Fragment>
            {showConfirmationModal ?
                <PasswordRequestConfirmation />
                :
                <PasswordRequestForm />
            }
        </React.Fragment>
    );
};

export default PasswordRecoveryRequestPage;

PasswordRecoveryRequestPage.propTypes = {
};
