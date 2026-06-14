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
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_RAZORPAY_KEY_ID=rzp_test_or_live_key_id
```

5. In Supabase Authentication, create an admin user with email and password.
6. Visit `/#/admin` in the app and sign in with that admin user.

Orders are inserted after successful payment. The admin panel can view all orders and update order status/notes.

## Razorpay Setup

1. Create API keys in Razorpay Dashboard.
2. Add the Key ID to `.env` or `.env.local` as `VITE_RAZORPAY_KEY_ID`.
3. Add the Key ID and Key Secret to Supabase Edge Function secrets:

```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_test_or_live_key_id RAZORPAY_KEY_SECRET=your_key_secret
```

4. Deploy the payment functions:

```bash
supabase functions deploy create-order
supabase functions deploy verify-payment
```

The browser opens Razorpay Checkout with the public Key ID. Supabase Edge Functions create Razorpay orders and verify payment signatures with the secret key before the app saves the order.
