import React from "react";
import PropTypes from "prop-types";
import CompanyDetails from "./CompanyDetails";
import useProfileStyles from "./ProfileStyles";
import ProfileActions from "./ProfileActions";

const ProfileWidget = ({ company, loading }) => {
    const classes = useProfileStyles();

    return (
        <div className={classes.profileWidget}>
            <CompanyDetails
                company={company}
                loading={loading}
            />
            <ProfileActions
                company={company}
            />
        </div>
    );
};

ProfileWidget.propTypes = {
    company: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

export default ProfileWidget;
