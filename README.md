# Tripnder — API

Backend REST API + real-time server for [Tripnder](https://tripnder-frontend.vercel.app).

---

## Stack

- Node.js + Express
- MongoDB + Mongoose  
- Socket.io
- JWT + bcryptjs

---

## Base URL

```
https://tripnder-backend.onrender.com
```

---

## Auth

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | — | Register a new user |
| POST | `/auth/login` | — | Login and receive JWT |
| GET | `/auth/verify` | ✓ | Verify token and get user payload |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users` | ✓ | Get all users |
| GET | `/users/:id` | ✓ | Get user by ID |
| PUT | `/users/profile` | ✓ | Update own profile |

### Destinations
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/destinations` | ✓ | Get own destinations |
| POST | `/destinations` | ✓ | Create destination |
| GET | `/destinations/open` | ✓ | Get open trips from other users |
| PUT | `/destinations/:id` | ✓ | Update destination |
| PUT | `/destinations/:id/toggle` | ✓ | Toggle open/private |
| DELETE | `/destinations/:id` | ✓ | Delete destination |

### Connections
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/connections` | ✓ | Get all connections |
| POST | `/connections` | ✓ | Create connection or trigger match |
| PUT | `/connections/:id` | ✓ | Update connection status |
| DELETE | `/connections/:id` | ✓ | Delete connection |

### Messages
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/messages/:connectionId` | ✓ | Get messages for a connection |

---

## Socket.io Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `join_room` | client → server | `connectionId` | Join a chat room |
| `send_message` | client → server | `{ connectionId, senderId, text }` | Send a message |
| `new_message` | server → client | message object | Receive a new message |

---

## Models

**User** — firstName, lastName, email, password, bio, travelStyle, budget, languages, avatar

**Destination** — city, country, flag, dateFrom, dateTo, owner, isOpen

**Connection** — requester, recipient, destination, status (pending/accepted/rejected)

**Message** — connection, sender, text

---

## Run Locally

```bash
npm install
```

Create `.env`:
```
PORT=10000
MONGODB_URI=mongodb://localhost:27017/tripnder-db
TOKEN_SECRET=your_secret_here
ORIGIN=http://localhost:5173
```

```bash
npm run dev
npm run seed   # password for all test users: Banana99
```

---

*Part of the [Tripnder](https://tripnder-frontend.vercel.app) project — built by Jordi Font, Ironhack Barcelona 2026.*