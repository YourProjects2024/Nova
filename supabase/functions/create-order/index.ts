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
    return null;
  }

  return { keyId, keySecret };
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
    const amount = Number(body.amount);
    const currency = typeof body.currency === 'string' ? body.currency : 'INR';
    const receipt = typeof body.receipt === 'string' ? body.receipt : '';

    if (!Number.isInteger(amount) || amount < 100) {
      return jsonResponse({ error: 'Amount must be at least 100 paise.' }, 400);
    }

    if (!receipt) {
      return jsonResponse({ error: 'Receipt is required.' }, 400);
    }

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${credentials.keyId}:${credentials.keySecret}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt,
        payment_capture: 1,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const status = response.status === 401 ? 401 : 500;
      return jsonResponse(
        { error: result?.error?.description || 'Could not create Razorpay order.' },
        status,
      );
    }

    return jsonResponse({
      order_id: result.id,
      amount: result.amount,
      currency: result.currency,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not create Razorpay order.';
    return jsonResponse({ error: message }, 500);
  }
});
