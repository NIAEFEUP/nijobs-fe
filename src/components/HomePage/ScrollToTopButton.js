import React from "react";
import { IconButton } from "@material-ui/core";
import { KeyboardArrowUpRounded } from "@material-ui/icons";
import scrollButtonAnimation from "../../utils/styles/ScrollButtonAnimations";

const ScrollToTopButton = () => {

    const classes = scrollButtonAnimation();

    return (
        <IconButton
            onClick={() => {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            }}
            className={classes.button}
        >
            <KeyboardArrowUpRounded
                fontSize="large"
            />
        </IconButton>
    );
};

export default ScrollToTopButton;
