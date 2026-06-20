# Intersys Solution Website — System Architecture

## 1. Logical Architecture (Conceptual Layers & Data Flow)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER (Client)                      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    React SPA (TanStack Router)                    │   │
│  │                                                                   │   │
│  │  ┌───────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │ Pages     │ │ Layout   │ │ Admin    │ │ Shared Components │   │   │
│  │  │ (56+ rts) │ │ (Navbar, │ │ (Dashbd, │ │ (UI library,      │   │   │
│  │  │           │ │  Footer) │ │  Chat,   │ │  Common widgets)  │   │   │
│  │  │ Home      │ │          │ │  CRUD)   │ │                   │   │   │
│  │  │ Products  │ │          │ │          │ │ shadcn/ui based    │   │   │
│  │  │ Services  │ │          │ │          │ │ 48+ components     │   │   │
│  │  │ Sectors   │ │          │ │          │ │                   │   │   │
│  │  │ Insights  │ │          │ │          │ │                   │   │   │
│  │  │ About     │ │          │ │          │ │                   │   │   │
│  │  └───────────┘ └──────────┘ └──────────┘ └──────────────────┘   │   │
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
│  │  │  useTaxonomy (cached API fetch)                              │ │   │
│  │  │  use-mobile (responsive breakpoints)                         │ │   │
│  │  │  cn() utility (tailwind-merge + clsx)                        │ │   │
│  │  └──────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    API CLIENT LAYER                              │   │
│  │  fetch() → http://localhost:1000/api/*  /  https://backend/*     │   │
│  │                                                                   │   │
│  │  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────┐  │   │
│  │  │ productApi   │  │ taxonomyApi   │  │ productSearch        │  │   │
│  │  └──────────────┘  └───────────────┘  └──────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │ HTTP (JSON)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER (Backend)                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                 Express.js Server (port 1000)                    │   │
│  │                                                                   │   │
│  │  Middleware Stack:                                                │   │
│  │  ├── CORS (whitelist origins)                                    │   │
│  │  ├── Request Logger                                              │   │
│  │  ├── express.json()                                              │   │
│  │  ├── Session (MongoStore)                                        │   │
│  │  ├── Passport (Google OAuth + local strategy)                    │   │
│  │  └── Static: /uploads                                            │   │
│  │                                                                   │   │
│  │  Routes:                                                          │   │
│  │  ├── /auth           → register, login, Google OAuth, profile    │   │
│  │  ├── /api/products   → CRUD + popularity                         │   │
│  │  ├── /api/taxonomy   → CRUD categories/subcategories             │   │
│  │  ├── /api/insights   → blog/articles CRUD                        │   │
│  │  ├── /api/projects   → portfolio CRUD                            │   │
│  │  ├── /api/quotes     → quote requests CRUD                       │   │
│  │  ├── /api/contact    → contact form submissions                  │   │
│  │  ├── /api/visitors   → analytics tracking                        │   │
│  │  ├── /api/chat       → messaging (admin-client)                  │   │
│  │  ├── /api/activity   → admin activity log                        │   │
│  │  ├── /api/posters    → homepage poster carousel                  │   │
│  │  └── /api/technical-tips → technical guides                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER (Controllers)                  │
│                                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ product  │ │ taxonomy │ │ insight  │ │ project  │ │  auth        │ │
│  │Controller│ │Controller│ │Controller│ │Controller│ │  Controller  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ quote    │ │ contact  │ │ visitor  │ │ chat     │ │  activity    │ │
│  │Controller│ │Controller│ │Controller│ │Controller│ │  Controller  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │
│  ┌──────────┐ ┌──────────┐                                             │
│  │ poster   │ │technical │                                             │
│  │Controller│ │TipCtrl   │                                             │
│  └──────────┘ └──────────┘                                             │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER (Mongoose Models)                │
│                                                                         │
│  ┌──────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │Product│ │Taxonomy│ │Insight │ │Project │ │Quote │ │User  │ │Contact│ │
│  └──────┘ └────────┘ └────────┘ └────────┘ └──────┘ └──────┘ └──────┘ │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌───────┐                            │
│  │Message │ │Visitor │ │Poster  │ │TechTip│                            │
│  └────────┘ └────────┘ └────────┘ └───────┘                            │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES LAYER                             │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐              │
│  │ MongoDB Atlas│  │ Gmail SMTP   │  │ Telegram Bot API │              │
│  │ (Database)   │  │ (nodemailer) │  │ (Notifications)   │              │
│  └──────────────┘  └──────────────┘  └──────────────────┘              │
│  ┌──────────────────────┐                                              │
│  │ Google OAuth 2.0 API │                                              │
│  │ (Passport Strategy)  │                                              │
│  └──────────────────────┘                                              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Examples

