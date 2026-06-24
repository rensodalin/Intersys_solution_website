# Intersys Solution Website — System Architecture

## 1. Logical Architecture (Conceptual Layers & Data Flow)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER (Client)                      │
│           React 19 + TypeScript + TanStack Router (56 File-Based Routes)│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    React SPA (TanStack Router)                    │   │
│  │                                                                   │   │
│  │  ┌──────────────────┐ ┌─────────────┐ ┌──────────────────────┐  │   │
│  │  │ CLIENT PORTAL    │ │ADMIN PANEL  │ │ SELF-SERVICE HUB     │  │   │
│  │  │                  │ │(10-Tab)     │ │ (4-Tab My-Account)   │  │   │
│  │  │ Homepage         │ │             │ │                      │  │   │
│  │  │ (14 sections)    │ │ Dashboard   │ │ Dashboard Overview   │  │   │
│  │  │ 12 Service Pages │ │ Analytics   │ │ Quote History        │  │   │
│  │  │ Dynamic E-Catalog│ │ Quotes CRUD │ │ PDF Downloads Vault  │  │   │
│  │  │ Quote Cart       │ │ Products    │ │ Profile & Avatar     │  │   │
│  │  │ Insights Blog    │ │ Posters     │ │                      │  │   │
│  │  │ Portfolio        │ │ Insights    │ │                      │  │   │
│  │  │ Sectors          │ │ Tech Tips   │ │                      │  │   │
│  │  │ Technical Tips   │ │ CRM Chat    │ │                      │  │   │
│  │  │ Document Center  │ │ Contacts    │ │                      │  │   │
│  │  │ Certificates     │ │ Settings    │ │                      │  │   │
│  │  └──────────────────┘ └─────────────┘ └──────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    COMPONENT LIBRARY (20 Directories)            │   │
│  │                                                                   │   │
│  │  Admin/          AboutUs/       Auth/         Certificates/      │   │
│  │  Chat/           Common/        Contact/      DocumentCenter/     │   │
│  │  Homepage/       Insights/      Layout/       MyAccount/          │   │
│  │  Product/        Project/       Quote/        Support/            │   │
│  │  TechnicalTips/  Warranty/      shared/       ui/ (shadcn/Radix)  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     STATE & CONTEXT LAYER                        │   │
│  │                                                                   │   │
│  │  ┌──────────────────────┐  ┌────────────────────────────────┐    │   │
│  │  │ Redux Toolkit Store  │  │ React Context                  │    │   │
│  │  │  - auth slice        │  │  - InquiryContext (quote cart) │    │   │
│  │  │  (user, auth state)  │  │  - AuthInitializer            │    │   │
│  │  └──────────────────────┘  └────────────────────────────────┘    │   │
│  │                                                                   │   │
│  │  ┌──────────────────────────────────────────────────────────────┐ │   │
│  │  │                    HOOKS & UTILITIES                         │ │   │
│  │  │  useTaxonomy (cached API fetch + recursive tree traversal)   │ │   │
│  │  │  use-mobile (responsive breakpoint detection)                │ │   │
│  │  │  cn() utility (tailwind-merge + clsx class composer)         │ │   │
│  │  │  productApi.ts / taxonomyApi.ts / productSearch.ts           │ │   │
│  │  │  shared/navigationData.ts (global nav structure)             │ │   │
│  │  └──────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │ Secure HTTPS (JSON + credentials)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER (Backend)                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │              Express.js 5 Server (Port 5000 / $PORT)             │   │
│  │                                                                   │   │
│  │  Middleware Stack (in order):                                     │   │
│  │  ├── trust proxy (Reverse proxy / cloud host support)            │   │
│  │  ├── CORS (env-aware whitelist: localhost + FRONTEND_URL)        │   │
│  │  ├── Request Logger (method + path + timestamp)                  │   │
│  │  ├── express.json()                                              │   │
│  │  ├── Static: /uploads → avatars/ + chat/                        │   │
│  │  ├── Session (MongoStore → MongoDB Atlas, TTL 24h)               │   │
│  │  ├── Passport.initialize() + Passport.session()                  │   │
│  │  └── isAuthenticated / isAdmin route guards                      │   │
│  │                                                                   │   │
│  │  Route Mounts:                                                    │   │
│  │  ├── /auth              → auth/auth.js (register, login,         │   │
│  │  │                         Google OAuth, profile, avatar,        │   │
│  │  │                         recordDownload, getUser)              │   │
│  │  ├── /api/products      → routes/product.js   (6 endpoints)     │   │
│  │  ├── /api/taxonomy      → routes/taxonomy.js  (7 endpoints)     │   │
│  │  ├── /api/quotes        → routes/quote.js     (7 endpoints)     │   │
│  │  ├── /api/chat          → routes/chat.js      (13 endpoints)    │   │
│  │  ├── /api/insights      → routes/insights.js  (5 endpoints)     │   │
│  │  ├── /api/projects      → routes/project.js   (2 endpoints)     │   │
│  │  ├── /api/posters       → routes/posters.js   (6 endpoints)     │   │
│  │  ├── /api/visitors      → routes/visitor.js   (3 endpoints)     │   │
│  │  ├── /api/activity      → routes/activity.js  (2 endpoints)     │   │
│  │  ├── /api/technical-tips→ routes/technicalTips.js (4 endpoints) │   │
│  │  ├── POST /api/contact  → contactController.submitContact        │   │
│  │  ├── GET  /api/contacts → contactController.getContacts (admin)  │   │
│  │  ├── DELETE /api/contacts/:id → contactController.deleteContact  │   │
│  │  └── POST /api/migrate-avatars → inline admin handler            │   │
│  │                                                                   │   │
│  │  Production Mode: serves frontend/dist as static SPA fallback    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER (Controllers)                  │
│                                                                         │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ auth       │ │ product    │ │ taxonomy   │ │ insight    │          │
│  │ Controller │ │ Controller │ │ Controller │ │ Controller │          │
│  │            │ │            │ │ navigate() │ │            │          │
│  │ register   │ │ getAll     │ │ parsePath()│ │ getAll     │          │
│  │ login      │ │ getById    │ │ migrate()  │ │ getBySlug  │          │
│  │ googleAuth │ │ create     │ │ ensureSeed │ │ create     │          │
│  │ logout     │ │ update     │ │ CRUD       │ │ update     │          │
│  │ getUser    │ │ remove     │ │            │ │ remove     │          │
│  │ updateUser │ │ getPopular │ │            │ │            │          │
│  │ uploadAvatar│ │           │ │            │ │            │          │
│  │ recordDl   │ │            │ │            │ │            │          │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ quote      │ │ contact    │ │ visitor    │ │ chat       │          │
│  │ Controller │ │ Controller │ │ Controller │ │ Controller │          │
│  │            │ │            │ │            │ │            │          │
│  │ create     │ │ submit     │ │ track      │ │ getConvos  │          │
│  │ (+email    │ │ (+email    │ │ getHourly  │ │ getDetail  │          │
│  │ +Telegram) │ │ +Telegram) │ │ getTrend   │ │ reply      │          │
│  │ getUserQts │ │ getContacts│ │            │ │ uploadFile │          │
│  │ adminStats │ │ delete     │ │            │ │ clientMsg  │          │
│  │ adminAnaly │ │            │ │            │ │ checkConvo │          │
│  │ getAllAdmin │ │            │ │            │ │ getPubMsgs │          │
│  │ updateStat │ │            │ │            │ │ markRead   │          │
│  │ remove     │ │            │ │            │ │ migrate    │          │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ poster     │ │ technical  │ │ activity   │ │ project    │          │
│  │ Controller │ │ TipCtrl    │ │ Controller │ │ Controller │          │
│  │            │ │            │ │            │ │            │          │
│  │ getAll     │ │ getAll     │ │ getFeed    │ │ getAll     │          │
│  │ saveImage  │ │ create     │ │ getNotifs  │ │ create     │          │
│  │ create     │ │ update     │ │            │ │            │          │
│  │ (+newslttr)│ │ remove     │ │            │ │            │          │
│  │ update     │ │            │ │            │ │            │          │
│  │ refreshImg │ │            │ │            │ │            │          │
│  │ remove     │ │            │ │            │ │            │          │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
│                                                                         │
│  Cross-Cutting Services:                                                │
│  ├── utils/telegram.js      → HTTPS sendMessage (quotes & contacts)    │
│  ├── config/email.js        → Nodemailer SMTP transporter (port 465)   │
│  ├── middleware/auth.js     → isAuthenticated, isAdmin guards           │
│  └── passportsetup/         → Google OAuth 2.0 strategy + serializers  │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER (Mongoose Models)                │
│                                                                         │
│  ── Main Collection Models (11) ──────────────────────────────────────  │
│  ┌──────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ ┌───────┐        │
│  │User  │ │Product │ │Taxonomy│ │Insight │ │Quote │ │Contact│        │
│  └──────┘ └────────┘ └────────┘ └────────┘ └──────┘ └───────┘        │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐            │
│  │Message │ │Visitor │ │Poster  │ │Project │ │TechTip   │            │
│  └────────┘ └────────┘ └────────┘ └────────┘ └──────────┘            │
│                                                                         │
│  ── Sub-Schema / Helper Models (4 standalone files) ─────────────────  │
│  ┌────────────┐ ┌──────────────┐ ┌───────────────┐ ┌──────────────┐  │
│  │  Category  │ │DownloadedPdf │ │ ProductOption │ │ProductDoc    │  │
│  │(flat node) │ │(user vault)  │ │(part+price)   │ │(name+url)    │  │
│  └────────────┘ └──────────────┘ └───────────────┘ └──────────────┘  │
│  ┌────────────┐                                                         │
│  │  QuoteItem │  (line-item row with FK refs to Quote + Product)        │
│  └────────────┘                                                         │
│                                                                         │
│  Note: ProductOption, ProductDocument, and QuoteItem are also           │
│  represented as embedded sub-documents inside Product and Quote         │
│  main schemas for atomic read performance.                              │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES LAYER                            │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐             │
│  │ MongoDB Atlas│  │ Gmail SMTP   │  │ Telegram Bot API │             │
│  │ Cloud Cluster│  │ Nodemailer   │  │ HTTPS sendMessage│             │
│  │ 11 Collections│  │ Port 465 TLS │  │ Quote & Contact  │             │
│  │ + Sessions   │  │ HTML Emails  │  │ Push Alerts      │             │
│  │ (connect-    │  │ + Newsletter │  │                  │             │
│  │  mongo)      │  │   Broadcast  │  │                  │             │
│  └──────────────┘  └──────────────┘  └──────────────────┘             │
│  ┌──────────────────────┐                                              │
│  │ Google OAuth 2.0 API │                                              │
│  │ Passport Strategy    │                                              │
│  │ SSO + Profile Sync   │                                              │
│  └──────────────────────┘                                              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Examples

