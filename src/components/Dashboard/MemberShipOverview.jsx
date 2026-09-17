import mockData from "../../data/mockData";
import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

const COLORS = {
  Active: "var(--primary)",
  "Expiring Soon": "var(--foreground)",
  Expired: "var(--accent)",
};

// #region Sample data
const {membershipOverview} = mockData;
// #endregion
function MemberShipOverview() {
    const total = membershipOverview.reduce((sum, item) => sum + item.value, 0);


  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10 sm:p-6">
        <div className="mb-2">
        <h2 className="text-base font-semibold text-card-foreground">
          Membership Overview
        </h2>
        <p className="text-xs text-muted-foreground">
          Expiring Soon = expires within the next 7 days
        </p>
      </div>


         <div className="relative h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={membershipOverview}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={78}
              paddingAngle={3}
              strokeWidth={0}
              isAnimationActive={false}
            >
              {membershipOverview.map((item) => (
                <Cell key={item.name} fill={COLORS[item.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-card-foreground">{total}</span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {membershipOverview.map((item) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[item.name] }}
              />
              {item.name}
            </span>
            <span className="font-semibold text-card-foreground">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberShipOverview;
