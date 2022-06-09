import { makeStyles } from "@material-ui/core";
import React from "react";
import { useMobile } from "../utils/media-queries";

const useStyles = (isMobile) => makeStyles((theme) => ({

}));

export const ChangeLogPage = () => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();

    return (
        <div>
            <h1>Change Log Page</h1>
        </div>
    );
};

export default ChangeLogPage;
