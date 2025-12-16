"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const sessions = [
  {
    project: "Web Dashboard",
    file: "components/dashboard.tsx",
    duration: "1h 23m",
    time: "2 hours ago",
    language: "TypeScript",
  },
  {
    project: "Mobile App",
    file: "screens/HomeScreen.tsx",
    duration: "45m",
    time: "4 hours ago",
    language: "TypeScript",
  },
  {
    project: "API Service",
    file: "routes/users.ts",
    duration: "2h 10m",
    time: "5 hours ago",
    language: "TypeScript",
  },
  {
    project: "Documentation",
    file: "README.md",
    duration: "30m",
    time: "6 hours ago",
    language: "Markdown",
  },
];

export function RecentSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
        <CardDescription>
          Your latest coding sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{session.project}</p>
                  <Badge variant="outline" className="text-xs">
                    {session.language}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{session.file}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{session.duration}</span>
                </div>
                <span className="text-xs">{session.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
