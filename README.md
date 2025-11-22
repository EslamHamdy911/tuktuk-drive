# Tuktuk Drive — Offline-First Prototype

🚀 **Tuktuk Drive** is a bold, youth-driven web app that combines ride-hailing and goods delivery services using tuk-tuks as the main transportation mode in Egypt.  
This prototype is designed to run entirely offline-first using **IndexedDB** and a **Service Worker** to simulate backend APIs.

---

## 🔧 Features

- 🛺 **Passenger (User) Dashboard**
  - Book a personal ride
  - Request goods delivery
  - Delivery confirmation flow (driver proof + user proof)
  - See available drivers with status (Free/Busy)

- 🚖 **Driver Dashboard**
  - Driver profile (name, rating, vehicle)
  - Accept ride or delivery requests
  - Status system: Free (green badge) / Busy (red badge)
  - Earnings summary (dummy data)

- 🛠️ **Admin Dashboard**
  - Monitor all drivers and their statuses
  - Track active rides and deliveries
  - Review delivery confirmations
  - Manage accounts (dummy add/remove buttons)
  - Operational statistics (active rides, completed deliveries)

- 👑 **Owner Dashboard**
  - Business-level insights distinct from Admin
  - Financial summary (total earnings, commissions, payouts)
  - Strategic overview: users, drivers, admins
  - Performance charts (dummy data)

---

## 🗄️ Offline-First Architecture

### IndexedDB
- All data (users, drivers, admins, owners, sessions, requests, transactions, notifications, reviews, analytics, support, settings) is stored in **IndexedDB** inside the browser.
- Initial data is seeded from JSON files on first load.
- After seeding, all CRUD operations (create, read, update, delete) happen directly in IndexedDB.

### Service Worker
- A **Service Worker** intercepts requests to `/api/...` and responds with data from IndexedDB.
- This simulates a backend API without needing a real server.
- Supported operations:
  - `GET /api/store` → returns all records
  - `GET /api/store/id` → returns a single record
  - `POST /api/store` → adds/updates a record
  - `DELETE /api/store/id` → deletes a record

### Sessions
- Login creates a new session record in IndexedDB (`sessions` store).
- Logout updates the session status to `inactive` with a timestamp.
- Sessions include `deviceInfo` and `ipAddress` (dummy values) for realism.

---

## 📦 Files Included

| File | Purpose |
|------|---------|
| `index.html` | Main prototype file with embedded HTML/CSS/JS |
| `README.md` | Project overview and usage instructions |
| `sw.js` | Service Worker for API simulation |
| `assets/users.json` | Sample passenger accounts |
| `assets/drivers.json` | Sample driver accounts |
| `assets/admins.json` | Sample admin accounts |
| `assets/owners.json` | Sample owner accounts |
| `assets/sessions.json` | Simulated login sessions |
| `assets/requests.json` | Ride and delivery requests |
| `assets/transactions.json` | Financial transactions |
| `assets/notifications.json` | Notifications for users/drivers |
| `assets/reviews.json` | Ratings and reviews |
| `assets/analytics.json` | System analytics |
| `assets/support.json` | Support tickets |
| `assets/settings.json` | App settings |

---

## 🛠️ How to Use

1. Clone or download this repo locally.
2. Open `index.html` in your browser.
3. The Service Worker (`sw.js`) will register automatically.
4. Choose login type:
   - **Passenger** → Book rides or request deliveries.
   - **Driver** → Accept requests and manage status.
   - **Admin** → Monitor operations and manage accounts.
   - **Owner** → View business insights and financial overview.
5. Test flows:
   - Book a personal ride.
   - Book a goods delivery and complete the dual confirmation.
   - Switch between dark/light mode and languages.
   - Check driver status changes (Free/Busy).
   - Explore Admin and Owner dashboards.

---

## 📌 Notes

- All flows are simulated — no backend or real API calls.
- IndexedDB + Service Worker make the app behave like it has a backend.
- Designed for prototyping and UI testing only.
- Feedback and suggestions are welcome!

---

## 📣 Credits

Created by **Islam** — Cairo/Mansoura-based entrepreneur building smart, local-first digital tools.
