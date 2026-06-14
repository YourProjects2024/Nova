import { calculateOrderTotals } from '../_shared/catalog.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

const verifySignature = async (
  orderId: string,
  paymentId: string,
  signature: string,
  keySecret: string,
) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(keySecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const generatedSignature = toHex(
    await crypto.subtle.sign('HMAC', key, encoder.encode(`${orderId}|${paymentId}`)),
  );

  return generatedSignature === signature;
};

const getRazorpayCredentials = () => {
  const keyId = Deno.env.get('RAZORPAY_KEY_ID');
  const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

  if (!keyId || !keySecret) return null;

  return { keyId, keySecret };
};

const fetchRazorpayPayment = async (paymentId: string, keyId: string, keySecret: string) => {
  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.description || 'Could not fetch Razorpay payment.');
  }

  return result;
};

const saveOrder = async (body: Record<string, any>, calculated: ReturnType<typeof calculateOrderTotals>) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase service role is not configured.');
  }

  const customer = body.customer;
  if (!customer || typeof customer !== 'object') {
    throw new Error('Customer details are required.');
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/orders`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      order_id: body.receipt,
      payment_id: body.razorpay_payment_id,
      status: 'paid',
      customer,
      items: calculated.items,
      subtotal: calculated.subtotal,
      shipping_fee: calculated.shippingFee,
      total: calculated.total,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Could not save order.');
  }

  return Array.isArray(result) ? result[0] : result;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }

  const credentials = getRazorpayCredentials();
  if (!credentials) {
    return jsonResponse({ error: 'Razorpay credentials are not configured.' }, 401);
  }

  try {
    const body = await request.json();
    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;
    const receipt = body.receipt;

    if (
      typeof orderId !== 'string' ||
      typeof paymentId !== 'string' ||
      typeof signature !== 'string' ||
      typeof receipt !== 'string'
    ) {
      return jsonResponse({ error: 'Missing payment verification fields.' }, 400);
    }

    const calculated = calculateOrderTotals(body.items);
    const verified = await verifySignature(orderId, paymentId, signature, credentials.keySecret);

    if (!verified) {
      return jsonResponse({ error: 'Payment signature mismatch.' }, 400);
    }

    const payment = await fetchRazorpayPayment(paymentId, credentials.keyId, credentials.keySecret);

    if (payment.order_id !== orderId) {
      return jsonResponse({ error: 'Payment order mismatch.' }, 400);
    }

    if (payment.status !== 'captured' || payment.amount !== calculated.amountInPaise) {
      return jsonResponse({ error: 'Payment amount or status could not be verified.' }, 400);
    }

    const order = await saveOrder(body, calculated);

    return jsonResponse({ success: true, order });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not verify payment.';
    return jsonResponse({ error: message }, 500);
  }
});
