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

const getRazorpayCredentials = () => {
  const keyId = Deno.env.get('RAZORPAY_KEY_ID');
  const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured.');
  }

  return { keyId, keySecret };
};

const createRazorpayOrder = async (amount: number, receipt: string) => {
  const { keyId, keySecret } = getRazorpayCredentials();
  const auth = btoa(`${keyId}:${keySecret}`);

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt,
      payment_capture: 1,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.description || 'Could not create Razorpay order.');
  }

  return {
    id: result.id,
    amount: result.amount,
    currency: result.currency,
  };
};

const verifyRazorpaySignature = async (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
) => {
  const { keySecret } = getRazorpayCredentials();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(keySecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${razorpayOrderId}|${razorpayPaymentId}`),
  );
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return expectedSignature === razorpaySignature;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }

  try {
    const body = await request.json();

    if (body.action === 'create-order') {
      if (!Number.isFinite(body.amount) || body.amount <= 0) {
        return jsonResponse({ error: 'A valid amount is required.' }, 400);
      }

      if (!body.receipt || typeof body.receipt !== 'string') {
        return jsonResponse({ error: 'A receipt is required.' }, 400);
      }

      return jsonResponse(await createRazorpayOrder(body.amount, body.receipt));
    }

    if (body.action === 'verify-payment') {
      const verified = await verifyRazorpaySignature(
        body.razorpay_order_id,
        body.razorpay_payment_id,
        body.razorpay_signature,
      );

      if (!verified) {
        return jsonResponse({ error: 'Payment verification failed.' }, 400);
      }

      return jsonResponse({ verified: true });
    }

    return jsonResponse({ error: 'Unknown payment action.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment request failed.';
    return jsonResponse({ error: message }, 500);
  }
});
