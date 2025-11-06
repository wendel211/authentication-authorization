<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  
  # Authentication & Authorization with JWT
  
  [![License](https://img.shields.io/github/license/wendel211/authentication-authorization-JWT)](./LICENSE)
  [![GitHub stars](https://img.shields.io/github/stars/wendel211/authentication-authorization-JWT?style=social)](https://github.com/wendel211/authentication-authorization-JWT/stargazers)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-14+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![NestJS](https://img.shields.io/badge/NestJS-11+-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
  
  **A complete NestJS authentication system with JWT tokens, refresh tokens, role-based access control, and Swagger documentation.**
  
  [Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Docker](#-docker) • [Testing](#-testing)
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Docker Setup](#-docker)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Common Issues](#-common-issues)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 About

This is a production-ready NestJS application demonstrating best practices for implementing authentication and authorization using **JWT (JSON Web Tokens)**. The project includes user registration, login, token refresh, logout, and protected routes with role-based access control.

Built with modern TypeScript, this starter template is perfect for learning or kickstarting your next secure API project.

## ✨ Features

- ✅ **JWT Authentication** - Access tokens and refresh tokens
- ✅ **Password Hashing** - Secure password storage with Argon2
- ✅ **User Registration & Login** - Complete auth flow
- ✅ **Token Refresh** - Automatic token renewal without re-login
- ✅ **Logout** - Invalidate refresh tokens on logout
- ✅ **Protected Routes** - Guard decorators for route protection
- ✅ **Role-Based Access Control** - Custom decorators for authorization
- ✅ **Swagger Documentation** - Interactive API docs at `/docs`
- ✅ **TypeORM Integration** - PostgreSQL database with migrations
- ✅ **Cookie Support** - Cookie parsing middleware
- ✅ **Environment Configuration** - `.env` file support
- ✅ **Docker Ready** - Docker Compose for PostgreSQL and pgAdmin
- ✅ **Input Validation** - DTOs with class-validator
- ✅ **Error Handling** - Structured error responses
- ✅ **ESLint & Prettier** - Code formatting and linting

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 11.x | Progressive Node.js framework |
| **TypeScript** | 5.7+ | Type-safe JavaScript |
| **TypeORM** | 0.3.x | ORM for database operations |
| **PostgreSQL** | 15 | Relational database |
| **Passport JWT** | 4.0+ | JWT authentication strategy |
| **Argon2** | 0.44+ | Password hashing |
| **Swagger** | 11.x | API documentation |
| **Docker** | - | Containerization |
| **Jest** | 29.x | Testing framework |

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **PostgreSQL** (v12+) - Or use Docker (recommended)
- **Docker & Docker Compose** (optional, for database) - [Download](https://www.docker.com/)
- **Git** - Version control

## Quick Start

Requirements
- Node.js (14+ recommended)
- npm or yarn
- Docker & docker-compose (optional, for running PostgreSQL)

Install dependencies

PowerShell
```powershell
npm install
# or: yarn install
```

Run in development mode

PowerShell
```powershell
npm run start:dev
# Or start normally: npm run start
```

The application will default to port 3000 (see `src/main.ts`).

## Environment

Copy `.env.example` (if present) to `.env` and set values. Typical variables:
- DATABASE_URL or DB_HOST/DB_PORT/DB_USER/DB_PASS/DB_NAME
- JWT_SECRET
- PORT

If you plan to use the included `docker-compose.yml` to run PostgreSQL locally:

PowerShell
```powershell
docker compose up -d
# Wait a few seconds for Postgres to initialize
```

## Available scripts

- `npm run start` — run production server
- `npm run start:dev` — run with hot-reload (Nest CLI)
- `npm run start:prod` — run compiled code
- `npm run test` — run unit tests
- `npm run test:e2e` — run end-to-end tests
- `npm run test:cov` — run coverage

See `package.json` for full script list.

## Project Structure (high-level)

- `src/main.ts` — application bootstrap
- `src/app.module.ts` — root module
- `src/auth` — authentication module, strategies, controllers
- `src/users` — users module, controller, service, entity
- `src/common` — shared guards, decorators, etc.

## How Authentication Works (overview)

1. User registers via `/users` (or an auth route) and gets stored in the DB.
2. User logs in with credentials; the server validates and signs a JWT with `JWT_SECRET`.
3. The client stores the token (HTTP-only cookie or Authorization header) and sends it with subsequent requests.
4. Protected routes use a Guard that verifies the JWT and attaches user information to the request.

## Example: Login and protect a route

- POST /auth/login
  - Request: JSON with `email` and `password`.
  - Response: JWT in body or set as cookie depending on implementation.

- GET /users/me (protected)
  - Requires Authorization header: `Bearer <token>` or cookie with token.

Use Postman or curl for quick tests. Example using curl with Authorization header:

```powershell
curl -H "Authorization: Bearer <your_jwt>" http://localhost:3000/users/me
```

## Notes and Common Issues

- "cookie-parser" usage: make sure `cookie-parser` is used as middleware correctly in `main.ts`:
  - `import * as cookieParser from 'cookie-parser';` then `app.use(cookieParser());`
  - or `import cookieParser from 'cookie-parser';` and `app.use(cookieParser());` depending on your TS config.
- If you see TypeScript error "The expression cannot be called. Type 'typeof cookieParser' has no call signatures." it usually means the import style conflicts with `esModuleInterop`/`allowSyntheticDefaultImports`. Use the `import * as cookieParser from 'cookie-parser'` syntax and call `cookieParser()`.

## Testing

Run unit and e2e tests with:

PowerShell
```powershell
npm run test
npm run test:e2e
```

## Docker

This repo contains a `docker-compose.yml` that starts a PostgreSQL instance used by the application. To run DB locally with Docker:

PowerShell
```powershell
docker compose up -d
```

Then set DB environment variables in `.env` to match the docker-compose settings.

## Contributing

Contributions are welcome. Please open issues or PRs. Keep changes small and focused.

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

If you'd like, I can also:
- add an example `.env.example` file,
- add simple Postman collection or curl examples,
- fix any TypeScript errors (like the cookie-parser import issue) directly in `src/main.ts`.
Just tell me which you'd prefer next.
