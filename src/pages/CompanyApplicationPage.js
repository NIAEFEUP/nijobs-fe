import React from "react";
import useForm from "../hooks/useForm";
import * as yup from "yup";
import {
    TextField,
    makeStyles,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Link,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from "@material-ui/core";

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
import useToggle from "../hooks/useToggle";


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
    formCard: {
        padding: theme.spacing(10),
        paddingBottom: theme.spacing(2),
    },
    formContent: {
        display: "flex",
        flexDirection: "column",
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(3, 2),
    },
    motivation: {
        marginTop: theme.spacing(5),
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

    const [showWhyModal, toggleWhyModal] = useToggle(false);

    const openWhyModal = (e) => {
        e.preventDefault();
        toggleWhyModal();
    };

    return (
        <>
            <MainMask/>
            <div className={classes.formWrapper}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    make me a company application form component
                    <Card className={classes.formCard}>
                        <CardHeader
                            title="Company Application"
                            subheader={
                                <Link
                                    href=""
                                    onClick={openWhyModal}
                                    variant="body2"
                                >
                                    Why do I need to apply?
                                </Link>
                            }
                        />
                        <CardContent className={classes.formContent}>
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
                                key="Motivation"
                                label="Motivation"
                                name="motivation"
                                placeholder="Tell us about the company. How do you think NIJobs can help you achieve your goal?"
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
            <Dialog open={showWhyModal}>
                <DialogTitle>
                    Why do I need to apply?
                </DialogTitle>
                <DialogContent style={{ textAlign: "justify" }}>
                    <p>
                        {"NIJobs is a free platform for companies to share their job opportunities with students."}
                    </p>
                    <p>
                        {"As this is made by students, for students, we oversee the entries \
                        so that we can make sure that both our and the participating companies' expectations are satisfied."}
                    </p>
                    <p>
                        {"For now, we only need you to provide an email, so that we can contact you regarding your application, \
                        and a password, (keep in mind that you will need it to enter NIJobs if accepted, but you can change it later)."}
                    </p>
                    <p>
                        {"Additionally, we also request a Company Name, so that we can better identify you, \
                        and a motivation text: here you can talk about your company: what do you do, \
                        why do you want to apply as NIJobs Company, share your website/social networks, etc..."}
                    </p>
                    <p>
                        {"Once you're accepted, you will receive an email from us and you \
                        will be able to further customize your profile (Add a nice Bio, and a Company Logo)"}
                    </p>
                    <p>
                        {"See you soon!"}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleWhyModal} color="primary" variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
        </>

    );
};

export default CompanyApplicationPage;
