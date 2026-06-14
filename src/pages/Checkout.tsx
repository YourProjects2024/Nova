import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShieldCheck, Mail, Phone, User, MapPin, CreditCard, Lock, HelpCircle } from 'lucide-react';
import {
  createRazorpayOrder,
  isRazorpayConfigured,
  loadRazorpayCheckout,
  openRazorpayCheckout,
  razorpayKeyId,
  verifyRazorpayPayment,
} from '../lib/razorpay';

export const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isPaymentStarting, setIsPaymentStarting] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 499;
  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : 50;
  const grandTotal = cartTotal + shippingFee;
  const checkoutItems = cartItems.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\s+\.\s+/.test(formData.email) && !formData.email.includes('@')) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.address.trim()) errors.address = 'Shipping address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zipCode.trim() || formData.zipCode.replace(/\D/g, '').length < 6) {
      errors.zipCode = 'Enter a valid 6-digit PIN code';
    }

    if (!isRazorpayConfigured) {
      errors.payment = 'Razorpay is not configured. Add VITE_RAZORPAY_KEY_ID and deploy the Supabase payment function.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(formErrors)[0];
      if (firstErrorKey) {
        const el = document.getElementsByName(firstErrorKey)[0];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsPaymentStarting(true);
    const orderId = `NEVA-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await loadRazorpayCheckout();

      const { data: razorpayOrder, error } = await createRazorpayOrder(checkoutItems, orderId);

      if (error || !razorpayOrder) {
        throw new Error(error?.message || 'Could not create Razorpay order.');
      }

      openRazorpayCheckout({
        key: razorpayKeyId!,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'NEVA Personal Care',
        description: `Order ${orderId}`,
        image: '/Nova/nova.PNG',
        order_id: razorpayOrder.order_id,
        method: 'upi',
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          order_id: orderId,
          customer_email: formData.email,
        },
        theme: {
          color: '#5f7464',
        },
        handler: (response) => {
          handlePaymentSuccess(orderId, response.razorpay_payment_id, response);
        },
        modal: {
          ondismiss: () => setIsPaymentStarting(false),
        },
      }, () => {
        setFormErrors((current) => ({
          ...current,
          payment: 'Payment failed. Please try again or choose another payment method.',
        }));
        setIsPaymentStarting(false);
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not start Razorpay checkout.';
      setFormErrors((current) => ({ ...current, payment: message }));
      setIsPaymentStarting(false);
    }
  };

  const handlePaymentSuccess = async (
    orderId: string,
    paymentId: string,
    paymentResponse?: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    },
  ) => {
    // Save order details to sessionStorage to display on success page
    const orderData = {
      orderId,
      paymentId,
      customer: formData,
      items: cartItems,
      subtotal: cartTotal,
      shippingFee,
      total: grandTotal,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    if (paymentResponse) {
      const { error } = await verifyRazorpayPayment(paymentResponse, {
        receipt: orderId,
        customer: formData,
        items: checkoutItems,
      });

      if (error) {
        console.error('Failed to verify Razorpay payment:', error);
        alert(`Payment verification failed.\n\nReason: ${error.message}\n\nPlease contact NEVA support with your payment ID.`);
        setIsPaymentStarting(false);
        return;
      }
    }

    sessionStorage.setItem('neva_latest_order', JSON.stringify(orderData));

    // Clear cart
    clearCart();

    // Redirect to success page
    setIsPaymentStarting(false);
    navigate('/order-success');
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream-50 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4 border border-sage-200">
          <Lock className="w-8 h-8 text-sage-600" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-sage-800 mb-2">No items to checkout</h2>
        <p className="text-sage-600 text-sm max-w-sm mb-6">
          Your cart is empty. Add products to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-sage-700 hover:bg-sage-800 text-cream-50 text-sm font-semibold px-6 py-3 rounded-lg shadow-md transition-colors cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sage-700 hover:text-sage-950 font-medium text-sm mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-sage-100 shadow-xs space-y-8">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sage-800 mb-2">Secure Checkout</h1>
              <p className="text-xs text-sage-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> All transmissions are SSL encrypted.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Details */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-sage-800 text-lg border-b border-sage-100 pb-2">
                  Shipping Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-sage-400" /> First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                        formErrors.firstName ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="text-rose-500 text-[10px] mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                        formErrors.lastName ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="text-rose-500 text-[10px] mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-sage-400" /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={`w-full border rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                        formErrors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-rose-500 text-[10px] mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-sage-400" /> Phone Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-sm text-sage-400 font-medium">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        maxLength={10}
                        placeholder="9998318359"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData((prev) => ({ ...prev, phone: val }));
                        }}
                        className={`w-full border rounded-lg p-2.5 pl-12 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                          formErrors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-rose-500 text-[10px] mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sage-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sage-400" /> Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="House No, Apartment, Street, Locality"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                      formErrors.address ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-rose-500 text-[10px] mt-1">{formErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                        formErrors.city ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-rose-500 text-[10px] mt-1">{formErrors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                        formErrors.state ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                      }`}
                    />
                    {formErrors.state && (
                      <p className="text-rose-500 text-[10px] mt-1">{formErrors.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-sage-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      maxLength={6}
                      value={formData.zipCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setFormData((prev) => ({ ...prev, zipCode: val }));
                      }}
                      className={`w-full border rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 ${
                        formErrors.zipCode ? 'border-rose-400 focus:ring-rose-200' : 'border-sage-200'
                      }`}
                    />
                    {formErrors.zipCode && (
                      <p className="text-rose-500 text-[10px] mt-1">{formErrors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-sage-50 p-5 rounded-xl border border-sage-200 space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-sage-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-sage-800">Secure Razorpay Payment</h4>
                    <p className="text-xs text-sage-600 leading-relaxed mt-0.5">
                      Pay safely with UPI, cards, netbanking, and wallets. Your order is saved only after Razorpay confirms the payment.
                    </p>
                  </div>
                </div>

                {formErrors.payment && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-lg px-3 py-2 text-xs">
                    {formErrors.payment}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPaymentStarting}
                className="w-full bg-sage-700 hover:bg-sage-800 disabled:opacity-60 disabled:cursor-not-allowed text-cream-50 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm tracking-wide cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>{isPaymentStarting ? 'Opening Razorpay...' : `Proceed to Pay ₹${grandTotal.toFixed(2)}`}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-xs space-y-6">
              <h3 className="font-serif font-bold text-sage-800 text-lg border-b border-sage-100 pb-2">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center justify-between">
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="w-12 h-12 bg-sage-50 rounded-lg p-1 flex items-center justify-center shrink-0 border border-sage-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="truncate">
                        <h4 className="font-serif font-bold text-sage-800 text-xs truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-sage-500">
                          Qty: {item.quantity} • {item.product.weight}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-sage-800 shrink-0">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="border-t border-sage-100 pt-4 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-sage-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-sage-800">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sage-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-sage-800">
                    {isFreeShipping ? (
                      <span className="text-green-600 uppercase font-semibold text-xs">Free</span>
                    ) : (
                      '₹50'
                    )}
                  </span>
                </div>
                <div className="border-t border-dashed border-sage-200 pt-3 flex justify-between text-base font-bold text-sage-800">
                  <span>Total Amount</span>
                  <span className="text-sage-800">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Support / Help card */}
            <div className="bg-sage-100/50 p-6 rounded-2xl border border-sage-200 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sage-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-sage-800">Online Payment Only</h4>
                  <p className="text-xs text-sage-600 leading-relaxed mt-1">
                    To maintain hygiene and ensure contact-free shipping, we only accept secure online payments via Razorpay (UPI, Cards, Netbanking, Wallets). Cash on Delivery is currently unavailable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
