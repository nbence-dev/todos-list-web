# TaskFlow | Modern Full-Stack Task Management

A high-performance, secure task management application built to demonstrate modern web patterns. Moving away from traditional API-heavy architectures, this project leverages **Next.js 16 Server Actions** and **Drizzle ORM** for a streamlined, server-first developer experience.

## 🚀 Tech Stack

- **Framework:** Next.js 16.2 (App Router, Turbopack)
- **Database:** PostgreSQL (via Drizzle ORM)
- **Auth:** Custom Session-based Auth (JWT + Bcryptjs)
- **Styling:** Tailwind CSS + Lucide React
- **Validation:** Zod (Schema-driven safety)

## ✨ Key Features

- **Secure Authentication:** Custom-built login/register flow with session-based cookies and server-side redirects.
- **Server Actions:** Eliminated internal API routes for better performance and reduced client-side bundle size.
- **Middleware Protection:** Global route guarding via a centralized proxy to prevent unauthorized access.
- **Relational Data:** Optimized PostgreSQL queries using Drizzle ORM for serverless efficiency.
- **Enterprise UI:** A professional, card-driven interface focusing on high whitespace and clear typography.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/todo-v2.git](https://github.com/your-username/todo-v2.git)
