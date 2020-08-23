import { useForm } from "react-hook-form";
import { useCallback } from "react";

const useYupValidationResolver = (validationSchema) => useCallback(
    async (data) => {
        try {
            const values = await validationSchema.validate(data, {
                abortEarly: false,
            });
            return {
                values,
                errors: {},
            };
        } catch (errors) {
            return {
                values: {},
                errors: errors.inner.reduce(
                    (allErrors, currentError) => ({
                        ...allErrors,
                        [currentError.path]: {
                            type: currentError.type || "validation",
                            message: currentError.message,
                        },
                    }),
                    {},
                ),
            };
        }
    },
    [validationSchema],
);

export default ({
    validationSchema,
    ...other
}) => {

    const defaultResolver = useYupValidationResolver(validationSchema);
    return useForm({
        validationResolver: defaultResolver,
        ...other,
    });
};
