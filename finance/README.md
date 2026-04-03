# Finance Activity Dashboard

A responsive frontend dashboard for tracking financial activity with role-based UI behavior.

## Tech Stack

- React + Vite
- Zustand (state management)
- Recharts (data visualizations)
- Tailwind CSS + custom CSS variables

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Implemented Features

### 1. Dashboard Overview

- Summary cards for Total Balance, Income, and Expenses.
- Time-based visualization: running balance trend line chart.
- Categorical visualization: category-wise spending breakdown pie chart.

### 2. Transactions Section

- Transaction table with Date, Category, Type, and Amount.
- Search by category/type.
- Filter by transaction type.
- Sorting options:
	- newest first
	- oldest first
	- highest amount
	- lowest amount
	- category A-Z
- Graceful empty state when no records match filters.

### 3. Basic Role-Based UI (Frontend Simulation)

- Viewer role:
	- read-only dashboard access.
- Admin role:
	- add transactions.
	- edit existing transactions.
	- export filtered table data as CSV.
- Role switcher included in dashboard.

### 4. Insights Section

- Highest spending category.
- Current month vs previous month expense comparison.
- Savings-rate based observation.

### 5. State Management

Centralized Zustand store handles:

- transactions data
- selected role
- filter/search/sort controls
- add/edit actions

Persisted state via localStorage:

- role
- transactions

## UX and Design Notes

- Responsive layout for mobile, tablet, and desktop.
- Intentional visual identity with custom typography and gradients.
- Light/Dark mode toggle.
- Subtle section reveal animations.
- Consistent card and control system across sections.
- Colorblind-aware visual encoding:
	- colorblind-safe palette for charts
	- pattern fills in time-based bars (striped income, dotted expense)
	- non-color cues in legends and transaction type labels

## Core Requirements Checklist

- Dashboard overview: completed (summary cards + time-based chart + categorical chart).
- Transactions section: completed (date, amount, category, type + filtering, sorting, search).
- Basic role-based UI: completed (viewer read-only, admin add/edit/export, role switcher).
- Insights section: completed (highest category, monthly comparison, useful observation).
- State management: completed with Zustand (transactions, filters, selected role).
- UI/UX expectations: completed (responsive layout, empty states, readable components).

## Project Structure (Important Files)

- src/pages/Dashboard.jsx: main composition and UI flow.
- src/store/useStore.js: application state and persistence.
- src/components/TransactionTable.jsx: filtered/sorted table with role actions.
- src/components/TransactionForm.jsx: add/edit modal with validation.
- src/components/Insights.jsx: computed insights.
- src/components/Charts/LineChart.jsx: balance trend chart.
- src/components/Charts/PieChart.jsx: spending breakdown chart.
- src/utils/finance.js: calculation and formatting helpers.

## Reasonable Assumptions

- Transaction data is mock/static and managed entirely on frontend.
- Role simulation is UI-only and does not include backend authorization.

## Potential Next Enhancements

- JSON export option in addition to CSV.
- Date-range filtering.
- Mock API integration and loading states.
- Unit tests for utility calculations.