```
A) PRODUCT BROWSING (Taxonomy-Driven):
   User → TanStack Router → products.$slug.$.tsx (splat wildcard)
   → useTaxonomy hook → taxonomyApi.getAll()
   → Express GET /api/taxonomy → taxonomyController.getAll()
   → Taxonomy.find() → MongoDB Atlas → JSON Response
   → navigate(parentArray, pathParts) traverses recursive tree → Render

B) QUOTE SUBMISSION (Full Pipeline):
   User → QuoteForm (InquiryContext cart) → POST /api/quotes
   → quoteController.create()
   → Quote.save() → MongoDB Atlas
   → sendTelegramNotification() → Telegram Bot API (push alert)
   → Nodemailer SMTP → branded HTML email to admin (Gmail port 465)
   → 201 Response to client

C) CHAT (Admin ↔ Client Bidirectional):
   Client → POST /api/chat/client-message → chatController.clientMessage()
   → Message.save() (source: "chat") → MongoDB
   Admin → GET /api/chat/conversations → grouped by email
   Admin → POST /api/chat/reply → Message.save() (isFromAdmin: true)
   → Nodemailer SMTP → client email notification
   Admin → POST /api/chat/upload → Multer (uploads/chat/ 10MB limit)
   → attachment { url, name, size, type } stored on Message

D) AUTH FLOW (Dual-Mode):
   [Local] User → POST /auth/login → authController.login()
   → User.comparePassword() (bcrypt) → Passport serialize
   → Session (MongoStore) → Redux auth slice updated
   [OAuth]  User → GET /auth/google → Passport Google Strategy
   → Google OAuth 2.0 → callback → HTML meta-redirect page
   → SPA loads → GET /auth/user → Redux auth slice updated

E) NEWSLETTER BROADCAST (Fire-and-Forget):
   Admin → POST /api/posters → posterController.create()
   → Poster.save() → MongoDB → 201 Response to admin immediately
   → Promise.allSettled(users.filter(newsletter:true).map(sendEmail))
   → Branded HTML email sent to all subscribers via Gmail SMTP

F) VISITOR TELEMETRY:
   SPA mount → POST /api/visitors/track → visitorController.track()
   → VisitorVisit.updateOne(upsert) (compound unique: sessionId+visitDate)
   Admin → GET /api/visitors/hourly → aggregation pipeline → Recharts

G) NOTIFICATIONS BADGE:
   Admin Header → GET /api/activity/notifications
   → activityController.getNotifications()
   → Promise.all([unreadMsgCount, pendingQuoteCount, recentItems])
   → single aggregated response → red badge number rendered
```

