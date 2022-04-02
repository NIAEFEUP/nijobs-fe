import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { addSnackbar, closeSnackbar } from "../../actions/notificationActions";
import useSession from "../../hooks/useSession";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const ApplicationMessageNotifier = ({ addSnackbar, closeSnackbar }) => {

    const [hasShownCompleteRegistrationMessage, setHasShownCompleteRegistrationMessage] = useState(false);
    const [hasRevalidated, setHasRevalidated] = useState(false);

    const history = useHistory();

    const { data, isLoggedIn, revalidate, isValidating } = useSession();

    useEffect(() => {
        if (!hasRevalidated || isValidating) return;
        if (isLoggedIn && !data.isAdmin && !data.company?.hasFinishedRegistration && !hasShownCompleteRegistrationMessage) {
            setHasShownCompleteRegistrationMessage(true);

            // Overrides key from addSnackbar()
            const key = Date.now() + Math.random();
            addSnackbar({
                message: "In order to fully use NIJobs, you still need to finish your registration.",
                key,
                contentOptions: {
                    actionText: "Show me",
                    actionHandler: () => {
                        history.push("/company/registration/finish");
                        closeSnackbar(key);
                    },
                },
            });
        }
        if (hasShownCompleteRegistrationMessage && !isLoggedIn) setHasShownCompleteRegistrationMessage(false);
    }, [addSnackbar, closeSnackbar, data, hasRevalidated, hasShownCompleteRegistrationMessage, history, isLoggedIn, isValidating]);

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
    closeSnackbar: (key) => dispatch(closeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationMessageNotifier);
