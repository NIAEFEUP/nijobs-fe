import React from "react";
import PropTypes from "prop-types";
import { RouterLink } from "../../../utils";
import { connect } from "react-redux";
import { toggleLoginModal } from "../../../actions/navbarActions";

import useProductDescriptionStyles from "./productDescriptionStyles.js";

import { useDesktop } from "../../../utils/media-queries";

import { ReactComponent as CompanySvg } from "./resources/company.svg";
import { ReactComponent as StudentSvg } from "./resources/student.svg";

import {
    Typography,
    Button,
} from "@material-ui/core";

import useSession from "../../../hooks/useSession";

export const ProductDescription = React.forwardRef(({ toggleLoginModal }, ref) => {
    const { isLoggedIn } = useSession();

    const classes = useProductDescriptionStyles({ isMobile: !useDesktop() });

    return (
        <div
            ref={ref}
            className={classes.productDescription}
        >
            <div className={classes.productDescriptionCol}>
                <StudentSvg />

                <div className={classes.productDescriptionInfo}>
                    <Typography>
                        As a Student, you can search for job offers according to your interests.
                    </Typography>

                    {!isLoggedIn &&
                    <>
                        <Typography>
                            Are you a student?
                        </Typography>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={toggleLoginModal}
                        >
                        Login
                        </Button>
                    </>
                    }
                </div>

            </div>
            <div className={classes.productDescriptionCol}>
                <CompanySvg />

                <div className={classes.productDescriptionInfo}>
                    <Typography>
                        As a Company, you can advertise yout job opportunities to students!
                    </Typography>

                    {!isLoggedIn &&
                    <>
                        <Typography>
                            Are you a company?
                        </Typography>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={toggleLoginModal}
                        >
                        Login
                        </Button>
                        <Button
                            variant="text"
                            color="primary"
                        >
                            <RouterLink className={classes.productDescriptionAnchor} to="/apply/company">Join Us</RouterLink>
                        </Button>
                    </>
                    }
                </div>

            </div>

        </div>
    );
});

// Needed because of ForwardRef usage
ProductDescription.displayName = "ProductDescription";

ProductDescription.propTypes = {
    toggleLoginModal: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export const mapDispatchToProps = (dispatch) => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ProductDescription);
