import React, { Component } from "react";

import ErrorComponent from "../components/Errors/ErrorComponent";

class NotFound extends Component {

    render() {
        return (
            <ErrorComponent title={"Page not found"} message={"Sorry, no page could be found at this address (404)"} />
        );
    }
}

export default NotFound;
