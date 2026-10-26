# 🚆 TicketSetu (टिकेट सेतु)
### India's Peer-to-Peer Train Ticket Exchange Community

**TicketSetu** is a clean, modern, and accessible web platform designed to solve a ubiquitous problem for Indian Railway commuters: **Seat Wastage vs. Waitlist Woes**. 

Every day, thousands of confirmed railway passengers are forced to cancel trips at high cancellation penalties, while millions of emergency travelers remain stranded on waiting lists (WL/RAC). TicketSetu acts as an open, community-driven bridge connecting passengers who have extra/unused confirmed tickets with travelers urgently searching for confirmed seats.

---

## 🌟 Key Features

- **🏠 Modern Landing Page (`index.html`)**:
  - Hero section with live quick-finder widget and station swap button.
  - Animated statistical counters (Tickets Listed, Happy Travelers, Routes Covered, Response Time).
  - 3-Step "How It Works" guide (Search → Contact → Travel).
  - Featured tickets carousel/grid populated dynamically from localStorage.
  - Zero-commission ethos highlighting passenger-to-passenger direct contact.

- **🔍 Advanced Ticket Search & Filter (`search.html`)**:
  - Filter by origin station, destination station, journey date, and coach class (Sleeper, 3AC, 2AC, 1AC, General/2S).
  - Quick station swap feature.
  - One-click popular route filter chips (Pune → Malkapur, Mumbai → Pune, Nagpur → Mumbai, Delhi → Mumbai, Pune → Nashik, Hyderabad → Pune).
  - Sorting options: Price (Low to High, High to Low), Departure Time, Journey Date.
  - Rich ticket cards showing train details, timetable, route visuals, price, and direct one-click **Call Seller** (`tel:`) & **WhatsApp** (`https://wa.me/`) buttons.
  - Helpful empty state when no matching routes are found.

- **➕ Add & Manage Ticket Listings (`add.html`)**:
  - User-friendly listing form with structured sections (Train Info, Route & Timings, Pricing & Class, Seller Details).
  - Comprehensive client-side validation (10-digit mobile number, valid positive price, future date, station conflict check).
  - Instant localStorage persistence with toast notifications.
  - **"My Listed Tickets" Management**: Users can review their active listings and delete sold tickets with a single click to stop incoming inquiries.
  - Helpful sidebar with ethical pricing tips and safety guidance.

- **📖 About & Safety Center (`about.html`)**:
  - Mission statement explaining the community bridge concept.
  - Core values: 100% Peer-to-Peer, Zero Berth Wastage, Mutual Respect.
  - Safety & verification checklist for physical/digital ticket handover.
  - Interactive FAQ accordion answering common questions about IRCTC transfer rules, pricing, and fraud prevention.
  - Legal notice and disclaimer.

- **📱 Fully Responsive Design**:
  - Tailored for desktops, tablets, and mobile screens.
  - Mobile hamburger navigation drawer with smooth transitions.
  - Accessible typography with Google Fonts (*Poppins*).
  - Indian Railways themed color palette: Deep Blue (`#1a237e`) and Vibrant Saffron/Orange (`#ff6f00`).

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markups, accessible forms, meta descriptions, and modern attributes.
- **CSS3**: Custom design system using CSS variables, Flexbox, CSS Grid, animations, and responsive media queries.
- **Vanilla JavaScript (ES6+)**:
  - `localStorage` API for full offline data persistence and state management.
  - Dynamic filtering, real-time query parameter parsing, and sorting algorithms.
  - `IntersectionObserver` & `requestAnimationFrame` for high-performance counter animations.
  - Toast notification engine and responsive mobile menu controller.
- **Icons & Typography**:
  - Google Fonts (*Poppins*: 300, 400, 500, 600, 700, 800)
  - Font Awesome 6.5.1 CDN for crisp railway and interface icons.

---

## 📦 Project Structure

```text
ticketsetu/
├── index.html        # Main landing page with hero, search widget, stats & features
├── search.html       # Full ticket search engine with filters, sorting & direct contacts
├── add.html          # Form to list tickets and manage "My Listed Tickets"
├── about.html        # Platform vision, safety guide, and interactive FAQ
├── style.css         # Complete responsive design system & component styles
├── script.js         # LocalStorage persistence, filters, validation & interactions
└── README.md         # Documentation and project overview
```

---

## 🚀 How to Run Locally

Because TicketSetu is built with pure web technologies (HTML, CSS, JavaScript), no Node.js compilation or backend dependencies are strictly required.

### Option 1: Direct File Opening
Double-click `index.html` or open it with any modern web browser (Google Chrome, Firefox, Safari, Microsoft Edge).

### Option 2: Local HTTP Server (Recommended)
Running through an HTTP server ensures full compatibility with URL query parameters and local storage:

```bash
# Using Python 3
cd /Users/vedant/.gemini/antigravity/scratch/ticketsetu
python3 -m http.server 8080

# Then open in your browser:
# http://localhost:8080
```

Or using Node's `npx serve`:
```bash
npx serve /Users/vedant/.gemini/antigravity/scratch/ticketsetu
```

---

## 🚆 Pre-Loaded Sample Tickets

TicketSetu comes pre-seeded with 6 realistic railway journeys out of the box so search and testing work immediately:

| Train Name | Train # | Route | Class | Price |
| :--- | :--- | :--- | :--- | :--- |
| **Vidarbha Express** | 17618 | Pune → Malkapur | Sleeper | ₹350 |
| **Deccan Express** | 11007 | Mumbai → Pune | 3AC | ₹580 |
| **Duronto Express** | 12290 | Nagpur → Mumbai | 2AC | ₹1,450 |
| **Godavari Express** | 12139 | Pune → Nashik | Sleeper | ₹280 |
| **Rajdhani Express** | 12951 | Delhi → Mumbai | 3AC | ₹2,100 |
| **Ajanta Express** | 17063 | Hyderabad → Pune | Sleeper | ₹420 |

---

## 📸 Interface Preview & Screenshots

### 1. Home Page (`index.html`)
- Hero banner with quick ticket finder and real-time station swap.
- Animated statistics counters (Tickets Listed, Happy Travelers, Routes Covered).
- Visual step-by-step process and recent ticket listings.

### 2. Search Page (`search.html`)
- Multidimensional filters (Origin, Destination, Travel Date, Coach Class).
- One-click route pills and sorting mechanism.
- Instant seller contact via direct phone call or WhatsApp pre-filled chat.

### 3. Add Ticket Page (`add.html`)
- 4-step structured form with input validation.
- Live "My Listed Tickets" dashboard with instant listing deletion.

### 4. About & Safety Guidelines (`about.html`)
- Explanation of the community bridge concept.
- Safety recommendations and IRCTC ticket transfer rules.
- Expandable FAQ accordion.

---

## ⚖️ Legal Disclaimer

*TicketSetu is an independent community bulletin board and is not affiliated with, endorsed by, or sponsored by Indian Railways, IRCTC, or the Ministry of Railways, Government of India. It operates strictly as a peer-to-peer communication board to facilitate seat sharing among passengers at original ticket face value. Commercial ticket reselling, scalping, or black-marketing is strictly forbidden.*
