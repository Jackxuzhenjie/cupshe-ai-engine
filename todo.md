# Feishu Integration & Permission System

## Phase 1: Upgrade & Data Models
- [x] Upgrade to web-db-user (full-stack)
- [x] Design DB schema: users, roles, permissions, org_departments, org_members
- [x] Design Feishu config storage model

## Phase 2: Auth & Permissions
- [x] Feishu OAuth login flow (simulated for static, real config for production)
- [x] Multi-level permission system: Super Admin / Dept Admin / Employee
- [x] User management UI with role assignment
- [x] Permission-based navigation and feature gating

## Phase 3: Case Submission Portal
- [x] Case submission form with standard metadata fields
- [x] Multi-source upload: Feishu doc link, local file, web URL, video link
- [x] Agent/Prompt library association selector
- [x] Submission review workflow (draft → review → published)
- [ ] AI-assisted field suggestions

## Phase 4: Org Structure
- [x] Organization tree view with department hierarchy
- [x] Feishu org sync button (simulated API)
- [x] People selector with checkbox (multi-select)
- [x] Department-user mapping management

## Phase 5: Feishu Notifications
- [x] Webhook configuration UI
- [x] Case notification templates
- [x] Weekly/Monthly best case auto-push config

## Phase 6: Testing & Delivery
- [x] Full integration test (22 vitest tests passed)
- [x] Mobile responsive check
- [x] Bilingual verification
- [x] Final checkpoint and delivery

## Global AI Intelligence Module (New)
- [x] Build Global AI Intelligence page with auto-curated news feeds
- [x] Three pilot focus areas: Performance Marketing AI, Creative AI, Data Analytics AI
- [x] News cards with source, date, category, relevance tags
- [x] Search and filter by pilot area, content type, date range
- [x] Bilingual support (Chinese/English)
- [x] Seed data with real-world AI news and cases

## Design Updates (Align with Latest Project Plan)
- [x] Update Dashboard with 1-3-6-9 phasing timeline and three pilot projects
- [x] Update Dashboard KPIs to reflect realistic targets (L2/L3)
- [x] Update ControlTower with three pilot projects tracking
- [x] Update navigation to include Global AI Intelligence
- [x] Update SkillTree to reflect bi-weekly skill unlock cadence
- [x] Align data with latest governance structure (CTO as PM)
## Platform Updates - Align with Latest Strategy v2 (March 2026)
- [x] Update Dashboard KPIs and targets: regular centers L2-L3, pilot centers L3-L4
- [x] Update Dashboard pilot project cards with quarterly rolling iteration
- [x] Update ControlTower maturity targets to L2-L3/L3-L4
- [x] Update ControlTower operational rhythm: weekly report + bi-weekly skill learning & case sharing
- [x] Update SkillTree to reflect bi-weekly skill learning + case sharing cadence
- [x] Update seedData with latest maturity targets and cadence information
- [x] Verify all pages reflect updated strategy consistently

## New Executive PPT - AI Transformation Engine Introduction
- [x] Create new executive-facing PPT introducing the platform
- [x] Cover platform purpose, core modules, value proposition
- [x] Include governance structure and operational rhythm
- [x] Design for C-suite audience presentation

## Major Update - Project Center, Dept Names, Brand VI (March 2026)
- [x] Add Project Center page (new module for AI pilot project tracking, supports L2/L3/L4 maturity)
- [x] Add Project Center to sidebar navigation under Management group
- [x] Add Project Center route in App.tsx
- [x] Update all department names to match official org chart (14 first-level orgs)
- [x] Update department data in data.ts with official names
- [x] Update ControlTower maturity map with official department names
- [x] Update Dashboard pilot project references
- [x] Apply cupshe.com brand VI elements (warm coral accent, clean typography, warm whites)
- [x] Update executive PPT with Project Center module and new department names
- [x] Update executive PPT with brand VI alignment

## Role Definition Updates (March 2026)
- [x] Rename AI Champion to AI科代表 across all platform code
- [x] Update AI BP role definition: tech support (技术问题、AI账号等)
- [x] Update AI科代表 definition: center AI practice pioneer, sub-project lead, evangelist
- [x] Update HRBP definition: HR function landing, center AI project operations
- [x] Update PPT governance/org slides with new role definitions

## Brand Logo Update (March 2026)
- [x] Replace sidebar logo with official CUPSHE text logo
- [x] Update sidebar logo to CUPSHE with palm tree icon

## Skill Tree Deep Redesign (March 2026)
- [x] Research cupshe.com business model, value chain, and all business scenarios
- [x] Map 14 department functions to specific AI skill needs
- [x] Design universal/foundational AI skills tier
- [x] Design department-specific AI skills for each center
- [x] Design pilot-project-specific skills (效果营销AI化, 创意AI化, 数据分析AI化)
- [x] Implement enriched skill tree data structure
- [x] Redesign SkillTree UI with user-centric navigation (filter by dept, project, level)
- [x] Ensure coverage of full cross-border e-commerce value chain scenarios

