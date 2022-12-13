import React from "react";
import PropTypes from "prop-types";

export const MockedReactMarkdown = ({ children }) =>
    <>
        {children}
    </>;

MockedReactMarkdown.propTypes = {
    children: PropTypes.any,
};
