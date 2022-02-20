import React from "react";

import ErrorComponent from "../components/Errors/ErrorComponent";
import Constants from "../utils/Constants";

const ErrorPage = () => (
    <ErrorComponent
        title={"Unexpected error"}
        message={"Something unexpected prevented us from fulfilling your request."}
        email={Constants.CONTACT_US_EMAIL}
    />
);

export default ErrorPage;