## Skill Tree Granularity Enrichment (March 2026)
- [x] Extend SkillNode data structure with knowledge deposits (resources, prompts, workflows, cases, tasks)
- [x] Add learning resources (tutorials, videos, guides) to each skill
- [x] Add best practice Prompt templates for each skill
- [x] Add workflow templates and SOP references
- [x] Add prerequisite skill dependencies for learning paths
- [x] Add practice tasks with acceptance criteria
- [x] Add knowledge deposit links (case library, prompt library, workflow library)
- [x] Redesign SkillTree UI with expandable skill detail panels
- [x] Show knowledge deposit count and completion status per skill

## Bug Fix & Knowledge Library Integration (March 2026)
- [x] Fix SkillTree department drill-down not showing skills after clicking department (added auto-scroll)
- [x] Verify all 14 departments show correct skills when selected
- [x] Verify content completeness across all skill knowledge deposits
- [x] Integrate skill Prompt templates into Prompt库 module (10→30 prompts)
- [x] Integrate skill Workflow SOPs into 工作流库 module (5→11 workflows)
- [x] Integrate skill-related Agents into Agent库 module (6→12 agents)
- [x] Ensure cross-module navigation between SkillTree and knowledge libraries

## Meeting Minutes Integration (March 2026)
- [x] Add real personnel assignments to platform governance: CEO Mikezhao赵黎明, CTO Sammer孔秋实, CHRO Jack Xu许振杰, HRD Bran陈光阳, PMO Claire王喆
- [x] Update ControlTower governance with weekly red/yellow/green progress reporting mechanism
- [x] Add HR pressure mechanism: not just promotion but also pressure on departments to adopt AI
- [x] Update timeline: March deployment, Q2 direction-setting goals
- [x] Add regular AI sharing sessions to operational rhythm
- [x] Update Dashboard with real project PM and stakeholder info
- [x] Update executive PPT governance slide with real personnel
- [x] Update role training PPT with real personnel assignments

## Weekly Report System - PMO Claire (March 2026)
- [x] Design DB schema for weekly reports (weeklyReports table with center, status, progress, issues, plans)
- [x] Create tRPC procedures for CRUD operations on weekly reports
- [x] Build weekly report entry form page (WeeklyReport.tsx) with R/Y/G status selector
- [x] Support per-center AI progress, issues, next-week plans input
- [x] Build weekly report summary dashboard (WeeklyReportSummary.tsx) with auto-aggregation
- [x] CEO Review one-page view with all centers' R/Y/G status at a glance
- [x] Historical trend tracking (status changes over weeks)
- [x] Add WeeklyReport pages to sidebar navigation
- [x] Role-based access: PMO/Admin can edit, CEO/CTO can view summary
- [x] Write vitest tests for weekly report procedures
- [x] Mobile responsive design for both entry and summary views

## Skill Tree Deep Audit & Granularity Completion (March 2026)
- [x] Audit all skill nodes for complete knowledge deposits (resources, prompts, workflows, tasks, cases)
- [x] Fix HR Center skills: ensure all HR skills have full Prompt templates, workflow SOPs, learning resources
- [x] Fix all departments: ensure every skill has non-empty resources, prompts, workflows arrays
- [x] Verify UI drill-down: clicking department → skills list → skill detail → knowledge deposits all work
- [x] Ensure skill detail panel shows all tabs (Prompts, Workflows, Resources, Tasks, Cases) with real content
- [x] Fix any truncation or rendering issues in skillTreeData.ts
- [x] Verify readability of all skill descriptions and knowledge deposit content
- [x] Test all 14 departments' skill expansion and content display

## Case Showcase, Fission & Evaluation Model (March 2026)
- [x] Add case submission Prompt template (company-level) to each skill node
- [x] Enhance LinkedCase type with url, caseId, type (internal/industry/general), fissionFrom fields
- [x] Design case fission mechanism: reference case by ID (e.g. CASE-MK-001), track cross-dept reuse
- [x] Build case value evaluation model: original value, fission/reuse value (citation count, cross-dept reuse), quantified impact, voting popularity
- [x] Add case showcase (通晒) and voting mechanism to platform
- [x] Reflect full loop in keyTakeaways: 学习→实践→案例(Prompt+上传)→沉淀→通晒投票→裂变复用→价值评估→双周分享

## Biweekly Skill Learning Plan (March 2026)
- [x] Design biweekly learning schedule mapping skills across Q2-Q4 2026
- [x] Create BiweeklyPlan data structure and page
- [x] Integrate biweekly plan into platform navigation

## Personal Profile Page (March 2026)
- [x] DB schema: user_points table (points balance, level, total earned)
- [x] DB schema: user_activities table (type: case_upload/like/favorite/skill_complete/share, timestamp, ref_id)
- [x] DB schema: user_skill_progress table (skill_id, status, completed_at)
- [x] Backend API: get user profile with points summary
- [x] Backend API: get user activity feed (paginated)
- [x] Backend API: get user skill completion stats
- [x] Backend API: record activity (case upload, like, favorite, etc.)
- [x] Frontend: Personal Profile page with points dashboard
- [x] Frontend: Activity timeline/feed component
- [x] Frontend: Skill completion progress visualization
- [x] Frontend: Achievement badges display
- [x] Navigation: Add profile link as first item in sidebar
- [x] Vitest tests for profile API procedures
