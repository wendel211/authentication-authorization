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


## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/wendel211/authentication-authorization-JWT.git
cd authentication-authorization-JWT
```

### 2. Install dependencies

```bash
npm install
# or with yarn
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=nest

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_ACCESS_SECRET=your_super_secret_access_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
```

> ⚠️ **Security Warning**: Never commit your `.env` file to version control. Always use strong, random secrets in production.

### 4. Start the database (Docker)

If you have Docker installed, the easiest way is to use the provided `docker-compose.yml`:

```bash
docker compose up -d
```

This will start:
- **PostgreSQL** on port `5433`
- **pgAdmin** (web interface) on `http://localhost:5050`

pgAdmin credentials:
- Email: `admin@yobi.local`
- Password: `admin123`

### 5. Run the application

```bash
# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## 🌐 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | PostgreSQL host | `localhost` | ✅ |
| `DB_PORT` | PostgreSQL port | `5433` | ✅ |
| `DB_USERNAME` | Database user | `postgres` | ✅ |
| `DB_PASSWORD` | Database password | `postgres` | ✅ |
| `DB_DATABASE` | Database name | `nest` | ✅ |
| `JWT_ACCESS_SECRET` | Secret for access tokens | - | ✅ |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | - | ✅ |

## 🏃 Running the Application

```bash
# Development mode (watch mode)
npm run start:dev

# Standard development
npm run start

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

The application runs on port **3000** by default.

## 🐳 Docker

### Using Docker Compose (Recommended)

The project includes a `docker-compose.yml` with PostgreSQL and pgAdmin:

```bash
# Start containers
docker compose up -d

# View logs
docker compose logs -f

# Stop containers
docker compose down

# Stop and remove volumes (⚠️ deletes data)
docker compose down -v
```

### Database Access

**PostgreSQL Connection:**
- Host: `localhost`
- Port: `5433`
- User: `postgres`
- Password: `postgres`
- Database: `nest`

**pgAdmin Web Interface:**
- URL: `http://localhost:5050`
- Email: `admin@yobi.local`
- Password: `admin123`

## 📚 API Documentation

Once the application is running, visit:

**Swagger UI:** `http://localhost:3000/docs`

The interactive API documentation allows you to:
- Explore all endpoints
- Test requests directly from the browser
- View request/response schemas
- Authenticate with JWT tokens

### Using Swagger for Authentication

1. **Register a new user** via `POST /auth/signup`
2. **Login** via `POST /auth/signin` to get your access token
3. Click the **"Authorize"** button (🔒) at the top of Swagger
4. Enter: `Bearer YOUR_ACCESS_TOKEN`
5. Now you can test protected endpoints!

## 📂 Project Structure

```
src/
├── auth/                  # Authentication module
│   ├── auth.controller.ts    # Auth endpoints (signup, signin, logout, refresh)
│   ├── auth.service.ts       # Auth business logic
│   ├── auth.module.ts        # Auth module configuration
│   ├── dto/                  # Data Transfer Objects
│   ├── strategies/           # Passport JWT strategies
│   └── types/                # TypeScript types
├── users/                 # Users module
│   ├── user.entity.ts        # User database entity
│   ├── users.controller.ts   # User endpoints
│   ├── users.service.ts      # User business logic
│   ├── users.module.ts       # Users module
│   ├── dto/                  # User DTOs
│   └── decorators/           # Custom decorators (@GetUser, @Public)
├── common/                # Shared resources
│   ├── decorators/           # Global decorators
│   └── guards/               # Auth guards
├── app.module.ts          # Root module
├── app.controller.ts      # Root controller
├── app.service.ts         # Root service
└── main.ts                # Application entry point (bootstrap)
```

## 🔐 Authentication Flow

### 1. **User Registration**

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

- Password is hashed with **Argon2**
- User stored in PostgreSQL
- Returns user object (without password)

### 2. **User Login**

```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to get new access tokens

### 3. **Accessing Protected Routes**

```http
GET /users/me
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The server validates the JWT and extracts user information.

### 4. **Refreshing Tokens**

```http
POST /auth/refresh
Authorization: Bearer YOUR_REFRESH_TOKEN
```

Returns a new access token without requiring login.

### 5. **Logout**

