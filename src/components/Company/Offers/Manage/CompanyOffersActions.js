import React from "react";
import PropTypes from "prop-types";
import {
    IconButton,
    TableCell,
    Tooltip,
} from "@material-ui/core";
import { ExpandMore, ExpandLess, Edit as EditIcon } from "@material-ui/icons";
import { useMobile } from "../../../../utils/media-queries";
import { Link } from "react-router-dom";
import { RowPropTypes } from "../../../../utils/Table/PropTypes";

const CompanyOffersActions = ({
    isCollapseOpen, toggleCollapse, row,
}) => {
    const isMobile = useMobile();
    const editOfferRoute = `/offer/${row?.key}/edit`;

    return (
        <>
            <TableCell align="right">
                { !isMobile ? (
                    <Tooltip title="Edit Offer">
                        <Link to={editOfferRoute}>
                            <IconButton aria-label="Edit Offer">
                                <EditIcon color="secondary" fontSize="medium" />
                            </IconButton>
                        </Link>
                    </Tooltip>
                ) : (
                    <IconButton
                        aria-label="More Actions"
                        edge="end"
                        onClick={(e) => {
                            e.stopPropagation(); toggleCollapse();
                        }}
                    >
                        {!isCollapseOpen ? <ExpandMore /> : <ExpandLess />}
                    </IconButton>
                )}
            </TableCell>
        </>
    );
};

CompanyOffersActions.propTypes = {
    isCollapseOpen: PropTypes.bool.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    row: RowPropTypes,
};

export const RowActions = CompanyOffersActions;
