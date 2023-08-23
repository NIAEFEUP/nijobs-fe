import React from "react";
import PropTypes from "prop-types";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import useProfileStyles from "./ProfileStyles";


const CompanyDetails = ({ company, loading }) => {
    const classes = useProfileStyles();

    return (
        <div className={classes.companyDetails}>
            <Grid container spacing={4} alignItems="center">
                <Grid item /* xs={8} */ xs={12} className={classes.companyDescription}>
                    {
                        loading ?
                            <>
                                <Skeleton variant="circle">
                                    <Avatar className={classes.companyLogoSkeleton} />
                                </Skeleton>
                                <div className={classes.companyText}>
                                    <Typography variant="h4">
                                        <Skeleton variant="text" width="5em" className={classes.textSkeleton} />
                                    </Typography>
                                    <Typography variant="body1">
                                        <Skeleton variant="text" width="20em" className={classes.textSkeleton} />
                                    </Typography>
                                </div>
                            </>
                            :
                            <>
                                <Avatar
                                    src={company.logo}
                                    className={classes.companyLogo}
                                />
                                <div className={classes.companyText}>
                                    <Typography variant="h4" className={classes.companyName}>
                                        {company.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {`${company.bio}`}
                                    </Typography>
                                </div>
                            </>
                    }
                </Grid>
                {/* <Grid item xs={4}>
                    {
                        loading ?
                            <Skeleton variant="rect" height="50px" />
                            :
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
                    }
                </Grid> */}
            </Grid>
        </div>
    );
};


CompanyDetails.propTypes = {
    company: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};


export default CompanyDetails;