```
A) PRODUCT BROWSING:
   User → React Router → ProductPage → taxonomyApi/getAll()
   → Express GET /api/taxonomy → taxonomyController.getAll()
   → Taxonomy.find() → MongoDB Atlas → JSON Response → Render

B) QUOTE SUBMISSION:
   User → QuoteForm (InquiryContext) → POST /api/quotes
   → quoteController.create() → Quote.save() → MongoDB
   → sendTelegramNotification() → Telegram Bot API

C) CHAT (Admin ↔ Client):
   Client → POST /api/chat/client-message → Message.save()
   Admin polls GET /api/chat/conversations/{email}
   Admin → POST /api/chat/reply → Message.save() → Client sees reply

D) AUTH FLOW:
   User → Login → POST /auth/login → authController.login()
   → User.comparePassword() → Session → Passport serialize
   → Client receives user state → Redux auth slice updated
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
│                                                                                                           │
│  ┌──────────────────┐   ┌──────────────────┐                                                              │
│  │  Standalone       │   │  Embedded        │                                                              │
│  │  Collection       │   │  Subdocument     │                                                              │
│  └──────────────────┘   └──────────────────┘                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  USER                                                                                                     │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│  (U)  email: String (*)                                                                                   │
│       password: String (hashed via bcrypt)                                                                │
│  (U)  googleId: String (sparse)                                                                           │
│       firstName, lastName, name: String                                                                    │
│       phone: String                                                                                        │
│       gender: enum[male,female,other]                                                                      │
│       country: String                                                                                      │
│       role: enum[engineer,pm,architect,technician,director,procurement,consultant,other]                   │
│       isAdmin: Boolean (default: false)                                                                    │
│       avatar: String                                                                                       │
│       newsletter, receiveUpdates: Boolean                                                                  │
│       lastLogin: Date                                                                                      │
│       downloadedPdfs: [{ title(*), url(*), downloadedAt }]  ←─── { Embedded Subdocument }               │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
         │ 1
         │
         │ (userId FK — optional)
         ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  QUOTE                                                                                                    │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│  [FK] userId: ObjectId ──→ User._id (optional, null for guest)                                            │
│       name(*), company(*), title(*): String                                                               │
│       email(*), phone(*): String                                                                          │
│       address(*), city, country: String                                                                   │
│       contactpreference: enum[Email,Phone,Either]                                                          │
│       newsletter: String                                                                                   │
│       companyType(*): String                                                                               │
│       bmsSystem, otherBms: String                                                                          │
│       solutionCategories: [String]                                                                         │
│       products: [{ qty(*), productNo(*), description(*), application(*), price }]  ←─── { Embedded }    │
│       status: enum[Pending,In Progress,Completed] (default: Pending)                                       │
│       createdAt: Date                                                                                      │
└──────────────┬───────────────────────────────────────────────────────────────────────────────────────────┘
               │
               │ (sourceId FK — polymorphic, points to either Quote._id or Contact._id)
               ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  MESSAGE                                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│  [IX] email(*): String                                                                                    │
│       name(*): String                                                                                     │
│       subject: String                                                                                     │
│       content: String                                                                                     │
│       source(*): enum[contact,quote,reply,client-reply,chat]                                              │
│       isFromAdmin: Boolean (default: false)                                                               │
│       read: Boolean (default: false)                                                                      │
│       sourceId: ObjectId ──→ Quote._id or Contact._id (polymorphic)                                      │
│       attachment: { url, name, size, type }                                          ←─── { Embedded }    │
│       createdAt, updatedAt: Date                                                                           │
│  Index: { email: 1, createdAt: -1 }                                                                       │
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
│       status: enum[new,read,replied] (default: new)                                                       │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

                          ┌────────────────────────────────────────────────────────────────────────────────┐
                          │  PRODUCT                                                                        │
                          │  ────────────────────────────────────────────────────────────────────────────   │
                          │  [PK] _id: ObjectId                                                              │
                          │  (U)  productId(*): String                                                       │
                          │       category(*): String                                                        │
                          │       brand: String                                                               │
                          │       title(*): String                                                           │
                          │       description: String                                                        │
                          │       mainImage: String                                                          │
                          │       thumbnails: [String]                                                       │
                          │       brandSubCategory, brandSubCategoryLink: String                              │
                          │       longDescription: String                                                    │
                          │       options: [{ partCode(*), specification, price, qty }]  ←─── { Embedded } │
                          │       documents: [{ name, url }]                             ←─── { Embedded } │
                          │       createdAt: Date                                                             │
                          └────────────────────────────────────────────────────────────────────────────────┘

                          ┌────────────────────────────────────────────────────────────────────────────────┐
                          │  TAXONOMY                                                                       │
                          │  ────────────────────────────────────────────────────────────────────────────   │
                          │  [PK] _id: ObjectId                                                              │
                          │  (U)  category(*): String                                                        │
                          │       image: String                                                              │
                          │       subCategories: [{                                                          │
                          │         name(*), title, description, image, heroImage,                           │
                          │         children: [ { Mixed } ]                ←─── { Nested Embedded }         │
                          │       }]                                                                         │
                          │       createdAt, updatedAt: Date                                                 │
                          └────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  INSIGHT                                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       title(*): String                                                                                    │
│  (U)  slug(*): String                                                                                     │
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
│  Index: { sessionId: 1, visitDate: 1 } (unique)                                                           │
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
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  TECHNICAL_TIP                                                                                            │
│  ─────────────────────────────────────────────────────────────────────────────────────                    │
│  [PK] _id: ObjectId                                                                                       │
│       title(*): String                                                                                    │
│       pdfUrl(*): String                                                                                   │
│       category(*): String                                                                                 │
│       description: String (default: "")                                                                   │
│       order: Number (default: 0)                                                                          │
│       createdAt, updatedAt: Date                                                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Relationship Summary

| From        | To             | Type        | Via              | Cardinality     |
|-------------|----------------|-------------|------------------|-----------------|
| **Quote**   | **User**       | Reference   | `userId` (FK)    | Many → 1 (opt)  |
| **Message** | **Quote**      | Reference   | `sourceId` (FK)  | Many → 1 (poly) |
| **Message** | **Contact**    | Reference   | `sourceId` (FK)  | Many → 1 (poly) |
| **Product** | —              | Embedded [] | `options[]`      | 1 → Many        |
| **Product** | —              | Embedded [] | `documents[]`    | 1 → Many        |
| **Taxonomy**| —              | Embedded [] | `subCategories[]`| 1 → Many (nested)|
| **User**    | —              | Embedded [] | `downloadedPdfs[]`| 1 → Many        |
| **Quote**   | —              | Embedded [] | `products[]`     | 1 → Many        |
| **Message** | —              | Embedded    | `attachment`     | 1 → 1 (opt)     |

### Collections Overview

| Collection       | Model         | Type     | Records Stored                           |
|------------------|---------------|----------|------------------------------------------|
| `products`       | Product       | Content  | Security products with variants          |
| `taxonomies`     | Taxonomy      | Content  | Product category tree (3-level deep)     |
| `insights`       | Insight       | Content  | Blog/articles with rich content sections |
| `projects`       | Project       | Content  | Portfolio projects with scope            |
| `quotes`         | Quote         | Tx       | Customer quote requests with line items  |
| `users`          | User          | Auth     | Registered users (local + Google OAuth)  |
| `contacts`       | Contact       | Tx       | Contact form submissions                 |
| `messages`       | Message       | Tx       | Chat messages (admin ↔ client)           |
| `visitors`       | VisitorVisit  | Analytic | Page visit tracking (hourly analytics)   |
| `posters`        | Poster        | Content  | Homepage carousel slides                 |
| `technicaltips`  | TechnicalTip  | Content  | Technical guide PDFs                     |
| `sessions`       | —             | Session  | Express sessions (connect-mongo)         |

---

## 3. Physical Architecture (Deployment Topology)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             INTERNET / USERS                                     │
│                        (Desktop & Mobile Browsers)                               │
└──────────────────────┬──────────────────────────────────────┬────────────────────┘
                       │                                      │
                       ▼                                      ▼
┌──────────────────────────────────┐    ┌────────────────────────────────┐
│   FRONTEND ( Vercel)             │    │  BACKEND (Render)              │
│                                  │    │                                │
│  ┌────────────────────────────┐ │    │ ┌────────────────────────────┐ │
│  │ Static SPA (React)         │ │    │ │ Node.js (Express)          │ │
│  │ ─────────────────────────  │ │    │ │ ─────────────────────────  │ │
│  │ - index.html               │ │    │ │ - server.js (entry)        │ │
│  │ - dist/ (bundled JS/CSS)   │ │    │ │ - Routes (10 modules)      │ │
│  │ - public/ (static assets)  │ │    │ │ - Controllers (12)         │ │
│  │ - images/                  │ │    │ │ - Models (11)              │ │
│  │ - documents/ (PDFs)        │ │    │ │ - Middleware stack          │ │
│  │                            │ │    │ │ - Passport (auth)          │ │
│  │ Domain: intersys-solution  │ │    │ │                            │ │
│  │ ..com.kh                   │ │    │ │                            │ │
│  └────────────────────────────┘ │    │ │ Process: PM2 (cluster)     │ │
│                                  │    │ └────────────────────────────┘ │
│  Env: Cloudflare Pages           │    │                                │
│  or Vercel (SPA fallback)        │    │ ┌────────────────────────────┐ │
│                                  │    │ │ Upload Storage (Local)     │ │
│                                  │    │ │ ─────────────────────────  │ │
└──────────────────────────────────┘    │ │ /uploads/avatars/          │ │
                                         │ │ /uploads/chat/             │ │
         HTTP REST (JSON)                │ └────────────────────────────┘ │
         ◄══════════════════════════════►│                                │
                                         └──────────────┬─────────────────┘
                                                         │
                                                         ▼
                               ┌──────────────────────────────────────────────┐
                               │              EXTERNAL SERVICES                │
                               │                                               │
                               │  ┌─────────────────┐  ┌──────────────────┐   │
                               │  │  MongoDB Atlas   │  │  Gmail SMTP       │   │
                               │  │  (Cloud DB)      │  │  nodemailer       │   │
                               │  │                  │  │                   │   │
                               │  │  Database:        │  │  EMAIL_USER /     │   │
                               │  │  Intersys_website │  │  EMAIL_PASS       │   │
                               │  │  IP: cluster0     │  │                   │   │
                               │  │  .jg3vvij         │  │  Service: gmail   │   │
                               │  │  .mongodb.net     │  │                   │   │
                               │  └─────────────────┘  └──────────────────┘   │
                               │                                               │
                               │  ┌─────────────────┐  ┌──────────────────┐   │
                               │  │ Telegram Bot API │  │ Google OAuth 2.0 │   │
                               │  │                  │  │                  │   │
                               │  │ Bot Token +      │  │ Client ID +      │   │
                               │  │ Chat ID          │  │ Client Secret    │   │
                               │  │ (Notifications)   │  │ (Login)          │   │
                               │  └─────────────────┘  └──────────────────┘   │
                               └──────────────────────────────────────────────┘
```

