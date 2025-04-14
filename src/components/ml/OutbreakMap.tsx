
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OutbreakMap = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg">Disease Outbreak Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-[300px] bg-muted/30 rounded-md">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Map visualization would be displayed here</p>
            <p className="text-sm text-muted-foreground">
              Shows heatmap of predicted disease outbreaks in local areas based on prescription patterns and seasonal trends
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutbreakMap;
