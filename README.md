# NEVA Ecommerce Storefront

React + TypeScript + Vite storefront for NEVA skincare products.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor and run [supabase/schema.sql](supabase/schema.sql).
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase project URL and anon key:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. In Supabase Authentication, create an admin user with email and password.
6. Visit `/#/admin` in the app and sign in with that admin user.

Orders are inserted after successful payment. The admin panel can view all orders and update order status/notes.
