import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


class ShowMoreButton extends Component {
    static propTypes = {
        btnClass: PropTypes.string,
        onClick: PropTypes.func.isRequired
    }
    
    render() {
        const { btnClass, onClick } = this.props;
        return (
            <div className={btnClass}>
                <IconButton
                    onClick={onClick}
                >
                    <Icon
                        color="primary"
                        fontSize="large"
                    >
                        keyboard_arrow_down
                    </Icon>

                </IconButton>
            </div>
        );
    }
}
export default ShowMoreButton;