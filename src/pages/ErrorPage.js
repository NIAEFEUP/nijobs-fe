import React from "react";

import ErrorComponent from "../components/Errors/ErrorComponent";

const ErrorPage = () => (
    <ErrorComponent message={"Something unexpected prevented us from fulfilling your request.Please try again later, and if the problem persists, contact us at ni@aefeup.pt"}/>
);

export default ErrorPage;
