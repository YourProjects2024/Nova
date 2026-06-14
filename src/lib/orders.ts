import { CartItem } from '../context/CartContext';
import { supabase } from './supabase';

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderRecord {
  id: string;
  order_id: string;
  payment_id: string;
  status: OrderStatus;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shipping_fee: number;
  total: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateOrderInput {
  orderId: string;
  paymentId: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export const createOrder = async (order: CreateOrderInput) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  const orderItems = order.items.map((item) => ({
    product: {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      weight: item.product.weight,
      image: item.product.image,
    },
    quantity: item.quantity,
  }));

  return supabase
    .from('orders')
    .insert({
      order_id: order.orderId,
      payment_id: order.paymentId,
      status: 'paid',
      customer: order.customer,
      items: orderItems,
      subtotal: order.subtotal,
      shipping_fee: order.shippingFee,
      total: order.total,
    });
};

export const fetchOrders = async () => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  return supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
};

export const updateOrder = async (id: string, updates: { status: OrderStatus; notes?: string | null }) => {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured.') };
  }

  return supabase
    .from('orders')
    .update({
      status: updates.status,
      notes: updates.notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
};
