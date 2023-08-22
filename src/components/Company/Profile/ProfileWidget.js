import React from "react";
import PropTypes from "prop-types";
import CompanyDetails from "./CompanyDetails";
import useProfileWidgetsStyles from "./ProfileWidgetStyles";
import { Divider } from "@material-ui/core";

const ProfileWidget = ({ company, loading }) => {
    const classes = useProfileWidgetsStyles();

    return (
        <div className={classes.profileWidget}>
            <CompanyDetails
                company={company}
                loading={loading}
            />
            <Divider className={classes.divider} />
        </div>
    );
};

ProfileWidget.propTypes = {
    company: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

export default ProfileWidget;
