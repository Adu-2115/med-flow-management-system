
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", total: 1800 },
  { name: "Feb", total: 2200 },
  { name: "Mar", total: 2700 },
  { name: "Apr", total: 3200 },
  { name: "May", total: 3800 },
  { name: "Jun", total: 3500 },
  { name: "Jul", total: 4000 },
  { name: "Aug", total: 3700 },
  { name: "Sep", total: 3300 },
  { name: "Oct", total: 3900 },
  { name: "Nov", total: 4200 },
  { name: "Dec", total: 4500 },
];

const SalesChart = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg">Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, "Revenue"]}
              cursor={{ fill: "rgba(155, 135, 245, 0.1)" }}
            />
            <Bar
              dataKey="total"
              fill="#9b87f5"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
