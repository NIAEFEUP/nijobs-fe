import { makeStyles } from "@material-ui/core";
import React from "react";
import RulesComponent from "../components/RulesPage";

const useStyles = makeStyles((theme) => ({
    rules: {
        padding: theme.spacing(4),
    },
}));

export const RulesPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.rules}>
            <RulesComponent />
        </div>);
};

export default RulesPage;
