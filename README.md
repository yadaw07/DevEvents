# DevEvents

A platform for discovering and creating developer events — hackathons, meetups, and conferences, all in one place.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, Cache Components)
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Image Hosting:** Cloudinary
- **Styling:** Tailwind CSS

## Features

- Browse and search developer events
- View event details, agenda, and similar event recommendations
- Create events with image upload (file or remote URL)
- Book a spot at an event
- Auto-generated, unique event slugs

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yadaw07/DevEvents
cd DevEvents
npm install
```

### 2. Environment variables

Create a `.env.local` file in the root:

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                  # Routes (pages + API routes)
components/           # UI components
database/             # Mongoose models (Event, Booking) + index
lib/                  # DB connection, server actions
hooks/                # Custom React hooks
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |

## License

MIT
