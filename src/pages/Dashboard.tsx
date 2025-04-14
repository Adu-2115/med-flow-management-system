
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentSales from "@/components/dashboard/RecentSales";
import ExpiryAlert from "@/components/dashboard/ExpiryAlert";
import SalesChart from "@/components/dashboard/SalesChart";
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Inventory"
          value="1,243"
          icon={<Package size={16} />}
          description="items in stock"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Today's Sales"
          value="$3,210"
          icon={<ShoppingCart size={16} />}
          description="across 24 orders"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value="23"
          icon={<AlertTriangle size={16} />}
          description="need attention"
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Monthly Growth"
          value="18.2%"
          icon={<TrendingUp size={16} />}
          description="vs last month"
          trend={{ value: 4, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7 mt-4">
        <div className="md:col-span-4">
          <SalesChart />
        </div>
        <div className="md:col-span-3">
          <RecentSales />
        </div>
      </div>
      
      <div className="mt-4">
        <ExpiryAlert />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
