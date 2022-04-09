export default class Offer {
    constructor({
        _id, title, publishDate, publishEndDate, owner, ownerName, ownerLogo, location, jobStartDate, jobMinDuration, jobMaxDuration,
        description, contacts, isPaid, vacancies, jobType, fields, technologies, isHidden, hiddenReason, adminReason, requirements,
    }) {
        this._id = _id;
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
        this.isPaid = isPaid;
        this.vacancies = vacancies;
        this.jobType = jobType;
        this.fields = fields;
        this.technologies = technologies;
        this.isHidden = isHidden;
        this.hiddenReason = hiddenReason;
        this.adminReason = adminReason;
        this.requirements = requirements;
    }
}
