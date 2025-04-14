
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import StatsCard from "@/components/ml/StatsCard";
import DemandChart from "@/components/ml/DemandChart";
import OutbreakMap from "@/components/ml/OutbreakMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
  return (
    <AppLayout>
      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <StatsCard 
          title="AI Recommendations" 
          value="4 Actions" 
          description="Based on inventory & sales patterns"
        />
        <StatsCard 
          title="Demand Accuracy" 
          value="92.4%" 
          description="ML model prediction accuracy"  
        />
        <StatsCard 
          title="Seasonal Alerts" 
          value={
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-pharmacy-purple" />
              <span>Flu Season Approaching</span>
            </div>
          } 
          description="Stock up on flu medicines"
        />
      </div>
      
      <Tabs defaultValue="demand" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demand">Demand Forecasting</TabsTrigger>
          <TabsTrigger value="outbreak">Disease Prediction</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="demand" className="space-y-4">
          <DemandChart />
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Increasing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Antihistamines</span>
                    <span className="text-sm font-medium text-emerald-500">+43%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pain Relievers</span>
                    <span className="text-sm font-medium text-emerald-500">+28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Antivirals</span>
                    <span className="text-sm font-medium text-emerald-500">+21%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Decreasing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Antibiotics</span>
                    <span className="text-sm font-medium text-pharmacy-red">-12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cold Medicines</span>
                    <span className="text-sm font-medium text-pharmacy-red">-9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cough Syrups</span>
                    <span className="text-sm font-medium text-pharmacy-red">-5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seasonal Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Upcoming flu season predicted to be 15% more severe than last year.</p>
                  <p className="text-sm text-pharmacy-purple font-medium mt-2">Recommended Actions:</p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li>Increase flu medication stock by 20%</li>
                    <li>Stock up on related symptom relievers</li>
                    <li>Prepare marketing for flu prevention</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="outbreak">
          <OutbreakMap />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI-Powered Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border p-3 rounded-md">
                  <p className="font-medium">Optimize Stock Levels</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reduce Paracetamol 250mg stock by 15% and increase Paracetamol 500mg by 10% based on consistent sales patterns.
                  </p>
                </div>
                
                <div className="border p-3 rounded-md">
                  <p className="font-medium">Price Optimization</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Increasing Cetirizine price by 5% would improve margins with minimal impact on sales volume based on price elasticity analysis.
                  </p>
                </div>
                
                <div className="border p-3 rounded-md">
                  <p className="font-medium">Bundle Recommendation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create a cold & flu bundle with Paracetamol, Vitamin C and Zinc supplements to increase average order value by estimated 18%.
                  </p>
                </div>
                
                <div className="border p-3 rounded-md">
                  <p className="font-medium">Supplier Change</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Switch Amoxicillin supplier from MediPharm to PharmaCare for 12% cost reduction with equivalent quality based on analysis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Analytics;
