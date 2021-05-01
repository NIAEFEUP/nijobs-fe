import { Avatar, CardContent, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { useMobile } from "../../../../utils/media-queries";
import getCroppedImg from "../../../utils/image/cropImage";
import { FinishCompanyRegistrationControllerContext } from "./FinishCompanyRegistrationWidget";

const useStyles = (isMobile) => makeStyles(() => ({
    companyCard: {
        display: "flex",
        width: isMobile ? "90vw" : "600px",
    },
    details: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
    },
    content: {
        flex: "1 0 auto",
    },
    logoPreview: {
        height: "max-content",
        flexGrow: 1,
        boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
}));

const ReviewForm = () => {
    const {
        logoUploadOptions,
        control,
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
        <>
            <div className={classes.companyCard}>
                <Avatar
                    src={logoURL}
                    alt="Company Logo"
                    className={classes.logoPreview}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
            COMAPNY NAME (PLS CHANGE THIS TO BE DYNAMIC)
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
                </div>
            </div>
        </>
    );
};

export default ReviewForm;
