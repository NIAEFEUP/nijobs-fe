import { Card } from "@material-ui/core";
import React from "react";
import CenteredComponent from "../HomePage/CenteredComponent";
import { MainMask } from "../HomePage/MainMask";
import Navbar from "../Navbar";
import ContactSection from "./ContactSection";

const DesktopLayout = ({ children, showHomePageLink }) => (
    <React.Fragment>
        <Navbar showHomePageLink={showHomePageLink} desktopLayout />
        <MainMask />
        <CenteredComponent>
            <Card>
                {children}
            </Card>
        </CenteredComponent>
        <ContactSection />

    </React.Fragment>
);

export default DesktopLayout;
