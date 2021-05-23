import React, { useCallback, useContext } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import { FinishCompanyRegistrationControllerContext } from "./FinishCompanyRegistrationWidget";
import { Controller, useWatch } from "react-hook-form";
import { FinishCompanyRegistrationConstants } from "./FinishCompanyRegistrationUtils";

export const useBio = ({ control }) => {

    const bio = useWatch({
        name: "bio",
        control,
    });
    const validateStep = useCallback(() => bio?.length > 0, [bio]);

    return {
        validateStep,
    };

};
const BioForm = () => {
    const { control, errors } = useContext(FinishCompanyRegistrationControllerContext);
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Tell us about the company.
                </Typography>
                <Typography variant="caption" gutterBottom paragraph>
                    What do you do? What are some key products, services or projects? Which technologies do you use?
                </Typography>
                <Controller
                    name="bio"
                    render={(
                        { field: { onChange, onBlur, ref, name, value } },
                    ) => (
                        <TextField
                            name={name}
                            value={value}
                            label="Company Bio"
                            id="bio"
                            error={!!errors.bio}
                            inputRef={ref}
                            onBlur={onBlur}
                            onChange={onChange}
                            multiline
                            helperText={
                                `${value?.length}/${FinishCompanyRegistrationConstants.bio.maxLength} ${errors.bio?.message || ""}`
                            }
                            rows={5}
                            variant="outlined"
                            FormHelperTextProps={{
                                style: {
                                    marginLeft: 0,
                                },
                            }}
                            fullWidth
                        />)}
                    control={control}
                />
            </Grid>
        </Grid>
    );
};

export default BioForm;
