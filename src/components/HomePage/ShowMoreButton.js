import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


class ShowMoreButton extends Component {
    static propTypes = {
        btnClass: PropTypes.string
    }
    
    render() {
        const { btnClass } = this.props;
        return (
            <div className={btnClass}>
                <IconButton>
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