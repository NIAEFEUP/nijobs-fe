import React, { useState } from "react";
import {
    Grid,
    TextField,
} from "@material-ui/core";


export const useBio = () => {
    const [bio, setBio] = useState("");

    return {
        bio,
        setBio,
    };

};
const BioForm = () => {
    const placeholder = "Tell us about the company. \n\
i.e. What do you do? What are some key products, services or projects? Which techs do you use?";
    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Company Bio"
                    multiline
                    placeholder={placeholder}
                    id="bio"
                    name="bio"
                />
            </Grid>
        </Grid>
    );
};

export default BioForm;
