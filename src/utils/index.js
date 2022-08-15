import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink, Route as BaseRoute, Redirect, useLocation } from "react-router-dom";
import { Link, LinearProgress } from "@material-ui/core";
import useSession from "../hooks/useSession";
import { addSnackbar } from "../actions/notificationActions";
import { connect } from "react-redux";
import useComponentController from "../hooks/useComponentController";
import CancelablePromise from "cancelable-promise";
import ReactGa from "react-ga";
import { OFFER_MAX_LIFETIME_MONTHS } from "./TimeUtils";
import Constants from "./Constants";

export const smoothScrollToRef = (ref, block = "start") => {

    if (!ref || !ref.current) return;

    ref.current.scrollIntoView({
        behavior: "smooth",
        block,
    });
};

export const capitalize = (str) => {
    if (typeof str !== "string") throw new Error("Trying to capitalize non string object: ", str);

    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const parseFiltersToURL = (filters) => Object.keys(filters)
    .filter((key) => Array.isArray(filters[key]) ? filters[key].length : !!filters[key]) // Remove falsy values
    .map((key) => {
        if (filters[key]) {
            if (Array.isArray(filters[key])) {
                return filters[key]
                    .map((val) => `${key}[]=${encodeURIComponent(val)}`)
                    .join("&");
            } else return `${key}=${encodeURIComponent(filters[key])}`;
        } else return "";
    })
    .join("&");

export const HumanValidationReasons = Object.freeze({
    DEFAULT: "Invalid value.",
    REQUIRED: "Required field.",
    TOO_LONG: (len) => `Must not exceed ${len} character(s).`,
    TOO_SHORT: (len) => `Must have at least ${len} character(s).`,
    OPTIONS_TOO_LONG: (len) => `Must not exceed ${len} option(s).`,
    OPTIONS_TOO_SHORT: (len) => `Must have at least ${len} option(s).`,
    STRING: "Must be text.",
    DATE: "Must be a valid ISO8601 date.",
    INT: "Must be a number.",
    BOOLEAN: "Must be a boolean.",
    IN_ARRAY: (vals) => `Must be one of [${vals}].`,
    ARRAY_SIZE: (min, max) => `Must have a size between [${min},${max}].`,
    EMAIL: "Must be a valid email.",
    HAVE_NUMBER: "Must contain at least a number.",
    ALREADY_EXISTS: (variable) => `${variable} already exists.`,
    DATE_EXPIRED: "Date must not be in the past.",
    MUST_BE_AFTER: (variable) => `Date must be after ${variable}.`,
    FILE_TOO_BIG: (val) => `File size must be under ${val}.`,
    FILE_TYPE_ALLOWED: (vals) => `File type must be one of the following: ${vals.join(", ")}.`,
    LOCATION_FORMAT: () => "The location format must be <city>, <country>. Beware of extra spaces.",
    PUBLISH_END_DATE: () => `Publication end date should be after Publish Date but not 
                            over ${OFFER_MAX_LIFETIME_MONTHS} month(s) after that.`,
    BAD_APPLY_URL: "Invalid application URL. Ensure your URL starts with 'http(s):' or 'mailto:'",
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
                {children}
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

export const Route = ({
    children,
    controller,
    controllerProps,
    // eslint-disable-next-line react/prop-types
    context,
    ...props
}) => {
    useEffect(() => {
        ReactGa.pageview(window.location.pathname);
    }, []);

    return (
        <BaseRoute
            {...props}
        >
            <RedirectInfoProvider>
                <RouteController
                    controller={controller}
                    controllerProps={controllerProps}
                    context={context}
                >
                    {children}
                </RouteController>
            </RedirectInfoProvider>
        </BaseRoute>
    );
};
Route.propTypes = {
    children: PropTypes.element.isRequired,
    controller: PropTypes.func,
    controllerProps: PropTypes.object,
};

const RouteController = ({
    children,
    controller,
    controllerProps,
    // eslint-disable-next-line react/prop-types
    context,
}) => {

    const { ContextProvider, contextProviderProps } = useComponentController(controller, controllerProps, context);

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

RouteController.propTypes = {
    children: PropTypes.element.isRequired,
    controller: PropTypes.func,
    controllerProps: PropTypes.object,
};

const MAX_NUM_RETRIES = 1;

const ProtectedRouteController = ({
    authorize,
    unauthorizedRedirectPath,
    unauthorizedRedirectMessage,
    maxNumRetries = MAX_NUM_RETRIES,
    children,
    controller,
    controllerProps,
    // eslint-disable-next-line react/prop-types
    context,
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

    const { ContextProvider, contextProviderProps } = useComponentController(controller, controllerProps, context);

    return (
        <ContextProvider {...contextProviderProps}>
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
        </ContextProvider>
    );
};

ProtectedRouteController.propTypes = {
    children: PropTypes.element.isRequired,
    authorize: PropTypes.func,
    unauthorizedRedirectPath: PropTypes.string.isRequired,
    unauthorizedRedirectMessage: PropTypes.string.isRequired,
    maxNumRetries: PropTypes.number,
    controller: PropTypes.func,
    controllerProps: PropTypes.object,
};

/**
 *
 * Only allows this route to be accessed when logged in.
 * Additionally, if an `authorize` function is given, it must return true for the route to be accessible
 * The authorize function receives the logged in user details as an object
 */
export const ProtectedRoute = ({
    authorize,
    unauthorizedRedirectPath,
    unauthorizedRedirectMessage,
    maxNumRetries = MAX_NUM_RETRIES,
    children,
    controller,
    controllerProps,
    // eslint-disable-next-line react/prop-types
    context,
    ...routeProps
}) => (
    <Route
        {...routeProps}
    >
        <ProtectedRouteController
            authorize={authorize}
            unauthorizedRedirectPath={unauthorizedRedirectPath}
            unauthorizedRedirectMessage={unauthorizedRedirectMessage}
            maxNumRetries={maxNumRetries}
            controller={controller}
            controllerProps={controllerProps}
            context={context}
        >
            {children}
        </ProtectedRouteController>
    </Route>
);

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
    controller: PropTypes.func,
    controllerProps: PropTypes.object,
};

export const cancelablePromise = (promise, onCancelCallback) => new CancelablePromise((resolve, reject, onCancel) => {
    if (onCancelCallback) onCancel(onCancelCallback);

    promise.then(resolve, reject);
});

export const buildCancelablePromise = (promiseFn, onCancelCallback) => (...args) => new CancelablePromise((resolve, reject, onCancel) => {
    if (onCancelCallback) onCancel(onCancelCallback);

    promiseFn(...args).then(resolve, reject);
});

export const buildCancelableRequest = (promiseFn) => (...args) => new CancelablePromise((resolve, reject, onCancel) => {
    const controller = new AbortController();
    const signal = controller.signal;

    onCancel(() => controller.abort());

    promiseFn(...args, { signal }).then(resolve, reject);
});

export { default as UndoableActionsHandlerProvider, UndoableActions } from "./UndoableActionsHandlerProvider";

export const generalHumanError = (error, HumanReadableErrors) => {
    if (!error) {
        return Constants.UNEXPECTED_ERROR_MESSAGE;
    }
    const [errorId, errorValue] = error.split(":");
    const rawError = HumanReadableErrors[errorId];
    if (typeof rawError === "string") {
        return rawError;
    } else if (typeof rawError === "function") {
        return (!!rawError && rawError(errorValue)) || Constants.UNEXPECTED_ERROR_MESSAGE;
    }
    return Constants.UNEXPECTED_ERROR_MESSAGE;
};

export const generalParseRequestErrors = (err, getHumanError) => {
    const errors = Array.isArray(err) ? err : [err];
    const generalErrors = errors.filter((error) => !error?.param).map((error) => ({ message: getHumanError(error?.msg) }));
    const paramErrors = errors.filter((error) => !!error?.param)
        .reduce((obj, cur) => ({ ...obj, [cur.param]: { message: getHumanError(cur.msg) } }), {});
    return {
        ...paramErrors,
        generalErrors,
    };
};
