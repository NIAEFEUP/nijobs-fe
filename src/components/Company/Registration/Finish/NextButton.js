import React from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    finishBtnWrapper: {
        display: "grid",
    },
    finishBtn: {
        gridColumn: 1,
        gridRow: 1,
    },
    finishProgress: {
        gridColumn: 1,
        gridRow: 1,
        margin: "auto",
        color: theme.palette.primary.main,
    },
}));

const NextButton = ({ disabled, onClick, type, label, loading }) => {
    const classes = useStyles();
    return (
        <div className={classes.finishBtnWrapper}>
            <Button
                className={classes.finishBtn}
                variant="contained"
                color="primary"
                onClick={onClick}
                disabled={disabled}
                type={type}
            >
                {label}
            </Button>
            {loading &&
            <CircularProgress
                size={24}
                className={classes.finishProgress}
            />
            }
        </div>
    );
};

NextButton.propTypes = {
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["submit", "button"]),
    label: PropTypes.oneOf(["Finish", "Next"]),
};

export default NextButton;