---

## 2. Entity Relationship Diagram (ERD)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     LEGEND                                                                │
│                                                                                                           │
│  [PK] = Primary Key (_id)       [FK] = Foreign Key (ObjectId ref)      { } = Embedded Subdocument         │
│  (*)  = Required field          [IX] = Indexed field                   ──→ = Reference (1-to-many)        │
│  (U)  = Unique field                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  USER                                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│  (U)  email: String (*)                                                                                   │
│       password: String (bcrypt hashed, salt 10 — skipped for OAuth users)                                 │
│  (U)  googleId: String (sparse index)                                                                     │
│       firstName, lastName, name: String                                                                    │
│       phone: String                                                                                        │
│       gender: enum[male, female, other]                                                                    │
│       country: String                                                                                      │
│       role: enum[engineer, pm, architect, technician, director, procurement, consultant, other]            │
│       isAdmin: Boolean (default: false — verified against ADMIN_EMAIL env var)                            │
│       avatar: String (path under /uploads/avatars/)                                                       │
│       newsletter, receiveUpdates: Boolean (default: false)                                                │
│       lastLogin: Date                                                                                      │
│       downloadedPdfs: [{ title(*), url(*), downloadedAt }]      ←─── { Embedded Subdocument }            │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
         │ 1
         │ (userId FK — optional, null for guest submissions)
         ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  QUOTE                                                                                                    │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│  [FK] userId: ObjectId ──→ User._id (optional, null for guest)                                            │
│       name(*), company(*), title(*): String                                                               │
│       email(*), phone(*): String                                                                          │
│       address(*), city, country: String                                                                   │
│       contactpreference: enum[Email, Phone, Either]                                                        │
│       newsletter: String                                                                                   │
│       companyType(*): String                                                                               │
│       bmsSystem, otherBms: String                                                                          │
│       solutionCategories: [String]                                                                         │
│       sections: [String]                                                                                   │
│       products: [{ qty(*), productNo(*), description(*), application(*), price }]   ←─── { Embedded }    │
│       status: enum[Pending, In Progress, Completed] (default: Pending)                                    │
│       createdAt: Date                                                                                      │
└──────────────────┬───────────────────────────────────────────────────────────────────────────────────────┘
                   │
                   │ (sourceId FK — polymorphic, points to Quote._id or Contact._id)
                   ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  MESSAGE                                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│  [IX] email(*): String                                                                                    │
│       name(*): String                                                                                     │
│       subject: String                                                                                     │
│       content: String                                                                                     │
│       source(*): enum[contact, quote, reply, client-reply, chat]                                          │
│       isFromAdmin: Boolean (default: false)                                                               │
│       read: Boolean (default: false)                                                                      │
│       sourceId: ObjectId ──→ Quote._id or Contact._id (polymorphic)                                       │
│       attachment: { url, name, size, type }                                         ←─── { Embedded }    │
│       createdAt, updatedAt: Date                                                                           │
│  Compound Index: { email: 1, createdAt: -1 }  (optimized for thread fetching)                            │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
         │
         │ (sourceId FK — polymorphic)
         ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  CONTACT                                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       name(*): String                                                                                     │
│       email: String                                                                                       │
│       phone: String                                                                                       │
│       contactMethod: String                                                                               │
│       city, country: String                                                                               │
│       message(*): String                                                                                  │
│       status: enum[new, read, replied] (default: new)                                                     │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

                          ┌────────────────────────────────────────────────────────────────────────────────┐
                          │  PRODUCT                                                                        │
                          │  ────────────────────────────────────────────────────────────────────────────   │
                          │  [PK] _id: ObjectId                                                              │
                          │  (U)  productId(*): String (URL slug identifier)                                 │
                          │       category(*): String                                                        │
                          │       brand: String                                                               │
                          │       title(*): String                                                           │
                          │       description: String                                                        │
                          │       mainImage: String                                                          │
                          │       thumbnails: [String]                                                       │
                          │       brandSubCategory, brandSubCategoryLink: String                              │
                          │       longDescription: String (rich HTML spec text)                               │
                          │       options: [{ partCode(*), specification, price, qty }] ←─── { Embedded }   │
                          │       documents: [{ name, url }]                            ←─── { Embedded }   │
                          │       createdAt: Date                                                             │
                          └────────────────────────────────────────────────────────────────────────────────┘

                          ┌────────────────────────────────────────────────────────────────────────────────┐
                          │  TAXONOMY                                                                       │
                          │  ────────────────────────────────────────────────────────────────────────────   │
                          │  [PK] _id: ObjectId                                                              │
                          │  (U)  category(*): String (e.g. "Access Control")                               │
                          │       image: String (category thumbnail)                                         │
                          │       subCategories: [{                                                          │
                          │         name(*): String,                                                         │
                          │         title: String,                                                           │
                          │         description: String,                                                     │
                          │         image: String,                                                           │
                          │         heroImage: String,                                                       │
                          │         children: [ { Mixed } ]         ←─── { Nested Recursive Embedded }      │
                          │       }]                                                                         │
                          │       createdAt, updatedAt: Date                                                 │
                          │                                                                                  │
                          │  Note: Redesigned — brandless flat tree (Category → SubCategories).              │
                          │  Previous brand layer removed. Unlimited recursive depth via Mixed children.      │
                          │  migrateTreeFormat() auto-converts old brand-format docs on getAll.              │
                          └────────────────────────────────────────────────────────────────────────────────┘

                          ┌────────────────────────────────────────────────────────────────────────────────┐
                          │  CATEGORY  (standalone flat-node model for alternative tree impl)               │
                          │  ────────────────────────────────────────────────────────────────────────────   │
                          │  [PK] _id: ObjectId                                                              │
                          │       name(*): String                                                            │
                          │       label: String (default: "")                                                │
                          │       description: String (default: "")                                          │
                          │       image: String (default: "")                                                │
                          │       heroImage: String (default: "")                                            │
                          │  [FK] parent: ObjectId ──→ Category._id (self-referential, default: null)        │
                          │       order: Number (default: 0)                                                 │
                          │  Compound Index: { parent: 1, name: 1 } unique                                  │
                          │       createdAt, updatedAt: Date                                                 │
                          └────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  INSIGHT                                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       title(*): String                                                                                    │
