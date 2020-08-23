import React from "react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";

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

export const Wrap = ({ Wrapper, on, children }) => (
    <>
        {on ?
            <Wrapper>
                { children }
            </Wrapper> :
            <>
                { children }
            </>
        }
    </>

);

Wrap.propTypes = {
    Wrapper: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired,
    on: PropTypes.bool.isRequired,
};


export const RouterLink = ({ to, children, ...props }) => {
    const renderLink = React.useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            React.forwardRef((linkProps, ref) => (
                <ReactRouterLink innerRef={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <Link component={renderLink} {...props}>
            {children}
        </Link>
    );
};

RouterLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