### Network & Infrastructure Details

| Component               | Tech Stack                            | Hosting            | Scaling                           |
|------------------------|---------------------------------------|--------------------|-----------------------------------|
| **Frontend**           | React 19 + TanStack Router + Vite     | Cloudflare Pages   | CDN, static, globally distributed |
|                        | Tailwind CSS v4 + shadcn/ui           | / Vercel           |                                   |
| **Backend**            | Node.js + Express 5                   | VPS / Cloud VM     | PM2 cluster (max CPU cores)       |
| **Database**           | MongoDB (Mongoose 9)                  | MongoDB Atlas M0   | Auto-scaling (Atlas)              |
| **Sessions**           | express-session + connect-mongo       | MongoDB Atlas      | Shared session store              |
| **Email**              | nodemailer (Gmail SMTP)               | Gmail SMTP relay   | N/A                               |
| **Notifications**      | Telegram Bot API (HTTPS)              | api.telegram.org   | N/A                               |
| **Auth**               | Passport.js (local + Google OAuth)    | Backend server     | Session-based                     |
| **File Storage**       | Local filesystem (Multer)             | Backend server     | Server disk                       |
| **Process Manager**    | PM2 (ecosystem.config.cjs)            | Backend server     | Cluster mode                      |

### Environment Variables (Backend `.env`)

