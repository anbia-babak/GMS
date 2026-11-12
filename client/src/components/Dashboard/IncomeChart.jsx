import { useLocale } from "../../i18n/useLocale";
import mockData from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { generateMockData, RechartsDevtools } from '@recharts/devtools';



const {incomeData} = mockData;
function IncomeChart() {
    const { t, language, formatCurrency, formatDate } = useLocale();
  const formatMonth = (month) => formatDate(new Date(2026, incomeData.findIndex((item) => item.month === month), 1), { month: "short", calendar: "gregory" });
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-card-foreground">{t("Income Analytics")}</h2>
        <p className="text-xs text-muted-foreground">{t("Jan – Aug (mock data)")}</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={incomeData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="month"
              reversed={language !== "en"}
              tickFormatter={formatMonth}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              orientation={language === "en" ? "left" : "right"}
              tickFormatter={(value) => formatCurrency(value, { notation: "compact" })}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              contentStyle={{
                backgroundColor: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
              }}
              labelFormatter={formatMonth}
              formatter={(value) => [formatCurrency(value), t("Income")]}
            />
            <Bar
              dataKey="income"
              fill="var(--primary)"
              radius={[6, 6, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeChart;
