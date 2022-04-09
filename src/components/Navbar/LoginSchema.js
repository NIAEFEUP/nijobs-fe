/* istanbul ignore file */

import * as yup from "yup";

export default yup.object().shape({
    email: yup.string()
        .required("Please fill in your email.")
        .email("This must be a valid email."),
    password: yup.string()
        .required("Please fill in your password."),
});
