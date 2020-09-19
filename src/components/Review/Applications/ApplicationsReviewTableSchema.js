export const columns = {
    name: { align: "left", disablePadding: true, label: "Company Name" },
    date: { align: "right", disablePadding: false, label: "Requested At" },
    status: { align: "right", disablePadding: false, label: "Status" },
    actions: { align: "right", disablePadding: false, label: "Actions", disableSorting: true },
};

export const ApplicationStatusLabel = Object.freeze({
    APPROVED: "Approved",
    PENDING: "Pending",
    REJECTED: "Rejected",
});
