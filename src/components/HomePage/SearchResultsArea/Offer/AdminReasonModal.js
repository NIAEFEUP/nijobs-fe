import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import AdminReasonModalSchema from "./AdminReasonModalSchema";
import Offer from "./Offer";
import { addSnackbar } from "../../../../actions/notificationActions";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AdminReasonModal = ({
    addSnackbar,
    open,
    setOpen,
    offer,
    handleDisableOffer,
    onError,
}) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(AdminReasonModalSchema),
        reValidateMode: "onChange",
    });

    const handleClose = () => {
        setOpen(false);
    };

    const onSuccess = () => {
        handleClose();
        addSnackbar({
            message: "The offer was disabled",
            key: `${Date.now()}-disabled`,
        });
    };

    const onSubmit = async ({ adminReason }) => {
        await handleDisableOffer({
            offer,
            adminReason,
            onError,
            onSuccess,
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form
                aria-label="AdminReason"
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogContent>
                    <DialogContentText>
                        Please enter a reason for disabling this offer.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="adminReason"
                        label="Reason"
                        type="string"
                        fullWidth
                        inputProps={{ ...register("adminReason") }}
                        error={!!errors.adminReason}
                        helperText={errors.adminReason ? errors.adminReason.message : <span />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        role="disableOffer"
                        color="primary"
                        variant="contained"
                        disabled={!!errors.adminReason}
                    >
                        Disable Offer
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

    );
};

AdminReasonModal.propTypes = {
    addSnackbar: PropTypes.func,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    offer: PropTypes.instanceOf(Offer),
    handleDisableOffer: PropTypes.func,
    onError: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminReasonModal);
