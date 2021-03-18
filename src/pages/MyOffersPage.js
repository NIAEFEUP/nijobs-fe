import React from "react";
import { Paper } from "@material-ui/core";
import CenteredComponent from "../components/HomePage/CenteredComponent";
import { MainMask } from "../components/HomePage/MainMask";

export const MyOffersPage = () => (
    <>
        <MainMask />
        <CenteredComponent>
            <Paper style={{ width: "60%", padding: "24px 72px", boxSizing: "content-box" }}>
                <h1>My Offers Page</h1>
            </Paper>
        </CenteredComponent>
    </>
);

export default MyOffersPage;
