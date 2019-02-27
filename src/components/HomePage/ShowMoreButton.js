import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


class ShowMoreButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func.isRequired
    }
    
    render() {
        const { className, onClick } = this.props;
        return (
            <div className={className}>
                <IconButton
                    onClick={onClick}
                >
                    <Icon
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