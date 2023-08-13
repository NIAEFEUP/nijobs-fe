import React, { useContext } from "react";
import { CardContent } from "@material-ui/core";
import ProfileWidget from "../components/Company/Profile/ProfileWidget";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useCompany from "../hooks/useCompany";

export const CompanyProfilePageControllerContext = React.createContext();

export const CompanyProfilePageController = () => {
    const { id } = useParams();
    const { company, error, loading } = useCompany(id);

    return {
        controllerOptions: {
            initialValue: {
                company,
                error,
                loading,
            },
        },
    };
};

const CompanyProfilePage = () => {
    const { company, error, loading } = useContext(CompanyProfilePageControllerContext);
    if (error) {
        return <></>;
    }

    return (
        <CardContent>
            <ProfileWidget
                company={company}
                isPage
                loading={loading}
            />
        </CardContent>
    );
};


export default CompanyProfilePage;
