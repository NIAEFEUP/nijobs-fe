import React from "react";
import CompanyOffersManagementWidget from "../components/Company/Offers/Manage/CompanyOffersManagementWidget";
import CenteredComponent from "../components/HomePage/CenteredComponent";
import { MainMask } from "../components/HomePage/MainMask";

const CompanyOffersManagementPage = () => (
    <>
        <MainMask />
        <CenteredComponent>
            <CompanyOffersManagementWidget />
        </CenteredComponent>
    </>
);

export default CompanyOffersManagementPage;
