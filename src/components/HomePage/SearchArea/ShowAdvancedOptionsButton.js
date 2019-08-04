import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/CloseRounded';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

import searchAreaStyle from "./SearchArea.module.css";

const ShowAdvancedOptionsButton = ({open, onClick}) => {
    return (
        <div className={searchAreaStyle.advancedSearchBtnWrapper}>
            <Fab
                color="primary"
                aria-label="Show More Options"
                onClick={onClick}
            >
                {open ? <Close /> : <MoreHoriz fontSize="large"/>}
                
            </Fab>
        </div>
    );
};

ShowAdvancedOptionsButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default ShowAdvancedOptionsButton;