│  (U)  slug(*): String (URL identifier)                                                                    │
│       desc(*): String                                                                                     │
│       category(*): String                                                                                 │
│       date(*): String                                                                                     │
│       image(*): [String]                                                                                  │
│       author: String (default: "Intersys Team")                                                           │
│       client, location: String                                                                            │
│       scope: [String]                                                                                     │
│       section1Image, section1Title, section1Desc, section1SubTitle, section1SubDesc, section1SubImage     │
│       articleTitle1, articleContent1, articleBannerImage, pdfUrl, articleTitle2, articleContent2          │
│       galleryImages: [String]                                                                             │
│       technicalTitle: String                                                                              │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  PROJECT                                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       title(*): String                                                                                    │
│       desc(*): String                                                                                     │
│       image(*): String                                                                                    │
│       category(*): String                                                                                 │
│       client: String                                                                                      │
│       location: String                                                                                    │
│       scope: [String]                                                                                     │
│       slug: String                                                                                        │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  VISITOR_VISIT                                                                                            │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       sessionId(*): String                                                                                │
│       page: String (default: "/")                                                                         │
│       visitDate(*): String                                                                                │
│       visitedAt: Date (default: now)                                                                      │
│  Compound Unique Index: { sessionId: 1, visitDate: 1 }                                                    │
│  Index: { visitedAt: -1 }                                                                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  POSTER                                                                                                   │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       image(*): String                                                                                    │
│       link: String (default: "")                                                                          │
│       title: String (default: "")                                                                         │
│       description: String (default: "")                                                                   │
│       facebookLink, linkedinLink: String (default: "")                                                    │
│       order: Number (default: 0)                                                                          │
│       createdAt, updatedAt: Date                                                                           │
│  On Create: triggers newsletter broadcast (Promise.allSettled to all newsletter:true users)               │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  TECHNICAL_TIP                                                                                            │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       title(*): String                                                                                    │
│       pdfUrl(*): String (link to hosted PDF)                                                              │
│       category(*): String (grouping label)                                                                │
│       description: String (default: "")                                                                   │
│       order: Number (default: 0, ascending sort)                                                          │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  DOWNLOADED_PDF  (standalone model — mirrors embedded User.downloadedPdfs)                               │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│  [FK] userId(*): ObjectId ──→ User._id  [IX]                                                             │
│       title(*): String                                                                                    │
│       url(*): String                                                                                      │
│       downloadedAt: Date (default: now)                                                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Relationship Summary

| From            | To              | Type         | Via                    | Cardinality      |
|-----------------|-----------------|--------------|------------------------|------------------|
| **Quote**       | **User**        | Reference    | `userId` (FK)          | Many → 1 (opt)   |
| **Message**     | **Quote**       | Reference    | `sourceId` (FK)        | Many → 1 (poly)  |
| **Message**     | **Contact**     | Reference    | `sourceId` (FK)        | Many → 1 (poly)  |
| **DownloadedPdf**| **User**       | Reference    | `userId` (FK)          | Many → 1         |
| **QuoteItem**   | **Quote**       | Reference    | `quoteId` (FK)         | Many → 1         |
| **QuoteItem**   | **Product**     | Reference    | `product` (FK, opt)    | Many → 1 (opt)   |
| **ProductOption**| **Product**    | Reference    | `productId` (FK)       | Many → 1         |
| **ProductDoc**  | **Product**     | Reference    | `productId` (FK)       | Many → 1         |
| **Category**    | **Category**    | Self-ref     | `parent` (FK)          | Many → 1 (tree)  |
| **Product**     | —               | Embedded []  | `options[]`            | 1 → Many         |
| **Product**     | —               | Embedded []  | `documents[]`          | 1 → Many         |
| **Taxonomy**    | —               | Embedded []  | `subCategories[]`      | 1 → Many (nested)|
| **User**        | —               | Embedded []  | `downloadedPdfs[]`     | 1 → Many         |
| **Quote**       | —               | Embedded []  | `products[]`           | 1 → Many         |
| **Message**     | —               | Embedded     | `attachment`           | 1 → 1 (opt)      |

### Collections Overview

| Collection        | Model         | Type     | Records Stored                              |
|-------------------|---------------|----------|---------------------------------------------|
| `users`           | User          | Auth     | Registered users (local + Google OAuth)     |
| `products`        | Product       | Content  | Security products with variants & documents |
| `taxonomies`      | Taxonomy      | Content  | Product category tree (unlimited depth)     |
| `insights`        | Insight       | Content  | Blog/articles with rich content sections    |
| `projects`        | Project       | Content  | Portfolio projects with scope               |
| `quotes`          | Quote         | Tx       | Customer quote requests with line items     |
| `contacts`        | Contact       | Tx       | Contact form submissions                    |
| `messages`        | Message       | Tx       | Chat messages (admin ↔ client) + files      |
| `visitors`        | VisitorVisit  | Analytic | Page visit tracking (hourly analytics)      |
| `posters`         | Poster        | Content  | Homepage carousel slides                    |
| `technicaltips`   | TechnicalTip  | Content  | Technical guide PDFs                        |
| `categories`      | Category      | Content  | Flat category nodes (self-ref tree alt.)    |
| `downloadedpdfs`  | DownloadedPdf | Vault    | User PDF download history (standalone ref)  |
| `sessions`        | —             | Session  | Express sessions (connect-mongo store)      |

