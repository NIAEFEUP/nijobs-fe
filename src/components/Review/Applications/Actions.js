import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
    IconButton,
    TableCell,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { RowPropTypes } from "../../../utils/Table/PropTypes";
import { getFieldValue } from "../../../utils/Table/utils";
import { ApplicationStateLabel } from "./ApplicationsReviewTableSchema";
import { Check, Clear, ExpandMore, ExpandLess } from "@material-ui/icons";
import { approveApplication, rejectApplication } from "../../../services/applicationsReviewService";
import { addSnackbar } from "../../../actions/notificationActions";
import { connect } from "react-redux";
import ConfirmRejectDialog from "./ConfirmRejectDialog";


const BaseRowActions = ({
    addSnackbar, row, submitUndoableAction, changeRowState, updateRowRejectReason, isCollapseOpen, toggleCollapse,
}) => {

    const [actionToConfirm, setActionToConfirm] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const handleApprove = useCallback(
        () => {
            setActionToConfirm(null);

            submitUndoableAction(
                row.key,
                `Approving Application for ${getFieldValue(row, "name")}...`,
                () => {
                    approveApplication(row.key)
                        .then(() => changeRowState(row, ApplicationStateLabel.APPROVED))
                        .catch(() => {
                            addSnackbar({
                                message: `An unexpected error occurred. Could not approve ${getFieldValue(row, "name")}'s application.`,
                                key: `${row.key}-error`,
                            });
                            changeRowState(row, ApplicationStateLabel.PENDING);
                        });
                },
                () => {
                    changeRowState(row, ApplicationStateLabel.PENDING);
                },
                3000
            );
        },
        [addSnackbar, changeRowState, row, submitUndoableAction],
    );

    const handleReject = useCallback(
        () => {
            setActionToConfirm(null);

            submitUndoableAction(
                row.key,
                `Rejecting Application for ${getFieldValue(row, "name")}...`,
                () => {
                    rejectApplication(row.key, rejectReason)
                        .then(() => {
                            changeRowState(row, ApplicationStateLabel.REJECTED);
                            updateRowRejectReason(row, rejectReason);
                        })
                        .catch(() => {
                            addSnackbar({
                                message: `An unexpected error occurred. Could not reject ${getFieldValue(row, "name")}'s application.`,
                                key: `${row.key}-error`,
                            });
                            changeRowState(row, ApplicationStateLabel.PENDING);
                        });
                },
                () => {
                    changeRowState(row, ApplicationStateLabel.PENDING);
                },
                3000
            );
        }, [addSnackbar, changeRowState, rejectReason, row, submitUndoableAction, updateRowRejectReason]);


    const handleAction = (actionLabel) => (e) => {
        e.stopPropagation();
        setActionToConfirm(actionLabel);
    };


    const cancelAction = (e) => {
        e.stopPropagation();
        setRejectReason("");
        setActionToConfirm(null);
    };

    const confirmAction = (handler) => (e) => {
        e.stopPropagation();
        handler();
    };

    return (
        <>
            <ConfirmRejectDialog
                open={actionToConfirm === "Reject"}
                rejectReason={rejectReason}
                setRejectReason={setRejectReason}
                handleReject={handleReject}
                cancelAction={cancelAction}
            />
            <TableCell align="right">
                <div style={{ minWidth: "150px" }}>
                    {actionToConfirm === "Approve" ?
                        <>
                            <Typography
                                variant="body2"
                                display="inline"
                                color="primary"
                            >
                                Approve?
                            </Typography>
                            <IconButton
                                aria-label="Confirm Approval"
                                onClick={confirmAction(handleApprove)}
                            >
                                <Check />
                            </IconButton>
                            <IconButton
                                aria-label="Cancel Approval"
                                onClick={cancelAction}
                            >
                                <Clear />
                            </IconButton>
                        </>
                        :
                        <>
                            {getFieldValue(row, "state") === ApplicationStateLabel.PENDING &&
                            <>
                                <Tooltip
                                    title="Approve"
                                    placement="top"
                                >
                                    <IconButton
                                        aria-label="Approve Application"
                                        onClick={handleAction("Approve", handleApprove)}
                                    >
                                        <Check />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title="Reject"
                                    placement="top"
                                >
                                    <IconButton
                                        aria-label="Reject Application"
                                        onClick={handleAction("Reject", confirmAction(handleReject))}
                                    >
                                        <Clear />
                                    </IconButton>
                                </Tooltip>
                            </>
                            }

                            <IconButton
                                aria-label="More Actions"
                                edge="end"
                                onClick={(e) => {
                                    e.stopPropagation(); toggleCollapse();
                                }}
                            >
                                {!isCollapseOpen ? <ExpandMore/> : <ExpandLess/>}
                            </IconButton>
                        </>
                    }
                </div>
            </TableCell>
        </>
    );
};

BaseRowActions.propTypes = {
    addSnackbar: PropTypes.func.isRequired,
    updateRowRejectReason: PropTypes.func.isRequired,
    isCollapseOpen: PropTypes.bool.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    row: RowPropTypes,
    submitUndoableAction: PropTypes.func,
    changeRowState: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export const RowActions = connect(mapStateToProps, mapDispatchToProps)(BaseRowActions);


// eslint-disable-next-line no-unused-vars
export const MultiRowActions = ({ rows }) =>
    // const handleAction = () => {
    //     console.log("This will affect rows", rows);
    // };
    ( // TODO it should check if it can approve all/reject (mby some of them already approved or rej)
        <>
            {/* <IconButton aria-label="accept" onClick={handleAction}>
                <Check />
            </IconButton>
            <IconButton aria-label="reject" onClick={handleAction}>
                <Clear />
            </IconButton> */}
        </>
    )
;

MultiRowActions.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
};
