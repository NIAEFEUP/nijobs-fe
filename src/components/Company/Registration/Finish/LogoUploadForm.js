import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    Grid,
    makeStyles,
    Slider,
} from "@material-ui/core";
import Cropper from "react-easy-crop";
import { CloudUpload } from "@material-ui/icons";
import { FinishCompanyRegistrationControllerContext } from "./FinishCompanyRegistrationWidget";

const useStyles = makeStyles(() => ({
    logoPreview: {
        width: "100%",
    },
    cropperWrapper: {
        position: "relative",
        height: "200px",
    },
}));

export const useLogoUpload = () => {
    const [logoPreview, setLogoPreview] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [selectedFile, setSelectedFile] = useState(undefined);
    useEffect(() => {
        if (!selectedFile) {
            setLogoPreview(undefined);
            return () => {};
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setLogoPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile, setLogoPreview]);

    const validateStep = useCallback(() => selectedFile !== undefined, [selectedFile]);

    return {
        logoPreview,
        setLogoPreview,
        croppedAreaPixels,
        setCroppedAreaPixels,
        crop,
        setCrop,
        zoom,
        setZoom,
        selectedFile,
        setSelectedFile,
        validateStep,
    };
};

const LogoPreview = ({ img, setCroppedAreaPixels }) => {
    const classes = useStyles();

    const {
        crop,
        setCrop,
        zoom,
        setZoom,
    } = useContext(FinishCompanyRegistrationControllerContext);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [setCroppedAreaPixels]);

    const handleZoomChange = (event, newValue) => {
        setZoom(newValue);
    };

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

const LogoUploadForm = () => {

    const {
        selectedFile,
        setSelectedFile,
        logoPreview,
        setCroppedAreaPixels,
        register,
        errors,
    } = useContext(FinishCompanyRegistrationControllerContext);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    return (
        <Grid container>
            <Grid item xs={12} sm={5}>
                {selectedFile &&
                <LogoPreview
                    img={logoPreview}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                /> }
            </Grid>
            <Grid item xs={12} sm="auto">
                <input
                    name="logo"
                    ref={register}
                    hidden
                    accept=".png,.jpg,.jpeg"
                    id="raised-button-file"
                    type="file"
                    onChange={onSelectFile}
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
                <p>
                    {errors?.logo?.message}
                </p>
            </Grid>
        </Grid>
    );
};

export default LogoUploadForm;
