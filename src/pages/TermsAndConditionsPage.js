/* eslint-disable max-len */
import React from "react";
import { makeStyles, Typography, Link } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";


const useStyles = makeStyles((theme) => ({
    bold: {
        fontWeight: 500,
    },
    gray: {
        color: "rgba(0, 0, 0, 0.54)",
    },
    content: ({ isMobile }) => ({
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(10),
    }),
}));

const TermsAndConditionsPage = () => {
    const classes = useStyles({ isMobile: useMobile() });
    return (
        <div id="doc" className={classes.content}>
            <Typography variant="h2" id="Terms-and-Conditions" data-id="Terms-and-Conditions" gutterBottom>
                Terms and Conditions
            </Typography>
            <Typography className={ classes.gray } paragraph={true}>
                Last updated: March 1, 2022
            </Typography>
            <Typography paragraph={true}>
                Please read these terms and conditions carefully before using Our Service.
            </Typography>
            <Typography variant="h4" id="Interpretation-and-Definitions" data-id="Interpretation-and-Definitions" gutterBottom>
                Interpretation and Definitions
            </Typography>
            <Typography className={ classes.bold } variant="h5" id="Interpretation" data-id="Interpretation" gutterBottom>
                Interpretation
            </Typography>
            <Typography paragraph={true}>
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </Typography>
            <Typography className={ classes.bold } variant="h5" id="Definitions" data-id="Definitions" gutterBottom>
                Definitions
            </Typography>
            <Typography paragraph={true}>
                For the purposes of these Terms and Conditions:
            </Typography>
            <Typography component="span">
                <ul>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            Country
                        </Typography>
                        {" refers to:  Portugal"}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            Organization
                        </Typography>
                        {" (referred to as either “the Organization”, “We”, “Us” or “Our” in this Agreement) refers to NIAEFEUP, Rua Dr. Roberto Frias 4200-465, Porto Sala B315."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            Device
                        </Typography>
                        {" means any device that can access the Service such as a computer, a cellphone or a digital tablet."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            Service
                        </Typography>
                        {" refers to the Website."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            Terms and Conditions
                        </Typography>
                        {" (also referred as “Terms”) mean these Terms and Conditions that form the entire agreement between You and the Organization regarding the use of the Service."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            Third-party Social Media Service
                        </Typography>
                        {" means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            Website
                        </Typography>
                        {" refers to NIJobs, accessible from "}
                        <Link href="https://ni.fe.up.pt/nijobs" target="_blank" rel="noopener noreferrer">
                            https://ni.fe.up.pt/nijobs
                        </Link>
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                            You
                        </Typography>
                        {" means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable."}
                    </li>
                </ul>
            </Typography>
            <Typography variant="h4" id="Acknowledgment" data-id="Acknowledgment" gutterBottom>
                Acknowledgment
            </Typography>
            <Typography paragraph={true}>
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Organization. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
            </Typography>
            <Typography paragraph={true}>
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
            </Typography>
            <Typography paragraph={true}>
                By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
            </Typography>
            <Typography paragraph={true}>
                Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Organization. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
            </Typography>
            <Typography paragraph={true}>
                If you’re a company looking to join the Website, please access Our rule’s page and read them with caution.
            </Typography>
            <Typography variant="h4" id="Links-to-Other-Websites" data-id="Links-to-Other-Websites" gutterBottom>
                Links to Other Websites
            </Typography>
            <Typography paragraph={true}>
                Our Service may contain links to third-party web sites or services that are not owned or controlled by the Organization.
            </Typography>
            <Typography paragraph={true}>
                The Organization has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Organization shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </Typography>
            <Typography paragraph={true}>
                We bly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.
            </Typography>
            <Typography variant="h4" id="Accounts-Passwords-and-Security" data-id="Accounts-Passwords-and-Security" gutterBottom>
                Accounts, Passwords and Security
            </Typography>
            <Typography paragraph={true}>
                Certain features or services offered on or through the Site may require you to apply for and create an account. You are entirely responsible for maintaining the confidentiality of the information you hold for your account, including your password, and for any and all activity that occurs under your account as a result of your failing to keep this information secure and confidential. You agree to notify the Organization immediately of any unauthorized use of your account or password, or any other breach of security. You may be held liable for losses incurred by the Organization or any other user of or visitor to the Site due to someone else using your password or account as a result of your failing to keep them secure and confidential.
            </Typography>
            <Typography paragraph={true}>
                You may not use anyone else’s password or account at any time without the express permission and consent of the holder of that password or account. The Organization cannot and will not be liable for any loss or damage arising from your failure to comply with these obligations.
            </Typography>
            <Typography  variant="h4" id="Your-Use-of-the-Site" data-id="Your-Use-of-the-Site" gutterBottom>
                Your Use of the Site
            </Typography>
            <Typography paragraph={true}>
                You may not use any “deep-link”, “page-scrape”, “robot”, “spider” or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Site or any Content.
            </Typography>
            <Typography paragraph={true}>
                You may not attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or networks connected to the Site, or to any of the services offered on or through the Site, by hacking, password “mining” or any other illegitimate means.
            </Typography>
            <Typography paragraph={true}>
                You may not probe, scan or test the vulnerability of the Site or any network connected to the Site, nor breach the security or authentication measures on the Site or any network connected to the Site. You may not reverse look-up, trace or seek to trace any information on any other user of or visitor to the Site, including any account not owned by you.
            </Typography>
            <Typography paragraph={true}>
                You agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of the Site or any action being conducted on the Site, or with any other person’s use of the Site.
            </Typography>
            <Typography paragraph={true}>
                You may not use the Site or any Content for any purpose that is unlawful or prohibited by these Terms of Use, or to solicit the performance of any illegal activity or other activity which infringes the rights of the Organization or others.
            </Typography>
            <Typography variant="h4" id="Termination" data-id="Termination" gutterBottom>
                Termination
            </Typography>
            <Typography paragraph={true}>
                We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
            </Typography>
            <Typography paragraph={true}>
                Upon termination, Your right to use the Service will cease immediately.
            </Typography>
            <Typography variant="h4" id="“AS-IS”-and-“AS-AVAILABLE”-Disclaimer" data-id="“AS-IS”-and-“AS-AVAILABLE”-Disclaimer" gutterBottom>
                “AS IS” and “AS AVAILABLE” Disclaimer
            </Typography>
            <Typography paragraph={true}>
                The Service is provided to You “AS IS” and “AS AVAILABLE” and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Organization, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Organization provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
            </Typography>
            <Typography paragraph={true}>
                Without limiting the foregoing, neither the Organization nor any of the company’s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Organization are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
            </Typography>
            <Typography paragraph={true}>
                Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
            </Typography>
            <Typography variant="h4" id="Governing-Law" data-id="Governing-Law" gutterBottom>
                Governing Law
            </Typography>
            <Typography paragraph={true}>
                The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
            </Typography>
            <Typography variant="h4" id="Disputes-Resolution" data-id="Disputes-Resolution" gutterBottom>
                Disputes Resolution
            </Typography>
            <Typography paragraph={true}>
                If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Organization.
            </Typography>
            <Typography variant="h4" id="For-European-Union-EU-Users" data-id="For-European-Union-EU-Users" gutterBottom>
                For European Union (EU) Users
            </Typography>
            <Typography paragraph={true}>
                If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.
            </Typography>
            <Typography variant="h4" id="Severability-and-Waiver" data-id="Severability-and-Waiver" gutterBottom>
                Severability and Waiver
            </Typography>
            <Typography className={ classes.bold } variant="h5" id="Severability" data-id="Severability" gutterBottom>
                Severability
            </Typography>
            <Typography paragraph={true}>
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
            </Typography>
            <Typography className={ classes.bold } variant="h5" id="Waiver" data-id="Waiver" gutterBottom>
                Waiver
            </Typography>
            <Typography paragraph={true}>
                Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party’s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
            </Typography>
            <Typography variant="h4" id="Translation-Interpretation" data-id="Translation-Interpretation" gutterBottom>
                Translation Interpretation
            </Typography>
            <Typography paragraph={true}>
                These Terms and Conditions may have been translated if We have made them available to You on our Service.
                <br />
                You agree that the original English text shall prevail in the case of a dispute.
            </Typography>
            <Typography variant="h4" id="Changes-to-These-Terms-and-Conditions" data-id="Changes-to-These-Terms-and-Conditions" gutterBottom>
                Changes to These Terms and Conditions
            </Typography>
            <Typography paragraph={true}>
                We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
            </Typography>
            <Typography paragraph={true}>
                By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
            </Typography>
            <Typography variant="h4" id="Contact-Us" data-id="Contact-Us" gutterBottom>
                Contact Us
            </Typography>
            <Typography paragraph={true}>
                If you have any questions about these Terms and Conditions, You can contact us:
            </Typography>
            <ul>
                <li>
                    {"By email: "}
                    <Link href="mailto:nijobs@aefeup.pt" target="_blank" rel="noopener noreferrer">
                        nijobs@aefeup.pt
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default TermsAndConditionsPage;
