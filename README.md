# Summit Registration Widget

A Next.js application for managing summit registrations with a widget that can be embedded in any website.

## Features

- Embeddable registration widget for any website
- Admin dashboard to view and manage registrations
- API endpoints for registration data
- Vercel Blob storage for data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Vercel account (for Blob storage)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Set up Vercel Blob storage:
   - Create a Blob store in your Vercel dashboard
   - Copy the read-write token
   - Create a `.env.local` file in the project root with:

```
BLOB_READ_WRITE_TOKEN=your_token_here
```

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Migrating Existing Data

If you have existing registration data in the local JSON file, you can migrate it to Vercel Blob storage using the provided script:

```bash
node scripts/migrate-to-blob.js
```

## Embedding the Widget

To embed the registration widget in any website, add the following code:

```html
<!-- Summit Registration Widget -->
<div id="summit-widget-container"></div>
<script src="https://influencer-awards-engine-ia-e.vercel.app/summit-register.js"></script>
<script>
  new SummitRegistrationWidget({
    apiBaseUrl: "https://influencer-awards-engine-ia-e.vercel.app/", // Your API base URL
    influencerId: "INF_CUSTOM_ID", // Optional custom influencer ID
    theme: "default" // Optional theme (default, dark, light)
  });
</script>
```

## API Endpoints

- `POST /api/summit/register` - Register for the summit
- `GET /api/summit/registrations` - Get all registrations (or filter by influencerId)
- `GET /api/admin/registrations` - Admin endpoint to get all registrations
- `DELETE /api/admin/registrations?regId=ID` - Admin endpoint to delete a registration

## Vercel Blob Storage

This application uses Vercel Blob for data storage. The registration data is stored as a JSON file in the Blob storage, which provides:

- Scalable and reliable storage
- Global CDN distribution
- Automatic backups
- No need for database management

The implementation uses the `@vercel/blob` SDK to interact with the Blob storage service.

## License

MIT