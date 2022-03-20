/* eslint-disable max-len */
import { Typography, Link } from "@material-ui/core";
import { useStyles } from "./PoliciesStyle";
import React from "react";
import { useMobile } from "../../../../../utils/media-queries";


const PrivacyPolicyContent = () => {
    const classes = useStyles({ isMobile: useMobile() });
    return (
        <div id="doc" className={classes.content}>
            <Typography variant="h2" id="Privacy-Policy" data-id="Privacy-Policy" gutterBottom>
            Privacy Policy
            </Typography>
            <Typography className={ classes.gray } paragraph={true}>
            Last updated: March 1, 2022
            </Typography>
            <Typography paragraph={true}>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </Typography>
            <Typography paragraph={true}>
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
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
            <Typography className={ classes.bold } variant="h5" id="Definitions" data-id="Definitions">
            Definitions
            </Typography>
            <Typography paragraph={true}>
            For the purposes of this Privacy Policy:
            </Typography>
            <Typography>
                <ul>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Account
                        </Typography>
                        {" means a unique account created for You to access our Service or parts of our Service."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Organization
                        </Typography>
                        {" (referred to as either “the Organization”, “We”, “Us” or “Our” in this Agreement) refers to NIAEFEUP, Rua Dr. Roberto Frias 4200-465, Porto Sala B315."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Cookies
                        </Typography>
                        {" are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Country
                        </Typography>
                        {" refers to:  Portugal"}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Device
                        </Typography>
                        {" means any device that can access the Service such as a computer, a cellphone or a digital tablet."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Personal Data
                        </Typography>
                        {" is any information that relates to an identified or identifiable individual."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Service
                        </Typography>
                        {" refers to the Website."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Service Provider
                        </Typography>
                        {" means any natural or legal person who processes the data on behalf of the Organization. It refers to third-party companies or individuals employed by the Organization to facilitate the Service, to provide the Service on behalf of the Organization, to perform services related to the Service or to assist the Organization in analyzing how the Service is used."}
                    </li>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Usage Data
                        </Typography>
                        {" refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)."}
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
            <Typography variant="h4" id="Collecting-and-Using-Your-Personal-Data" data-id="Collecting-and-Using-Your-Personal-Data" gutterBottom>
            Collecting and Using Your Personal Data
            </Typography>
            <Typography className={ classes.bold } variant="h5" id="Types-of-Data-Collected" data-id="Types-of-Data-Collected" gutterBottom>
            Types of Data Collected
            </Typography>
            <Typography className={ classes.bold } id="Usage-Data" data-id="Usage-Data" gutterBottom>
            Usage Data
            </Typography>
            <Typography paragraph={true}>
            Usage Data is collected automatically when using the Service.
            </Typography>
            <Typography paragraph={true}>
            Usage Data may include information such as Your browser, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            </Typography>
            <Typography paragraph={true}>
            When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
            </Typography>
            <Typography paragraph={true}>
            We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
            </Typography>
            <Typography className={ classes.bold } id="Tracking-Technologies-and-Cookies" data-id="Tracking-Technologies-and-Cookies" gutterBottom>
            Tracking Technologies and Cookies
            </Typography>
            <Typography  paragraph={true}>
            We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
            </Typography>
            <Typography>
                <ul>
                    <li>
                        <Typography className={ classes.bold } display="inline">
                        Cookies or Browser Cookies
                        </Typography>
                        . A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                    </li>
                </ul>
            </Typography>
            <Typography paragraph={true}>
            Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies:&nbsp;
                <Link href="https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking" target="_blank" rel="noopener noreferrer">
                Use of Cookies by Free Privacy Policy
                </Link>
                .
            </Typography>
            <Typography paragraph={true}>
            We use both Session and Persistent Cookies for the purposes set out below:
            </Typography>
            <ul>
                <li>
                    <Typography className={ classes.bold } paragraph={true}>
                    Necessary / Essential Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Type: Session Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Administered by: Us
                    </Typography>
                    <Typography paragraph={true}>
                    Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                    </Typography>
                </li>
                <li>
                    <Typography className={ classes.bold } paragraph={true}>
                    Cookies Policy / Notice Acceptance Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Type: Persistent Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Administered by: Us
                    </Typography>
                    <Typography paragraph={true}>
                    Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
                    </Typography>
                </li>
                <li>
                    <Typography className={ classes.bold } paragraph={true}>
                    Functionality Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Type: Persistent Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Administered by: Us
                    </Typography>
                    <Typography paragraph={true}>
                    Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                    </Typography>
                </li>
                <li>
                    <Typography className={ classes.bold } paragraph={true}>
                    Analytics Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Type: Session Cookies
                    </Typography>
                    <Typography paragraph={true}>
                    Administered by: Google
                    </Typography>
                    <Typography paragraph={true}>
                    Purpose: We use a tool called “Google Analytics” to collect information about use of this site. Google Analytics collects information such as how often users visit this site, what pages they visit when they do so, and what other sites they used prior to coming to this site. We use the information we get from Google Analytics only to improve this site. Google Analytics collects only the IP address assigned to you on the date you visit this site, rather than your name or other identifying information. We do not combine the information collected through the use of Google Analytics with personally identifiable information. Although Google Analytics plants a permanent cookie on your web browser to identify you as a unique user the next time you visit this site, the cookie cannot be used by anyone but Google. Google’s ability to use and share information collected by Google Analytics about your visits to this site is restricted by the&nbsp;
                        <Link href="https://www.google.com/analytics/terms/" target="_blank" rel="noopener noreferrer">
                        Google Analytics Terms of Use
                        </Link>
                    &nbsp;(as amended for government websites) and the&nbsp;
                        <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                        Google Privacy Policy
                        </Link>
                    . You can prevent Google Analytics from recognizing you on return visits to this site by disabling cookies on your browser.
                    </Typography>
                </li>
            </ul>
            <Typography className={ classes.bold } variant="h5" id="Use-of-Your-Personal-Data" data-id="Use-of-Your-Personal-Data" gutterBottom>
            Use of Your Personal Data
            </Typography>
            <Typography paragraph={true}>
            The Organization may use Personal Data for the following purposes:
            </Typography>
            <ul>
                <li>
                    <Typography className={ classes.bold } display="inline">
                    To provide and maintain our Service
                    </Typography>
                , including to monitor the usage of our Service.
                </li>
                <li>
                    <Typography className={ classes.bold } display="inline">
                    To manage Your Account
                    </Typography>
                 : to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
                </li>
                <li>
                    <Typography className={ classes.bold } display="inline">
                    To manage Your requests
                    </Typography>
                 : To attend and manage Your requests to Us.
                </li>
                <li>
                    <Typography className={ classes.bold } display="inline">
                    For other purposes
                    </Typography>
                : We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.
                </li>
            </ul>
            <Typography paragraph={true}>
            We may share Your personal information in the following situations:
            </Typography>
            <ul>
                <li>
                    <Typography className={ classes.bold } display="inline">
                    With Service Providers
                    </Typography>
                 : We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.
                </li>
                <li>
                    <Typography className={ classes.bold } display="inline">
                    With other users
                    </Typography>
                    : when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
                </li>
                <li>
                    <Typography className={ classes.bold } display="inline">
                    With Your consent
                    </Typography>
                    : We may disclose Your personal information for any other purpose with Your consent.
                </li>
            </ul>
            <Typography className={ classes.bold } variant="h5" id="Retention-of-Your-Personal-Data" data-id="Retention-of-Your-Personal-Data" gutterBottom>
            Retention of Your Personal Data
            </Typography>
            <Typography paragraph={true}>
            The Organization will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy, or until You decide to delete all of your personal information. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </Typography>
            <Typography className={ classes.bold } variant="h5" id="Transfer-of-Your-Personal-Data" data-id="Transfer-of-Your-Personal-Data" gutterBottom>
            Transfer of Your Personal Data
            </Typography>
            <Typography paragraph={true}>
            Your information, including Personal Data, is processed at the Organization’s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
            </Typography>
            <Typography paragraph={true}>
            Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
            </Typography>
            <Typography paragraph={true}>
            The Organization will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
            </Typography>
            <Typography className={ classes.bold } variant="h5" id="Disclosure-of-Your-Personal-Data" data-id="Disclosure-of-Your-Personal-Data" gutterBottom>
            Disclosure of Your Personal Data
            </Typography>
            <Typography className={ classes.bold }  id="Law-enforcement" data-id="Law-enforcement" gutterBottom>
            Law enforcement
            </Typography>
            <Typography paragraph={true}>
            Under certain circumstances, the Organization may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
            </Typography>
            <Typography className={ classes.bold } id="Other-legal-requirements" data-id="Other-legal-requirements" gutterBottom>
            Other legal requirements
            </Typography>
            <Typography paragraph={true}>
            The Organization may disclose Your Personal Data in the good faith belief that such action is necessary to:
            </Typography>
            <ul>
                <li>
                Comply with a legal obligation
                </li>
                <li>
                Protect and defend the rights or property of the Organization
                </li>
                <li>
                Prevent or investigate possible wrongdoing in connection with the Service
                </li>
                <li>
                Protect the personal safety of Users of the Service or the public
                </li>
                <li>
                Protect against legal liability
                </li>
            </ul>
            <Typography className={ classes.bold } variant="h5" id="Security-of-Your-Personal-Data" data-id="Security-of-Your-Personal-Data" gutterBottom>
            Security of Your Personal Data
            </Typography>
            <Typography paragraph={true}>
            The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
            </Typography>
            <Typography variant="h4" id="Links-to-Other-Websites" data-id="Links-to-Other-Websites" gutterBottom>
            Links to Other Websites
            </Typography>
            <Typography paragraph={true}>
            Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party’s site. We bly advise You to review the Privacy Policy of every site You visit.
            </Typography>
            <Typography paragraph={true}>
            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </Typography>
            <Typography variant="h4" id="Changes-to-this-Privacy-Policy" data-id="Changes-to-this-Privacy-Policy" gutterBottom>
            Changes to this Privacy Policy
            </Typography>
            <Typography paragraph={true}>
            We reserve the right, at Our sole discretion, to modify or replace this Policy at any time. If a revision is material We will make reasonable efforts to provide at least 30 days’ notice prior to any new policies taking effect. What constitutes a material change will be determined at Our sole discretion.
            </Typography>
            <Typography paragraph={true}>
            By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised policies. If You do not agree to the new policies, in whole or in part, please stop using the website and the Service.
            </Typography>
            <Typography paragraph={true}>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </Typography>
            <Typography variant="h4" id="Contact-Us" data-id="Contact-Us" gutterBottom>
            Contact Us
            </Typography>
            <Typography paragraph={true}>
            If you have any questions about this Privacy Policy, You can contact us:
            </Typography>
            <ul>
                <li>
                By email:&nbsp;
                    <Link href="mailto:nijobs@aefeup.pt" target="_blank" rel="noopener noreferrer">
                    nijobs@aefeup.pt
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default PrivacyPolicyContent;
