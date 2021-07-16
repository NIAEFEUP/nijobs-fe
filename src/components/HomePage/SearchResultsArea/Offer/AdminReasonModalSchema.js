/* istanbul ignore file */

import * as yup from "yup";

export default yup.object().shape({
    adminReason: yup.string()
        .required("Please enter a reason for disabling this offer."),
});
