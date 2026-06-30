# INTERSYS SOLUTION WEBSITE — Use Case Diagram

```
                      ┌──────────────────────────────────────────────────────────┐
                      │                 INTERSYS SOLUTION WEBSITE                │
                      │                                                          │
  ┌──────────┐        │  • Browse Homepage                                      │
  │ VISITOR  │        │  • View Services                                        │
  │ (GUEST)  │───────>│  • Browse / Search Product Catalog                      │
  │          │        │  • View Product Detail                                  │
  │          │        │  • View Project Portfolio                               │
  │          │        │  • Read Insight / Blog                                  │
  │          │        │  • Submit Contact Form ──────────────────────┐          │
  │          │        │  • Submit Quote Request ─────────────────────┤          │
  │          │        │  • Chat via Widget ──────────────────────────┤          │
  └──────────┘        │                                               │          │
                      │                                               v          │
  ┌──────────┐        │                  ┌────────────────────────────┴──┐       │
  │REGISTERED│        │                  │     Send Email & Telegram     │       │
  │  USER    │───────>│                  │           Alert               │       │
  │          │        │                  └────────────────────────────┬──┘       │
  │ • Login  │        │                                               │          │
  │   (Email)│        │  • View Profile                               │          │
  │ • Google │        │  • Download PDF Document                      │          │
  │   OAuth ─┼────    │  • Chat via Widget ───────────────────────────┤          │
  │          │   │    │                                               v          │
  └──────────┘   │    │                        ┌──────────────────────┐          │
                 │    │                        │   Real-Time Chat     │          │
  ┌──────────┐   └───>│                        │   (Socket.IO)        │          │
  │  ADMIN   │        │                        └──────────────────────┘          │
  │          │───────>│                                                          │
  │ • Login  │        │  ┌───────────── Access Admin Dashboard ────────────┐     │
  │   (Email)│        │  │                 <<requires Auth>>               │     │
  │ • Manage │        │  └──────┬──────────────┬──────────────┬────────────┘     │
  │   Products│       │         v              v              v                  │
  │ • Manage │        │  ┌────────────┐ ┌────────────┐ ┌────────────┐            │
  │   Posters│        │  │  Manage    │ │  Manage    │ │  Manage    │            │
  │ • Manage │        │  │ Products & │ │  Posters   │ │  Insight / │            │
  │   Insights│       │  │  Category  │ │            │ │   Blogs    │            │
  │ • Chat w/│        │  └────────────┘ └────────────┘ └────────────┘            │
  │   Client │        │  ┌────────────┐ ┌────────────┐ ┌────────────┐            │
  │ • View   │        │  │  Receive   │ │  Chat with │ │   Send     │            │
  │   Analytics│      │  │ Contact &  │ │   Client   │ │ Newsletter │            │
  │ • Send   │        │  │   Quote    │ │ (Real-time)│ │   Email    │            │
  │   Newsletter│     │  └────────────┘ └────────────┘ └────────────┘            │
  └──────────┘        │                                                          │
                      └──────────────────────────────────────────────────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              v                         v                         v
      ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
      │Google OAuth  │         │  Gmail SMTP   │         │ Telegram Bot │
      │    2.0       │         │              │         │              │
      └──────────────┘         └──────────────┘         └──────────────┘
```

## Actor Overview

| Actor | Description |
|-------|-------------|
| **Visitor (Guest)** | Unauthenticated user browsing public content |
| **Registered User** | Authenticated user with profile access and downloads |
| **Admin** | Privileged user managing content, products, and users |

## Key Flows

- **Google OAuth 2.0** → handles social login (Continue with Google)
- **Gmail SMTP** → sends contact/quote notifications and newsletter emails
- **Telegram Bot** → sends admin alerts alongside email notifications
- **Chat Widget (Socket.IO)** → real-time messaging between clients and admins
