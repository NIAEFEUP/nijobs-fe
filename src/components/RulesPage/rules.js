/* eslint-disable max-len */
import * as Constants from "@niaefeup/nijobs-commons";

export const rules = Object.freeze([
    {
        "title": "Using NIJobs (as a company)",
        "description": "As a company, you must first apply for an account. The application will be reviewed and, if accepted, you will have an account registered in NIJobs. After that, you need to finish your company registration to be able to start posting job offers.",
        "link": "/apply/company",
        "linkName": "Apply as a company",
    },
    {
        "title": "Creating an offer",
        "description": `To create an offer, you must first log in to your company account, then you can create an offer by pressing the "Create Offer" button. To avoid spam, and to ensure the greatest quality of offers to the students, a company cannot have more than ${Constants.Company.offers.max_concurrent} active offers at the same time. However, you can continue creating offers as long as they are hidden - you can set this in the advanced options when creating the offers. Your offers may be reviewed and removed if they do not comply with the offer rules (see below). If you believe your offer was disabled by mistake, please get in touch with us and we will look into it. Offer creation can also be performed by a platform administrator at a company's request.`,
        "link": "/offers/new",
        "linkName": "Create an offer (company)",
    },
    {
        "title": "Offer Rules",
        "description": "Offers must refer to a real job offer. They should be aimed at college students and related with computer science fields. They must not contain any hate speech, violence appealing or refer to any illegal activity. Breaking this rule will get your offers disabled and your account banned from NIJobs. Creating duplicate entries will result in offer removal.",
    },
    {
        "title": "Managing offers",
        "description": `Offers can be hidden, making them not appear on search results, with the possibility to activate them at a later moment (keep in mind that there is a limited number of ${Constants.Company.offers.max_concurrent} concurrent active offers). They may, in special cases, be disabled by platform administrators, in which case only they can re-enable those specific offers. If you think there has been a mistake disabling your offer, please contact us and we will look into it. You can also edit the parameters of your job offer (like the publish date or offer title, for example).`,
        "link": "/company/offers/manage",
        "linkName": "Manage offers",
    },
    {
        "title": "Managing your company account",
        "description": "If you wish, you can request to disable your company account, leaving you unable to perform any action when logged in. This state is temporary as you or anyone with administrator privileges can re-enable your account. If rules are broken too many times, your account may be blocked. Only administrators can unblock a given company account. If you think there has been a mistake blocking your account, please get in touch with us and we will look into it.",
        // once a "My Personal Page" gets added to the FE, change this last sentence to be "..., you can disable your company account, ..."
    },
    {
        "title": "Job Applications",
        "description": "Keep in mind that the job application process is not handled by NIJobs: you should contact the respective college, organization or company. We only handle the advertisment aspect of job offers.",
    },
]);
