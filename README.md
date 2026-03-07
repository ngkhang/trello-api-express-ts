# Trello API with NodeJs - Express.js - TypeScript

- [Trello API with NodeJs - Express.js - TypeScript](#trello-api-with-nodejs---expressjs---typescript)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🏗️ Project Structure](#️-project-structure)
  - [🔌 API Endpoints](#-api-endpoints)
  - [📡 API Guideline](#-api-guideline)
    - [The Response Format](#the-response-format)
    - [Usage](#usage)
  - [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
    - [Development](#development)
  - [🏷️ About Me](#️-about-me)

## 🛠️ Tech Stack

- **TypeScript** - Type safety
- **Express.js** - Web framework
- **MongoDB** (via MongoDB Atlas) - Database
- **Zod** - Schema validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - Request logging
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Staged file validation
- **Commitlint** - Commit message standards

## 🏗️ Project Structure

```md
.
├── src/
│ ├── config/ # App configuration
│ ├── core/ # Shared core configuration
│ ├── middlewares/ # Express middlewares
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Shared constant, functions
│ ├── app.ts
│ └── server.ts
├── .editorconfig
├── .env.example
├── .gitignore
├── .prettierignore
├── commitlint.config.mjs
├── eslint.config.mjs
├── lint-staged.config.mjs
├── prettier.config.mjs
├── package.json
├── README.md
├── tsconfig.base.json
├── tsconfig.build.json
└── tsconfig.json
```

## 🔌 API Endpoints

- Health check: `GET /health`

## 📡 API Guideline

### The Response Format

- Success

  ```json
  {
    "success": "success",
    "statusCode": 200,
    "message": "Success message",
    "data": {},
    "metaData": {
      "requestTime": "2026-02-19T10:30:00.000Z",
      "endpoint": "/api/examples"
    }
  }
  ```

- Error

  > - `error` is optional and only present when there are field-level or domain-level error details.
  > - The `error`, `stack`, and `name` properties show if `process.env.NODE_ENV` is not `"production"`

  ```json
  {
    "success": "error",
    "statusCode": 404,
    "message": "Error message",
    "error": {
      "code": "ERR_INVALID",
      "details": [
        {
          "key": "fieldName",
          "message": "Validation error detail"
        }
      ]
    },
    "stack": "",
    "name": "",
    "metaData": {
      "requestTime": "2026-02-19T10:30:00.000Z",
      "endpoint": "/api/examples"
    }
  }
  ```

### Usage

- Controller — HTTP in/out only, calls service, sends response:

  ```typescript
  const resBody = new OkResponse({ data });
  const resBody = new OkResponse({ message: 'Custom message', data });
  ```

- Service — throws domain errors for the global error handler to catch:

  ```typescript
  throw new NotFoundError(`User not found: ${id}`);
  throw new BadRequestError('Invalid input', {
    code: ERROR_CODE.INVALID,
    details: [
      {
        key: 'email',
        message: 'Must be require',
      },
    ],
  });
  ```

## 🚀 Getting Started

## Prerequisites

- A MongoDB Atlas cluster (or a local MongoDB instance)
- Create `.env` file based on `.env.example` and modify variables with your value

  ```bash
  NODE_ENV=development

  # ==== Application
  APP_HOST="localhost"
  APP_PORT=3000
  APP_PREFIX='api'
  APP_CORS_ORIGIN='http:localhost:3000,https://frontend.example.com'

  # ==== Database
  DB_MONGO_URI="mongodb+srv://<USERNAME>:<PASSWORD>@example-cluster0.cbtkemk.mongodb.net/<DATABASE_NAME>?appName=<APP_NAME>"
  ```

### Installation

```bash
# Install dependencies
npm install

# Setup git hooks
npm run prepare
```

### Running the App

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Development

```bash
# Linting
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues

# Formatting
npm run format        # Format all files
npm run format:check  # Check formatting

# Linting and formatting all
npm run check:all     # Check type, lint, and format
npm run fix:all       # Auto-fix issues and formatting
```

## 🏷️ About Me

- Khang Nguyen [GitHub](https://github.com/ngkhang)
