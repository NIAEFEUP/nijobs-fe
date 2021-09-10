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
    Grid,
} from "@material-ui/core";

import useSession from "../../../hooks/useSession";

export const ProductDescription = React.forwardRef(({ toggleLoginModal }, ref) => {
    const { isLoggedIn, data } = useSession();

    const classes = useProductDescriptionStyles({ isMobile: !useDesktop() });

    return (
        <div
            ref={ref}
            className={classes.productDescription}
        >
            <Grid container spacing={10} justify="center">
                <Grid item xs={12} lg={6} container spacing={1} direction="column" justify="flex-start" alignItems="center">
                    <Grid item>
                        <StudentSvg fill="#999" className={classes.productDescriptionSVG} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            Are you a student?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            As a Student, you can search for job offers according to your interests.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} container spacing={1} direction="column" justify="flex-start" alignItems="center">
                    <Grid item>
                        <CompanySvg fill="#999" className={classes.productDescriptionSVG} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            Are you a company?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            As a Company, you can publish your job or internship opportunities to students!
                        </Typography>
                    </Grid>

                    {isLoggedIn && data?.company ?
                        <Grid item>
                            <Typography gutterBottom>
                                { "Hello, " }
                                <span className={classes.companyName}>
                                    { data?.company?.name }
                                </span>
                                !
                            </Typography>
                            <Button
                                underline="none"
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to="/offers/new"
                            >
                            Create Offer
                            </Button>
                        </Grid>
                        :
                        <Grid item>
                            {!isLoggedIn &&
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={toggleLoginModal}
                                >
                                Login
                                </Button>
                            }
                            <Button
                                variant="text"
                                color="primary"
                                component={RouterLink}
                                to="/apply/company"
                            >
                                Join Us
                            </Button>
                        </Grid>
                    }

                </Grid>
            </Grid>
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
