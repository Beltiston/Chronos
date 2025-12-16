"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, Target, Zap } from "lucide-react";

const stats = [
  {
    title: "Today's Time",
    value: "4h 32m",
    change: "+12%",
    icon: Clock,
    trend: "up",
  },
  {
    title: "Weekly Total",
    value: "28h 15m",
    change: "+8%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Active Projects",
    value: "7",
    change: "+2",
    icon: Target,
    trend: "up",
  },
  {
    title: "Productivity Score",
    value: "92%",
    change: "+5%",
    icon: Zap,
    trend: "up",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600 font-medium">{stat.change}</span> from last week
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
