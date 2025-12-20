# Support Tickets

A React application for browsing and updating customer support tickets. Built as a take-home assignment demonstrating data fetching, state management, and clean UI/UX patterns.

### Installation

Install necessary packages

```bash
npm install
```

You need **two terminals** running simultaneously:

**Terminal 1 - Start the mock API:**

```bash
npm run server
```

This starts json-server on http://localhost:3001

**Terminal 2 - Start the frontend:**

```bash
npm run dev
```

This starts Next.js on http://localhost:3000

---

## Features

### Required Features

- **Ticket List** - Table view with title, status, priority, customer, and updated date
- **Search** - Filter tickets by title (client-side)
- **Status Filter** - Filter by Open / Pending / Closed
- **Sort** - Tickets sorted by most recently updated
- **Ticket Detail Modal** - View full ticket info including description and activity
- **Status Update** - Change ticket status from the modal
- **UX States** - Loading spinner, error with retry, empty state messages

### Bonus Features

- **Priority Filter** - Filter by Urgent / High / Medium / Low
- **Pagination** - 10 tickets per page with Previous/Next navigation

---

## Tech Stack & Trade-offs

### Next.js

- The dev team already uses Next.js in most of their projects.
- Built-in TypeScript support and fast refresh for development and fast project setup.
- App Router provides a clean project structure with `src/` directory support

### Radix UI

- Production-ready, accessible components out of the box and easy to use and setup
- Array of components like Dialog, Select, Table, Badge which were used in the project.
- Access to an icon library

### State & Data Management

The application relies on local React hooks (`useState`, custom hooks) for managing UI and ticket state. I choose to use it since i am most comfortable with it and for this project we dont need additional complexity.

**React Context** was not introduced because:

- State is not shared deeply across unrelated components
- Prop drilling is minimal and manageable

**React Query** was not used because the app does not rely on complex server state.

- Ticket data is fetched from a local mock API and does not require caching, background refetching, or synchronization logic.

### Pessimistic vs Optimistic Updates

- I chose **pessimistic updates** for status changes since its simpler to implement and reason about
- No rollback logic needed if the API fails
- Trade-off: Slightly slower UX, but more reliable

### What I'd Do Next (With More Time)

- **Debounced Search** - Add 300ms delay to avoid API calls on every keystroke
- **Tests** - Unit tests.
- **Accessibility Audit** - Verify keyboard navigation, screen reader support
- **Assigned to Me** - Add mock current user and filter toggle
- **Toast Notifications** - Show success/error feedback for status updates
