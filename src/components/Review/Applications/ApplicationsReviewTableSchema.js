export const columns = {
    name: { align: "left", disablePadding: true, label: "Company Name" },
    date: { align: "right", disablePadding: false, label: "Requested At" },
    state: { align: "right", disablePadding: false, label: "State" },
    actions: { align: "right", disablePadding: false, label: "", disableSorting: true },
};

export const ApplicationStateLabel = Object.freeze({
    APPROVED: "Approved",
    PENDING: "Pending",
    REJECTED: "Rejected",
});
