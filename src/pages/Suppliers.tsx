
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Plus, Phone, Mail } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// Sample supplier data
const supplierData = [
  {
    id: 1,
    name: "MediPharm Suppliers",
    contact: "John Smith",
    email: "contact@medipharm.com",
    phone: "+1 555-123-4567",
    status: "active",
    ordersCount: 120,
    lastOrder: "2024-04-10",
    paymentStatus: "paid",
  },
  {
    id: 2,
    name: "PharmaCare Distribution",
    contact: "Sarah Johnson",
    email: "info@pharmacare.com",
    phone: "+1 555-987-6543",
    status: "active",
    ordersCount: 98,
    lastOrder: "2024-04-08",
    paymentStatus: "pending",
  },
  {
    id: 3,
    name: "MediSource Inc",
    contact: "Michael Davis",
    email: "orders@medisource.com",
    phone: "+1 555-456-7890",
    status: "active",
    ordersCount: 75,
    lastOrder: "2024-04-05",
    paymentStatus: "paid",
  },
  {
    id: 4,
    name: "Global Pharma Solutions",
    contact: "Emily Wilson",
    email: "sales@globalpharma.com",
    phone: "+1 555-789-0123",
    status: "inactive",
    ordersCount: 32,
    lastOrder: "2024-02-15",
    paymentStatus: "paid",
  },
  {
    id: 5,
    name: "MediTech Supplies",
    contact: "Robert Brown",
    email: "info@meditechsupplies.com",
    phone: "+1 555-321-6549",
    status: "active",
    ordersCount: 64,
    lastOrder: "2024-04-12",
    paymentStatus: "pending",
  },
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(supplierData);
  const [searchTerm, setSearchTerm] = useState("");
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState<number | null>(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    status: "active" as const,
    ordersCount: 0,
    lastOrder: new Date().toISOString().split('T')[0],
    paymentStatus: "paid" as const
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddSupplierOpen = () => {
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      phone: "",
      status: "active",
      ordersCount: 0,
      lastOrder: new Date().toISOString().split('T')[0],
      paymentStatus: "paid"
    });
    setEditSupplierId(null);
    setAddSupplierOpen(true);
  };

  const handleAddSupplier = () => {
    const id = Math.max(...suppliers.map(supplier => supplier.id)) + 1;
    const supplier = {
      id,
      ...newSupplier
    };
    
    setSuppliers([...suppliers, supplier]);
    setAddSupplierOpen(false);
    toast.success("Supplier added successfully", {
      description: `${newSupplier.name} has been added to suppliers`
    });
  };
  
  const handleEditSupplier = (id: number) => {
    const supplier = suppliers.find(supplier => supplier.id === id);
    if (supplier) {
      setNewSupplier({
        name: supplier.name,
        contact: supplier.contact,
        email: supplier.email,
        phone: supplier.phone,
        status: supplier.status as any,
        ordersCount: supplier.ordersCount,
        lastOrder: supplier.lastOrder,
        paymentStatus: supplier.paymentStatus as any
      });
      setEditSupplierId(id);
      setAddSupplierOpen(true);
    }
  };
  
  const handleSaveEdit = () => {
    if (editSupplierId !== null) {
      setSuppliers(suppliers.map(supplier => 
        supplier.id === editSupplierId 
          ? { ...supplier, ...newSupplier } 
          : supplier
      ));
      setEditSupplierId(null);
      setAddSupplierOpen(false);
      toast.success("Supplier updated", {
        description: `${newSupplier.name} has been updated`
      });
    }
  };
  
  const handleDeactivateSupplier = (id: number) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === id 
        ? { ...supplier, status: supplier.status === 'active' ? 'inactive' : 'active' } 
        : supplier
    ));
    
    const supplier = suppliers.find(supplier => supplier.id === id);
    const newStatus = supplier?.status === 'active' ? 'inactive' : 'active';
    
    toast.success(`Supplier ${newStatus === 'active' ? 'activated' : 'deactivated'}`, {
      description: `${supplier?.name} is now ${newStatus}`
    });
  };
  
  const handlePlaceOrder = (id: number) => {
    toast.success("Order placed", {
      description: "Your order has been placed with this supplier"
    });
  };
  
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supplier Management</CardTitle>
          <Button onClick={handleAddSupplierOpen}>
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search suppliers..."
              className="pl-8 w-[300px]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.contact}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{supplier.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{supplier.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.ordersCount}</TableCell>
                    <TableCell>{supplier.lastOrder}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "capitalize",
                          supplier.status === "active" ? "bg-emerald-500" : "bg-gray-400"
                        )}
                      >
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "capitalize",
                          supplier.paymentStatus === "paid" ? "bg-emerald-500" : "bg-pharmacy-yellow text-foreground"
                        )}
                      >
                        {supplier.paymentStatus}
                      </Badge>
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => toast.info("Viewing supplier details")}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePlaceOrder(supplier.id)}>Place Order</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditSupplier(supplier.id)}>Edit Supplier</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeactivateSupplier(supplier.id)} 
                            className={supplier.status === 'active' ? "text-pharmacy-red" : "text-pharmacy-green"}
                          >
                            {supplier.status === 'active' ? 'Deactivate' : 'Activate'}
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
      
      {/* Add/Edit Supplier Dialog */}
      <Dialog open={addSupplierOpen} onOpenChange={setAddSupplierOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editSupplierId ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
            <DialogDescription>
              Enter the supplier details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Company Name</Label>
              <Input 
                id="name" 
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                className="col-span-3" 
                placeholder="Supplier company name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">Contact Person</Label>
              <Input 
                id="contact" 
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                className="col-span-3" 
                placeholder="Primary contact name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={newSupplier.email}
                onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                className="col-span-3"
                placeholder="Contact email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input 
                id="phone" 
                value={newSupplier.phone}
                onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                className="col-span-3"
                placeholder="Contact phone number"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={editSupplierId ? handleSaveEdit : handleAddSupplier}>
              {editSupplierId ? "Save Changes" : "Add Supplier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #ORD-2024-123</p>
                    <p className="text-sm text-muted-foreground">MediPharm Suppliers</p>
                  </div>
                  <Badge className="bg-emerald-500">Delivered</Badge>
                </div>
                <div className="text-sm mt-2">
                  <p className="text-muted-foreground">10 products • $1,245.00</p>
                  <p className="text-muted-foreground">Delivered on: April 10, 2024</p>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #ORD-2024-120</p>
                    <p className="text-sm text-muted-foreground">PharmaCare Distribution</p>
                  </div>
                  <Badge className="bg-pharmacy-yellow text-foreground">In Transit</Badge>
                </div>
                <div className="text-sm mt-2">
                  <p className="text-muted-foreground">8 products • $980.50</p>
                  <p className="text-muted-foreground">Expected: April 16, 2024</p>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #ORD-2024-118</p>
                    <p className="text-sm text-muted-foreground">MediSource Inc</p>
                  </div>
                  <Badge className="bg-pharmacy-purple text-white">Processing</Badge>
                </div>
                <div className="text-sm mt-2">
                  <p className="text-muted-foreground">15 products • $2,340.75</p>
                  <p className="text-muted-foreground">Expected: April 20, 2024</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4" onClick={showNotImplemented}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Supplier Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Delivery Performance</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>MediPharm Suppliers</span>
                    <span className="font-medium">96% on time</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-pharmacy-purple rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">PharmaCare Distribution</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>PharmaCare Distribution</span>
                    <span className="font-medium">89% on time</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-pharmacy-purple rounded-full" style={{ width: "89%" }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">MediSource Inc</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>MediSource Inc</span>
                    <span className="font-medium">94% on time</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-pharmacy-purple rounded-full" style={{ width: "94%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-3 mt-6">
              <p className="font-medium">Supplier Alert</p>
              <p className="text-sm text-pharmacy-red mt-1">PharmaCare delivery delayed by 2 days for Order #ORD-2024-120</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={showNotImplemented}>
                Contact Supplier
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Suppliers;
