import React from "react";
import { IconButton } from "@material-ui/core";
import { KeyboardArrowUpRounded } from "@material-ui/icons";
import useScrollButtonAnimation from "../../hooks/useScrollButtonAnimation";

const ScrollToTopButton = () => {

    const classes = useScrollButtonAnimation();

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
