"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  { name: "Web Dashboard", time: "12h 45m", percentage: 45, color: "bg-blue-500" },
  { name: "Mobile App", time: "8h 30m", percentage: 30, color: "bg-purple-500" },
  { name: "API Service", time: "4h 20m", percentage: 15, color: "bg-green-500" },
  { name: "Documentation", time: "2h 40m", percentage: 10, color: "bg-orange-500" },
];

export function TopProjects() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Projects</CardTitle>
        <CardDescription>
          Most active projects this week
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${project.color}`} />
                <span className="text-sm font-medium">{project.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {project.time}
              </Badge>
            </div>
            <Progress value={project.percentage} className="h-1.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
