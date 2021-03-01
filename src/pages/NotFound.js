import React, { Component } from "react";

import { MainMask } from "../components/HomePage/MainMask";
import CenteredComponent from "../components/HomePage/CenteredComponent";

class NotFound extends Component {

    render() {
        return (
            <React.Fragment>
                <MainMask/>
                    <CenteredComponent>
                        Oh no! Someone took this page away!
                    </CenteredComponent>
            </React.Fragment>
        );
    }
}

export default NotFound;

