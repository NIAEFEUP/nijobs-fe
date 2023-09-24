import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    CardHeader,
    CardContent,
    DialogContent,
    Grid,
    FormControl,
    Typography,
    Button,
    TextField,
    Avatar,
    makeStyles,
    Box,
} from "@material-ui/core";
import { useMobile } from "../../../utils/media-queries";
import useOfferFormStyles from "../../../components/Offers/Form/form-components/offerStyles";
import { editCompany } from "../../../services/companyEditService";
import TextEditorComponent from "../../Offers/Form/form-components/TextEditorComponent";
import { Controller, useForm, useWatch } from "react-hook-form";
import useCompany from "../../../hooks/useCompany";
import useSession from "../../../hooks/useSession";
import { Redirect, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { yupResolver } from "@hookform/resolvers/yup";
import EditCompanySchema from "./EditCompanySchema";
import MultiOptionTextField from "../../utils/form/MultiOptionTextField";
import LogoUploadForm, { turnImgIntoFile } from "../Registration/Finish/LogoUploadForm";
import { useContacts } from "../Registration/Finish/ContactsForm";
import { FinishCompanyRegistrationController, FinishCompanyRegistrationControllerContext } from "../Registration/Finish/FinishCompanyRegistrationWidget";
import { useLogoUpload } from "../Registration/Finish/LogoUploadForm";
import { CloudUpload, Edit } from "@material-ui/icons";
import getCroppedImg from "../../utils/image/cropImage";

const useStyles = makeStyles((theme) => ({
    submitBtn: {
        marginTop: theme.spacing(2),
    },
    avatar: {
        marginBottom: theme.spacing(1),
        height: "5em",
        width: "5em",
    },
}));

export const EditCompanyControllerContext = React.createContext();

const EditImageText = () => <>
    <Box
        marginY={2}
    >
        <Typography align="center" variant="h6">
            {"Upload your Company's logo."}
        </Typography>
    </Box>
</>;

const EditImage = ({ classname, image, imageAlt }) => {
    const {
        logoUploadOptions,
        register,
        errors,
    } = useContext(EditCompanyControllerContext);

    const [editingImage, setEditingImage] = useState(false);

    return editingImage ?
        <FinishCompanyRegistrationControllerContext.Provider value={{ logoUploadOptions, register, errors }}>
            <LogoUploadForm InfoText={EditImageText} />
        </FinishCompanyRegistrationControllerContext.Provider>
        :
        (<>
            <Box
                align="center"
            >
                <Avatar
                    alt={imageAlt}
                    src={image}
                    className={classname}
                />
                <Button
                    onClick={() => setEditingImage(true)}
                    variant="contained"
                    component="span"
                    color="primary"
                    startIcon={<Edit />}
                >
                    Edit
                </Button>
            </Box>
        </>
        );
};

const getParsedCompanyContacts = (contacts) => {
    const newContacts = [];
    for (const contact of contacts) {
        newContacts.push(contact.value);
    }

    return newContacts;
};

const parseCompany = ({
    contacts,
    ...company
}) => ({
    contacts: contacts.map((value) => ({ value })),
    ...company,
});

const getCorrectEditedImage = (logoUploadOptions, logo) => {
    if (!logoUploadOptions.logoPreview) {

    }
};

export const EditCompanyController = () => {
    const { id } = useParams();
    const { company, error: companyError, loading: loadingCompany } = useCompany(id);
    const { data: user, isValidating } = useSession();
    let canEditRaceControl = false;

    const { handleSubmit, control, reset, getValues, register, watch, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(EditCompanySchema),
        defaultValues: {
            logo: undefined,
            name: "",
            contacts: [],
            bio: "",
        },
        reValidateMode: "onChange",
    });

    const fields = useWatch({ control });

    const shouldRevalidateEditingPermissions = useCallback(() => user?.isAdmin || user?.company?._id === id, [id, user]);

    const [canEdit, setCanEdit] = useState(shouldRevalidateEditingPermissions());

    useEffect(() => {
        setCanEdit(shouldRevalidateEditingPermissions());
        if (!loadingCompany && !isValidating) {
            canEditRaceControl = true;
        }
    }, [shouldRevalidateEditingPermissions, loadingCompany, company, user]);

    useEffect(() => {
        if (company && !isValidating && canEdit) {
            reset(parseCompany(company));
        }
    }, [canEdit, isValidating, company, reset]);

    const location = useLocation();
    const redirectProps = {
        to: {
            pathname: "/",
            state: {
                from: location,
                message: "You are not authorized to edit this company.",
            },
        },
    };

    const submit = async (data) => {
        const contacts = getParsedCompanyContacts(data.contacts);

        const croppedImage = logoUploadOptions.logoPreview ? await
            getCroppedImg(
                logoUploadOptions.logoPreview,
                logoUploadOptions.croppedAreaPixels,
                0
            ) : undefined;

        editCompany({ ...data, contacts: contacts, logo: croppedImage }).then(() => {

        }).catch((err) => {

        });

    };

    const logoUploadOptions = useLogoUpload({ control, watch });

    return {
        controllerOptions: {
            initialValue: {
                canEdit,
                company,
                redirectProps,
                loadingCompany,
                companyError,
                isValidating,
                canEditRaceControl,
                control,
                fields,
                getValues,
                logoUploadOptions,
                register,
                errors,
                submit: handleSubmit(submit),
            },
        },
    };
};

