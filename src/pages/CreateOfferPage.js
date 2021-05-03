import React from "react";
import PropTypes from "prop-types";

import useToggle from "../hooks/useToggle";

import { MainMask } from "../components/HomePage/MainMask";

import CreateOfferForm from "../components/Offer/Create/CreateOfferForm";
import { Redirect } from "react-router";


const CreateOfferPage = () => {

    const [offerSubmited, toggleOfferSubmission] = useToggle(false);

    return (
        <React.Fragment>
            <MainMask />
            {offerSubmited ?
                <Redirect to="/"/> 
                // TODO -- redirect to the new offer page
                :
                <CreateOfferForm toggleOfferSubmission={toggleOfferSubmission} userIsACompany={
                    true
                    // user?.company
                } />
            }
        </React.Fragment>
    );
};

export default CreateOfferPage;

CreateOfferPage.propTypes = {
    showConfirmation: PropTypes.bool,
};