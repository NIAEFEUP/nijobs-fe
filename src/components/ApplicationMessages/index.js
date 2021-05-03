import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addSnackbar } from "../../actions/notificationActions";
import useSession from "../../hooks/useSession";
import { connect } from "react-redux";
import Notification from "../Notifications/Notification";
import { useHistory } from "react-router";

const ApplicationMessageNotifier = ({ addSnackbar }) => {

    const [hasShownCompleteRegistrationMessage, setHasShownCompleteRegistrationMessage] = useState(false);

    const history = useHistory();


    const { data, isLoggedIn } = useSession();
    useEffect(() => {
        if (isLoggedIn && !data.company?.hasFinishedRegistration && !hasShownCompleteRegistrationMessage) {
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
    }, [addSnackbar, data, hasShownCompleteRegistrationMessage, history, isLoggedIn]);

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
