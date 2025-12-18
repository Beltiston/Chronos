"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { NavigationLinks } from "./navigation-links";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-muted/40 shrink-0">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clock className="h-5 w-5" />
          </div>
          <span className="text-lg">Chronos</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <NavigationLinks />
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-accent p-3 text-sm">
          <p className="font-medium text-accent-foreground">Track smarter</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your productivity insights await
          </p>
        </div>
      </div>
    </aside>
  );
}
