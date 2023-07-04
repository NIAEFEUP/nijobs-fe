import React, {useEffect, useState} from "react";
import CompanyOffersManagementWidget from "../components/Company/Offers/Manage/CompanyOffersManagementWidget";
import { CardContent, makeStyles } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { Alert } from "../components/utils/Alert";
import { fetchCompanyApplicationState } from "../services/companyService";
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
    const [state, setState_] = useState( "APPROVED");
    const session = useSession();

    useEffect(() => {
        if(!session.isValidating && session.isLoggedIn) {
            const request = fetchCompanyApplicationState(session.data?.company?._id)
                .then((state_) => {
                    console.log(state_);
                    console.log("Tipo");
                    console.log(typeof state_);
                    setState_(state_);
                    console.log(state);

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
            {(state !== "APPROVED") && session.isLoggedIn && <Alert type={"warning"}
                                              fontSize={1.2}>{"Your offers will stay hidden from the public until your account is approved!"}</Alert>}
            <CompanyOffersManagementWidget isMobile={isMobile}/>
        </CardContent>
    );
};

export default CompanyOffersManagementPage;
