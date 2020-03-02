import React from "react";
import CenteredComponent from "../../HomePage/CenteredComponent";
import { Card, CardHeader, Link, CardContent, CardActions, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

const CompanyApplicationFormDesktopLayout = ({
    children,
    openWhyModal,
    submittingApplication,
    onResetButtonClick,
}) => {
    const classes = useStyles();
    return (
        <CenteredComponent>
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
                <CardContent className={classes.formContent} >
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
        </CenteredComponent>
    );
};


export default CompanyApplicationFormDesktopLayout;
