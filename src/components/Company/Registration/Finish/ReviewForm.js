import { Avatar, Box, Button, CardContent, makeStyles, Typography } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { RouterLink } from "../../../../utils";
import { useMobile } from "../../../../utils/media-queries";
import getCroppedImg from "../../../utils/image/cropImage";
import { getHumanError } from "./FinishCompanyRegistrationUtils";
import { FinishCompanyRegistrationControllerContext } from "./FinishCompanyRegistrationWidget";

const useStyles = (isMobile) => makeStyles((theme) => ({
    companyCard: {
        display: "flex",
        width: isMobile ? "90vw" : "600px",
    },
    details: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
    },
    content: {
        flex: "1 0 auto",
    },
    logoPreview: {
        height: "max-content",
        flexGrow: 1,
        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    successIcon: {
        fontSize: "8rem",
        color: theme.palette.secondary.main,
    },
}));

const ReviewInfo = () => {

    const {
        logoUploadOptions,
        control,
        submissionErrors,
        companyName,
    } = useContext(FinishCompanyRegistrationControllerContext);

    const [bio, contacts] = useWatch({
        control,
        name: ["bio", "contacts"],
    });

    const [logoURL, setLogoURL] = useState(null);

    useEffect(() => {
        getCroppedImg(
            logoUploadOptions.logoPreview,
            logoUploadOptions.croppedAreaPixels,
            0
        ).then((croppedImage) => {
            const objectUrl = URL.createObjectURL(croppedImage);
            setLogoURL(objectUrl);
        });

    }, [logoUploadOptions.croppedAreaPixels, logoUploadOptions.logoPreview]);

    useEffect(() => () => URL.revokeObjectURL(logoURL), [logoURL]);

    const classes = useStyles(useMobile())();

    return (
        <div className={classes.companyCard}>
            <Avatar
                src={logoURL}
                alt="Company Logo"
                className={classes.logoPreview}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {companyName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {bio}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h6">
                        Contacts
                    </Typography>
                    <ul>
                        {contacts.map((c, i) =>
                            <li key={i}>
                                {c.value}
                            </li>
                        )}
                    </ul>
                </CardContent>
                {submissionErrors && submissionErrors.map(({ msg }) => (
                    <Typography key={msg} variant="caption" color="error">
                        {getHumanError[msg]}
                    </Typography>
                ))}
            </div>
        </div>
    );
};

const SuccessMessage = () => {

    const isMobile = useMobile();
    const classes = useStyles(isMobile)();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            height="100%"
            pt={isMobile && 6}
        >
            <CheckCircleOutline className={classes.successIcon} />
            <Typography paragraph>
                {"You're all set! You can now use NIJobs as a Company."}
            </Typography>
            <Box my={2}>
                <Button
                    underline="none"
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/offers/new"
                >
                    Create Offer
                </Button>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
                <Box px={4}>
                    <RouterLink to="/rules" target="_blank" rel="noopener noreferrer">Read the Rules</RouterLink>
                </Box>
                <Box px={4}>
                    <RouterLink to="/">Go to Homepage</RouterLink>
                </Box>
            </Box>
        </Box>
    );
};

const ReviewForm = () => {
    const {
        succeeded,
    } = useContext(FinishCompanyRegistrationControllerContext);

    return (
        <>
            {succeeded ? <SuccessMessage /> : <ReviewInfo />}

        </>
    );
};

export default ReviewForm;
