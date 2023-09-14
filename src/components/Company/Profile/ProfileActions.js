import React, { useState } from "react";
import PropTypes from "prop-types";
import useProfileStyles from "./ProfileStyles";
import { Button, Divider, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Contacts, Work } from "@material-ui/icons";

const Actions = {
    None: 0,
    ShowOffers: 1,
    ShowContacts: 2,
};

const getExtraContent = (action, classes, company) => {
    switch (action) {
        case Actions.ShowOffers:
            return (
                <span>
                    Offers
                </span>
            );
        case Actions.ShowContacts:
            return (
                <div className={classes.companyContacts}>
                    <Typography variant="h6">
                        Contacts:
                    </Typography>
                    <Typography variant="body1">
                        <ul>
                            {company.contacts.map((contact) =>
                                <li key={contact}>
                                    {contact}
                                </li>
                            )}
                        </ul>
                    </Typography>
                </div>
            );
        case Actions.None:
        default:
            return <></>;
    }
};

const ProfileActions = ({ company, loading }) => {
    const classes = useProfileStyles();
    const [action, setAction] = useState(Actions.None);

    return loading ?
        <Skeleton variant="rect" width="100%" height="24px" />
        :
        <div className={classes.profileActions}>
            <div className={classes.actionsHeader}>
                <Button
                    variant="text"
                    className={classes.textButton}
                    onClick={() => setAction(Actions.ShowOffers)}
                >
                    <Typography
                        color="primary"
                        style={{ fontWeight: action === Actions.ShowOffers && "bold" }}
                    >
                        <Work />
                        &ensp;Offers
                    </Typography>
                </Button>
                <Button
                    variant="text"
                    className={classes.textButton}
                    onClick={() => setAction(Actions.ShowContacts)}
                >
                    <Typography
                        color="primary"
                        style={{ fontWeight: action === Actions.ShowContacts && "bold" }}
                    >
                        <Contacts />
                        &ensp;Contacts
                    </Typography>
                </Button>
            </div>
            <Divider className={classes.divider} />
            { getExtraContent(action, classes, company) }
        </div>;
};

ProfileActions.propTypes = {
    company: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

export default ProfileActions;
