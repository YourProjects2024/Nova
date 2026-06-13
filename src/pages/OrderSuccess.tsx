import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Calendar, CreditCard, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrderData {
  orderId: string;
  paymentId: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      weight: string;
    };
    quantity: number;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  date: string;
}

export const OrderSuccess: React.FC = () => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('neva_latest_order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      // Fallback if no order exists in session
      navigate('/');
    }
  }, [navigate]);

  if (!order) return null;

  const handleWhatsAppTrack = () => {
    const phoneNumber = '919998318359';
    const message = `Hi NEVA team, I want to track my order.\nOrder ID: ${order.orderId}\nName: ${order.customer.firstName} ${order.customer.lastName}\nTotal Amount: ₹${order.total}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-cream-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Banner */}
        <div className="bg-white p-8 rounded-2xl border border-sage-100 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              Payment Successful
            </span>
            <h1 className="font-serif text-3xl font-bold text-sage-800 pt-2">Order Confirmed!</h1>
            <p className="text-sm text-sage-500">
              Thank you for choosing NEVA. Your skin is about to get upgraded!
            </p>
          </div>

          {/* Order ID & Payment ID */}
          <div className="grid grid-cols-2 gap-4 bg-sage-50 p-4 rounded-xl border border-sage-100 text-xs font-medium text-sage-800 max-w-md mx-auto">
            <div>
              <p className="text-sage-500 text-[10px] uppercase tracking-wider">Order ID</p>
              <p className="font-bold text-sm mt-0.5">{order.orderId}</p>
            </div>
            <div className="border-l border-sage-200">
              <p className="text-sage-500 text-[10px] uppercase tracking-wider">Razorpay Payment ID</p>
              <p className="font-mono text-sm mt-0.5 truncate px-2">{order.paymentId}</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Tracking CTA */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center justify-center sm:justify-start gap-2">
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-50" />
              Track your order on WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800/80 leading-relaxed max-w-md">
              Get real-time shipping updates and instant delivery alerts directly in your WhatsApp chat. Click below to message us!
            </p>
          </div>
          <button
            onClick={handleWhatsAppTrack}
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm shrink-0 w-full sm:w-auto cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Track on WhatsApp</span>
          </button>
        </div>

        {/* Invoice / Receipt Section */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-sage-100 shadow-xs space-y-6">
          <h3 className="font-serif text-lg font-bold text-sage-800 border-b border-sage-100 pb-3">
            Invoice Receipt
          </h3>

          {/* Meta Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-sage-600">
            <div className="space-y-1">
              <p className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sage-400" />
                <span><strong>Date:</strong> {order.date}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-sage-400" />
                <span><strong>Payment Mode:</strong> Razorpay Online</span>
              </p>
            </div>
            <div className="space-y-1">
              <p><strong>Ship To:</strong></p>
              <p className="text-sage-500 leading-relaxed">
                {order.customer.firstName} {order.customer.lastName}<br />
                {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.zipCode}
              </p>
            </div>
          </div>

          {/* Items Summary Table */}
          <div className="border-t border-sage-100 pt-6 space-y-4">
            <h4 className="font-bold text-xs text-sage-800 uppercase tracking-wider">Ordered Products</h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-sage-800">{item.product.name}</p>
                    <p className="text-[10px] text-sage-500">
                      Weight: {item.product.weight} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-sage-800">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="border-t border-sage-100 pt-4 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-sage-600">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-sage-600">
              <span>Shipping Fee</span>
              <span>
                {order.shippingFee === 0 ? (
                  <span className="text-green-600 uppercase font-semibold text-xs">Free</span>
                ) : (
                  `₹${order.shippingFee}`
                )}
              </span>
            </div>
            <div className="border-t border-dashed border-sage-200 pt-3 flex justify-between text-base font-bold text-sage-800">
              <span>Total Paid</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sage-700 hover:text-sage-950 font-medium text-sm flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
          <p className="text-xs text-sage-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Invoice generated securely. Confirmation email sent.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
