
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
import { Search, Filter, MoreHorizontal, Edit, Trash, AlertCircle, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

// Sample inventory data with Indian names and rupee pricing
const inventoryData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Analgesics",
    stock: 120,
    price: 125.50,
    expiryDate: "2025-02-15",
    supplier: "Sunpharma",
    status: "in-stock",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    stock: 85,
    price: 350.75,
    expiryDate: "2024-12-10",
    supplier: "Cipla",
    status: "in-stock",
  },
  {
    id: 3,
    name: "Loratadine 10mg",
    category: "Antihistamines",
    stock: 45,
    price: 180.25,
    expiryDate: "2024-08-30",
    supplier: "Sunpharma",
    status: "in-stock",
  },
  {
    id: 4,
    name: "Atorvastatin 20mg",
    category: "Statins",
    stock: 30,
    price: 420.50,
    expiryDate: "2025-03-22",
    supplier: "Zydus",
    status: "low-stock",
  },
  {
    id: 5,
    name: "Metformin 500mg",
    category: "Antidiabetics",
    stock: 15,
    price: 200.75,
    expiryDate: "2024-09-18",
    supplier: "Cipla",
    status: "low-stock",
  },
  {
    id: 6,
    name: "Ibuprofen 400mg",
    category: "NSAIDs",
    stock: 5,
    price: 115.50,
    expiryDate: "2024-11-05",
    supplier: "Sunpharma",
    status: "critical",
  },
  {
    id: 7,
    name: "Omeprazole 20mg",
    category: "PPIs",
    stock: 0,
    price: 210.25,
    expiryDate: "2025-01-20",
    supplier: "Zydus",
    status: "out-of-stock",
  },
  {
    id: 8,
    name: "Simvastatin 10mg",
    category: "Statins",
    stock: 62,
    price: 310.50,
    expiryDate: "2024-10-12",
    supplier: "Cipla",
    status: "in-stock",
  },
  {
    id: 9,
    name: "Losartan 50mg",
    category: "ARBs",
    stock: 25,
    price: 375.25,
    expiryDate: "2024-07-28",
    supplier: "Sunpharma",
    status: "low-stock",
  },
  {
    id: 10,
    name: "Cetirizine 10mg",
    category: "Antihistamines",
    stock: 78,
    price: 160.50,
    expiryDate: "2024-12-30",
    supplier: "Zydus",
    status: "in-stock",
  },
];

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(inventoryData);
  const [addMedicineOpen, setAddMedicineOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    category: "Analgesics",
    stock: 0,
    price: 0,
    expiryDate: "",
    supplier: "MediPharm",
    status: "in-stock" as const
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMedicineOpen = () => {
    setNewMedicine({
      name: "",
      category: "Analgesics",
      stock: 0,
      price: 0,
      expiryDate: "",
      supplier: "MediPharm",
      status: "in-stock"
    });
    setAddMedicineOpen(true);
  };

  const handleAddMedicine = () => {
    const id = Math.max(...inventory.map(item => item.id)) + 1;
    const medicine = {
      id,
      ...newMedicine,
      status: newMedicine.stock > 30 ? "in-stock" : newMedicine.stock > 10 ? "low-stock" : newMedicine.stock > 0 ? "critical" : "out-of-stock"
    };
    
    setInventory([...inventory, medicine]);
    setAddMedicineOpen(false);
    toast.success("Medicine added successfully", {
      description: `${newMedicine.name} has been added to inventory`
    });
  };
  
  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
    toast.success("Medicine removed", {
      description: "The item has been deleted from inventory"
    });
  };
  
  const handleEditItem = (id: number) => {
    const item = inventory.find(item => item.id === id);
    if (item) {
      setNewMedicine({
        name: item.name,
        category: item.category,
        stock: item.stock,
        price: item.price,
        expiryDate: item.expiryDate,
        supplier: item.supplier,
        status: item.status as any
      });
      setEditItemId(id);
      setAddMedicineOpen(true);
    }
  };
  
  const handleSaveEdit = () => {
    if (editItemId !== null) {
      setInventory(inventory.map(item => 
        item.id === editItemId 
          ? { 
              ...item, 
              ...newMedicine, 
              status: newMedicine.stock > 30 ? "in-stock" : newMedicine.stock > 10 ? "low-stock" : newMedicine.stock > 0 ? "critical" : "out-of-stock" 
            } 
          : item
      ));
      setEditItemId(null);
      setAddMedicineOpen(false);
      toast.success("Medicine updated", {
        description: `${newMedicine.name} has been updated`
      });
    }
  };

  // Filter the inventory based on search term
  const filteredInventory = inventory.filter(item => 
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
    <>
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
              <Button variant="outline" size="sm" onClick={() => toast.info("Filters applied")}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button onClick={handleAddMedicineOpen}>
                <Plus className="h-4 w-4 mr-2" />
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
                  <TableHead className="text-right">Price (₹)</TableHead>
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
                    <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleEditItem(item.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteItem(item.id)} className="text-pharmacy-red">
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

      {/* Add/Edit Medicine Dialog */}
      <Dialog open={addMedicineOpen} onOpenChange={setAddMedicineOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editItemId ? "Edit Medicine" : "Add New Medicine"}</DialogTitle>
            <DialogDescription>
              Enter the details of the medicine to add to the inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                className="col-span-3" 
                placeholder="Medicine name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select 
                value={newMedicine.category}
                onValueChange={(value) => setNewMedicine({...newMedicine, category: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analgesics">Analgesics</SelectItem>
                  <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="Antihistamines">Antihistamines</SelectItem>
                  <SelectItem value="Statins">Statins</SelectItem>
                  <SelectItem value="NSAIDs">NSAIDs</SelectItem>
                  <SelectItem value="PPIs">PPIs</SelectItem>
                  <SelectItem value="Antidiabetics">Antidiabetics</SelectItem>
                  <SelectItem value="ARBs">ARBs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input 
                id="stock" 
                type="number"
                value={newMedicine.stock}
                onChange={(e) => setNewMedicine({...newMedicine, stock: parseInt(e.target.value) || 0})}
                className="col-span-3"
                placeholder="Quantity in stock"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price (₹)</Label>
              <Input 
                id="price" 
                type="number"
                value={newMedicine.price}
                onChange={(e) => setNewMedicine({...newMedicine, price: parseFloat(e.target.value) || 0})}
                step="0.01"
                className="col-span-3"
                placeholder="Price per unit"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">Expiry Date</Label>
              <Input 
                id="expiry" 
                type="date"
                value={newMedicine.expiryDate}
                onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">Supplier</Label>
              <Select 
                value={newMedicine.supplier}
                onValueChange={(value) => setNewMedicine({...newMedicine, supplier: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sunpharma">Sunpharma</SelectItem>
                  <SelectItem value="Cipla">Cipla</SelectItem>
                  <SelectItem value="Zydus">Zydus</SelectItem>
                  <SelectItem value="Dr. Reddy's">Dr. Reddy's</SelectItem>
                  <SelectItem value="Lupin">Lupin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={editItemId ? handleSaveEdit : handleAddMedicine}>
              {editItemId ? "Save Changes" : "Add Medicine"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InventoryTable;
