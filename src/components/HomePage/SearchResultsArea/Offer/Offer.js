export default class Offer {
    constructor({
        _id, title, publishDate, publishEndDate, owner, ownerName, ownerLogo, location, jobStartDate, jobMinDuration,
        jobMaxDuration, description, contacts, fields, technologies,
    }) {
        this.id = _id;
        this.title = title;
        this.publishDate = publishDate;
        this.publishEndDate = publishEndDate;
        this.owner = owner;
        this.ownerName = ownerName;
        this.ownerLogo = ownerLogo;
        this.location = location;
        this.jobStartDate = jobStartDate;
        this.jobMinDuration = jobMinDuration;
        this.jobMaxDuration = jobMaxDuration;
        this.description = description;
        this.contacts = contacts;
        this.fields = fields;
        this.technologies = technologies;
    }
}
