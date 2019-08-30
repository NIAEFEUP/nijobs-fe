import React from "react";
import PropTypes from "prop-types";

import { Tooltip } from "@material-ui/core";

export const updateRef = (popperRef) => {
    if (popperRef.current) {
        popperRef.current.update();
    }
};

const SliderValueTooltip = ({ children, open, value }) => {

    const popperRef = React.useRef(null);
    React.useEffect(updateRef.bind(null, popperRef));

    return (
        <Tooltip
            PopperProps={{
                popperRef,
            }}
            open={open}
            enterTouchDelay={0}
            placement="bottom"
            title={value}
        >
            {children}
        </Tooltip>
    );
};

SliderValueTooltip.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

export default SliderValueTooltip;
