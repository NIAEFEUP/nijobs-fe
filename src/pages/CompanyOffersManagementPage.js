import React from "react";
import CompanyOffersManagementWidget from "../components/Company/Offers/Manage/CompanyOffersManagementWidget";
import { CardContent, makeStyles } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";

const useStyles = (isMobile) => makeStyles((theme) => ({
    content: {
        padding: isMobile ? theme.spacing(2, 2) : theme.spacing(3, 9),
    },
}));

const CompanyOffersManagementPage = () => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();

    return (
        <CardContent className={classes.content}>
            <CompanyOffersManagementWidget isMobile={isMobile} />
        </CardContent>
    );
};

export default CompanyOffersManagementPage;
