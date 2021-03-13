import React from "react";
import PropTypes from "prop-types";

export default (controller, controllerParams, Context) => {

    const { controllerOptions, ...controllerOutput } = controller(controllerParams);

    const ContextProvider = ({ children }) => (
        <Context.Provider value={controllerOptions?.initialValue || {}}>
            {children}
        </Context.Provider>
    );
    ContextProvider.propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
    };

    return {
        ...controllerOutput,
        ContextProvider,
    };
};
