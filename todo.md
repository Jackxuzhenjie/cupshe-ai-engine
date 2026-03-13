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
