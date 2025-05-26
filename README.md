# Summit Registration Widget

## Overview

This is a registration widget for summits and events, designed to be embedded in any website. It allows influencers to register for events and provides an admin interface to manage registrations.

## Features

- Embeddable registration widget
- Admin dashboard for registration management
- Firebase Firestore database for data storage
- CORS-enabled API endpoints
- Responsive design

## Setup

### Prerequisites

- Node.js (v18 or later)
- npm or pnpm
- Firebase project with Firestore database

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore database in your project
3. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `firebase-service-account.json` in the root of this project

4. Update the Firebase configuration in `lib/firestore.ts` if needed

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Firebase (Optional - can use service account JSON file instead)
FIREBASE_SERVICE_ACCOUNT='{JSON_CONTENT}'
```

## Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Summit Registration

- `POST /api/summit/register` - Register for a summit
- `GET /api/summit/registrations` - Get all registrations
- `GET /api/summit/registrations?influencerId=123` - Get registrations for a specific influencer

### Admin

- `GET /api/admin/registrations` - Get all registrations (requires API key)
- `DELETE /api/admin/registrations?regId=SR_001` - Delete a registration (requires API key)

## Embedding the Widget

Add the following script to your website:

```html
<script src="https://your-deployment-url.vercel.app/summit-register.js" defer></script>
<div id="summit-register" data-influencer-id="YOUR_INFLUENCER_ID"></div>
```

## Admin Access

Access the admin dashboard at `/admin`. Use the API key for authentication:

```
API Key: admin-secret-key
```

## Migrating Data

If you have existing registration data, you can migrate it to Firestore using the provided script:

```bash
node scripts/migrate-to-firestore.js
```

## Deployment

Deploy to Vercel:

```bash
vercel
```

Make sure to set the environment variables in your Vercel project settings.

## License

MIT