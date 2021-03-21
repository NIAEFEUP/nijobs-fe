import React from "react";
import { Card, makeStyles } from "@material-ui/core";
import CenteredComponent from "../components/HomePage/CenteredComponent";
import { MainMask } from "../components/HomePage/MainMask";

const useStyles = makeStyles(() => ({
    cardContainer: {
        width: "60%",
        padding: "24px 72px",
        boxSizing: "content-box",
    },
}));

export const MyOffersPage = () => {
    const classes = useStyles();
    return (
        <>
            <MainMask />
            <CenteredComponent>
                <Card className={classes.cardContainer}>
                    <h1>My Offers Page</h1>
                </Card>
            </CenteredComponent>
        </>
    );
};


export default MyOffersPage;
