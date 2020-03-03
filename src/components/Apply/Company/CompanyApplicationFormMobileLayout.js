import React from "react";
import { Link, Button, Card, CardContent, CardActions, makeStyles, CardHeader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formCard: {
        minHeight: "100vh",
        padding: theme.spacing(0, 1),
    },
    formContent: {
        display: "flex",
        flexDirection: "column",
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(3, 2),
        paddingTop: 0,
    },
}));

const CompanyApplicationFormMobileLayout = ({
    children,
    openWhyModal,
    submittingApplication,
    onResetButtonClick,
}) => {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.formCard}>
                <CardHeader
                    title="Company Application"
                    subheader={
                        <Link
                            href=""
                            onClick={openWhyModal}
                            variant="body2"
                            color="secondary"
                        >
                                Why do I need to apply?
                        </Link>
                    }
                />
                <CardContent>
                    {children}
                </CardContent>
                <CardActions className={classes.buttonsArea}>

                    <Button
                        type="reset"
                        color="secondary"
                        disabled={submittingApplication}
                        onClick={onResetButtonClick}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={submittingApplication}
                    >
                        Apply
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};


export default CompanyApplicationFormMobileLayout;
