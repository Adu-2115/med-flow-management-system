
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { toast } from "@/components/ui/sonner";
import { Download, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Sample data for reports
const salesData = [
  { month: "Jan", sales: 1500, profit: 450 },
  { month: "Feb", sales: 1800, profit: 540 },
  { month: "Mar", sales: 2200, profit: 660 },
  { month: "Apr", sales: 2500, profit: 750 },
  { month: "May", sales: 2300, profit: 690 },
  { month: "Jun", sales: 2600, profit: 780 },
];

const categoryData = [
  { name: "Antibiotics", value: 35 },
  { name: "Painkillers", value: 25 },
  { name: "Vitamins", value: 15 },
  { name: "Dermatology", value: 10 },
  { name: "Other", value: 15 },
];

const COLORS = ["#9b87f5", "#7E69AB", "#F2FCE2", "#FEF7CD", "#FEC6A1"];

const expiryData = [
  {
    name: "Amoxicillin 500mg",
    batch: "AMX-2204",
    expiryDate: "2024-05-15",
    stock: 85,
    value: 1062.5,
  },
  {
    name: "Ibuprofen 400mg",
    batch: "IBU-2208",
    expiryDate: "2024-05-25",
    stock: 120,
    value: 780.0,
  },
  {
    name: "Loratadine 10mg",
    batch: "LOR-2202",
    expiryDate: "2024-06-10",
    stock: 65,
    value: 568.75,
  },
  {
    name: "Omeprazole 20mg",
    batch: "OME-2203",
    expiryDate: "2024-06-22",
    stock: 45,
    value: 416.25,
  },
  {
    name: "Cetirizine 10mg",
    batch: "CET-2205",
    expiryDate: "2024-07-05",
    stock: 90,
    value: 652.50,
  },
];

const Reports = () => {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("month");
  
  const showNotImplemented = () => {
    toast.info("This feature is not implemented yet", {
      description: "This is just a demo",
    });
  };

  const handleExportReport = () => {
    toast.success("Report exported successfully", {
      description: "The report has been downloaded as PDF",
    });
  };

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reports & Analytics</CardTitle>
          <Button onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="inventory">Inventory Report</SelectItem>
                  <SelectItem value="expiry">Expiry Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <div className="flex gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-2">
                      <div className="grid gap-2">
                        <p className="text-sm font-medium">Custom Date Range</p>
                        <div className="flex gap-2">
                          <input
                            type="date"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={showNotImplemented}
                          />
                          <input
                            type="date"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={showNotImplemented}
                          />
                        </div>
                      </div>
                      <Button onClick={showNotImplemented}>Apply</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          {reportType === "sales" && (
            <Tabs defaultValue="chart" className="space-y-4">
              <TabsList>
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sales Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, ""]} />
                          <Legend />
                          <Bar dataKey="sales" name="Sales" fill="#9b87f5" />
                          <Bar dataKey="profit" name="Profit" fill="#7E69AB" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sales by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                      <TableHead className="text-right">Profit</TableHead>
                      <TableHead className="text-right">Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell className="text-right">${item.sales}</TableCell>
                        <TableCell className="text-right">${item.profit}</TableCell>
                        <TableCell className="text-right">{(item.profit / item.sales * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-medium">Total</TableCell>
                      <TableCell className="text-right font-medium">
                        ${salesData.reduce((acc, item) => acc + item.sales, 0)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${salesData.reduce((acc, item) => acc + item.profit, 0)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {(salesData.reduce((acc, item) => acc + item.profit, 0) / 
                         salesData.reduce((acc, item) => acc + item.sales, 0) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          )}
          
          {reportType === "inventory" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inventory Value by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { name: "Antibiotics", value: 12500 },
                        { name: "Painkillers", value: 8750 },
                        { name: "Vitamins", value: 6300 },
                        { name: "Dermatology", value: 5200 },
                        { name: "Other", value: 9800 },
                      ]}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
                      <Bar dataKey="value" fill="#9b87f5" name="Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Inventory Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Items</span>
                        <span className="font-medium">1,243</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Value</span>
                        <span className="font-medium">$42,550</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Low Stock Items</span>
                        <span className="font-medium text-pharmacy-orange">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Out of Stock</span>
                        <span className="font-medium text-pharmacy-red">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expiring Soon</span>
                        <span className="font-medium text-pharmacy-yellow">15</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Stock Level Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart
                        data={[
                          { month: "Jan", stock: 1150 },
                          { month: "Feb", stock: 1220 },
                          { month: "Mar", stock: 1180 },
                          { month: "Apr", stock: 1243 },
                          { month: "May", stock: 1300 },
                          { month: "Jun", stock: 1260 },
                        ]}
                      >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="stock" stroke="#9b87f5" strokeWidth={2} name="Stock Level" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {reportType === "expiry" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Products Expiring Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expiryData.map((item) => (
                        <TableRow key={item.batch}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.batch}</TableCell>
                          <TableCell>{item.expiryDate}</TableCell>
                          <TableCell className="text-right">{item.stock}</TableCell>
                          <TableCell className="text-right">${item.value}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50">
                        <TableCell colSpan={3} className="font-medium">Total</TableCell>
                        <TableCell className="text-right font-medium">
                          {expiryData.reduce((acc, item) => acc + item.stock, 0)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${expiryData.reduce((acc, item) => acc + item.value, 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expiry by Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={[
                          { month: "May", value: 1840 },
                          { month: "Jun", value: 985 },
                          { month: "Jul", value: 650 },
                          { month: "Aug", value: 420 },
                          { month: "Sep", value: 280 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
                        <Bar dataKey="value" name="Value" fill="#9b87f5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expiry Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-3">
                        <p className="font-medium">Discount Strategy</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Consider applying 15% discount on products expiring in the next 30 days to speed up sales.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={showNotImplemented}>
                          Apply Discounts
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <p className="font-medium">Return Policy</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Check return policy for MediPharm supplier - 15 products eligible for return before expiry.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={showNotImplemented}>
                          Process Returns
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <p className="font-medium">Order Optimization</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Reduce next order quantity for Amoxicillin to prevent future expiry issues.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={showNotImplemented}>
                          Adjust Orders
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Reports;
