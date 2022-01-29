import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import TextEditor from "../../../utils/TextEditor";

const TextEditorComponent = ({  disabled, errors, requestErrors, control }) => (
    <Controller
        name="descriptionText"
        render={(
            { field: { onChange: onChangeDescriptionText } },
        ) => (
            <Controller
                name="description"
                render={(
                    { field: { onChange: onChangeDescription, value } },
                ) => (
                    <TextEditor
                        onChangeDescription={onChangeDescription}
                        onChangeDescriptionText={onChangeDescriptionText}
                        error={!!errors?.descriptionText || !!requestErrors?.descriptionText}
                        content={value}
                        helperText={errors.descriptionText?.message ||
                                        requestErrors.descriptionText?.message || " "}
                        disabled={disabled}
                    />
                )}
                control={control}
            />
        )}
        control={control}
    />
);

TextEditorComponent.propTypes = {
    // fields: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default TextEditorComponent;
