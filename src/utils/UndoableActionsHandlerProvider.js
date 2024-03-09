import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSnackbar, closeSnackbar } from "../actions/notificationActions";
import { useTimeout } from "../hooks/useTimeout";

const initialActions = {};
export const UndoableActions = React.createContext(initialActions);

const generateAction = (id, message, onTimeout, onCancel, timeout) => ({ id, message, onTimeout, onCancel, timeout });

const removeAction = (setActions) => (id) => {
    setActions((actions) => {
        // eslint-disable-next-line no-unused-vars
        const { [id]: idToRemove, ...newActions } = actions;
        return newActions;
    });
};

const BaseActionNotification = ({ action, removeAction, closeSnackbar, addSnackbar }) => {

    const handleTimeout = useCallback(() => {
        removeAction(action.id);
        action.onTimeout();
    }, [action, removeAction]);

    const { cancel, pause, resume } = useTimeout(handleTimeout, action.timeout);

    const handleCancel = useCallback(() => {
        cancel();
        action.onCancel();
        removeAction(action.id);
    }, [action, cancel, removeAction]);

    const handleClose = useCallback((key) => () => {
        cancel();
        closeSnackbar(key);
        action.onTimeout();
        removeAction(action.id);
    }, [action, cancel, closeSnackbar, removeAction]);

    const handleMouseEnter = useCallback(() => {
        pause();
    }, [pause]);

    const handleMouseLeave = useCallback(() => {
        resume();
    }, [resume]);

    useEffect(() => {
        addSnackbar({
            message: action.message,
            key: action.id,
            options: {
                persist: true,
            },
            contentOptions: {
                actionText: "Undo",
                actionHandler: handleCancel,
                handleClose: handleClose(action.id),
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
            },
        });
    }, [addSnackbar, action.id, handleCancel, action.message, handleClose, handleMouseEnter, handleMouseLeave]);

    useEffect(
        () => () => {
            closeSnackbar(action.id);
        },
        [action.id, closeSnackbar]
    );

    return null;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
    closeSnackbar: (key) => dispatch(closeSnackbar(key)),
});

const ActionNotification = connect(mapStateToProps, mapDispatchToProps)(BaseActionNotification);

const UndoableActionsHandlerProvider = ({ children }) => {
    const [actions, setActions] = useState({});
    const [closeLock, setCloseLock] = useState(false);
    const initialBeforeUnloadEventListener = useRef(window.onbeforeunload);

    useEffect(() => {
        if (Object.keys(actions).length && !closeLock) {
            setCloseLock(true);
            initialBeforeUnloadEventListener.current = window.onbeforeunload;

            Object.defineProperty(window, "onbeforeunload", {
                value: () => "Some changes might have not taken effect yet...",
                writable: true,
            });

        } else if (!Object.keys(actions).length && closeLock) {
            setCloseLock(false);

            Object.defineProperty(window, "onbeforeunload", {
                value: initialBeforeUnloadEventListener.current,
                writable: true,
            });
        }

    }, [actions, closeLock]);

    const submitAction = (id, message, onTimeout, onCancel, timeout) => {
        const action = generateAction(id, message, onTimeout, onCancel, timeout);
        setActions({ ...actions, [action.id]: action });
    };

    const undoableActionsController = { submitAction };
    const removeActionHandler = useCallback(removeAction(setActions), [setActions]);

    return (
        <UndoableActions.Provider value={undoableActionsController}>
            {Object.values(actions).map((action) => (
                <ActionNotification
                    key={action.id}
                    action={action}
                    removeAction={removeActionHandler}
                />
            ))}
            {children}
        </UndoableActions.Provider>
    );
};

UndoableActionsHandlerProvider.propTypes = {
    children: PropTypes.element.isRequired,

};

export default UndoableActionsHandlerProvider;
