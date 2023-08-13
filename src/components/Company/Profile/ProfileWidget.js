import React from "react";
import PropTypes from "prop-types";

const ProfileWidget = ({ company, loading }) => {
    if (loading)
        return <></>;

    return (
        <div>
            {`Company: ${company?.name}`}
        </div>
    );
};

ProfileWidget.propTypes = {
    company: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

export default ProfileWidget;
