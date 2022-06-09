import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useMobile } from "../utils/media-queries";

const useStyles = makeStyles((theme) => ({
    content: ({ isMobile }) => ({
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(5),
    }),
    gray: {
        color: "rgba(0, 0, 0, 0.54)",
    },
}));

export const ChangeLogPage = () => {
    const isMobile = useMobile();
    const classes = useStyles({ isMobile: isMobile });

    return (
        <div className={classes.content}>
            <Typography variant="h3" id="Change-Log" data-id="Change-Log" gutterBottom>
                Change Log
            </Typography>

            <Typography className={classes.gray} paragraph={true}>
                Last updated: March 1, 2022 {/* GET FROM THE MOST UPDATED RELEASE */}
            </Typography>


        </div>
    );
};

export default ChangeLogPage;
