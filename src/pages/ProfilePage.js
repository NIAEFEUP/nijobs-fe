import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfilePage extends Component {
    render() {
        return (
            <div>
                This profile page belongs to
                {' '}
                {this.props.match.params.name}
            </div>
        );
    }
}

ProfilePage.propTypes = {
    match: PropTypes.object
};

export default ProfilePage;