/* istanbul ignore file */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "../../actions/notificationActions";
import Notification from "./Notification";

const Notifier = ({ notifications, removeSnackbar }) => {
    const displayed = useRef([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id) => {
        displayed.current = [...displayed.current, id];
    };

    const removeDisplayed = (id) => {
        displayed.current = [...displayed.current.filter((key) => id !== key)];
    };

    React.useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.current.includes(key)) return;

            const defaultContent = (key, message) =>
                <Notification
                    message={message}
                    handleClose={() => closeSnackbar(key)}
                />;

            if (!options.content) options.content = defaultContent;
            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event, myKey) => {
                    // remove this snackbar from redux store
                    removeSnackbar(myKey);
                    removeDisplayed(myKey);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [closeSnackbar, enqueueSnackbar, notifications, removeSnackbar]);

    return null;

};

Notifier.propTypes = {
    notifications: PropTypes.array,
    enqueueSnackbar: PropTypes.func,
    removeSnackbar: PropTypes.func,
};

const mapStateToProps = (state) => ({
    notifications: state.messages.notifications,
});

const mapDispatchToProps = (dispatch) => ({
    removeSnackbar: (key) => dispatch(removeSnackbar(key)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifier);