---

## 3. Physical Architecture (Deployment Topology)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             INTERNET / USERS                                     │
│                   (Desktop Browsers, Mobile, Tablet / iPad)                      │
└──────────────────────┬──────────────────────────────────────┬────────────────────┘
                       │  HTTPS Requests                      │  HTTPS Requests
                       ▼                                      ▼
┌──────────────────────────────────┐    ┌────────────────────────────────────┐
│   FRONTEND (Vercel CDN)          │    │  BACKEND (VPS / Cloud VM)          │
│   intersys-solutions.com.kh      │    │                                    │
│                                  │    │ ┌──────────────────────────────┐   │
│  ┌────────────────────────────┐ │    │ │ Node.js + Express 5          │   │
│  │ React 19 SPA Build         │ │    │ │ ────────────────────────────  │   │
│  │ ─────────────────────────  │ │    │ │ server.js (entry point)       │   │
│  │ - index.html               │ │    │ │ 10 Route Modules              │   │
│  │ - dist/ (bundled JS/CSS)   │ │    │ │ 12 Controllers                │   │
│  │ - public/                  │ │    │ │ 15 Model Files                │   │
│  │   - images/                │ │    │ │ Middleware Stack               │   │
│  │   - documents/ (PDFs)      │ │    │ │ Passport (auth strategies)    │   │
│  │                            │ │    │ │ Multer (avatar + chat files)  │   │
│  │ 56 TanStack Routes         │ │    │ │                               │   │
│  │ 20 Component Directories   │ │    │ │ Port: process.env.PORT || 5000│   │
│  │ TailwindCSS v4             │ │    │ └──────────────────────────────┘   │
│  │ Framer Motion              │ │    │                                    │
│  │ Recharts / WorldMap        │ │    │ ┌──────────────────────────────┐   │
│  │ jspdf (BOQ generator)      │ │    │ │ PM2 Process Manager          │   │
│  │ shadcn/Radix UI            │ │    │ │ ────────────────────────────  │   │
│  └────────────────────────────┘ │    │ │ mode: cluster                 │   │
│                                  │    │ │ instances: "max" (all cores)  │   │
│  Build Tool: Vite 7              │    │ │ ecosystem.config.cjs          │   │
│  CDN: Vercel Edge Network        │    │ │ connect-mongo shared sessions │   │
│  Fallback: SPA rewrites          │    │ └──────────────────────────────┘   │
└──────────────────────────────────┘    │                                    │
                                         │ ┌──────────────────────────────┐   │
       Secure API Calls                  │ │ Local Upload Storage (Multer) │   │
       (HTTPS JSON + credentials)        │ │ ────────────────────────────  │   │
       ◄══════════════════════════►      │ │ /uploads/avatars/ (2MB limit) │   │
                                         │ │ /uploads/chat/   (10MB limit) │   │
                                         │ │ .gitkeep ensures paths exist  │   │
                                         │ └──────────────────────────────┘   │
                                         └──────────────────┬─────────────────┘
                                                             │
                                          ┌──────────────────┼──────────────────────┐
                                          │                  │                      │
                          NoSQL Queries   ▼    SMTP TLS      ▼    HTTPS Push        ▼
                          (Mongoose ODM)       Port 465           Notifications
                    ┌─────────────────┐  ┌──────────────┐  ┌───────────────────┐
                    │ MongoDB Atlas   │  │ Gmail SMTP   │  │  Telegram Bot API │
                    │ Cloud Cluster   │  │ Nodemailer   │  │  api.telegram.org │
                    │                 │  │              │  │                   │
                    │ DB: Intersys_   │  │ HTML Emails  │  │  sendMessage()    │
                    │   website       │  │ Quote Alerts │  │  on every quote   │
                    │ 13 Collections  │  │ Admin Replies│  │  and contact      │
                    │ + sessions      │  │ Newsletter   │  │  event            │
                    │                 │  │ Blast        │  │                   │
                    │ connect-mongo   │  │              │  │                   │
                    │ session store   │  │              │  │                   │
                    └─────────────────┘  └──────────────┘  └───────────────────┘
                                                             ┌───────────────────┐
                                                             │ Google OAuth 2.0  │
                                                             │ accounts.google   │
                                                             │ .com/o/oauth2     │
                                                             │                   │
                                                             │ Client ID +       │
                                                             │ Client Secret     │
                                                             │ Passport Strategy │
                                                             │ SSO + Profile     │
                                                             └───────────────────┘
