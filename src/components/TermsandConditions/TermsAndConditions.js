import React from "react";
import {
    DialogContent,
    CardContent,
    makeStyles,
} from "@material-ui/core";
import { useMobile } from "../../utils/media-queries";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: "white",
        padding: theme.spacing(4),
    },
}));


const TermsAndConditionsComponent = () => {
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
export default TermsAndConditionsComponent;
