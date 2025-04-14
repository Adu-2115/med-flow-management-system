
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  onApplyDiscount: (discount: number) => void;
  onCheckout: () => void;
}

const OrderSummary = ({
  subtotal,
  discount,
  tax,
  total,
  onApplyDiscount,
  onCheckout,
}: OrderSummaryProps) => {
  const [discountCode, setDiscountCode] = React.useState("");

  const handleApplyDiscount = () => {
    // This is a demo, so let's just apply a fixed discount
    if (discountCode.trim() === "DEMO10") {
      onApplyDiscount(10);
    } else if (discountCode.trim() === "DEMO20") {
      onApplyDiscount(20);
    } else {
      onApplyDiscount(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="space-y-2 pt-2">
          <Label htmlFor="discount">Discount Code</Label>
          <div className="flex gap-2">
            <Input
              id="discount"
              placeholder="Enter code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={handleApplyDiscount}
              className="whitespace-nowrap"
            >
              Apply
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Try using "DEMO10" or "DEMO20" for 10% or 20% discount
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onCheckout} className="w-full" disabled={subtotal === 0}>
          Checkout (${total.toFixed(2)})
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