const EditCompanyProfileForm = ({ title }) => {
    const isMobile = useMobile();
    const formCardClasses = useOfferFormStyles(isMobile)();

    const {
        company,
        loadingCompany,
        companyError,
        canEdit,
        redirectProps,
        isValidating,
        canEditRaceControl,
        control,
        getValues,
        submit,
        register,
        errors,
    } = useContext(EditCompanyControllerContext);

    const classes = useStyles();

    const { fields: contacts, append, remove } = useContacts({ control });

    const Content = isMobile ? DialogContent : CardContent;

    if (companyError || (!loadingCompany && !isValidating && !canEdit && canEditRaceControl)) {
        return <Redirect {...redirectProps} />;
    }

    return <>
        <div className={formCardClasses.formCard}>
            <CardHeader title={title} />
            <Content className={formCardClasses.formContent}>
                <Grid container className={formCardClasses.formArea}>
                    <Grid item xs={12}>
                        <form
                            onSubmit={submit}
                        >
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <EditImage
                                        image={company?.logo}
                                        imageAlt={`${company?.name}'s logo`}
                                        classname={classes.avatar}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        render={(
                                            { field: {
                                                onChange, onBlur, ref, name, value,
                                            } }
                                        ) => (
                                            <TextField
                                                label="Name"
                                                name={name}
                                                id={name}
                                                inputRef={ref}
                                                onBlur={onBlur}
                                                value={value}
                                                fullWidth
                                                required
                                                autoFocus
                                                onChange={onChange}
                                            />
                                        )}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MultiOptionTextField
                                        values={contacts}
                                        control={control}
                                        controllerName="contacts"
                                        getValues={getValues}
                                        onAdd={append}
                                        onRemove={remove}
                                        itemLabelPrefix="Contact #"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="bio"
                                        render={(
                                            { field: { onChange, onBlur, ref, name, value } },
                                        ) => (
                                            <TextField
                                                name={name}
                                                value={value}
                                                label="Company Bio"
                                                id="bio"
                                                // error={!!errors.bio}
                                                inputRef={ref}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                multiline
                                                // helperText={
                                                //     `${value?.length}/${FinishCompanyRegistrationConstants.bio.maxLength} ${errors.bio?.message || ""}`
                                                // }
                                                rows={5}
                                                variant="outlined"
                                                FormHelperTextProps={{
                                                    style: {
                                                        marginLeft: 0,
                                                    },
                                                }}
                                                fullWidth
                                            />)}
                                        control={control}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                disabled={loadingCompany}
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.submitBtn}
                            >
                                Submit
                            </Button>
                            <div className={formCardClasses.requiredFields}>
                                <Typography>* Required fields</Typography>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Content>
        </div>

    </>;
};

EditCompanyProfileForm.propTypes = {
    title: PropTypes.string,
};

export default EditCompanyProfileForm;
