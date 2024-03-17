import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Collapse, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { QuickOfferEditForm } from "./QuickOfferEditForm";

const CollapsedQuickOfferEdit = ({ offerId, isMobile }) => {
    const [collapse, setCollapse] = useState(false);

    return isMobile ? (
        <>
            <Box
                display="flex"
                alignSelf="center"
                alignItems="center"
                flexDirection="row"
            >
                <Typography align="center">Quick Edit Offer</Typography>
                <Button
                    onClick={() => setCollapse(!collapse)}
                    size="small"
                    margin="dense"
                    endIcon={collapse ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                />
            </Box>
            <Collapse in={collapse}>
                <QuickOfferEditForm offerId={offerId} />
            </Collapse>
        </>
    ) : (
        <QuickOfferEditForm offerId={offerId} showTitle={true} />
    );
};

CollapsedQuickOfferEdit.propTypes = {
    offerId: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default CollapsedQuickOfferEdit;