```

### Network & Infrastructure Details

| Component             | Tech Stack                                | Hosting              | Scaling                            |
|-----------------------|-------------------------------------------|----------------------|------------------------------------|
| **Frontend**          | React 19 + TanStack Router + Vite 7       | Vercel CDN           | CDN edge, static, globally cached  |
|                       | TailwindCSS v4 + shadcn/Radix UI          | (or Cloudflare Pages)| SPA fallback rewrites              |
| **Backend**           | Node.js + Express 5                       | VPS / Cloud VM       | PM2 cluster (max CPU cores)        |
| **Process Manager**   | PM2 (ecosystem.config.cjs)                | Backend server       | Cluster mode, multi-worker         |
| **Database**          | MongoDB (Mongoose 9)                      | MongoDB Atlas M0     | Auto-scaling (Atlas cloud)         |
| **Sessions**          | express-session + connect-mongo           | MongoDB Atlas        | Shared store across all PM2 workers|
| **Email**             | Nodemailer (Gmail SMTP)                   | Gmail SMTP relay     | Promise.allSettled (non-blocking)  |
| **Notifications**     | Telegram Bot API (native HTTPS)           | api.telegram.org     | Fire-and-forget per event          |
| **Auth**              | Passport.js (local + Google OAuth 2.0)    | Backend server       | Session-based + cookie (SameSite)  |
| **File Storage**      | Local filesystem (Multer disk storage)    | Backend server disk  | /uploads/avatars + /uploads/chat   |

### Environment Variables (Backend `.env`)

```
PORT=5000
URI=mongodb+srv://<user>:<pass>@cluster0.jg3vvij.mongodb.net/Intersys_website
EMAIL_USER=<gmail-address>
EMAIL_PASS=<gmail-app-password>
CLIENT_ID=<google-oauth-client-id>
CLIENT_SECRET=<google-oauth-client-secret>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
TELEGRAM_BOT_TOKEN=<telegram-bot-token>
TELEGRAM_CHAT_ID=<telegram-chat-id>
SESSION_SECRET=<session-sign-secret>
FRONTEND_URL=https://<frontend-domain>
NODE_ENV=production
```

### PM2 Cluster Configuration (`ecosystem.config.cjs`)

```js
{
  name: "intersys-backend",
  script: "server.js",
  instances: "max",
  exec_mode: "cluster"
}
// npm run start:cluster  → Starts PM2 cluster (all cores)
// npm run stop           → Stops all PM2 instances
// npm run logs           → Streams live log output
```

### Component Dependency Graph

```
Client Browser
    │
    ├── index.html (Vite SPA entry)
    │       │
    │       └── main.tsx
    │               ├── Redux Provider         (auth state — store/index.ts)
    │               ├── AuthInitializer        (session restore on SPA load)
    │               ├── InquiryProvider        (quote cart — localStorage)
    │               └── RouterProvider         (TanStack Router, 56 routes)
    │                       │
    │                       ├── __root.tsx     (global layout shell)
    │                       │       ├── Layout/Navbar.tsx   (dynamic dark/light/doc theme)
    │                       │       ├── Layout/Footer.tsx
    │                       │       └── Chat/ChatWidget.tsx (persistent floating widget)
    │                       │
    │                       ├── Public Pages
    │                       │   ├── index.tsx              (Homepage, 14 sections)
    │                       │   ├── services_.*.tsx        (12 service detail pages)
    │                       │   ├── products.*/            (Dynamic E-Catalog)
    │                       │   │   ├── products.index.tsx
    │                       │   │   ├── products.$slug.index.tsx    (useTaxonomy hook)
    │                       │   │   ├── products.$slug.$subcategory.tsx
    │                       │   │   ├── products.$slug.$.tsx        (splat wildcard)
    │                       │   │   ├── products.detail.$productId.tsx
    │                       │   │   └── Static brand routes (Honeywell, SALTO, BMS)
    │                       │   ├── insights.index.tsx / insights.$slug.tsx
    │                       │   ├── sectors.tsx / sectors.$sectorId.tsx
    │                       │   ├── projects.tsx / portfolio.tsx
    │                       │   ├── technical-tips.tsx
    │                       │   ├── contact.tsx / support.tsx / warranty.tsx
    │                       │   ├── document-center.tsx / why-choose.tsx
    │                       │   ├── about/index.tsx
    │                       │   └── credentials.tsx
    │                       │
    │                       ├── my-account.tsx (4-Tab Self-Service Hub)
    │                       │   └── MyAccount/ (Dashboard, Quotes, PDFs, Profile+Avatar)
    │                       │
    │                       └── admin/index.tsx (10-Tab Control Panel — isAdmin guard)
    │                           └── Admin/
    │                               ├── dashboard/    (MetricsGrid, TrafficTrajectory,
    │                               │                  QuoteVelocity, NodeActivity, FeaturedNode)
    │                               ├── analytic/     (GlobalPresenceCard, VisitorTrajectoryChart,
    │                               │                  PopularProductsCard, ProductPopularityCard,
    │                               │                  SystemPopularity, InterfaceDynamicsCard)
    │                               ├── ChatInbox/    (thread list, detail, reply, file upload)
    │                               ├── InsightManagement/  (CRUD list, form, delete modal)
    │                               ├── PosterManagement/   (image upload + newsletter indicator)
    │                               ├── ProductManagement/  (CRUD table, form, TaxonomyManager)
    │                               ├── TechnicalTipsManagement/ (PDF CRUD with category+order)
    │                               ├── QuoteTable.tsx      (status badges + BOQ PDF export)
    │                               ├── QuoteDetailModal.tsx
    │                               ├── ContactsList.tsx    (admin contacts with delete)
    │                               ├── AdminProfile.tsx    (admin settings tab)
    │                               ├── Header.tsx          (notification badge poller)
    │                               ├── Sidebar.tsx         (10-tab navigation)
    │                               ├── MetricsCards.tsx
    │                               ├── FilterBar.tsx
    │                               ├── Pagination.tsx
    │                               ├── ConfirmModal.tsx
    │                               ├── AccessDenied.tsx
    │                               ├── LoadingState.tsx
    │                               ├── exportQuotePDF.ts   (jspdf-autotable BOQ generator)
    │                               ├── api.ts              (admin API client)
    │                               └── types.ts
    │
    └── fetch() calls ──────► Express Server (Port 5000) ──────► MongoDB Atlas
                (HTTPS REST/JSON + credentials cookies)     │
                                                             ├── Telegram Bot API (alerts)
                                                             └── Gmail SMTP (emails)
