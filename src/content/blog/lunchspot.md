---
projectId: "16"
title: "LunchSpot: finding a table before lunch"
description: "A team project that connects computer vision, a .NET backend, and a live canteen map to help people find an available table."
published: 2026-11-17
category: Project
tags: [dotnet, react, computer-vision]
repository: https://github.com/Zulfaabam/lunchspot
draft: false
---

During a busy lunch break, finding somewhere to sit can become its own task. You need to reach the canteen, look around, and work out which tables are available before settling down.

LunchSpot starts with a simple question: **could you check table availability before getting there?**

Developed as part of the **Formulatrix Software Bootcamp**, LunchSpot is a team project by [Abam](https://github.com/Zulfaabam), [Ray](https://github.com/BukanRaychan), and [Putra](https://github.com/putramkti). We built a system that turns camera observations into table statuses and makes those statuses available through a web application.

![LunchSpot's canteen dashboard, showing a table layout and availability summary.](https://raw.githubusercontent.com/Zulfaabam/lunchspot/main/lunchspot-homepage.png)

## From a camera feed to a useful answer

A camera can show what is happening in a room, but someone looking for lunch needs a simpler answer: which table is available?

LunchSpot connects several steps to get there:

1. Capture frames from a configured canteen camera.
2. Detect people using a YOLO model and OpenCVSharp.
3. Compare those detections with polygon zones assigned to tables.
4. Check whether an occupancy change lasts long enough to update the table's status.
5. Send the change to the frontend through SignalR.

The backend uses **C# and ASP.NET Core on .NET 8**, with Entity Framework Core for persistence and support for PostgreSQL or SQLite. Its Clean Architecture structure separates the domain, application services, infrastructure, and API.

The frontend uses **React and TypeScript**, with Vite, Tailwind CSS, shadcn/ui, React Router, and TanStack Query. Together, these pieces connect the detection pipeline to a map someone can read at a glance.

## Deciding when a table is occupied

Detecting a person is only the first part of the problem. The system also needs to associate that person with a table.

Each table has a polygon in camera coordinates. The occupancy service calculates how much a detected person's bounding box overlaps that polygon and compares the result with a configurable minimum overlap threshold. It considers larger overlaps first and assigns each detected person to at most one table.

This makes the table zones part of the system's configuration. Their placement matters: changing the camera view or drawing an unsuitable zone can change how detections are interpreted.

### Keeping the status from flickering

A single detection should not immediately become the answer shown on the map. Someone might walk past a table, or a detection might briefly disappear.

LunchSpot tracks a potential status change over time. Separate entry and exit thresholds determine how long the new observation must persist before the stored status changes. When the observation returns to the current status, the pending change is cleared.

That introduces a deliberate tradeoff. A longer threshold makes the display less sensitive to brief changes, but also delays an update. The settings allow that balance to be adjusted for the canteen.

## Making availability easy to read

The public page lets visitors select a canteen and view its table layout, availability summary, and individual table details. A spatial view gives the status a location: visitors can see where a table sits within the layout.

The initial canteen data comes from the API. After that, SignalR events update the affected table in TanStack Query's cache, allowing the interface to reflect changes without a full page refresh.

The connection also has a visible state: live, reconnecting, or disconnected. That distinction matters because a map that looks current can still lose its connection to the backend.

## Giving administrators a way to arrange the map

The camera's detection zones and the public map serve different purposes. Camera coordinates describe where to look for people; interface coordinates describe where to draw tables for visitors.

LunchSpot keeps those concerns separate. Its administration interface includes a layout editor built with dnd kit. Administrators can place and reposition tables, rotate them, resize them, and change their displayed shapes.

The editor previews placements, checks for overlapping tables during a drag, and provides explicit save and reset actions. This makes arranging the visitor-facing map a task that can be done in the application.

## What the project brings together

LunchSpot connects camera capture, person detection, occupancy rules, persistence, live events, and a configurable web interface. The repository also includes unit tests for backend services, validators, repositories, and API controllers.

The repository describes LunchSpot as being in active development, with ongoing work on real-time video processing and point-coordinate management.

The central lesson from the design is that useful live information needs more than a fast detector. It needs rules for interpreting observations, a way to avoid unstable updates, and an interface that makes both availability and connection status clear.

## Explore the work

The [LunchSpot repository](https://github.com/Zulfaabam/lunchspot) contains the setup instructions and full source. For the details behind this story, see the [occupancy calculation](https://github.com/Zulfaabam/lunchspot/blob/main/src/LunchSpot.Infrastructure/Services/TableOccupancyService.cs), [status tracking](https://github.com/Zulfaabam/lunchspot/blob/main/src/LunchSpot.Infrastructure/Services/TableStateTracker.cs), [live frontend updates](https://github.com/Zulfaabam/lunchspot/blob/main/frontend/src/hooks/useSignalR.ts), and [layout editor](https://github.com/Zulfaabam/lunchspot/blob/main/frontend/src/components/admin/LayoutEditorSection.tsx).
