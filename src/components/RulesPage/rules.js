/* eslint-disable */

// import * as Constants from "@niaefeup/nijobs-commons";
const Constants = { // when importing doesn't produce errors, uncomment the previous line
    Company: {
        offers: {
            max_concurrent: 5 // 5 is the current value
        }
    }
};

export default Object.freeze({
    "rules": [
        {"title" : "Using NiJobs (as a student)", "description": "As a student, you can view job offers posted by companies on the platform's main page.", "link": "/", "linkName": "Main Page"},
        {"title" : "Using NiJobs (as a company)", "description": "As a company, you must first apply for an account.\nThe application will be reviewed and, if you are accepted, you will have an account registered in NiJobs.\nAfter that, you can finish you company registration to be able to start posting job offers.\nPlease remember that the target audience of your offers should be college students enrolled in an IT course (but this is subject to change in the future).", "link":"/apply/company", "linkName": "Apply as a company"},
        {"title" : "Creating an offer", "description" : `To create an offer you must first log in as a company, then you can create an offer by pressing the \"Create Offer\" button. There is a limit to how many active offers you can have at a time (currently set at ${Constants.Company.offers.max_concurrent}, but is subject to change in the future), however you can continue creating offers as long as they are marked hidden. Your offers may be reviewed and their exposure will decay over time.\n Creating too many of the same offer may result in a penalty, if you believe you should have not received a penalty, please contact us with your problem and we will look into it. Offer creation can also be performed by a plaftorm administrator at a company's request.`, "link":"/offers/new", "linkName": "Create an offer (company)"},
        {"title" : "Applying to an offer", "description" : "In order to apply to an offer you must first sign in, after signing in ", "link": "/", "linkName": "Main Page"},
        {"title" : "This is a rule's title", "description" : "Here goes the description."}
    ]
});

/* eslint-disable */