```http
POST /auth/logout
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Invalidates the refresh token in the database.

## 🌐 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/signup` | Register a new user | ❌ |
| `POST` | `/auth/signin` | Login and get tokens | ❌ |
| `POST` | `/auth/refresh` | Refresh access token | 🔄 Refresh Token |
| `POST` | `/auth/logout` | Logout user | ✅ Access Token |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/users/me` | Get current user info | ✅ |
| `GET` | `/users` | Get all users | ✅ |
| `GET` | `/users/:id` | Get user by ID | ✅ |
| `PATCH` | `/users/:id` | Update user | ✅ |
| `DELETE` | `/users/:id` | Delete user | ✅ |

### Example Requests

**Register:**
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

**Get Current User:**
```bash
curl http://localhost:3000/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```


## 🧪 Testing

### Run All Tests

```bash
# Unit tests
npm run test

# Watch mode (runs tests on file changes)
npm run test:watch

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Debug tests
npm run test:debug
```

### Test Structure

Tests are located in:
- **Unit tests**: `src/**/*.spec.ts`
- **E2E tests**: `test/**/*.e2e-spec.ts`

Example test output:
```
PASS  src/auth/auth.service.spec.ts
PASS  src/users/users.service.spec.ts
Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
```

## 🛡 Security Best Practices

This project implements several security measures:

- ✅ **Password Hashing**: Argon2 (winner of Password Hashing Competition)
- ✅ **JWT Secrets**: Separate secrets for access and refresh tokens
- ✅ **Token Expiration**: Access tokens expire in 15 minutes
- ✅ **Refresh Token Rotation**: Refresh tokens are hashed in database
- ✅ **Input Validation**: DTOs with class-validator
- ✅ **SQL Injection Protection**: TypeORM parameterized queries
- ✅ **CORS**: Configurable CORS settings
- ✅ **Environment Variables**: Sensitive data in `.env`

### Production Checklist

Before deploying to production:

- [ ] Change all JWT secrets to strong random values
- [ ] Update database credentials
- [ ] Enable HTTPS only
- [ ] Configure CORS for your domain
- [ ] Set up rate limiting
- [ ] Enable logging and monitoring
- [ ] Use environment-specific `.env` files
- [ ] Review and update token expiration times
- [ ] Set up database backups
- [ ] Enable helmet middleware for security headers

## 🐛 Common Issues & Solutions

### Issue 1: TypeScript Error with cookie-parser

**Error:**
```
This expression is not callable.
Type 'typeof cookieParser' has no call signatures.
```

**Solution:**
The import in `src/main.ts` is already correctly configured:
```typescript
import * as cookieParser from 'cookie-parser';
app.use(cookieParser());
```

If you still see this error, ensure your `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Issue 2: Database Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5433
```

**Solution:**
1. Make sure PostgreSQL is running:
   ```bash
   docker compose up -d
   ```
2. Check if port 5433 is available:
   ```bash
   netstat -an | findstr 5433
   ```
3. Verify `.env` database credentials match `docker-compose.yml`

### Issue 3: JWT Token Invalid

**Error:**
```
401 Unauthorized
```

**Solution:**
1. Check if token is included in header: `Authorization: Bearer YOUR_TOKEN`
2. Verify token hasn't expired (access tokens expire in 15 min)
3. Use refresh token endpoint to get a new access token
4. Make sure JWT secrets in `.env` match server configuration

### Issue 4: Port 3000 Already in Use

**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Or change the port in `src/main.ts`:
```typescript
await app.listen(3001); // Use different port
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start` | Start the application |
| `npm run start:dev` | Start with hot-reload (watch mode) |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start production build |
| `npm run format` | Format code with Prettier |
| `npm run lint` | Lint and fix code with ESLint |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Generate test coverage report |
| `npm run test:debug` | Debug tests |
| `npm run test:e2e` | Run end-to-end tests |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Write tests for new features
- Follow the existing code style (use ESLint and Prettier)
- Update documentation as needed
- Keep commits small and focused
- Write clear commit messages

## 📖 Learning Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [JWT.io](https://jwt.io/) - Debug and decode JWTs
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Passport.js](http://www.passportjs.org/)

## 📄 License

This project is licensed under the **UNLICENSED** License - see the [package.json](./package.json) file for details.

---

<div align="center">
  
### ⭐ If you found this helpful, please give it a star!

Made with ❤️ using [NestJS](https://nestjs.com/)

[Report Bug](https://github.com/wendel211/authentication-authorization-JWT/issues) · [Request Feature](https://github.com/wendel211/authentication-authorization-JWT/issues)

</div>
