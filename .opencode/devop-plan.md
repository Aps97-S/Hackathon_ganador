# Development Plan - Hackathon_ganador

## Project Overview
CoinGecko API integration for cryptocurrency price tracking, alerts, and simulations.

## Agent Roles
- **devop (.249)**: Project manager, task tracking, development planning
- **coder**: Technical lead, architecture consistency, code review
- **juniorCoder (.249)**: Implementation worker, function writing

## Communication Protocol
- devop → coder: Assigns ONE task at a time
- coder → juniorCoder: Delegates implementation details
- juniorCoder → coder: Returns completed code
- coder → devop: Reports completion, requests next task
- devop NEVER talks directly to juniorCoder

---

## Phase 1: CoinGecko API Integration ✅ COMPLETE

- [x] Create external API config (config/externalApi.js)
- [x] Create financial service (services/financialApi.js)
- [x] Create market controller (controllers/marketController.js)
- [x] Create market routes (routes/market.js)
- [x] Create cache middleware (middleware/cache.js)
- [x] Create price history model (models/priceHistory.js)
- [x] Update .env.example with API variables
- [x] Update models/index.js exports
- [x] Update routes/index.js imports

## Phase 2: Alert System

- [ ] TASK 2.1: Create alert checking service
  - FILES: backend/src/services/alertService.js
  - REQUIREMENTS: Check active alerts against current prices, return triggered alerts

- [ ] TASK 2.2: Implement email notification service
  - FILES: backend/src/services/emailService.js
  - REQUIREMENTS: Use nodemailer, send alert emails, template formatting

- [ ] TASK 2.3: Create cron job for periodic checks
  - FILES: backend/src/jobs/alertChecker.js
  - REQUIREMENTS: Run every X minutes, check alerts, send notifications

- [ ] TASK 2.4: Add alert management routes
  - FILES: backend/src/routes/alerts.js, backend/src/controllers/alertController.js
  - REQUIREMENTS: CRUD for alerts, list active alerts, toggle alerts

## Phase 3: Simulation Enhancement

- [ ] TASK 3.1: Enhance simulation model with relationships
  - FILES: backend/src/models/simulaciones.js
  - REQUIREMENTS: Add user association, improve validation

- [ ] TASK 3.2: Create simulation calculation service
  - FILES: backend/src/services/simulationService.js
  - REQUIREMENTS: Calculate potential returns, compare strategies

- [ ] TASK 3.3: Add simulation routes and controller
  - FILES: backend/src/routes/simulations.js, backend/src/controllers/simulationController.js
  - REQUIREMENTS: Create, list, delete simulations

## Phase 4: Frontend Integration

- [ ] TASK 4.1: Create API service layer for frontend
  - FILES: frontend/src/services/api.js
  - REQUIREMENTS: Fetch helpers, error handling, auth tokens

- [ ] TASK 4.2: Build market data dashboard
  - FILES: frontend/src/pages/Dashboard.jsx
  - REQUIREMENTS: Display prices, charts, top cryptos

- [ ] TASK 4.3: Implement alert management UI
  - FILES: frontend/src/pages/Alerts.jsx
  - REQUIREMENTS: Create/edit/delete alerts, list active alerts

- [ ] TASK 4.4: Add simulation interface
  - FILES: frontend/src/pages/Simulations.jsx
  - REQUIREMENTS: Form for simulation parameters, results display

---

## Current Status
**Phase**: 1 ✅ COMPLETE
**Next Task**: 2.1 - Create alert checking service
**Assigned to**: coder (who will delegate to juniorCoder)

## Task History
| Task | Assigned To | Status | Notes |
|------|-------------|--------|-------|
| Phase 1 Complete | coder + juniorCoder | ✅ DONE | All API integration files created |
