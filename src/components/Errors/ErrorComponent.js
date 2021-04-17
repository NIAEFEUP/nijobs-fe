import React from "react";
import PropTypes from "prop-types";
import { CardHeader, CardContent, Typography, Link, makeStyles } from "@material-ui/core";


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
                <Link color="secondary" href={`mailto:${email}`}>
                    {email}
                </Link>
            </Typography>
        );
    return null;
};

EmailInfo.propTypes = {
    email: PropTypes.string,
};

const ErrorComponent = ({ title, message, email }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CardHeader title={title} className={classes.title} titleTypographyProps={{ variant: "h4" }} />
            <CardContent className={classes.content}>
                <Typography variant="body1" className={classes.secondText}>
                    {message}
                </Typography>
                <EmailInfo email={email} />
            </CardContent>
        </React.Fragment>
    );
};

ErrorComponent.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    email: PropTypes.string,
};

export default ErrorComponent;