```
PORT=1000
URI=mongodb+srv://<user>:<pass>@cluster0.jg3vvij.mongodb.net/Intersys_website
EMAIL_USER=<gmail-address>
EMAIL_PASS=<gmail-app-password>
CLIENT_ID=<google-oauth-client-id>
CLIENT_SECRET=<google-oauth-client-secret>
ADMIN_EMAIL=admin@intersys.com
ADMIN_PASSWORD=<admin-password>
TELEGRAM_BOT_TOKEN=<telegram-bot-token>
TELEGRAM_CHAT_ID=<telegram-chat-id>
SESSION_SECRET=<session-sign-secret>
FRONTEND_URL=https://<frontend-domain>
```

### Component Dependency Graph

```
Client Browser
    │
    ├── index.html (Vite SPA entry)
    │       │
    │       └── main.tsx
    │               ├── Redux Provider (auth state)
    │               ├── AuthInitializer (session restore)
    │               ├── InquiryProvider (quote cart - localStorage)
    │               └── RouterProvider (TanStack Router, 56+ routes)
    │                       │
    │                       ├── Layout (Navbar + Footer)
    │                       ├── Pages (Home, Products, Services, etc.)
    │                       │       └── Components (reusable widgets)
    │                       │               └── UI (shadcn primitives)
    │                       │
    │                       └── Admin Pages (protected)
    │                               ├── Dashboard (Visitor analytics)
    │                               ├── Product CRUD
    │                               ├── Taxonomy CRUD
    │                               ├── Insight CRUD
    │                               ├── Chat Inbox
    │                               ├── Quote Management
    │                               └── Poster Management
    │
    └── fetch() calls ──────► Express Server ──────► MongoDB Atlas
                (REST JSON)         │
                                    ├── Telegram Bot API (quote/contact alerts)
                                    └── Gmail SMTP (email notifications)
```
