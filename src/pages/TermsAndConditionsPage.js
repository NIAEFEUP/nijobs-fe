import React from "react";
import { useMobile } from "../utils/media-queries";
import { CardContent, DialogContent, makeStyles } from "@material-ui/core";
import TermsAndConditionsContent from "../components/Offers/New/form-components/Policies/TermsAndConditionsContent";

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(4),
    },
}));

const TermsAndConditionsPage = () => {
    const classes = useStyles();
    const isMobile = useMobile();
    const ContentComponent = isMobile ? DialogContent : CardContent;

    return (
        <div className={classes.content}>
            <ContentComponent>
                <TermsAndConditionsContent />
            </ContentComponent>
        </div>
    );
};
export default TermsAndConditionsPage;
