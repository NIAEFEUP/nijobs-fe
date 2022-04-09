import { makeStyles } from "@material-ui/core";
import React from "react";
import RulesComponent from "../components/RulesPage";
import { useMobile } from "../utils/media-queries";

const useStyles = (isMobile) => makeStyles((theme) => ({
    rules: {
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(10),
    },
}));

export const RulesPage = () => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();

    return (
        <div className={classes.rules}>
            <RulesComponent />
        </div>);
};

export default RulesPage;
