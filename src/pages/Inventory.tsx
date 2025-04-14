
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import InventoryTable from "@/components/inventory/InventoryTable";

const Inventory = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <InventoryTable />
      </div>
    </AppLayout>
  );
};

export default Inventory;
