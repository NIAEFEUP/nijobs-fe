import React from "react";
import PropTypes from "prop-types";
import AdvancedSearchDesktop from "./AdvancedSearchDesktop";
import AdvancedSearchMobile from "./AdvancedSearchMobile";

const AbstractAdvancedSearch = ({ mobile, ...otherProps }) => (
    <React.Fragment>
        {mobile ?
            <AdvancedSearchMobile
                {...otherProps}
            />
            :
            <AdvancedSearchDesktop
                {...otherProps}
            />
        }
    </React.Fragment>
);

AbstractAdvancedSearch.propTypes = {
    mobile: PropTypes.bool,
};

export default AbstractAdvancedSearch;
