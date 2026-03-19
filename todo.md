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
