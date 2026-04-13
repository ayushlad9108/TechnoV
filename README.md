# TechnoValves — Industrial Valve Solutions

A full-stack web application for **Techno Valves**, a leading supplier and trader of industrial valves established in 2015, based in Nashik, Maharashtra, India.

---

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router DOM
- React Leaflet (interactive map)
- Razorpay (payment gateway)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Razorpay Node SDK
- dotenv, cors

---

## Project Structure

```
TechnoV/
├── public/
│   ├── ball balve/          # Real product images
│   ├── frames/              # Hero animation frames
│   ├── images/              # Section background images
│   ├── logo.png
│   ├── TechnoValves.mp4     # About page company video
│   └── TechnoValves-Brochure.pdf
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroValveAnimation.tsx
│   │   ├── HeroContinuation.tsx
│   │   ├── IndustrialChallenges.tsx
│   │   ├── EngineeringResponse.tsx
│   │   ├── ProductApplicationShowcase.tsx
│   │   ├── StrategicPartners.tsx
│   │   ├── GlobalPresence.tsx
│   │   ├── ProofTrust.tsx
│   │   ├── BrandPhilosophy.tsx
│   │   ├── IndustrialCTA.tsx
│   │   ├── ValveCard.tsx
│   │   ├── products.ts
│   │   └── InquiryForm.tsx
│   ├── context/
│   │   └── CartContext.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Industries.tsx
│   │   ├── Engineering.tsx
│   │   ├── Contact.tsx
│   │   ├── GetQuote.tsx
│   │   ├── Cart.tsx
│   │   ├── Invoice.tsx
│   │   ├── Payment.tsx
│   │   ├── Bill.tsx
│   │   └── Inquiry.tsx
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── index.js             # Express server
│   ├── package.json
│   └── .env                 # Server environment variables (not committed)
├── .env                     # Frontend environment variables (not committed)
├── render.yaml              # Render deployment config
└── package.json
```

---

## Features

- Scroll-driven hero valve animation (40-frame canvas sequence)
- Interactive global presence map (Leaflet + OpenStreetMap)
- Product catalogue with real valve images and add-to-cart
- Full checkout flow: Cart → Invoice → Razorpay Payment → Bill
- Animated client marquee (30+ prestigious clients)
- Count-up stats animation
- Contact, Get Quote, and Inquiry forms saved to MongoDB
- About page with company video
- Downloadable brochure
- Back button always redirects to home

---

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB running locally or Atlas URI

### Frontend Setup

```bash
cd TechnoV
npm install
```

Create `.env` in `TechnoV/`:
```
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
```

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

### Backend Setup

```bash
cd TechnoV/server
npm install
```

Create `.env` in `TechnoV/server/`:
```
MONGODB_URI=mongodb://localhost:27017/technovalves
PORT=5000
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

Backend runs at `http://localhost:5000`

---

## Deployment

### Backend → Render

1. Connect GitHub repo on [render.com](https://render.com)
2. New Web Service with settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
3. Add environment variables:
   ```
   MONGODB_URI         = mongodb+srv://...
   PORT                = 5000
   RAZORPAY_KEY_ID     = rzp_live_...
   RAZORPAY_KEY_SECRET = ...
   FRONTEND_URL        = https://your-app.vercel.app
   ```

### Frontend → Vercel

1. Import GitHub repo on [vercel.com](https://vercel.com)
2. Settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables:
   ```
   VITE_API_URL         = https://your-api.onrender.com
   VITE_RAZORPAY_KEY_ID = rzp_live_...
   ```
4. Redeploy after adding env vars (Vite bakes them at build time)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Save order to MongoDB |
| PATCH | `/api/orders/:invoiceNumber/paid` | Mark order as paid |
| POST | `/api/create-razorpay-order` | Create Razorpay payment order |
| POST | `/api/verify-payment` | Verify Razorpay signature |
| POST | `/api/contacts` | Save contact form |
| POST | `/api/quotes` | Save quote request |
| POST | `/api/inquiries` | Save inquiry form |

---

## Environment Variables Reference

### Frontend (`.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |
| `VITE_RAZORPAY_KEY_ID` | Razorpay publishable key |

### Backend (`server/.env`)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Server port (default 5000) |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `FRONTEND_URL` | Frontend URL for CORS |

---

## Company Info

**Techno Valves**
- Established: 2015
- Location: Nashik, Maharashtra, India
- Specialisation: Ball Valves, Gate Valves, Globe Valves
- Clients: BHEL, NTPC, TATA, L&T, MAHAGENCO, Wipro, and 25+ more
- Export Markets: UAE, Saudi Arabia, UK, USA, Singapore, Australia, South Africa

---

## License

Private — All rights reserved © Techno Valves 2015–present
