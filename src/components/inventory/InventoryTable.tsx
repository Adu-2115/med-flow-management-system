
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreHorizontal, Edit, Trash, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

// Sample inventory data
const inventoryData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Analgesics",
    stock: 120,
    price: 5.99,
    expiryDate: "2025-02-15",
    supplier: "MediPharm",
    status: "in-stock",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    stock: 85,
    price: 12.50,
    expiryDate: "2024-12-10",
    supplier: "PharmaCare",
    status: "in-stock",
  },
  {
    id: 3,
    name: "Loratadine 10mg",
    category: "Antihistamines",
    stock: 45,
    price: 8.75,
    expiryDate: "2024-08-30",
    supplier: "MediPharm",
    status: "in-stock",
  },
  {
    id: 4,
    name: "Atorvastatin 20mg",
    category: "Statins",
    stock: 30,
    price: 15.25,
    expiryDate: "2025-03-22",
    supplier: "MediSource",
    status: "low-stock",
  },
  {
    id: 5,
    name: "Metformin 500mg",
    category: "Antidiabetics",
    stock: 15,
    price: 7.99,
    expiryDate: "2024-09-18",
    supplier: "PharmaCare",
    status: "low-stock",
  },
  {
    id: 6,
    name: "Ibuprofen 400mg",
    category: "NSAIDs",
    stock: 5,
    price: 6.50,
    expiryDate: "2024-11-05",
    supplier: "MediPharm",
    status: "critical",
  },
  {
    id: 7,
    name: "Omeprazole 20mg",
    category: "PPIs",
    stock: 0,
    price: 9.25,
    expiryDate: "2025-01-20",
    supplier: "MediSource",
    status: "out-of-stock",
  },
  {
    id: 8,
    name: "Simvastatin 10mg",
    category: "Statins",
    stock: 62,
    price: 11.30,
    expiryDate: "2024-10-12",
    supplier: "PharmaCare",
    status: "in-stock",
  },
  {
    id: 9,
    name: "Losartan 50mg",
    category: "ARBs",
    stock: 25,
    price: 14.75,
    expiryDate: "2024-07-28",
    supplier: "MediPharm",
    status: "low-stock",
  },
  {
    id: 10,
    name: "Cetirizine 10mg",
    category: "Antihistamines",
    stock: 78,
    price: 7.25,
    expiryDate: "2024-12-30",
    supplier: "MediSource",
    status: "in-stock",
  },
];

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const showNotImplemented = () => {
    toast.info("This feature is not implemented yet", {
      description: "This is just a demo",
    });
  };

  // Filter the inventory based on search term
  const filteredInventory = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-emerald-500">In Stock</Badge>;
      case "low-stock":
        return <Badge className="bg-pharmacy-orange">Low Stock</Badge>;
      case "critical":
        return <Badge className="bg-pharmacy-red">Critical</Badge>;
      case "out-of-stock":
        return <Badge variant="outline" className="text-pharmacy-red border-pharmacy-red">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
        <CardDescription>Manage your pharmacy inventory, track stock levels and expiry dates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search medicines..."
              className="w-[240px] md:w-[300px] lg:w-[400px] pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={showNotImplemented}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={showNotImplemented}>
              Add Medicine
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-1">
                      {item.name}
                      {item.status === "critical" && (
                        <AlertCircle size={16} className="text-pharmacy-red" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={showNotImplemented}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={showNotImplemented} className="text-pharmacy-red">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
