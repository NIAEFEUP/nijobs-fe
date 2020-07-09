import React from "react";
import PropTypes from "prop-types";
import { RouterLink } from "../../../utils";
import { connect } from "react-redux";
import { toggleLoginModal } from "../../../actions/navbarActions";

import {
    Typography,
    Button,
} from "@material-ui/core";

import useSession from "../../../hooks/useSession";

const ProductDescription = React.forwardRef(({ toggleLoginModal }, ref) => {
    const { isLoggedIn } = useSession();

    return (
        <div
            ref={ref}
            style={{ height: "500px" }}
        >
            <Typography>

                Other content, like what is this for and cool vector and stock images with no copyright
            </Typography>

            {!isLoggedIn &&
            <>
                Are you a company?
                <Button
                    variant="text"
                    color="primary"
                    onClick={toggleLoginModal}
                >
                Login
                </Button>
                <RouterLink to="/apply/company">Join Us</RouterLink>
            </>
            }

        </div>
    );
});


// Needed because of ForwardRef usage
ProductDescription.displayName = "ProductDescription";
ProductDescription.propTypes = {
    toggleLoginModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ navbar }) => ({
    showLoginModal: navbar.showLoginModal,
});

export const mapDispatchToProps = (dispatch) => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
