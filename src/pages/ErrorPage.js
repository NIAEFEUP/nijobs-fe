import React from "react";

import ErrorComponent from "../components/Errors/ErrorComponent";

const NotFound = () => (
    <ErrorComponent
        title={"Unexpected error"}
        message={"Something unexpected prevented us from fulfilling your request."}
        email={"ni@aefeup.pt"}
    />
);

export default NotFound;
