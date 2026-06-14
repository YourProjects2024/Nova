import { supabase } from './supabase';

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => {
      on?: (event: 'payment.failed', handler: (response: unknown) => void) => void;
      open: () => void;
    };
  }
}

interface RazorpayCheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CheckoutItemInput {
  productId: string;
  quantity: number;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  method?: 'card' | 'netbanking' | 'wallet' | 'upi' | 'emi';
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  handler: (response: RazorpayCheckoutResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayOrder {
  order_id: string;
  amount: number;
  currency: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
}

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

let razorpayScriptPromise: Promise<void> | null = null;

export const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
export const isRazorpayConfigured = Boolean(razorpayKeyId && supabase);

export const loadRazorpayCheckout = () => {
  if (window.Razorpay) return Promise.resolve();

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = RAZORPAY_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Could not load Razorpay Checkout.'));
      document.body.appendChild(script);
    });
  }

  return razorpayScriptPromise;
};

export const createRazorpayOrder = async (
  items: CheckoutItemInput[],
  receipt: string,
  currency = 'INR',
) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  return supabase.functions.invoke<RazorpayOrder>('create-order', {
    body: {
      items,
      currency,
      receipt,
    },
  });
};

export const verifyRazorpayPayment = async (
  payment: RazorpayCheckoutResponse,
  orderDetails: {
    receipt: string;
    customer: unknown;
    items: CheckoutItemInput[];
  },
) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  return supabase.functions.invoke<{ success: boolean; order?: unknown }>('verify-payment', {
    body: {
      ...payment,
      ...orderDetails,
    },
  });
};

export const openRazorpayCheckout = (
  options: RazorpayCheckoutOptions,
  onPaymentFailed?: (response: unknown) => void,
) => {
  if (!window.Razorpay) {
    throw new Error('Razorpay Checkout is not loaded.');
  }

  const checkout = new window.Razorpay(options);
  if (onPaymentFailed && 'on' in checkout && typeof checkout.on === 'function') {
    checkout.on('payment.failed', onPaymentFailed);
  }
  checkout.open();
};
