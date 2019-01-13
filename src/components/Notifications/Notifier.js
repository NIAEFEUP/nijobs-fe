import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '../../actions/notificationActions';

class Notifier extends Component {
    state = {
        displayed: [],
    };

    storeDisplayed = (key) => {
        this.setState(({ displayed }) => ({
            displayed: [...displayed, key],
        }));
    };

    render() {
        const { notifications, enqueueSnackbar, removeSnackbar } = this.props;
        const { displayed } = this.state;

        notifications.forEach((notification) => {
            setTimeout(() => {
                // If notification already displayed, abort
                if (displayed.indexOf(notification.key) > -1) return;
                // Display notification using notistack
                enqueueSnackbar(notification.message, notification.options);
                // Add notification's key to the local state
                this.storeDisplayed(notification.key);
                // Dispatch action to remove the notification from the redux store
                removeSnackbar(notification.key);
            }, 1);
        });

        return null;
    }

}

Notifier.propTypes = {
    notifications: PropTypes.array,
    enqueueSnackbar: PropTypes.func,
    removeSnackbar: PropTypes.func,
};

const mapStateToProps = state => ({
    notifications: state.messages.notifications
});

const mapActionsToProps = {
    removeSnackbar
};

export default connect(
    mapStateToProps,
    mapActionsToProps,
)(withSnackbar(Notifier));
