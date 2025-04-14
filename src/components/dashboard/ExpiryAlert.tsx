
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data
const expiringMedicines = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    batch: "AMX-22001",
    expiryDate: "2024-04-30",
    daysLeft: 16,
    stock: 120,
  },
  {
    id: 2,
    name: "Losartan 50mg",
    batch: "LST-22034",
    expiryDate: "2024-05-15",
    daysLeft: 31,
    stock: 85,
  },
  {
    id: 3,
    name: "Metformin 850mg",
    batch: "MTF-22089",
    expiryDate: "2024-05-22",
    daysLeft: 38,
    stock: 210,
  },
  {
    id: 4,
    name: "Atorvastatin 20mg",
    batch: "ATV-22015",
    expiryDate: "2024-06-05",
    daysLeft: 52,
    stock: 150,
  },
];

const ExpiryAlert = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg">Expiring Medicines</CardTitle>
        <CardDescription>Products expiring within 60 days</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicine</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expiringMedicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell className="font-medium">{medicine.name}</TableCell>
                <TableCell>{medicine.batch}</TableCell>
                <TableCell>{medicine.expiryDate}</TableCell>
                <TableCell className="text-right">{medicine.stock}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-none",
                      medicine.daysLeft <= 20 && "text-pharmacy-red",
                      medicine.daysLeft > 20 && medicine.daysLeft <= 40 && "text-pharmacy-orange",
                      medicine.daysLeft > 40 && "text-pharmacy-yellow"
                    )}
                  >
                    {medicine.daysLeft} days
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

export default ExpiryAlert;
