# NEVA Website Client Requirements

This document lists everything required from the client to run the NEVA ecommerce website with Razorpay payments, Supabase order storage, admin order management, invoice download, and WhatsApp support.

## 1. Required Accounts

The client must provide access to these accounts:

- Razorpay merchant account
- Supabase project
- GitHub account or hosting account for deployment
- WhatsApp support number
- Business email address

Optional for future automation:

- Meta Business / WhatsApp Cloud API account

## 2. Razorpay Requirements

Required from Razorpay Dashboard:

- Razorpay Key ID
- Razorpay Key Secret
- Test mode keys for testing
- Live mode keys before launch

Current integration uses Razorpay Standard Checkout.

Frontend uses only:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_or_live_key_id
```

Backend/Supabase Edge Functions use:

```env
RAZORPAY_KEY_ID=rzp_test_or_live_key_id
RAZORPAY_KEY_SECRET=razorpay_key_secret
```

Important:

- Never expose `RAZORPAY_KEY_SECRET` in frontend code.
- Rotate test/live keys if they were shared publicly.
- Use test keys during testing and live keys only for production.

## 3. Supabase Requirements

Required from Supabase:

- Supabase Project URL
- Supabase Publishable Key
- Supabase Service Role Key for Edge Functions only
- Supabase admin user email/password for order admin panel

Frontend `.env` requires:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Supabase Edge Functions require these secrets:

```bash
supabase secrets set RAZORPAY_KEY_ID=your_razorpay_key_id RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Supabase automatically provides:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 4. Supabase Database Setup

Run the SQL from:

```txt
supabase/schema.sql
```

This creates:

- `orders` table
- RLS policies for admin read/update
- Indexes for order list performance

Important security note:

- Public users should not be allowed to insert paid orders directly.
- Orders are saved only after backend Razorpay verification.

## 5. Supabase Edge Functions

The project uses these functions:

```txt
create-order
verify-payment
```

Deploy commands:

```bash
supabase link --project-ref your-project-ref
supabase functions deploy create-order
supabase functions deploy verify-payment
```

What they do:

- `create-order`: Calculates secure server-side total and creates Razorpay order.
- `verify-payment`: Verifies Razorpay signature, confirms captured payment, and saves order.

## 6. Admin Panel Requirements

Admin URL:

```txt
/#/admin
```

Client must create an admin user in Supabase:

```txt
Supabase Dashboard -> Authentication -> Users -> Add user
```

Admin can:

- View orders
- Search orders
- Update order status
- Add notes

## 7. WhatsApp Requirements

Current WhatsApp setup uses direct WhatsApp links.

Required:

- Client support WhatsApp number

Current number:

```txt
+91 9998318359
```

WhatsApp is used for:

- Floating chat button
- Track order message from success page
- Support/contact links

No WhatsApp API cost is required for the current setup.

For automatic WhatsApp messages in future, client must provide:

- Meta Business account
- WhatsApp Cloud API token
- Phone Number ID
- Approved message templates

## 8. Invoice Requirements

Current invoice feature:

- Customer can download invoice PDF after successful payment.
- Invoice includes logo, company details, order details, payment ID, items, totals, and customer address.

Client should confirm:

- Official company name
- GST number, if applicable
- Registered business address, if required on invoice
- Support email
- Support phone

Current invoice company details:

```txt
NEVA Personal Care
Email: services.neva@gmail.com
Phone / WhatsApp: +91 9998318359
Website: yourprojects2024.github.io/Nova
```

## 9. Environment Variables

Local frontend `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_RAZORPAY_KEY_ID=rzp_test_or_live_key_id
```

Supabase function secrets:

```bash
RAZORPAY_KEY_ID=rzp_test_or_live_key_id
RAZORPAY_KEY_SECRET=razorpay_key_secret
```

Never commit `.env` files.

## 10. Testing Checklist

Before launch:

- Add product to cart
- Fill checkout form
- Complete Razorpay test payment
- Confirm order success page appears only after successful payment
- Confirm failed/cancelled payment does not create order
- Confirm order appears in admin panel
- Confirm invoice PDF downloads
- Confirm WhatsApp tracking message includes full order details
- Confirm admin can update order status

## 11. Production Launch Checklist

Before going live:

- Replace Razorpay test keys with live keys
- Update Supabase secrets with live Razorpay keys
- Redeploy Edge Functions
- Run database schema in production Supabase project
- Create Supabase admin user
- Test one live low-value payment
- Verify order appears in admin
- Verify invoice PDF
- Verify WhatsApp support links
- Deploy latest frontend build

Frontend deployment:

```bash
npm run deploy
```

## 12. Security Notes

- Razorpay Key Secret must only stay in Supabase secrets.
- Supabase Service Role Key must never be used in frontend.
- Orders must be created only after Razorpay backend verification.
- Do not allow public direct inserts into `orders`.
- Rotate keys if shared in chat, screenshots, or public files.
- Use separate test and live credentials.
