import React from "react";
import PropTypes from "prop-types";

import { MainMask } from "../components/HomePage/MainMask";
import useToggle from "../hooks/useToggle";

import ApplicationConfirmation from "../components/Offer/Create/ApplicationConfirmation";
import CenteredComponent from "../components/HomePage/CenteredComponent";
import CreateOfferForm from "../components/Offer/Create/CreateOfferForm";


const CreateOfferPage = ({ showConfirmation = false }) => {

    const [showConfirmationModal, toggleConfirmationModal] = useToggle(showConfirmation);

    return (
        <React.Fragment>
            <MainMask />
            {showConfirmationModal ?
                <CenteredComponent>
                    <ApplicationConfirmation open={showConfirmationModal} />
                </CenteredComponent>
                :
                <CreateOfferForm toggleConfirmationModal={toggleConfirmationModal} />
            }
        </React.Fragment>
    );
};

export default CreateOfferPage;

CreateOfferPage.propTypes = {
    showConfirmation: PropTypes.bool,
};