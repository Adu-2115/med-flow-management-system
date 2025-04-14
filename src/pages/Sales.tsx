
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import CartTable from "@/components/sales/CartTable";
import OrderSummary from "@/components/sales/OrderSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

// Sample product data
const availableProducts: Product[] = [
  { id: 1, name: "Paracetamol 500mg", price: 5.99, stock: 120 },
  { id: 2, name: "Amoxicillin 250mg", price: 12.50, stock: 85 },
  { id: 3, name: "Loratadine 10mg", price: 8.75, stock: 45 },
  { id: 4, name: "Atorvastatin 20mg", price: 15.25, stock: 30 },
  { id: 5, name: "Metformin 500mg", price: 7.99, stock: 15 },
  { id: 6, name: "Ibuprofen 400mg", price: 6.50, stock: 5 },
  { id: 7, name: "Omeprazole 20mg", price: 9.25, stock: 0 },
  { id: 8, name: "Simvastatin 10mg", price: 11.30, stock: 62 },
  { id: 9, name: "Losartan 50mg", price: 14.75, stock: 25 },
  { id: 10, name: "Cetirizine 10mg", price: 7.25, stock: 78 },
];

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = availableProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) && product.stock > 0
  );

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      updateCartItem(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          total: product.price,
        },
      ]);
    }
    
    toast.success(`${product.name} added to cart`);
  };

  const updateCartItem = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity, total: item.price * quantity }
          : item
      )
    );
  };

  const removeCartItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyDiscount = (percent: number) => {
    setDiscountPercent(percent);
    toast.success(`${percent}% discount applied`);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discount) * 0.07; // 7% tax
  const total = subtotal - discount + tax;

  const handleCheckout = () => {
    setShowCheckoutDialog(true);
  };

  const processPayment = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      setShowCheckoutDialog(false);
      setCartItems([]);
      setDiscountPercent(0);
      
      toast.success("Payment successful!", {
        description: "Invoice has been generated and inventory updated",
      });
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-md p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price.toFixed(2)} | Stock: {product.stock}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      Add
                    </Button>
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="col-span-2 py-8 text-center text-muted-foreground">
                    No products found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <CartTable
            items={cartItems}
            onUpdate={updateCartItem}
            onRemove={removeCartItem}
          />
        </div>
        
        <div>
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            total={total}
            onApplyDiscount={applyDiscount}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Purchase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Order Summary</p>
              <div className="rounded-md bg-muted p-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (7%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Payment Method</p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 justify-start">
                  <span>Cash</span>
                </Button>
                <Button variant="outline" className="flex-1 justify-start">
                  <span>Card</span>
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCheckoutDialog(false)}>
              Cancel
            </Button>
            <Button onClick={processPayment} disabled={processingPayment}>
              {processingPayment ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Complete Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Sales;
