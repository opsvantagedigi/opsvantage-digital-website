# Changelog

All notable changes to this project will be documented in this file.

## [2.0.1] - Post-Migration Hardening & Refinement

This release focuses on stabilizing the platform after the major architectural migration to Next.js. It includes comprehensive bug fixes, refactoring of core components, and strengthening of our governance layer with unit tests.

### Added
- **Unit Testing:** Integrated Jest and `@testing-library/jest-dom` to establish a unit testing framework.
- **API Test Coverage:** Created the first unit test for the `/api/dashboard` route, mocking Supabase calls to validate authenticated, unauthenticated, and error responses.

### Changed
- **Routing:** Replaced all remaining `react-router-dom` logic with Next.js native primitives (`Link`, `usePathname`) in `constants.tsx` and other components.
- **Component Architecture:** Refactored the `Navbar` to be a fully-fledged Server Component for optimal performance, fetching user state on the server.
- **State Management:** The `LogoutButton` is now a dedicated Client Component, isolating interactive client-side logic.

### Fixed
- **Build Stability:** Resolved all outstanding TypeScript errors related to module resolution (`@/types`), prop mismatches, and incorrect type definitions.
- **Type Safety:** Consolidated all shared type definitions into a single source of truth at `types/index.ts`, eliminating conflicting `Project` types.
- **Dependencies:** Added missing `@stripe/stripe-js` dependency and corrected environment variable access in the `Pricing` page.
- **Supabase Integration:** Corrected the implementation of the Supabase server and client helpers (`lib/supabase/server.ts`, `lib/supabase/client.ts`) to align with Next.js App Router best practices.

## [2.0.0] - Phase 6 Completion

This release marks a significant milestone, completing the core infrastructure for the OpsVantage Digital client platform.

### Added
- **Authentication:** Full user authentication flow using Supabase (`/login`, `/register`).
- **Dashboard:** Client-side dashboard (`/dashboard`) to display user-specific data from a live API.
- **Payments:** Post-payment success page (`/payment-success`) to complete the Stripe checkout loop.
- **Testing Framework:**
  - End-to-end tests for authentication and payment flows using Playwright.
  - Unit tests for the `/api/dashboard` route using Jest.
- **Navigation:** Authentication-aware navigation bar that dynamically shows user state.

### Changed
- **Architecture:** Project consolidated into a single Next.js (App Router) repository (`opsvantage-digital-website`).
- **API:** `/api/dashboard` now serves live data from Supabase, replacing mock data.
- **Routing:** All routing migrated from `react-router-dom` to Next.js native `Link` and `usePathname`.

### Fixed
- Resolved all outstanding TypeScript errors, build errors, and dependency conflicts from the architectural migration.

### Removed
- Decommissioned the legacy Vite-based repository (`OpsVantageDigitalWebsite002`).