
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Eye, Check, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const prescriptionData = [
  {
    id: "P-001",
    patient: "John Doe",
    doctor: "Dr. Smith",
    date: "2024-04-14",
    status: "processed",
    items: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
  },
  {
    id: "P-002",
    patient: "Emily Wilson",
    doctor: "Dr. Johnson",
    date: "2024-04-14",
    status: "pending",
    items: ["Metformin 500mg", "Atorvastatin 20mg"],
  },
  {
    id: "P-003",
    patient: "Michael Brown",
    doctor: "Dr. Patel",
    date: "2024-04-13",
    status: "processed",
    items: ["Losartan 50mg", "Amlodipine 5mg"],
  },
  {
    id: "P-004",
    patient: "Sarah Davis",
    doctor: "Dr. Wilson",
    date: "2024-04-13",
    status: "rejected",
    items: ["Morphine 10mg", "Codeine 30mg"],
  },
  {
    id: "P-005",
    patient: "Robert Martin",
    doctor: "Dr. Lee",
    date: "2024-04-12",
    status: "pending",
    items: ["Paracetamol 500mg", "Cetirizine 10mg"],
  },
];

const Prescriptions = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Prescription uploaded successfully");
  };

  const showNotImplemented = () => {
    toast.info("This feature is not implemented yet", {
      description: "This is just a demo",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge className="bg-emerald-500">Processed</Badge>;
      case "pending":
        return <Badge className="bg-pharmacy-yellow text-foreground">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-pharmacy-red">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient Name</Label>
                    <Input id="patient" placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor Name</Label>
                    <Input id="doctor" placeholder="Enter doctor name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Prescription Image</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop or click to upload prescription image
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea 
                    id="notes" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                    placeholder="Add any additional notes or instructions"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Upload Prescription
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manual Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patient2">Patient Name</Label>
                    <Input id="patient2" placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor2">Doctor Name</Label>
                    <Input id="doctor2" placeholder="Enter doctor name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Prescribed Medicines</Label>
                  <div className="border rounded-md p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search medicine..." className="flex-1" />
                      <Button variant="outline" type="button" onClick={showNotImplemented}>
                        Add
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground pt-2">
                      No medicines added yet
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <textarea 
                    id="instructions" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                    placeholder="Add dosage instructions and other details"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Submit Prescription
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Prescription History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search prescriptions..."
              className="pl-8 w-[300px]"
            />
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptionData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.patient}</TableCell>
                    <TableCell>{item.doctor}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.items.join(", ")}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={showNotImplemented}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {item.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-emerald-500"
                              onClick={showNotImplemented}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-pharmacy-red"
                              onClick={showNotImplemented}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Prescriptions;
