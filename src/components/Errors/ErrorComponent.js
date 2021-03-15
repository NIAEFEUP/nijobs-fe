import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, Typography, Link, makeStyles } from "@material-ui/core";

import { MainMask } from "../HomePage/MainMask";
import CenteredComponent from "../HomePage/CenteredComponent";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    content: {
        marginLeft: theme.spacing(1),
    },
    secondText: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

const EmailInfo = ({ email }) => {
    const classes = useStyles();
    if (email)
        return (
            <Typography variant="body1" className={classes.secondText}>
                Please try again later, and if the problem persists, contact us at
                {" "}
                <Link color="secondary" href="mailto:ni@aefeup.pt">
                    {email}
                </Link>
            </Typography>
        );
    return <Typography />;
};

EmailInfo.propTypes = {
    email: PropTypes.string,
};

const ErrorComponent = ({ title, message, email }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <MainMask />
            <CenteredComponent>
                <Card elevation={8}>
                    <CardHeader title={title} className={classes.title} titleTypographyProps={{ variant: "h4" }} />
                    <CardContent className={classes.content}>
                        <Typography variant="body1" className={classes.secondText}>
                            {message}
                        </Typography>
                        <EmailInfo email={email} />
                    </CardContent>
                </Card>
            </CenteredComponent>
        </React.Fragment>
    );
};

ErrorComponent.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    email: PropTypes.string,
};

export default ErrorComponent;
