import React, {useEffect, useState} from "react";
import CompanyOffersManagementWidget from "../components/Company/Offers/Manage/CompanyOffersManagementWidget";
import { CardContent, makeStyles } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { Alert } from "../components/utils/Alert";
import { fetchCompanyApplication } from "../services/companyService";
import useSession from "../hooks/useSession";
import { addSnackbar } from "../actions/notificationActions";

const useStyles = (isMobile) => makeStyles((theme) => ({
    content: {
        padding: isMobile ? theme.spacing(2, 2) : theme.spacing(3, 9),
    },

}));

const CompanyOffersManagementPage = () => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();
    const [application, setApplication] = useState({state: "APPROVED"});
    const session = useSession();

    useEffect(() => {
        if(!session.isValidating && session.isLoggedIn) {
            const request = fetchCompanyApplication(session.data?.company?._id)
                .then((application) => {
                    setApplication(application);
                })
                .catch(() => {
                    addSnackbar({
                        message: "An unexpected error occurred, please try refreshing the browser window.",
                        key: `${Date.now()}-fetchCompanyApplicationsError`,
                    });
                });
            return () => {
                request.cancel();
            };
        }
    }, [addSnackbar, session.isLoggedIn, session.isValidating]);

    return (
        <CardContent className={classes.content}>
            {(application.state !== "APPROVED") && session.isLoggedIn && <Alert type={"warning"}
                                              fontSize={1.2}>{"Your offers will stay hidden from the public until your account is approved!"}</Alert>}
            <CompanyOffersManagementWidget isMobile={isMobile}/>
        </CardContent>
    );
};

export default CompanyOffersManagementPage;
