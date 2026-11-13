---
company: "Formulatrix"
role: "Software Engineering Intern"

start: 2026-08-12
end: 2026-11-11

location: "Semarang, Indonesia"

technologies:
  - React
  - TypeScript
  - C#
  - ASP.NET Core
  - SignalR
  - Playwright

summary: "Being a part of the Rock Imager software team, engineering a software that controls protein crystallization imaging instruments."
---

## Achievements

- Developed the “Duplicate Plate Configuration” feature (React, TypeScript, C#, ASP.NET Core), eliminating the manual export/import step users needed to copy plate configurations.
- Resolved 10+ bugs in Rock Imager, including fixing a connection-loss defect that let users operate the instrument while its Rock Maker integration was unreachable, by adding a blocking connection-lost modal.
- Wrote 50+ NUnit tests for the Plate Storage Retriever (PSR, the robotic arm that moves plates between the load port, storage, and imager) and the Task Scheduler (robot task queueing, execution, and state detection), raising coverage from 1% to 80% for the two modules.
- Applied mutation testing with Stryker.NET to validate test quality on critical logic.
- Built Playwright end-to-end tests for 5 critical Rock Imager workflows, covering plate transfers between the load port, storage, and imager, optics and camera control, and manual imaging, automating regression checks that were previously done by hand.
