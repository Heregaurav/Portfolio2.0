# Portfolio Backend

Aggregates coding profiles into a single API for a personal portfolio.

## Tech
- Node.js
- Express
- Axios
- GraphQL Request
- dotenv
- node-cache
- CORS
- Helmet
- Morgan

## Installation

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:

```bash
npm install
```

3. Run backend:

```bash
npm run dev:backend
```

## Docker

```bash
docker-compose up --build
```

## API
Endpoints:
- `GET /api/profile`
- `GET /api/github`
- `GET /api/leetcode`
- `GET /api/codechef`
- `GET /api/gfg`
- `GET /api/heatmaps`
- `GET /api/activity`

See `src` for implementation details.

Usage notes:

- You can request a specific user's data by providing a `url` or `username` query parameter. Examples:

```bash
# GitHub by profile URL
curl "http://localhost:4000/api/github?url=https://github.com/gaurav"

# LeetCode by username
curl "http://localhost:4000/api/leetcode?username=someuser"

# Aggregate profile (will try all platforms with given identifier)
curl "http://localhost:4000/api/profile?url=https://github.com/gaurav"
```

Caching: responses are cached for 30 minutes (configurable via `CACHE_TTL_MINUTES`).

If using GitHub endpoints beyond unauthenticated limits, set `GITHUB_TOKEN` in your `.env`.
