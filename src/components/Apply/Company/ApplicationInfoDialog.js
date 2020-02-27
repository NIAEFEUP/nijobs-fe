import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";

const ApplicationInfoDialog = ({ open, toggle }) => (
    <Dialog open={open}>
        <DialogTitle>
                    Why do I need to apply?
        </DialogTitle>
        <DialogContent style={{ textAlign: "justify" }}>
            <p>
                {"NIJobs is a free platform for companies to share their job opportunities with students."}
            </p>
            <p>
                {"As this is made by students, for students, we oversee the entries \
                        so that we can make sure that both our and the participating companies' expectations are satisfied."}
            </p>
            {/* <p>
                        {"For now, we only need you to provide an email, so that we can contact you regarding your application, \
                        and a password, (keep in mind that you will need it to enter NIJobs if accepted, but you can change it later)."}
                    </p>
                    <p>
                        {"Additionally, we also request a Company Name, so that we can better identify you, \
                        and a motivation text: here you can talk about your company: what do you do, \
                        why do you want to apply as NIJobs Company, share your website/social networks, etc..."}
                    </p> */}
            <p>
                {"Once you're accepted, you will receive an email from us and you \
                        will be able to further customize your profile (Add a nice Bio, and a Company Logo)"}
            </p>
            <p>
                {"See you soon!"}
            </p>
        </DialogContent>
        <DialogActions>
            <Button onClick={toggle} color="primary" variant="contained">Close</Button>
        </DialogActions>
    </Dialog>
);

export default ApplicationInfoDialog;
