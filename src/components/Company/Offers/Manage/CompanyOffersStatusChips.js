import React from "react";
import { Chip } from "@material-ui/core";

export const statusChips = {
    active: <Chip label="Active" size="small" style={{ backgroundColor: "#4CAF50" }} />,
    hidden: <Chip label="Hidden" size="small" style={{ backgroundColor: "#90A4AE" }} />,
    blocked: <Chip label="Blocked" size="small" style={{ backgroundColor: "#F44336" }} />,
    archived: <Chip label="Archived" size="small" style={{ backgroundColor: "#2196F3" }} />,
};
