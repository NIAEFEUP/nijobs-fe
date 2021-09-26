import React from "react";
import CompanyOffersManagementWidget from "../components/Company/Offers/Manage/CompanyOffersManagementWidget";
import { CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3, 9),
        boxSizing: "content-box",
    },
}));

const CompanyOffersManagementPage = () => {
    const classes = useStyles();
    return (
        <CardContent className={classes.content}>
            <CompanyOffersManagementWidget />
        </CardContent>
    );
};

export default CompanyOffersManagementPage;
