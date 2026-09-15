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

    // UI data fix: this collection must be part of mockData for the Members view to render it.
    members: [
    {
        id: "001",
        img: "../src/assets/user-avatars/user-avatar-1.jpg",
        name: "Ahmad",
        payment: "cash",
        time: "20min",
        status: "Active",
    },
    {
        id: "002",
        img: "../src/assets/user-avatars/user-avatar-2.jpg",
        name: "Mahmood",
        payment: "cash",
        time: "1hr",
        status: "Active",
    },
    {
        id: "003",
        img: "../src/assets/user-avatars/user-avatar-3.jpg",
        name: "Ali",
        payment: "cash",
        time: "10hrs",
        status: "Active",
    },
    {
        id: "004",
        img: "../src/assets/user-avatars/user-avatar-4.jpg",
        name: "Basir",
        payment: "cash",
        time: "1day",
        status: "Active",
    },
    {
        id: "005",
        img: "../src/assets/user-avatars/user-avatar-5.jpg",
        name: "Saleem",
        payment: "cash",
        time: "27days",
        status: "Expiring Soon",
    },
    {
        id: "006",
        img: "../src/assets/user-avatars/user-avatar-6.jpg",
        name: "Qader",
        payment: "cash",
        time: "33days",
        status: "Expired",
    },
    {
        id: "007",
        img: "../src/assets/user-avatars/user-avatar-7.jpg",
        name: "Sabawoon",
        payment: "cash",
        time: "28days",
        status: "Expiring Soon",
    },
],
};

export default mockData;
