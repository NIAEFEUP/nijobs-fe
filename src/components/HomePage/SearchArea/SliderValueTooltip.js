import React from 'react';
import PropTypes from 'prop-types';

import {Tooltip} from '@material-ui/core';

const SliderValueTooltip = ({children, open, value}) => {
  
    const popperRef = React.useRef(null);
    React.useEffect(() => {
        if (popperRef.current) {
            popperRef.current.update();
        }
    });
  
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