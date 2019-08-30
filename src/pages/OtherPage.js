/* istanbul ignore file */
import React, { Component } from "react";
import PropTypes from "prop-types";

class OtherPage extends Component {
    render() {
        return (
            <div>
                This other page has url params! ID =
                {" "}
                {this.props.match.params.id}
            </div>
        );
    }
}

OtherPage.propTypes = {
    match: PropTypes.object,
};

export default OtherPage;
