import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addSnackbar } from "../../actions/notificationActions";
import useSession from "../../hooks/useSession";
import { connect } from "react-redux";
import Notification from "../Notifications/Notification";
import { useHistory } from "react-router";

const ApplicationMessageNotifier = ({ addSnackbar }) => {

    const [hasShownCompleteRegistrationMessage, setHasShownCompleteRegistrationMessage] = useState(false);
    const [hasRevalidated, setHasRevalidated] = useState(false);

    const history = useHistory();

    const { data, isLoggedIn, revalidate, isValidating } = useSession();

    useEffect(() => {
        if (!hasRevalidated || isValidating) return;
        if (isLoggedIn && !data.isAdmin && !data.company?.hasFinishedRegistration && !hasShownCompleteRegistrationMessage) {
            setHasShownCompleteRegistrationMessage(true);
            addSnackbar({
                message: "In order to fully use NIJobs, you still need to finish your registration.",
                options: {
                    // eslint-disable-next-line react/display-name
                    content: (key, message) =>
                        <Notification
                            message={message}
                            actionText="Show me"
                            actionHandler={() => {
                                history.push("/company/registration/finish");
                            }}
                        />,
                },
            });
        }
        if (hasShownCompleteRegistrationMessage && !isLoggedIn) setHasShownCompleteRegistrationMessage(false);
    }, [addSnackbar, data, hasRevalidated, hasShownCompleteRegistrationMessage, history, isLoggedIn, isValidating]);

    // Revalidate user session on mount to avoid showing outdated messages
    // It's important to keep this hook after every other, so that they can safely rely on hasRevalidated being false on first render
    useEffect(() => {
        setHasRevalidated(true);
        revalidate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

ApplicationMessageNotifier.propTypes = {
    addSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationMessageNotifier);