```

---

## 4. Folder Structure

```
Intersys_solution_website/
│
├── Backend/
│   ├── server.js                        Core boot: trust proxy, CORS, session,
│   │                                    Passport, route mounts, static /uploads
│   ├── ecosystem.config.cjs             PM2 cluster config (instances: "max")
│   │
│   ├── auth/auth.js                     Auth routes: register, login, Google OAuth,
│   │                                    getUser, updateUser, avatar upload, recordDownload
│   ├── conn/conn.js                     MongoDB Atlas connection handler
│   ├── config/email.js                  Nodemailer SMTP transporter (Gmail, port 465)
│   ├── middleware/auth.js               isAuthenticated + isAdmin route guards
│   ├── passportsetup/passportSetup.js   Passport Google OAuth 2.0 strategy + serializers
│   ├── utils/telegram.js               HTTPS Telegram sendMessage utility
│   │
│   ├── model/  (15 files)
│   │   ── Main Collection Models (11) ──────────────────────────────────────────────
│   │   ├── user.js                      Users + bcrypt pre-save hook
│   │   ├── product.js                   Products + options[] + documents[] sub-docs
│   │   ├── quote.js                     Quotes + productRow sub-schema + status enum
│   │   ├── taxonomy.js                  Taxonomy (Category → subCategories recursive tree)
│   │   ├── message.js                   Messages + attachment object + compound index
│   │   ├── contact.js                   Contacts (status: new, read, replied)
│   │   ├── insight.js                   Insights (multi-section article schema)
│   │   ├── visitor.js                   VisitorVisits (compound unique index)
│   │   ├── poster.js                    Posters (image + social links + order)
│   │   ├── project.js                   Projects (portfolio + scope array)
│   │   ├── technicalTip.js              TechnicalTips (title, pdfUrl, category, order)
│   │   ── Sub-Schema / Helper Models (4) ─────────────────────────────────────────
│   │   ├── category.js                  Flat category node (self-referential parent FK)
│   │   ├── downloadedPdf.js             User PDF download record (standalone ref to User)
│   │   ├── productOption.js             Product option row (FK → Product)
│   │   └── productDocument.js           Product datasheet link (FK → Product)
│   │   ── Additional Sub-Schema (1) ───────────────────────────────────────────────
│   │   └── quoteItem.js                 Quote line item (FK → Quote + optional → Product)
│   │
│   ├── routes/  (10 route files)
│   │   ├── product.js       (6 endpoints)   GET all, GET by ID, POST, PUT, DELETE, popularity
│   │   ├── quote.js         (7 endpoints)   create, userQuotes, adminStats, analytics, all, updateStatus, delete
│   │   ├── chat.js         (13 endpoints)   conversations, detail, reply, uploadFile, checkConversation,
│   │   │                                    publicMessages, clientMessage, markRead, markConversationRead,
│   │   │                                    migrate, debug, testTelegram
│   │   ├── taxonomy.js      (7 endpoints)   CRUD for categories + subcategories (brandless flat tree)
│   │   ├── insights.js      (5 endpoints)   GET all, GET by slug, POST, PUT, DELETE
│   │   ├── posters.js       (6 endpoints)   GET all, POST (+newsletter blast), PUT, DELETE,
│   │   │                                    save-image, refresh-image
│   │   ├── visitor.js       (3 endpoints)   track, hourly, trend
│   │   ├── activity.js      (2 endpoints)   activity feed, notifications badge count
│   │   ├── project.js       (2 endpoints)   GET all, POST
│   │   └── technicalTips.js (4 endpoints)   GET all, POST (admin), PUT (admin), DELETE (admin)
│   │   ── Inline in server.js (contact) ────────────────────────────────────────────
│   │       POST   /api/contact          → contactController.submitContact (+email +Telegram)
│   │       GET    /api/contacts         → contactController.getContacts (isAdmin)
│   │       DELETE /api/contacts/:id     → contactController.deleteContact (isAdmin)
│   │       POST   /api/migrate-avatars  → inline admin handler
│   │
│   ├── controllers/  (12 controllers)
│   │   ├── authController.js            register, login, googleAuth, logout, getUser,
│   │   │                                updateUser, uploadAvatar, recordDownload
│   │   ├── chatController.js            getConversations, getConversationDetail, reply,
│   │   │                                uploadFile, clientMessage, checkConversation,
│   │   │                                getPublicMessages, markRead, markConversationRead,
│   │   │                                migrate, testTelegram, debug
│   │   ├── quoteController.js           create (+email +Telegram), getUserQuotes, getAdminStats,
│   │   │                                getAdminAnalytics, getAllAdmin, updateStatus, remove
│   │   ├── contactController.js         submitContact (+email +Telegram +botWelcome),
│   │   │                                getContacts, deleteContact
│   │   ├── taxonomyController.js        CRUD + navigate() + parsePath() +
│   │   │                                migrateTreeFormat() + ensureSeeded()
│   │   ├── productController.js         getAll, getById, create, update, remove, getPopularity
│   │   ├── insightController.js         getAll, getBySlug, create, update, remove
│   │   ├── posterController.js          getAll, saveImage, create (+newsletter blast),
│   │   │                                update, refreshImage, remove
│   │   ├── visitorController.js         track, getHourly, getTrend
│   │   ├── activityController.js        getFeed, getNotifications (Promise.all aggregation)
│   │   ├── projectController.js         getAll, create
│   │   └── technicalTipController.js    getAll, create, update, remove
│   │
│   ├── scripts/                         Utility and maintenance scripts
│   ├── uploads/
│   │   ├── avatars/                     User profile pictures (2MB Multer limit)
│   │   └── chat/                        CRM file attachments (10MB Multer limit)
│   │
│   ├── seedAdmin.js                     Admin user seed
│   ├── seedInsights.js                  Blog articles seed
│   ├── seedPosters.js                   Homepage poster seed
│   ├── seedProducts.js                  Product catalog seed
│   ├── seedProjects.js                  Portfolio projects seed
│   └── seedQuotes.js                    Sample quote seed
│
└── frontend/
    └── src/
        ├── main.tsx                     App entry: Redux + InquiryProvider + RouterProvider
        ├── router.tsx                   TanStack Router config + scroll restoration
        ├── routeTree.gen.ts             Auto-generated typed TanStack Router tree
        ├── styles.css                   Vanilla CSS design tokens + global styles
        │
        ├── store/index.ts               Redux Toolkit global store + auth slice
        ├── context/InquiryContext.tsx   Dynamic quote cart context (localStorage)
        │
        ├── hooks/
        │   ├── useTaxonomy.ts           Cached API fetch + recursive tree traversal
        │   └── use-mobile.tsx           Responsive breakpoint detection hook
        │
        ├── utils/
        │   ├── productApi.ts            Product fetch utility functions
        │   ├── taxonomyApi.ts           Taxonomy CRUD API client
        │   └── productSearch.ts         Product search/filter utility
        │
        ├── enviroment/                  Environment config files
        ├── lib/                         Shared library utilities (cn() etc.)
        ├── assets/                      Static image/icon assets
        │
        ├── components/  (20 Directories)
        │   │
        │   ├── Admin/                   10-Tab Admin Control Panel
        │   │   ├── dashboard/           MetricsGrid, TrafficTrajectory, QuoteVelocity,
        │   │   │                        NodeActivity, FeaturedNode, hooks.ts, types.ts
        │   │   ├── analytic/            GlobalPresenceCard, VisitorTrajectoryChart,
        │   │   │                        PopularProductsCard, ProductPopularityCard,
        │   │   │                        SystemPopularity, InterfaceDynamicsCard,
        │   │   │                        api.ts, types.ts, utils.ts
        │   │   ├── ChatInbox/           CRM thread list, conversation detail, reply
        │   │   │                        composer, file attachment upload
        │   │   ├── InsightManagement/   Blog article CRUD list, form editor, delete modal
        │   │   ├── PosterManagement/    Carousel banner CRUD + image upload + newsletter indicator
        │   │   ├── ProductManagement/   Product CRUD table, form, TaxonomyManager tree editor
        │   │   ├── TechnicalTipsManagement/ PDF tip CRUD (category, order, description)
        │   │   ├── QuoteTable.tsx       Quote list with status badges + BOQ PDF export
        │   │   ├── QuoteDetailModal.tsx Quote detail view with status management
        │   │   ├── ContactsList.tsx     Admin contacts list with delete capability
        │   │   ├── AdminProfile.tsx     Admin settings and profile configuration tab
        │   │   ├── Header.tsx           Admin header with notification badge poller
        │   │   ├── Sidebar.tsx          10-tab navigation sidebar
        │   │   ├── MetricsCards.tsx     KPI metric card components
        │   │   ├── FilterBar.tsx        Search and filter bar component
        │   │   ├── Pagination.tsx       Table pagination component
        │   │   ├── ConfirmModal.tsx     Delete/action confirmation dialog
        │   │   ├── AccessDenied.tsx     Unauthorized access gate screen
        │   │   ├── LoadingState.tsx     Loading skeleton/spinner
        │   │   ├── DashboardOverview.tsx Dashboard layout wrapper
        │   │   ├── AnalyticsOverview.tsx Analytics tab layout wrapper
        │   │   ├── exportQuotePDF.ts    jspdf-autotable BOQ PDF generator
        │   │   ├── api.ts               Admin panel API client functions
        │   │   └── types.ts             Shared TypeScript type definitions
        │   │
        │   ├── MyAccount/               4-Tab Self-Service Dashboard
        │   ├── Chat/                    ChatWidget.tsx — floating persistent support widget
        │   │                            (autofill for auth users, bot welcome, public thread)
        │   ├── Homepage/                14 homepage section components
        │   ├── Product/                 Catalog sidebar, product detail, brand data files
        │   ├── Quote/                   Multi-step quote builder form (Zod + React Hook Form)
        │   ├── Auth/                    Login and registration modal (reCAPTCHA)
        │   ├── Insights/                Blog card grid and detail layout
        │   ├── Layout/                  Navbar (dynamic dark/light/doc theme), Footer, PageWrapper
        │   ├── Contact/                 Contact form component
        │   ├── Support/                 Support page with hero overlay
        │   ├── TechnicalTips/           Technical tips PDF library (publicly served)
        │   ├── Warranty/                Warranty information page
        │   ├── DocumentCenter/          Light-theme document library
        │   ├── AboutUs/                 Company history and team
        │   ├── Certificates/            Company certificates showcase
        │   ├── Common/                  Shared utility UI components
        │   ├── Project/                 Portfolio project cards
        │   ├── shared/                  navigationData.ts — global navigation structure
        │   └── ui/                      shadcn/Radix UI primitive components
        │
        └── routes/  (56 File-Based TanStack Routes)
            ├── __root.tsx                               Root layout shell
            ├── index.tsx                                Homepage (14 dynamic sections)
            ├── about/index.tsx                          Company about page
            ├── admin/index.tsx                          Admin 10-tab control panel (isAdmin guard)
            ├── my-account.tsx                           User 4-tab self-service hub
            ├── contact.tsx                              Contact page
            ├── support.tsx                              Support page
            ├── warranty.tsx                             Warranty information page
            ├── why-choose.tsx                           Why Choose Us page
            ├── technical-tips.tsx                       Public Technical Tips PDF library
            ├── document-center.tsx                      Document center (light theme)
            ├── credentials.tsx                          Credentials page
            ├── portfolio.tsx                            Portfolio redirect/landing
            ├── projects.tsx                             Portfolio grid page
            ├── request-quote.tsx                        Quote request page
            ├── services.tsx                             Services overview
            ├── services_.access-control.tsx             Service detail — Access Control
            ├── services_.audio-visual.tsx               Service detail — Audio Visual
            ├── services_.building-management.tsx        Service detail — Building Management
            ├── services_.car-parking.tsx                Service detail — Car Parking
            ├── services_.custom-solution.tsx            Service detail — Custom Solution
            ├── services_.fire-alarm.tsx                 Service detail — Fire Alarm
            ├── services_.intrusion-system.tsx           Service detail — Intrusion System
            ├── services_.leak-detection.tsx             Service detail — Leak Detection
            ├── services_.public-address.tsx             Service detail — Public Address
            ├── services_.room-control.tsx               Service detail — Room Control
            ├── services_.surveillance.tsx               Service detail — Surveillance
            ├── services_.vesda.tsx                      Service detail — VESDA
            ├── sectors.tsx                              Sectors layout
            ├── sectors.index.tsx                        Sectors listing page
            ├── sectors.$sectorId.tsx                    Dynamic sector detail page
            ├── insights.index.tsx                       Blog/article listing page
            ├── insights.$slug.tsx                       Dynamic blog article detail
            ├── products.tsx                             Products layout shell
            ├── products.index.tsx                       Product catalog landing
            ├── products.$slug.index.tsx                 Dynamic category page (useTaxonomy)
            ├── products.$slug.$subcategory.tsx          First-level subcategory page
            ├── products.$slug.$.tsx                     Splat wildcard — unlimited depth
            ├── products.detail.$productId.tsx           Product detail + options
            ├── products.access-control.index.tsx        Access Control catalog
            ├── products.access-control.honeywell.index.tsx  Honeywell brand catalog
            ├── products.access-control.honeywell.readers.tsx
            ├── products.access-control.honeywell.credentials.tsx
            ├── products.access-control.honeywell.control-panels.tsx
            ├── products.access-control.honeywell.control-panel-kits.tsx
            ├── products.access-control.honeywell.door-hardware.tsx
            ├── products.access-control.honeywell.lobby-kiosks.tsx
            ├── products.access-control.honeywell.software.tsx
            ├── products.access-control.honeywell.upgrades.tsx
            ├── products.access-control.honeywell.accessories.tsx
            ├── products.access-control.salto.index.tsx  SALTO brand catalog
            ├── products.access-control.salto.$productId.tsx
            ├── products.building-management.index.tsx   BMS catalog
            └── products.surveillance.index.tsx          Surveillance catalog
```
