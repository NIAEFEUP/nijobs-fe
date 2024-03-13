export default class Company {
    constructor({
        _id, name, bio, contacts, hasFinishedRegistration,
        isBlocked, isDisabled, logo
    }) {
        this._id = _id;
        this.name = name;
        this.bio = bio;
        this.contacts = contacts;
        this.hasFinishedRegistration = hasFinishedRegistration;
        this.isBlocked = isBlocked;
        this.isDisabled = isDisabled;
        this.logo = logo;
    }
}
