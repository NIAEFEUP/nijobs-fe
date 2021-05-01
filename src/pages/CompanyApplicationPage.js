import React, { useContext, useState } from "react";

import useToggle from "../hooks/useToggle";

import ApplicationConfirmation from "../components/Apply/Company/ApplicationConfirmation";
import CompanyApplicationForm from "../components/Apply/Company/CompanyApplicationForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CompanyApplicationSchema from "../components/Apply/Company/CompanyApplicationSchema";

export const CompanyApplicationPageControllerContext = React.createContext();

export const CompanyApplicationPageController = ({
    showConfirmation,
}) => {
    const [showConfirmationModal, toggleConfirmationModal] = useToggle(showConfirmation);

    const [errorCleared, setErrorCleared] = useState(true);

    const [showWhyModal, toggleWhyModal] = useToggle(false);

    const openWhyModal = (e) => {
        e.preventDefault();
        toggleWhyModal();
    };

    const { handleSubmit, reset, formState: { errors }, watch, control } = useForm({
        mode: "onBlur",
        resolver: yupResolver(CompanyApplicationSchema),
        reValidateMode: "onChange",
        shouldUnregister: false,
        defaultValues: {
            companyName: "",
            email: "",
            password: "",
            confirmPassword: "",
            motivation: "",
        },
    });

    const motivation = watch("motivation") || "";

    const [showPassword, toggleShowPassword] = useToggle(false);

    return {
        showConfirmationModal,
        controllerOptions: {
            initialValue: {
                handleSubmit,
                showConfirmationModal,
                toggleConfirmationModal,
                showWhyModal,
                toggleWhyModal,
                openWhyModal,
                errorCleared,
                setErrorCleared,
                control,
                errors,
                motivation,
                reset,
                showPassword,
                toggleShowPassword,
            },
        },
    };
};


const CompanyApplicationPage = () => {

    const { showConfirmationModal } = useContext(CompanyApplicationPageControllerContext);

    return (
        <React.Fragment>
            {showConfirmationModal ?
                <ApplicationConfirmation />
                :
                <CompanyApplicationForm />
            }
        </React.Fragment>
    );
};

export default CompanyApplicationPage;

CompanyApplicationPage.propTypes = {
};
