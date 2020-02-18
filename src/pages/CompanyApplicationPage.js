import React from "react";
import useForm from "../hooks/useForm";
import * as yup from "yup";
import { TextField, makeStyles, Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";

import {
    CompanyApplicationConstants,
    ValidationReasons,
    generateValidationRule,
} from "../components/Apply/Company/CompanyApplicationUtils";

const CompanyApplicationSchema = yup.object().shape({
    email: yup.string()
        .required(ValidationReasons.REQUIRED)
        .email(ValidationReasons.EMAIL),
    password: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("password", "minLength", ValidationReasons.TOO_SHORT)),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    motivation: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("motivation", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("motivation", "maxLength", ValidationReasons.TOO_LONG)),
    companyName: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("companyName", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("companyName", "maxLength", ValidationReasons.TOO_LONG)),
});

import { MainMask } from "../components/HomePage/MainMask";


const useStyles = makeStyles((theme) => ({
    formWrapper: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        width: "60%",
    },
    formContent: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(10),
        paddingBottom: 0,
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(5, 10),
    },
    motivation: {
        marginTop: theme.spacing(4),
    },
}));

const CompanyApplicationPage = () => {

    const { register, handleSubmit, errors, watch } = useForm({
        mode: "onBlur",
        validationSchema: CompanyApplicationSchema,
        reValidateMode: "onChange",
    });
    const onSubmit = (data) => console.log("submitted", data);

    const classes = useStyles();

    const motivation = watch("motivation") || "";

    return (
        <>
            <MainMask/>
            <div className={classes.formWrapper}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <Card>
                        <CardHeader
                            title="Company Application"
                        />
                        <CardContent className={classes.formContent}>
                        Show title here (?)
                            <TextField
                                label="Email"
                                name="email"
                                error={!!errors.email}
                                inputRef={register}
                                helperText={errors.email ? errors.email.message : <span/>}
                                margin="dense"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                error={!!errors.password}
                                inputRef={register}
                                helperText={errors.password ? errors.password.message : <span/>}
                                margin="dense"
                            />
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                error={!!errors.confirmPassword}
                                inputRef={register}
                                helperText={errors.confirmPassword ? errors.confirmPassword.message : <span/>}
                                margin="dense"
                            />
                            <TextField
                                label="Company Name"
                                name="companyName"
                                error={!!errors.companyName}
                                inputRef={register}
                                helperText={errors.companyName ? errors.companyName.message : <span/>}
                                margin="dense"
                            />
                            <TextField
                                className={classes.motivation}
                                label="Motivation"
                                name="motivation"
                                placeholder="Tell us about the company. How do you think nijobs can help you achieve your goal?"
                                multiline
                                error={!!errors.motivation}
                                inputRef={register}
                                helperText={
                                    `${motivation.length}/${CompanyApplicationConstants.motivation.maxLength} ${errors.motivation ?
                                        errors.motivation.message
                                        : ""}`
                                }
                                rows={5}
                                variant="outlined"
                                FormHelperTextProps={{
                                    style: {
                                        marginLeft: 0,
                                    },
                                }}
                            />

                        </CardContent>
                        <CardActions className={classes.buttonsArea}>
                            <Button type="reset" color="secondary">Reset</Button>
                            <Button type="submit" variant="contained" color="primary">Apply</Button>
                        </CardActions>

                    </Card>
                </form>
            </div>
        </>

    );
};

export default CompanyApplicationPage;
