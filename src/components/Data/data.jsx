export const ApplyNowColumns = [
    {
        name: "Name",
        selector: (row) => row.Name || "N/A", // Fallback for undefined data
        sortable: true,
    },
    {
        name: "Email",
        selector: (row) => row.EmailID || "N/A",
        sortable: true,
    },
    {
        name: "Mobile",
        selector: (row) => row.MobileNumber || "N/A",
        sortable: true,
    },
    {
        name: "Property Location",
        selector: (row) => row.PropertyLocation || "N/A",
        sortable: true,
    },
    {
        name: "State",
        selector: (row) => row.State || "N/A",
        sortable: true,
    },
    {
        name: "Pincode",
        selector: (row) => row.Pincode || "N/A",
        sortable: true,
    },
    {
        name: "Loan Amount",
        selector: (row) => row.LoanAmount || "N/A",
        sortable: true,
    },
    {
        name: "Loan Purpose",
        selector: (row) => row.LoanPurpose || "N/A",
        sortable: true,
    },
    {
        name: "Income Status",
        selector: (row) => row.IncomeStatus || "N/A",
        sortable: true,
    },
];
