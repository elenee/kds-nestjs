# KDS - Kitchen Display System

A real-time kitchen order display system for a hotel cafe, built to explore WebSockets, role-based auth, and horizontal scaling in a NestJS backend.

Waiters place orders via REST → the kitchen sees them appear instantly over WebSockets → kitchen staff update order/item status → waiters see status updates live, no polling.

## Stack

- **NestJS** + **TypeScript**
- **PostgreSQL** via **Prisma** (driver adapters, nested writes)
- **Socket.IO** for real-time order broadcasts, scoped by room (kitchen / per-table)
- **Redis** - Socket.IO adapter for horizontal scaling across multiple instances
- **JWT auth** (Passport) with role-based guards (`ADMIN` / `WAITER` / `KITCHEN`)

## Features

- Menu, Table, and Order CRUD, with nested order-item creation in a single request
- Real-time broadcasts: `order:created`, `order:statusUpdated`, `order:itemStatusUpdated`
- WebSocket connections authenticated via JWT at handshake; room access is role-gated
- REST routes guarded by role (e.g. only `ADMIN` manages the menu, only `KITCHEN` updates order status)
- Redis pub/sub adapter, so broadcasts work correctly even when multiple server instances are running behind a load balancer
- Reconnection handling: on reconnect, clients re-fetch active orders via REST to backfill anything missed while disconnected

## Running locally

```bash
npm install
# create a local PostgreSQL database and set DATABASE_URL in .env
docker compose up -d  # starts Redis
npx prisma migrate dev
npx prisma db seed    # creates an initial admin account
npm run start:dev
```
