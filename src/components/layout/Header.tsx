
import React from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  showNotImplemented: () => void;
}

const Header = ({ title, showNotImplemented }: HeaderProps) => {
  return (
    <header className="border-b bg-white py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative max-w-sm hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8"
              onChange={showNotImplemented}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pharmacy-purple text-[10px] text-white">
                  4
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1" onClick={showNotImplemented}>
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Low Stock Alert</span>
                  <Badge variant="destructive" className="text-[10px]">New</Badge>
                </div>
                <span className="text-sm text-muted-foreground">Paracetamol 500mg is running low</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1" onClick={showNotImplemented}>
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">Expiry Alert</span>
                  <Badge variant="destructive" className="text-[10px]">New</Badge>
                </div>
                <span className="text-sm text-muted-foreground">3 products expiring next month</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1" onClick={showNotImplemented}>
                <span className="font-medium">New Order</span>
                <span className="text-sm text-muted-foreground">Order #1234 has been placed</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1" onClick={showNotImplemented}>
                <span className="font-medium">Payment Received</span>
                <span className="text-sm text-muted-foreground">Payment for order #1233 received</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
