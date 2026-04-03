# Port Configuration Guide

This project reads the backend port from environment variables.

## Install dotenv (for .env support)

Run this inside the backend folder:

- `cd backend`
- `npm install dotenv`

Then load env variables at the top of `backend/server.js`:

- `require("dotenv").config();`

Without dotenv, values from `.env` (like `PORT`) will not be available in `process.env`.

## Files to change when you want a new backend port

1. backend/.env
- Change `PORT` value.
- Example:
  - `PORT=2000`

2. backend/server.js
- Keep this line (already correct):
  - `const PORT = process.env.PORT || 5000;`
- This means it uses `.env` first, then falls back to `5000`.

3. docker-compose.yml
- Update backend port mapping to match container port used by Node.
- Example for port 2000:
  - `"2000:2000"`

4. nginx.conf
- Update backend upstream port inside Docker network.
- Example for port 2000:
  - `proxy_pass http://backend:2000/;`

## Example: change backend from 2000 to 5000

1. In `backend/.env`:
- `PORT=5000`

2. In `docker-compose.yml` backend service:
- `ports:`
- `  - "5000:5000"`

3. In `nginx.conf`:
- `proxy_pass http://backend:5000/;`

4. Restart containers:
- `docker compose down`
- `docker compose up --build`

## How to test

1. Direct backend access:
- `http://localhost:<PORT>`
- Example: `http://localhost:2000`

2. Through Nginx API route:
- `http://localhost/api`

## Common issue

If `.env` says `PORT=2000` but Docker/Nginx still use `5000`, API calls fail.
Always keep these three values aligned:
- `backend/.env` PORT
- `docker-compose.yml` backend ports mapping
- `nginx.conf` backend proxy_pass port

## Frontend port change guide

Frontend can also use an env-based port.

### 1) Create frontend/.env

Add:

- `PORT=3001`

For Create React App, `react-scripts start` reads `PORT` automatically.

### 2) docker-compose.yml

In `frontend` service, update port mapping to match the new frontend port.

Example for port 3001:

- `"3001:3001"`

### 3) nginx.conf

Update frontend upstream target to same container port.

Example for port 3001:

- `proxy_pass http://frontend:3001/;`

### 4) frontend/Dockerfile

Update expose port (recommended for clarity):

- `EXPOSE 3001`

### 5) Restart containers

- `docker compose down`
- `docker compose up --build`

### Frontend quick example: change 3000 to 3001

1. In `frontend/.env`:
- `PORT=3001`

2. In `docker-compose.yml` frontend service:
- `ports:`
- `  - "3001:3001"`

3. In `nginx.conf`:
- `proxy_pass http://frontend:3001/;`

4. In `frontend/Dockerfile`:
- `EXPOSE 3001`

5. Rebuild:
- `docker compose down`
- `docker compose up --build`

### Test frontend

1. Direct frontend:
- `http://localhost:<FRONTEND_PORT>`
- Example: `http://localhost:3001`

2. Through nginx root route:
- `http://localhost/`

### Frontend common issue

If frontend `.env` uses one port but Docker/Nginx still use another, app may not open or proxy fails.
Keep these aligned:
- `frontend/.env` PORT
- `docker-compose.yml` frontend ports mapping
- `nginx.conf` frontend proxy_pass port

## Deep route documentation: GET /api/users

Use this section in your report to explain what happens internally when you call:

- `http://localhost/api/users`

### Full request lifecycle

1. Client sends HTTP request
- Postman sends `GET /api/users` to `localhost` on port `80`.

2. Nginx receives the request
- Nginx listens on port `80`.
- Request path starts with `/api/`, so Nginx uses the API location block.

3. Nginx forwards request to backend service
- Nginx forwards to `http://backend:2000/`.
- Because the proxy target ends with `/`, the `/api/` prefix is removed when forwarding.
- So backend receives `GET /users` (not `/api/users`).

4. Express route matches
- Backend Express app has `app.get("/users", ...)`.
- This route handler is executed for the forwarded request.

5. Database query executes
- Handler calls `User.find()` using Mongoose.
- Mongoose uses the connection created from `process.env.MONGODB_URL`.
- MongoDB returns all user documents.

6. Backend sends response
- Express sends the users list as JSON response.
- HTTP status is normally `200 OK`.

7. Nginx relays response to client
- Nginx passes the backend response back to Postman.
- Postman displays JSON array output.

### Request/response map

- Incoming URL: `http://localhost/api/users`
- Nginx upstream target: `http://backend:2000/`
- Forwarded backend path: `/users`
- Express handler: `GET /users`
- DB operation: `User.find()`
- Response: `200 + JSON array`

### Related files for this flow

- `nginx.conf` : API reverse-proxy rule (`location /api/` and `proxy_pass`)
- `docker-compose.yml` : service networking and exposed host ports
- `backend/server.js` : Express routes and MongoDB connection
- `backend/.env` : `PORT` and `MONGODB_URL` values

### Common failures and meaning

1. `502 Bad Gateway` from Nginx
- Backend container is down or wrong backend port in Nginx.

2. `404 Not Found`
- Route mismatch (for example backend route missing or wrong forwarded path).

3. `500 Internal Server Error`
- Backend route crashed, often DB connection/query issue.

4. Empty array `[]`
- Request succeeded, but there is no user data yet.
