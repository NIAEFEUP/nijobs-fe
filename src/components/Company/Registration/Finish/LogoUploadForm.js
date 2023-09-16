import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Card, Grid, makeStyles, Slider, Typography } from "@material-ui/core";
import Cropper from "react-easy-crop";
import { CloudUpload } from "@material-ui/icons";
import { FinishCompanyRegistrationControllerContext } from "./FinishCompanyRegistrationWidget";

const useStyles = makeStyles((theme) => ({
    logoPreview: {
        margin: theme.spacing(4, 0),
    },
    cropperWrapper: {
        position: "relative",
        height: "200px",
    },
}));

export const useLogoUpload = ({ watch }) => {
    const [logoPreview, setLogoPreview] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const logoInput = watch("logo")?.[0];

    // Reset zoom/crop on new file upload
    useEffect(() => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    }, [logoInput]);

    useEffect(() => {
        if (!logoInput) {
            setLogoPreview(undefined);
            return () => {};
        } else {

            const objectUrl = URL.createObjectURL(logoInput);
            setLogoPreview(objectUrl);

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
        }

    }, [logoInput, setLogoPreview]);

    const onCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleZoomChange = (event, newValue) => {
        setZoom(newValue);
    };

    const validateStep = useCallback(() => !!logoInput, [logoInput]);

    return {
        logoPreview,
        setLogoPreview,
        croppedAreaPixels,
        setCroppedAreaPixels,
        crop,
        setCrop,
        zoom,
        setZoom,
        onCropComplete,
        handleZoomChange,
        validateStep,
    };
};

const LogoPreview = ({ img }) => {
    const classes = useStyles();

    const { logoUploadOptions } = useContext(FinishCompanyRegistrationControllerContext);
    const {
        crop,
        setCrop,
        zoom,
        setZoom,
        onCropComplete,
        handleZoomChange,
    } = logoUploadOptions;


    return (
        <Card>
            <div className={classes.cropperWrapper}>
                <Cropper
                    image={img}
                    crop={crop}
                    zoom={zoom}
                    minZoom={0.5}
                    maxZoom={3}
                    aspect={1}
                    restrictPosition={false}
                    cropShape="round"
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <Slider
                value={zoom}
                onChange={handleZoomChange}
                max={3}
                min={0.5}
                step={0.1}
            />
        </Card>
    );
};

LogoPreview.propTypes = {
    img: PropTypes.string,
};

const LogoUploadForm = () => {

    const {
        logoUploadOptions,
        register,
        errors,
    } = useContext(FinishCompanyRegistrationControllerContext);

    const {
        logoPreview,
        setCroppedAreaPixels,
    } = logoUploadOptions;

    const classes = useStyles();

    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {"Upload your Company's logo."}
                    </Typography>
                    <Typography variant="caption" gutterBottom paragraph>
                        {"A picture is worth a thousand words. Is there any better way to represent your brand than your Company's logo?"}
                    </Typography>
                    <Box marginY={1} fontStyle="italic">
                        <Typography variant="caption" gutterBottom paragraph>
                            {"It should be a PNG or JPG file, with no more than 10MB."}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs="auto">
                    <input
                        onChange
                        {...register("logo")}
                        hidden
                        accept=".png,.jpg,.jpeg"
                        id="raised-button-file"
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button
                            variant="contained"
                            component="span"
                            color="primary"
                            startIcon={<CloudUpload />}
                        >
                            Upload
                        </Button>
                    </label>
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                className={classes.logoPreview}
            >
                <Grid item xs={12} sm={4}>
                    {logoPreview &&
                    <LogoPreview
                        img={logoPreview}
                        setCroppedAreaPixels={setCroppedAreaPixels}
                    /> }
                </Grid>
            </Grid>
            <Typography
                variant="caption"
                color="error"
                align="center"
            >
                {errors?.logo?.message}
            </Typography>
        </>
    );
};

export default LogoUploadForm;
