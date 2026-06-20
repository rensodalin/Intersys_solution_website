# Architecture

## 1. Physical Architecture (Deployment)

```
┌─────────────────────────────────────────────────────────────┐
│                    Users / Browsers                          │
│              https://intersys-solutions.com.kh                │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ DNS: intersys-solutions.com.kh
                   │ (CNAME → Vercel)
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                    Vercel (Frontend)                          │
│  ● Vite + React 19 (TanStack Router)                         │
│  ● Static SPA serving                                        │
│  ● Env: VITE_API_URL = backend URL                           │
│  ● reCAPTCHA v2 site key                                     │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   │ HTTPS API calls (credentials: "include")
                   │ CORS: whitelist Vercel domain
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                    Render (Backend API)                       │
│  ● Express 5 + Passport.js (session auth)                    │
│  ● CORS: { origin: [Vercel domain], credentials: true }     │
│  ● Session store → connect-mongo (MongoDB Atlas, 24h TTL)   │
│  ● reCAPTCHA verification → Google API (auth only)          │
│  ● Email → Nodemailer (Gmail SMTP)                          │
│  ● Telegram notifications                                    │
│  ● File uploads → stored on Hostinger cloud storage         │
└──────────┬───────────────────────┬───────────────────────────┘
           │                       │
           ▼                       ▼
┌───────────────────┐   ┌────────────────────────────┐
│   MongoDB Atlas    │   │   Hostinger Cloud Storage   │
│  ● Users/sessions  │   │  ● Poster images           │
│  ● Insights        │   │  ● Product images/PDFs     │
│  ● Products        │   │  ● Insight PDFs            │
│  ● Quotes/Contacts │   │  ● Chat file attachments   │
│  ● Messages/Chat   │   │  ● User avatars            │
│  ● Taxonomy        │   │                            │
│  ● Visitor visits  │   │  (replaces local /uploads/) │
│  ● Technical tips  │   │                            │
└───────────────────┘   └────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    External Services                           │
│  ● Google reCAPTCHA API  → token verification (auth forms)   │
│  ● Google OAuth 2.0      → social login                      │
│  ● Gmail SMTP            → Nodemailer (contact/quote emails) │
│  ● Telegram Bot API      → admin notifications               │
└──────────────────────────────────────────────────────────────┘
```

