import React from "react";
import useForm from "../hooks/useForm";
import * as yup from "yup";
import { TextField, makeStyles, Button, Card, CardActions, CardContent } from "@material-ui/core";

const FormSchema = yup.object().shape({
    // CREATE GENERIC VALIDATION REASONS LIKE BACKEND
    email: yup.string().required().email("Must be a valid email."),
    password: yup.string().required().min(8, "Must have at least 8 characters."),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    motivation: yup.string().required().min(10).max(1500),
    companyName: yup.string().required().min(3).max(50),
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
}));

const CompanyApplicationPage = () => {

    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
        validationSchema: FormSchema,
        reValidateMode: "onChange",
    });
    const onSubmit = (data) => console.log("submitted", data);

    const classes = useStyles();

    return (
        <>
            <MainMask/>
            <div className={classes.formWrapper}>
                {/* TODO generalize main mask component to be reused between pages */}
                {/* <div className={mainViewClasses.mainMask} /> */}
            Show logo here
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <Card>
                        <CardContent className={classes.formContent}>
                        Show title here (?)
                            <TextField
                                label="Email"
                                name="email"
                                error={!!errors.email}
                                inputRef={register}
                                helperText={errors.email && errors.email.message}
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                error={!!errors.password}
                                inputRef={register}
                                helperText={errors.password && errors.password.message}
                                margin="normal"
                            />
                            {/* TODO validate passwords match */}
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                error={!!errors.confirmPassword}
                                inputRef={register}
                                helperText={errors.confirmPassword && errors.confirmPassword.message}
                                margin="normal"
                            />
                            <TextField
                                label="Company Name"
                                name="companyName"
                                error={!!errors.companyName}
                                inputRef={register}
                                helperText={errors.companyName && errors.companyName.message}
                                margin="normal"
                            />
                            <TextField
                                label="Motivation"
                                name="motivation"
                                multiline
                                error={!!errors.motivation}
                                inputRef={register}
                                helperText={errors.motivation && errors.motivation.message}
                                margin="normal"
                                rows={2}
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
