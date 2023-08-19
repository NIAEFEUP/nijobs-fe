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
import TextEditorComponent from "../../Offers/Form/form-components/TextEditorComponent";
import useOffer from "../../../hooks/useOffer";
import { Controller, useForm } from "react-hook-form";
import useCompany from "../../../hooks/useCompany";
import useSession from "../../../hooks/useSession";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { yupResolver } from "@hookform/resolvers/yup";
import EditCompanySchema from "./EditCompanySchema";
import MultiOptionTextField from "../../utils/form/MultiOptionTextField";
import LogoUploadForm from "../Registration/Finish/LogoUploadForm";
import { useContacts } from "../Registration/Finish/ContactsForm";

export const EditCompanyControllerContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    submitBtn: {
        marginTop: theme.spacing(2)
    }
}));

export const EditCompanyController = () => {

};

const EditCompanyProfileForm = ({ title }) => {
    const isMobile = useMobile();
    const formCardClasses = useOfferFormStyles(isMobile)();

    const classes = useStyles();

    const { id } = useParams();
    const { company } = useCompany(id);

    const { control } = useForm({
        mode: "all",
        resolver: yupResolver(EditCompanySchema),
        reValidateMode: "onChange",
    });

    const { fields, append, remove } = useContacts({ control });

    const getContacts = useCallback(() => {
        if (!company) return [{}];

        const contacts = company.contacts;

        const result = [];
        for (let i = 0; i < contacts.length; i++) {
            result.push({
                id: i,
                value: contacts[i],
            });
        }

        return result;
    }, [company]);

    const Content = isMobile ? DialogContent : CardContent;

    return <>
        <div className={formCardClasses.formCard}>
            <CardHeader title={title} />
            <Content className={formCardClasses.formContent}>
                <Grid container spacing={4} className={formCardClasses.formArea}>
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            justifyContent="center"
                        >
                            <Avatar
                                alt={`${company?.name}'s logo`}
                                src={company?.logo}
                                style={{ height: '5em', width: '5em' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            value={company?.name}
                            fullWidth
                            required
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MultiOptionTextField
                            control={control}
                            controllerName="contacts"
                            values={getContacts()}
                            onAdd={append}
                            onRemove={remove}
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
                    // disabled={loading || formDisabled}
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
            </Content>
        </div>

    </>;
};

EditCompanyProfileForm.propTypes = {
    title: PropTypes.string
}

export default EditCompanyProfileForm;