## 2. Logical Architecture (3-Layer)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   LAYER 1: PRESENTATION LAYER (Frontend — Vite + React 19)              │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  UI Components                                                    │   │
│   │  ├── shadcn/ui (Radix primitives + Tailwind 4)                   │   │
│   │  ├── Framer Motion (animations)                                  │   │
│   │  ├── Sonner (toast notifications)                                │   │
│   │  └── reCAPTCHA v2 widget (auth forms only)                       │   │
│   ├─────────────────────────────────────────────────────────────────┤   │
│   │  State & Validation                                              │   │
│   │  ├── Redux Toolkit → auth slice (user session)                   │   │
│   │  ├── React Context → InquiryContext                              │   │
│   │  ├── Component-local state (useState) for most data              │   │
│   │  ├── Quote form  → Zod schema + React Hook Form                  │   │
│   │  └── Other forms → manual state-driven validation                │   │
│   ├─────────────────────────────────────────────────────────────────┤   │
│   │  Routing                                                          │   │
│   │  ├── TanStack Router (file-based, ~60 routes)                    │   │
│   │  ├── Public: /, /products, /insights, /projects...               │   │
│   │  ├── Admin: /admin/* (role-gated)                                │   │
│   │  └── Dynamic: /products/$slug, /insights/$slug                   │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                           │                                              │
│                           │ HTTPS (fetch with credentials: "include")    │
│                           ▼                                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   LAYER 2: APPLICATION LAYER (Backend — Express 5)                      │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Middleware Pipeline                                              │   │
│   │  ├── CORS (origin whitelist + credentials)                       │   │
│   │  ├── express.json()                                              │   │
│   │  ├── express-session + connect-mongo (MongoDB store)             │   │
│   │  ├── passport.initialize() + passport.session()                  │   │
│   │  └── isAuthenticated / isAdmin guards (route-level)              │   │
│   ├─────────────────────────────────────────────────────────────────┤   │
│   │  Routes → Controllers (business logic)                            │   │
│   │  ├── /auth          → register, login, google, logout             │   │
│   │  ├── /api/insights  → CRUD (admin write)                         │   │
│   │  ├── /api/projects  → CRUD                                       │   │
│   │  ├── /api/posters   → CRUD + newsletter email                    │   │
│   │  ├── /api/quotes    → submit + admin list                        │   │
│   │  ├── /api/products  → CRUD                                       │   │
│   │  ├── /api/contact   → submit (public) + admin list               │   │
│   │  ├── /api/chat      → client messages + admin replies            │   │
│   │  ├── /api/taxonomy  → nested category tree                       │   │
│   │  ├── /api/visitors  → page visits                                │   │
│   │  └── /api/activity  → user activity log                          │   │
│   ├─────────────────────────────────────────────────────────────────┤   │
│   │  Controller Logic (per request)                                   │   │
│   │  ├── reCAPTCHA verify (auth forms only via Google API)           │   │
│   │  ├── Input validation (manual + form-specific Zod)               │   │
│   │  ├── Business rules → Mongoose operations                        │   │
│   │  └── Side effects: Nodemailer email + Telegram notification      │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                           │                                              │
│                           │ Mongoose ODM                                 │
│                           ▼                                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   LAYER 3: DATA LAYER (Persistence)                                     │
│                                                                          │
│   ┌─────────────────────────────────────┬───────────────────────────┐   │
│  │  MongoDB Atlas (17 collections)      │  Hostinger Cloud Storage  │   │
│   │                                     │                           │   │
│   │  ├── users         │  sessions     │  ├── Poster images         │   │
│   │  ├── insights      │  projects     │  ├── Product images/PDFs   │   │
│   │  ├── products      │  quotes       │  ├── Insight PDFs          │   │
│   │  ├── contacts      │  messages     │  ├── Chat attachments      │   │
│   │  ├── categories    │  posters      │  ├── User avatars          │   │
│   │  ├── technicaltips │  visitorvisits│  │                           │   │
│   │  ├── activities    │  visitorvisits│  │                           │   │
│   │  ├── quoteitems    │  downloadedpdfs│  │                           │   │
│   │  └── productoptions│  productdocuments│  │                           │   │
│   └─────────────────────────────────────┴───────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Layer Communication

```
Presentation Layer (Vercel)
       │
       │ HTTPS (fetch with credentials: "include")
       │ CORS handshake
       │ Session cookie (connect.sid)
       ▼
Application Layer (Render)
       │
       │ Mongoose ODM (TCP/IP) → MongoDB Atlas
       │ HTTP/HTTPS upload     → Hostinger Cloud Storage
       │
       │ ─ Also calls external services directly:
       │   Google reCAPTCHA API, Google OAuth 2.0,
       │   Gmail SMTP (Nodemailer), Telegram Bot API
       ▼
Data Layer (MongoDB Atlas + Hostinger)
```

## 3. Data Flow Diagrams

### Standard REST API (generalized)

```
① User action in browser (clicks button / submits form)
       ↓
② Client-side validation
   ├── Quote form  → Zod schema via React Hook Form (zodResolver)
   └── Other forms → manual state-driven checks
       ↓
③ HTTPS POST/GET to Backend API (fetch with credentials: "include")
       ↓
④ CORS policy check (reject if origin not in whitelist)
       ↓
⑤ [Protected routes only] Passport.js session check
   (isAuthenticated / isAdmin middleware — 401/403 if invalid)
       ↓
⑥ [Auth forms only] reCAPTCHA v2 token verified with Google API
   (register & login endpoints — not on contact/quote)
       ↓
⑦ Server-side validation (controller-level field checks)
       ↓
⑧ Business logic (Mongoose save / find / update)
       ↓
⑨ Side effects triggered
   ├── Email via Nodemailer (contact form, quote submission, poster newsletter)
   └── Telegram Bot notification (new contact, new quote)
       ↓
⑩ JSON response returned { success: true, data: ... }
       ↓
⑪ UI updated via setState / custom hook state → TanStack Router re-render
       ↓
⑫ Sonner toast notification (toast.success / toast.error)
```

### Chat (HTTP Polling — no WebSocket)

```
① User opens chat widget → ChatWidget mounts
       ↓
② If conversation view → polls GET /api/chat/public-messages/:email every 3s
       ↓
③ User types message + optional file attachment → clicks Send
       ↓
④ POST /api/chat/client-message { email, name, subject, content, attachment? }
       ↓
⑤ CORS check → Server validates fields
       ↓
⑥ Server saves Message document to MongoDB (source: "chat")
       ↓
⑦ Telegram notification sent to admin
       ↓
⑧ JSON response → UI adds message optimistically to local state
       ↓
⑨ Sonner toast on success / error
       ↓
⑩ On next poll, admin replies appear automatically in conversation

─ ─ ─ Admin Side ─ ─ ─
⑪ Admin opens Chat Inbox → GET /api/chat/messages (grouped by email)
       ↓
⑫ Admin selects conversation → fetches messages for that email
       ↓
⑬ Admin replies → POST /api/chat/admin-reply { email, content, attachment? }
       ↓
⑭ Server saves with isFromAdmin: true → client fetches on next poll
```

### Authentication (Email/Password)

```
① User submits { email, password, recaptchaToken }
       ↓
② Backend calls Google reCAPTCHA siteverify API
       ↓
③ User.findOne({ email }) → bcrypt.compare(password, hash)
       ↓
④ req.logIn(user) → session document written to MongoDB via connect-mongo
   (24-hour TTL, collection: "sessions")
       ↓
⑤ Express sets connect.sid cookie in browser response
   (httpOnly: true, secure: true in production, sameSite: "none" in production)
       ↓
⑥ All subsequent API requests carry cookie
   → Passport.deserializeUser() retrieves user from MongoDB by session id
   → req.user populated automatically
```

### Google OAuth

```
① User clicks "Sign in with Google"
       ↓
② Redirect to /auth/google → Passport initiates Google OAuth2 flow
       ↓
③ User consents on Google → callback to /auth/google/callback
       ↓
④ Passport finds or creates User by googleId
       ↓
⑤ req.logIn(user) → session stored in MongoDB
       ↓
⑥ Redirect back to frontend origin with session cookie set
```

## 4. Entity Relationship Diagram (ERD)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                              MongoDB — 17 Collections                                 │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌───────────────────┐          ┌─────────────────────────┐                          │
│  │      User         │   1:N    │        Quote            │                          │
│  ├───────────────────┤◄─────────├─────────────────────────┤                          │
│  │ _id (PK)          │  userId  │ userId (FK, optional)   │                          │
│  │ googleId (UQ)     │ (opt.)   ├─────────────────────────┤                          │
│  │ email (UQ)        │          │ products[] (FK) ────────│──┐  1:N                  │
│  │ firstName         │          │ solutionCategories[]    │  │  (logical FK →        │
│  │ lastName          │          │ sections[]              │  │   Category.name)      │
│  │ name              │          │ name, company, title    │  │                       │
│  │ password (hash)   │          │ phone, email, address   │  │                       │
│  │ phone             │          │ city, country           │  │                       │
│  │ gender            │          │ contactpreference       │  │                       │
│  │ country           │          │ newsletter              │  │                       │
│  │ role              │          │ companyType             │  │                       │
│  │ isAdmin           │          │ bmsSystem, otherBms     │  │                       │
│  │ avatar            │          │ status (Pending/...)    │  │                       │
│  │ newsletter        │          └──────────┬──────────────┘  │                       │
│  │ receiveUpdates    │                     │ N:1             │                       │
│  │ lastLogin         │                     │ (quoteId)       │                       │
│  │ ──────────────    │                     ▼                 │                       │
│  │ (User has no      │          ┌─────────────────────┐   │                       │
│  │  outgoing refs)   │     N:1  │    QuoteItem        │   │                       │
│  └──────┬────────────┘          ├─────────────────────┤   │                       │
│         │             N:1       │ _id (PK)            │◄──┘                       │
│         │             (userId)  │ quoteId (FK → Quote)│                           │
│         ▼                       │ product (FK) ───────│──┐  N:1                   │
│  ┌───────────────────┐          │ productId (string)  │  │                        │
│  │   DownloadedPdf    │          │ qty, productNo      │  │                        │
│  ├───────────────────┤          │ description, price  │  │                        │
│  │ _id (PK)          │          │ application         │  │                        │
│  │ userId (FK→User)  │          └─────────────────────┘  │                        │
│  │ title, url         │                                  │                        │
│  │ downloadedAt       │          ┌─────────────────────┐  │                        │
│  └───────────────────┘          │      Product         │◄─┘                        │
│                                  ├─────────────────────┤                           │
│  ┌────────────────────────┐      │ productId (UQ)       │                           │
│  │   Category (active)    │  1:N │ category (string)    │                           │
│  ├────────────────────────┤◄─────├─────────────────────┤                           │
│  │ _id (PK)               │  cat │ categoryRef (FK)     │                           │
│  │ name (UQ w/ parent)    │  Ref  │ brand, title, desc   │                           │
│  │ label, description     │      │ mainImage, thumbnails│                           │
│  │ image, heroImage       │      │ brandSubCategory     │                           │
│  │ parent (FK → self)     │      │ options[] (FK) ──────│──┐  1:N                  │
│  │ order            (1:N) │      │ documents[] (FK) ────│──┐  1:N                  │
│  └────────────────────────┘      └───────────────────────┘  │  │                     │
│                                                              │  │                     │
│  ┌───────────────────────┐        ┌─────────────────────┐  │  │                     │
│  │       Insight         │        │    ProductOption     │◄─┘  │  N:1                │
│  ├───────────────────────┤        ├─────────────────────┤     │                     │
│  │ slug (UQ)             │        │ _id (PK)            │     │                     │
│  │ title, desc           │        │ productId (FK)       │     │                     │
│  │ category (string)     │        │ partCode, spec       │     │                     │
│  │ date, author          │        │ price, qty           │     │                     │
│  │ image[], pdfUrl       │        └─────────────────────┘     │                     │
│  │ client, location      │                                      │                     │
│  │ scope[]               │        ┌─────────────────────┐     │                     │
│  └───────────────────────┘        │  ProductDocument    │◄────┘  N:1                │
│  ┌───────────────────────┐        ├─────────────────────┤                           │
│  │       Project         │        │ _id (PK)            │                           │
│  ├───────────────────────┤        │ productId (FK)       │                           │
│  │ title, desc           │        │ name, url           │                           │
│  │ image                 │        └─────────────────────┘                           │
│  │ category (string)     │      ┌────────────────────────────────────────┐          │
│  │ client, location      │      │  Standalone (no outgoing references)   │          │
│  │ scope[]               │      │  ┌─────────┐ ┌─────────┐ ┌──────────┐ │          │
│  │ slug                  │      │  │ Contact │ │ Poster  │ │ Message  │ │          │
│  └───────────────────────┘      │  ├─────────┤ ├─────────┤ ├──────────┤ │          │
│  ┌───────────────────────┐      │  │ name    │ │ image   │ │ email    │ │          │
│  │    TechnicalTip        │      │  │ email   │ │ link    │ │ subject  │ │          │
│  ├───────────────────────┤      │  │ phone   │ │ title   │ │ content  │ │          │
│  │ title                 │      │  │ message │ │ desc    │ │ source*  │ │          │
│  │ pdfUrl                │      │  │ status  │ │ order   │ │ attach   │ │          │
│  │ category (string)     │      │  ├─────────┤ └─────────┘ └──────────┘ │          │
│  │ description           │      │  │VisitorVisit│                          │          │
│  │ order                 │      │  ├──────────┤                          │          │
│                                    │  │visitDate │                          │          │
│                                    │  │visitedAt │                          │          │
│                                    │  │(UQ pair) │                          │          │
│                                    │  └──────────┘                          │          │
│                                    └────────────────────────────────────────┘          │
│                                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐                 │
│  │  Key: PK = Primary Key │ UQ = Unique │ FK = Foreign Key          │                 │
│  │  [ ] = array field     │ 1:N/N:1 = cardinality                   │                 │
│  │  ──────► = logical FK (string value match, not populateable)     │                 │
│  │  ◄────── = formal ObjectId ref (populateable via .populate())    │                 │
│  └──────────────────────────────────────────────────────────────────┘                 │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

## 5. Use Case Diagram

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                           Intersys Solutions Platform                                     │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────────┐│
│  │                          GUEST (Not authenticated)                                   ││
│  ├──────────────────────────────────────────────────────────────────────────────────────┤│
│  │  ● Browse Homepage (14 Content Sections)                                             ││
│  │  ● Explore 12 Service Detail Pages                                                   ││
│  │  ● Filter Dynamic Product E-Catalog (unlimited depth)                                ││
│  │  ● View PDF Datasheets (triggers Auth Modal)                                         ││
│  │  ● Submit Multi-Step Quote Request                                                  ││
│  │  ● Send Contact/Support Messages                                                     ││
│  │  ● Browse Insights Blog and Portfolio                                                ││
│  │  ● Browse Technical Tips PDF Library                                                 ││
│  └──────────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                           │
│  ════════════════════════════════════════════════════════════════════════════════════════ │
│                                                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────────┐│
│  │                     REGISTERED USER (Authenticated)                                  ││
│  ├──────────────────────────────────────────────────────────────────────────────────────┤│
│  │  ● Register (bcrypt + reCAPTCHA protected)                                           ││
│  │  ● Login (Local or Google SSO OAuth)                                                 ││
│  │  ● View My-Account 4-Tab Dashboard                                                   ││
│  │  ● Download/Redownload Product PDF Vault                                             ││
│  │  ● Chat with Support Widget                                                          ││
│  │  ● Send and receive chat messages with attachments                                   ││
│  │  ● Update Profile, Password, and Avatar                                              ││
│  └──────────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                           │
│  ════════════════════════════════════════════════════════════════════════════════════════ │
│                                                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────────┐│
│  │                     ADMIN SUPERVISOR (isAdmin = true)                                ││
│  ├──────────────────────────────────────────────────────────────────────────────────────┤│
│  │  ● View 10-Tab Admin Control Panel                                                   ││
│  │  ● Dashboard overview, Analytics, Quotes, Products                                  ││
│  │  ● CRM Chat Inbox with thread view and file upload replies                          ││
│  │  ● Manage Technical Tips (CRUD with PDF links)                                      ││
│  │  ● Manage Insight Blog and Poster Carousels                                         ││
│  │  ● View Contacts List and delete entries                                            ││
│  │  ● Export Quotes to BOQ PDF                                                         ││
│  │  ● Receive notification badges for pending items                                    ││
│  └──────────────────────────────────────────────────────────────────────────────────────┘│
│                                                                                           │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                           │
│  ┌──────────────────────────────────────────────────────────────────────────────────────┐│
│  │                         EXTERNAL SYSTEM ACTORS                                       ││
│  ├──────────────────────────────────────────────────────────────────────────────────────┤│
│  │                                                                                       ││
│  │  ┌──────────────────────────────────┐   ┌──────────────────────────────────────────┐ ││
│  │  │  Google Identity Provider        │   │  Gmail SMTP Gateway                      │ ││
│  │  ├──────────────────────────────────┤   ├──────────────────────────────────────────┤ ││
│  │  │  OAuth 2.0 SSO profile sync      │   │  HTML emails for quotes, replies,        │ ││
│  │  │                                   │   │  newsletter blasts                       │ ││
│  │  └──────────────────────────────────┘   └──────────────────────────────────────────┘ ││
│  │                                                                                       ││
│  │  ┌──────────────────────────────────┐                                                ││
│  │  │  Telegram Bot API                │                                                ││
│  │  ├──────────────────────────────────┤                                                ││
│  │  │  HTTPS sendMessage on every      │                                                ││
│  │  │  quote and contact event         │                                                ││
│  │  └──────────────────────────────────┘                                                ││
│  │                                                                                       ││
│  └──────────────────────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

## 6. Environment Variables

### Backend (Render)

| Variable | Purpose |
|----------|---------|
| `PORT` | Server port (1000) |
| `URI` | MongoDB Atlas connection string |
| `FRONTEND_URL` | Vercel deployment URL for CORS |
| `SESSION_SECRET` | Session encryption secret |
| `EMAIL_USER` | Gmail address for Nodemailer |
| `EMAIL_PASS` | Gmail app password |
| `CLIENT_ID` | Google OAuth client ID |
| `CLIENT_SECRET` | Google OAuth client secret |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v2 secret key |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | Telegram notification chat ID |
| `HOSTINGER_ENDPOINT` | Hostinger cloud storage endpoint |
| `HOSTINGER_KEY` | Hostinger access key |
| `HOSTINGER_SECRET` | Hostinger secret |
| `NODE_ENV` | `production` |

### Frontend (Vercel)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend API base URL |

## 7. Production Checklist

- [ ] Remove unused `@cloudflare/vite-plugin` from `frontend/package.json`
- [ ] Remove unused `@tanstack/react-query`, `socket.io`, `socket.io-client` if not needed
- [ ] Replace local `Backend/uploads/` storage with Hostinger cloud storage in all upload controllers
- [ ] Add production CORS origins: Vercel domain + custom domain in `Backend/server.js`
- [ ] Set `FRONTEND_URL` + strong `SESSION_SECRET` in Render env vars
- [ ] Set `VITE_API_URL` in Vercel project env vars
- [ ] Point `intersys-solutions.com.kh` CNAME to Vercel
- [ ] Set `NODE_ENV=production` on Render (enables secure cookies)
