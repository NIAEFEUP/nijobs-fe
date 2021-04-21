import React, { useState } from "react";


export const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    return {
        contacts,
        setContacts,
    };
};
const ContactsForm = () => (
    // Start with one input (have a toggle for email or phone - can have validation)
    // button to add more inputs
    // max 10 inputs
    // 1 contact required
    <div>constacts form</div>
);

export default ContactsForm;
