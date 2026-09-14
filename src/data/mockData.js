const mockData = {
    summaryData : [
    {
        id: "members",
        label: "Members",
        value: 120,
    },
    {
        id: "active",
        label: "Active",
        value: 95,
    },
    {
        id: "expired",
        label: "Expired",
        value: 15,
    },
    {
        id: "income",
        label: "Monthly Income",
        value: "$1,500",
    },
],

    incomeData : [
    { month: "Jan", income: 1800},
    { month: "Feb", income: 2200},
    { month: "Mar", income: 1950},
    { month: "Apr", income: 2600},
    { month: "May", income: 2400},
    { month: "Jun", income: 2900},
    { month: "Jul", income: 2750},
    { month: "Aug", income: 3150},
    { month: "Sep", income: 3000},
    { month: "Oct", income: 2900},
    { month: "Nov", income: 2560},
    { month: "Dec", income: 2870},
],

    membershipOverview : [
    {
        name: "Active",
        value: 95,
    },
    {
        name: "Expiring Soon",
        value: 10,
    },
    {
        name: "Expired",
        value: 15,
    },
],

dashboardInfo : [
    {
        label: "Membership Expiring Soon",
        value: 10,
        action: "View",
    },
    {
        label: "Recent Payments",
        action: "View",
    },
],
expiringSoonCount : 10,
}
export default mockData;