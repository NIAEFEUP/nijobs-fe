import React from "react";
import ApplicationsReviewWidget from "../components/Review/Applications/ApplicationsReviewWidget";
import { MainMask } from "../components/HomePage/MainMask";
import CenteredComponent from "../components/HomePage/CenteredComponent";

const ApplicationsReviewPage = () => (
    <>
        <MainMask/>
        <CenteredComponent>
            <ApplicationsReviewWidget />
        </CenteredComponent>
    </>
);

ApplicationsReviewPage.propTypes = {

};

export default ApplicationsReviewPage;
