import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import AdminReasonModalSchema from "./AdminReasonModalSchema";
import Offer from "./Offer";
import { disableOffer } from "../../../../services/offerVisibilityService";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AdminReasonModal({
    open,
    setOpen,
    offer,
    setVisibilityState,
    visibilityState,
    dealWithPromiseError }) {

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(AdminReasonModalSchema),
        reValidateMode: "onChange",
    });

    const onSubmit = async (data) => {
        await disableOffer(offer.id, data.adminReason).then(() => {
            setOpen(false);
            offer.hiddenReason = "ADMIN_REQUEST";
            offer.isHidden = true;
            offer.adminReason = data.adminReason;
            setVisibilityState({ ...visibilityState, isDisabled: true });
        }).catch((err) => {
            dealWithPromiseError(err);
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Disable Offer
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

    );
}

AdminReasonModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    offer: PropTypes.instanceOf(Offer),
    setVisibilityState: PropTypes.func.isRequired,
    visibilityState: PropTypes.object.isRequired,
    dealWithPromiseError: PropTypes.func.isRequired,
};
