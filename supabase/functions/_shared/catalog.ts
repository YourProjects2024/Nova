export interface CheckoutItemInput {
  productId: string;
  quantity: number;
}

export interface CalculatedOrderItem {
  product: {
    id: string;
    name: string;
    price: number;
    weight: string;
  };
  quantity: number;
}

const PRODUCTS = {
  'neva-face-wash': {
    id: 'neva-face-wash',
    name: 'Neva Face Wash',
    price: 399,
    weight: '30 ML',
  },
  'intense-night-repair-cream': {
    id: 'intense-night-repair-cream',
    name: 'Intense Night Repair Cream',
    price: 599,
    weight: '50 GM',
  },
} as const;

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 50;

export const calculateOrderTotals = (items: CheckoutItemInput[]) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('At least one checkout item is required.');
  }

  const orderItems: CalculatedOrderItem[] = items.map((item) => {
    const product = PRODUCTS[item.productId as keyof typeof PRODUCTS];
    const quantity = Number(item.quantity);

    if (!product) {
      throw new Error(`Unknown product: ${item.productId}`);
    }

    if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 20) {
      throw new Error('Invalid item quantity.');
    }

    return {
      product,
      quantity,
    };
  });

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  return {
    items: orderItems,
    subtotal,
    shippingFee,
    total,
    amountInPaise: total * 100,
  };
};
