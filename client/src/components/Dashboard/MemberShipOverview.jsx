import { useLocale } from "../../i18n/useLocale";
import { useEffect, useState } from "react";
import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getApiErrorMessage } from "../../api/apiClient";
import { getMembers } from "../../api/membersApi";
// import { RechartsDevtools } from '@recharts/devtools';

const COLORS = {
  Active: "var(--primary)",
  "Expiring Soon": "var(--foreground)",
  Expired: "var(--accent)",
};


function MemberShipOverview() {
    const { t, formatNumber, translateError } = useLocale();

    
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
          async function loadMembers() {
              try {
                  // Fetch once, then filter locally so plan names do not need to be converted into invented IDs.
                  setMembers(await getMembers());
              } catch (requestError) {
                  setError(getApiErrorMessage(requestError, "Could not load members. Please try again."));
              }
          }
          loadMembers();
      }, []);


  const membershipOverview = [
          { name: "Active", value: members.filter((item) => item.status === "Active").length },
          { name: "Expiring Soon", value: members.filter((item) => item.status === "Expiring Soon").length },
          { name: "Expired", value: members.filter((item) => item.status === "Expired").length },
      ];
  const total = membershipOverview.reduce((sum, item) => sum + item.value, 0);


  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10 sm:p-6">
        <div className="mb-2">
        <h2 className="text-base font-semibold text-card-foreground">{t("Membership Overview")}</h2>
        <p className="text-xs text-muted-foreground">{t("Expiring Soon = expires within the next 7 days")}</p>
      </div>


      {error && <p className="mb-3 text-sm text-red-500">{translateError(error)}</p>}
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
              formatter={(value, name) => [formatNumber(value), t(name)]}
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
          <span className="text-2xl font-bold text-card-foreground">{formatNumber(total)}</span>
          <span className="text-xs text-muted-foreground">{t("Total")}</span>
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
              {t(item.name)}
            </span>
            <span className="font-semibold text-card-foreground">{formatNumber(item.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberShipOverview;
