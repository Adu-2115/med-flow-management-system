
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const recentSales = [
  {
    id: "INV-001",
    customer: "John Doe",
    amount: 245.99,
    status: "completed",
    date: "2024-04-14",
  },
  {
    id: "INV-002",
    customer: "Sarah Johnson",
    amount: 189.50,
    status: "completed",
    date: "2024-04-14",
  },
  {
    id: "INV-003",
    customer: "Michael Smith",
    amount: 352.75,
    status: "pending",
    date: "2024-04-13",
  },
  {
    id: "INV-004",
    customer: "Emily Wilson",
    amount: 98.25,
    status: "completed",
    date: "2024-04-13",
  },
  {
    id: "INV-005",
    customer: "David Brown",
    amount: 425.00,
    status: "cancelled",
    date: "2024-04-12",
  },
];

const RecentSales = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>${sale.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={cn(
                      "capitalize",
                      sale.status === "completed" && "bg-emerald-500",
                      sale.status === "pending" && "bg-amber-500",
                      sale.status === "cancelled" && "bg-pharmacy-red"
                    )}
                  >
                    {sale.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
