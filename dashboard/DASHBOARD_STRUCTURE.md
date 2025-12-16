# Dashboard Structure

## Overview
This dashboard is built with Next.js 14+, shadcn/ui, and Tailwind CSS. It provides a modern, responsive interface for time tracking and productivity insights.

## File Structure

```
src/app/dashboard/
├── layout.tsx          # Dashboard layout with sidebar and header
└── page.tsx            # Main dashboard page with widgets

src/components/dashboard/
├── sidebar.tsx         # Navigation sidebar
├── header.tsx          # Top header with search, notifications, and user menu
├── statsCards.tsx      # Overview statistics cards
├── activityChart.tsx   # Activity visualization (placeholder for chart library)
├── topProjects.tsx     # Top projects by time spent
└── recentSessions.tsx  # Recent coding sessions list
```

## Key Features

### Layout Components
- **Sidebar**: Fixed navigation with active state highlighting
  - Overview, Timeline, Projects, Analytics, Goals, Calendar, Settings
  - Chronos branding with clock icon
  - Responsive (hidden on mobile)

- **Header**: Sticky top bar with
  - Search functionality
  - Theme toggle (light/dark/system)
  - Notifications bell with indicator
  - User profile dropdown menu

### Dashboard Widgets
- **Stats Cards**: 4 key metrics
  - Today's Time
  - Weekly Total
  - Active Projects
  - Productivity Score

- **Activity Chart**: Placeholder for time visualization
  - Ready for integration with recharts or similar

- **Top Projects**: Shows project distribution
  - Progress bars for visual representation
  - Color-coded projects
  - Time spent badges

- **Recent Sessions**: Activity timeline
  - Project and file information
  - Duration and timestamp
  - Language badges

## Design Philosophy

This dashboard is designed to be distinct from WakaTime with:
- Focus on **productivity insights** rather than just tracking
- **Goal-oriented** features (Goals section)
- **Calendar integration** for planning
- Modern, clean aesthetic using shadcn/ui components
- Emphasis on actionable data

## Navigation Routes

The sidebar includes navigation to these routes (to be implemented):
- `/dashboard` - Overview (current page)
- `/dashboard/timeline` - Detailed timeline view
- `/dashboard/projects` - Project management
- `/dashboard/analytics` - Deep analytics
- `/dashboard/goals` - Goal tracking
- `/dashboard/calendar` - Calendar view
- `/dashboard/settings` - User settings

## Technologies Used

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components:
  - Card, Button, Input
  - Dropdown Menu, Avatar
  - Badge, Progress
- **Lucide React** for icons
- **next-themes** for theme switching

## Next Steps

1. Implement actual data fetching
2. Add chart library (recharts recommended)
3. Create remaining dashboard pages
4. Add mobile sidebar toggle
5. Implement search functionality
6. Connect to backend API
