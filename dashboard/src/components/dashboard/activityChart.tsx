"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>
          Your coding activity over the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          {/* Chart will be implemented with recharts or similar */}
          <p>Chart component placeholder - will add visualization library</p>
        </div>
      </CardContent>
    </Card>
  );
}
