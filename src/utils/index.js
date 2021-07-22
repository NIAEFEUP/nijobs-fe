import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink, Route as BaseRoute, Redirect, useLocation  } from "react-router-dom";
import { Link, LinearProgress } from "@material-ui/core";
import useSession from "../hooks/useSession";
import { addSnackbar } from "../actions/notificationActions";
import { connect } from "react-redux";

export const smoothScrollToRef = (ref) => {

    if (!ref || !ref.current) return;

    ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

export const capitalize = (str) => {
    if (typeof str !== "string") throw new Error("Trying to capitalize non string object: ", str);

    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ValidationReasons = Object.freeze({
    DEFAULT: "Invalid value.",
    REQUIRED: "Required field.",
    TOO_LONG: (len) => `Must not exceed ${len} characters.`,
    TOO_SHORT: (len) => `Must have at least ${len} characters.`,
    STRING: "Must be text.",
    DATE: "Must be a valid ISO8601 date.",
    INT: "Must be a number.",
    BOOLEAN: "Must be a boolean.",
    IN_ARRAY: (vals) => `Must be one of [${vals}].`,
    ARRAY_SIZE: (min, max) => `Must have a size between [${min},${max}].`,
    EMAIL: "Must be a valid email.",
    HAVE_NUMBER: "Must contain at least a number.",
    ALREADY_EXISTS: (variable) => `${variable} already exists.`,
    DATE_EXPIRED: "Date must not be in the past",
    MUST_BE_AFTER: (variable) => `Date must be after ${variable}.`,
    FILE_TOO_BIG: (val) => `File size must be under ${val}.`,
    FILE_TYPE_ALLOWED: (vals) => `File type must be one of the following: ${vals.join(", ")}.`,
});

export const validationRulesGenerator = (rules) => (field, rule, reason) => {
    const validationConstraint = rules[field][rule];
    const params = [validationConstraint];

    if (reason) params.push((typeof reason === "function") ? reason(validationConstraint) : reason);

    return params;
};

export const Wrap = ({ Wrapper, on, children }) => (
    <>
        {on ?
            <Wrapper>
                {children}
            </Wrapper>
            :
            <>
                { children }
            </>
        }
    </>
);

Wrap.propTypes = {
    Wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    children: PropTypes.element.isRequired,
    on: PropTypes.bool.isRequired,
};


export const RouterLink = React.forwardRef(({ to, children, ...props }, ref) => {
    const renderLink = React.useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            React.forwardRef((linkProps, ref) => (
                <ReactRouterLink innerRef={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <Link component={renderLink} ref={ref} {...props}>
            {children}
        </Link>
    );
});

RouterLink.displayName = "RouterLink";

RouterLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

// This allows any component to have redirect info notifications,
// without having to write the same logic on each component
const BaseRedirectInfoProvider = ({ addSnackbar, children }) => {
    const redirectInfo = useLocation();
    useEffect(() => {
        if (redirectInfo?.state?.message) {
            addSnackbar({ message: redirectInfo.state.message });
        }
    }, [addSnackbar, redirectInfo]);

    return (
        <>
            {children}
        </>
    );
};

BaseRedirectInfoProvider.propTypes = {
    addSnackbar: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});
const RedirectInfoProvider = connect(mapStateToProps, mapDispatchToProps)(BaseRedirectInfoProvider);

export const Route = ({ children, ...props }) => (
    <BaseRoute
        {...props}
    >
        <RedirectInfoProvider>
            {children}
        </RedirectInfoProvider>
    </BaseRoute>
);
Route.propTypes = {
    children: PropTypes.element.isRequired,
};


const MAX_NUM_RETRIES = 1;

/**
 *
 * Only allows this route to be accessed when logged in.
 * Additionally, if an `authorize` function is given, it must return true for the route to accessable
 * The authorize function receives the logged in user details as an object
 */
export const ProtectedRoute = ({
    authorize,
    unauthorizedRedirectPath,
    unauthorizedRedirectMessage,
    maxNumRetries = MAX_NUM_RETRIES,
    children,
    ...routeProps
}) => {

    const { isValidating, isLoggedIn, data, error } = useSession({
        errorRetryInterval: 500,
        errorRetryCount: maxNumRetries,
        revalidateOnMount: true,
    });

    const isAuthorized = !isValidating && !error && isLoggedIn && (!authorize || !!authorize(data));
    const serverError = error?.status === 500;
    const redirectPath = !serverError ? unauthorizedRedirectPath : "/error";

    const location = useLocation();
    return (
        <Route
            {...routeProps}
        >
            {(isValidating || data === null) && !error ?
                <LinearProgress /> :
                <>
                    {isAuthorized ?
                        children
                        :
                        <Redirect
                            to={{
                                pathname: redirectPath,
                                state: {
                                    from: location,
                                    message: serverError ? undefined : unauthorizedRedirectMessage,
                                },
                            }}
                        />
                    }
                </>
            }
        </Route>
    );
};

ProtectedRoute.propTypes = {
    /**
     * The component to be rendered if the user is authenticated and authorized
     */
    children: PropTypes.element.isRequired,
    /**
     * A function that receives the currently logged in user data and
     * should return true if it is authorized to view the contents of the route, or a falsy value otherwise
     */
    authorize: PropTypes.func,
    /**
     * The path for which the site redirects in case the user can't access this route
     */
    unauthorizedRedirectPath: PropTypes.string.isRequired,
    /**
     * The message shown in the notification when redirecting in case the user can't access this route
     */
    unauthorizedRedirectMessage: PropTypes.string.isRequired,
    /**
     * Number of retries to attempt before redirecting
     * @default 1
     */
    maxNumRetries: PropTypes.number,
};

export { default as UndoableActionsHandlerProvider, UndoableActions } from "./UndoableActionsHandlerProvider";
