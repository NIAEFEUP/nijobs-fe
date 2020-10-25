import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { IconButton, TableCell } from "@material-ui/core";
import { RowPropTypes } from "../../../utils/Table/PropTypes";
import { getFieldValue } from "../../../utils/Table/utils";
import { ApplicationStatusLabel } from "./ApplicationsReviewTableSchema";
import { Check, Clear, MoreHoriz } from "@material-ui/icons";


export const RowActions = ({ row, submitUndoableAction, changeRowState }) => {

    const handleApprove = useCallback(
        (e) => {
            e.stopPropagation();
            changeRowState(row, ApplicationStatusLabel.APPROVED);
            submitUndoableAction(
                row.key,
                `Application for ${getFieldValue(row, "name")} Approved`,
                () => {
                    console.log(`SHOULD CALL API TO APPROVE ROW ${row.key} HERE`);
                },
                () => {
                    console.log(`APPROVE ROW ${row.key} CANCELLED`);
                    changeRowState(row, ApplicationStatusLabel.PENDING);
                },
                5000
            );

        },
        [changeRowState, row, submitUndoableAction],
    );

    const handleReject = useCallback(
        (e) => {
            e.stopPropagation();
            changeRowState(row, ApplicationStatusLabel.REJECTED);
            submitUndoableAction(
                row.key,
                `Application for ${getFieldValue(row, "name")} Rejected`,
                () => {
                    console.log(`SHOULD CALL API TO REJECT ROW ${row.key} HERE`);
                },
                () => {
                    console.log(`REJECT ROW ${row.key} CANCELLED`);
                    changeRowState(row, ApplicationStatusLabel.PENDING);
                },
                5000
            );
        },
        [changeRowState, row, submitUndoableAction],
    );
    return (


        <TableCell align="right">
            {getFieldValue(row, "status") === ApplicationStatusLabel.PENDING &&
            <>
                <IconButton
                    aria-label="accept"
                    onClick={handleApprove}
                >
                    <Check />
                </IconButton>
                <IconButton
                    aria-label="reject"
                    onClick={handleReject}
                >
                    <Clear />
                </IconButton>
            </>
            }
            <IconButton
                aria-label="more actions"
                edge="end"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <MoreHoriz />
            </IconButton>
        </TableCell>

    );
};

RowActions.propTypes = {
    row: RowPropTypes,
    submitUndoableAction: PropTypes.func,
    changeRowState: PropTypes.func.isRequired,
};


export const MultiRowActions = ({ rows }) => {
    const handleAction = () => {
        console.log("This will affect rows", rows.map((row) => row.key));
    };
    return ( // TODO it should check if it can approve all/reject (mby some of them already approved or rej)
        <>
            <IconButton aria-label="accept" onClick={handleAction}>
                <Check />
            </IconButton>
            <IconButton aria-label="reject" onClick={handleAction}>
                <Clear />
            </IconButton>
            <IconButton aria-label="more actions" onClick={handleAction}>
                <MoreHoriz />
            </IconButton>
        </>
    );
};

MultiRowActions.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
};
