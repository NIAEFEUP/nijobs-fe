/* eslint-disable */

// import * as Constants from "@niaefeup/nijobs-commons";
const Constants = { // when importing doesn't produce errors, delete this object and uncomment the previous line
    Company: {
        offers: {
            max_concurrent: 5 // 5 is the current value
        }
    }
};

export default Object.freeze({
    "rules": [
        {"title": "Using NiJobs (as a student)", "description": "As a student, you can view job offers posted by companies on the platform's main page.", "link": "/", "linkName": "Main Page"},
        {"title": "Using NiJobs (as a company)", "description": "As a company, you must first apply for an account.\nThe application will be reviewed and, if accepted, you will have an account registered in NiJobs.\nAfter that, you can finish you company registration to be able to start posting job offers.\nPlease remember that your offers should be aimed at college students enrolled in an IT course (this is subject to change).", "link": "/apply/company", "linkName": "Apply as a company"},
        {"title": "Creating an offer", "description": `To create an offer you must first log in as a company, then you can create an offer by pressing the \"Create Offer\" button. There is a limit to how many active offers you can have at a time (currently set at ${Constants.Company.offers.max_concurrent}), however you can continue creating offers as long as they are marked hidden. Your offers may be reviewed and their exposure will decay over time.\n Creating too many of the same offer may result in a penalty, if you believe you should have not received a penalty, please contact us with your problem and we will look into it. Offer creation can also be performed by a plaftorm administrator at a company's request.`, "link": "/offers/new", "linkName": "Create an offer (company)"},
        {"title": "Managing offers", "description": "Offers can be hidden, making them not appear on search results, with the possibility to activate them at a later moment (keep in mind that there is a limited number of concurrent active offers).\n They may, on special cases, be marked 'disabled' by platform administrators, in which case only them can 're-enable' that specific offer.\n If you think there has been a mistake disabling your offer, please contact us and we will look into it.\n You can also edit the parameters of your job offer (like the publish date or offer title, for example).", "link": "/company/offers/manage", "linkName": "Manage offers"},
        {"title": "Applying to an offer", "description": "In order to apply to an offer you must first sign in, after signing in ", "link": "/", "linkName": "Main Page"},
        {"title": "This is a rule's title", "description": "Here goes the description."}
    ]
});

/* eslint-disable */