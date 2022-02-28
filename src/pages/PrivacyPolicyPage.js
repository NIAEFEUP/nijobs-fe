import React from "react";
import {
    DialogContent,
    CardContent,
    makeStyles,
} from "@material-ui/core";
import PrivacyPolicyContent from "../components/Offers/New/form-components/Policies/PrivacyPolicyContent";
import { useMobile } from "../utils/media-queries";

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(4),
    },
}));

const PrivacyPolicyPage = () => {
    const classes = useStyles();
    const isMobile = useMobile();
    const ContentComponent = isMobile ? DialogContent : CardContent;

    return (
        <div className={classes.content}>
            <ContentComponent>
                <PrivacyPolicyContent />
            </ContentComponent>
        </div>
    );
};
export default PrivacyPolicyPage;
