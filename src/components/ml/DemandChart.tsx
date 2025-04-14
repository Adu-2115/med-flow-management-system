
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Sample forecast data
const forecastData = [
  { month: "Jan", actual: 120, predicted: 115 },
  { month: "Feb", actual: 145, predicted: 140 },
  { month: "Mar", actual: 170, predicted: 180 },
  { month: "Apr", actual: 190, predicted: 200 },
  { month: "May", actual: 205, predicted: 210 },
  { month: "Jun", actual: 220, predicted: 230 },
  { month: "Jul", actual: 240, predicted: 245 },
  { month: "Aug", actual: 235, predicted: 240 },
  { month: "Sep", actual: 255, predicted: 260 },
  { month: "Oct", actual: null, predicted: 280 },
  { month: "Nov", actual: null, predicted: 290 },
  { month: "Dec", actual: null, predicted: 310 },
];

const DemandChart = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg">Demand Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Actual Sales"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              strokeDasharray="5 5"
              name="Predicted Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemandChart;
