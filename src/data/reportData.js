// Sample data for the Reports section.
// Replace these arrays with your real data when you wire up your own logic.

export const members = [
  { id: "#001", name: "Ahmad Rahimi", phone: "+93 700 000 001", joined: "2026-01-10", status: "Active" },
  { id: "#002", name: "Sara Ahmadi", phone: "+93 700 000 002", joined: "2026-02-03", status: "Active" },
  { id: "#003", name: "Omid Karimi", phone: "+93 700 000 003", joined: "2026-02-18", status: "Active" },
  { id: "#004", name: "Laila Nazari", phone: "+93 700 000 004", joined: "2026-03-05", status: "Active" },
  { id: "#005", name: "Hamed Yousufi", phone: "+93 700 000 005", joined: "2026-03-21", status: "Active" },
];

export const memberships = [
  { id: "#M101", member: "Ahmad Rahimi", plan: "Monthly", start: "2026-09-01", expires: "2026-10-01", status: "Active" },
  { id: "#M102", member: "Sara Ahmadi", plan: "3 Months", start: "2026-08-15", expires: "2026-11-15", status: "Active" },
  { id: "#M103", member: "Omid Karimi", plan: "Monthly", start: "2026-09-05", expires: "2026-10-05", status: "Active" },
  { id: "#M104", member: "Laila Nazari", plan: "Yearly", start: "2026-03-05", expires: "2027-03-05", status: "Active" },
  { id: "#M105", member: "Hamed Yousufi", plan: "Monthly", start: "2026-09-10", expires: "2026-10-10", status: "Active" },
];

export const payments = [
  { id: "#P201", date: "2026-09-01", member: "Ahmad Rahimi", amount: 3000, method: "Cash" },
  { id: "#P202", date: "2026-09-05", member: "Omid Karimi", amount: 3000, method: "Card" },
  { id: "#P203", date: "2026-09-10", member: "Hamed Yousufi", amount: 3000, method: "Cash" },
  { id: "#P204", date: "2026-09-12", member: "Sara Ahmadi", amount: 1300, method: "Card" },
  { id: "#P205", date: "2026-09-15", member: "Laila Nazari", amount: 3000, method: "Cash" },
];
