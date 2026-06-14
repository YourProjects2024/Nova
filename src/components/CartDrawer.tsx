import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 499;
  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  const handleWhatsAppCheckout = () => {
    const phoneNumber = '919998318359';
    let itemDetails = '';
    cartItems.forEach((item) => {
      itemDetails += `• ${item.quantity}x ${item.product.name} (${item.product.weight}) - ₹${item.product.price * item.quantity}\n`;
    });

    const shippingText = isFreeShipping ? 'FREE' : '₹50';
    const finalTotal = isFreeShipping ? cartTotal : cartTotal + 50;

    const message = `Hi NEVA team, I want to buy these products from your store:\n\n${itemDetails}\nSubtotal: ₹${cartTotal}\nShipping: ${shippingText}\nTotal: ₹${finalTotal}\n\nPlease help me complete my order!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 z-50 shadow-2xl flex flex-col h-full border-l border-sage-100"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-sage-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-sage-700" />
                <h2 className="font-serif text-xl font-bold text-sage-800">Your Cart</h2>
                <span className="bg-sage-100 text-sage-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-sage-500 hover:text-sage-800 hover:bg-sage-50 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            {cartCount > 0 && (
              <div className="bg-sage-50 p-4 border-b border-sage-100">
                <div className="text-xs font-medium text-sage-800 mb-2 flex justify-between">
                  {isFreeShipping ? (
                    <span className="text-green-700 font-semibold flex items-center gap-1">
                      🎉 Congratulations! You get FREE Shipping
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-gold-600">₹{amountToFreeShipping}</strong> more for FREE Shipping!
                    </span>
                  )}
                  <span>₹{cartTotal} / ₹{FREE_SHIPPING_THRESHOLD}</span>
                </div>
                <div className="w-full bg-sage-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? 'bg-green-600' : 'bg-gold-500'
                    }`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                  <div className="w-20 h-20 rounded-full bg-sage-50 flex items-center justify-center mb-4 border border-sage-100">
                    <ShoppingBag className="w-10 h-10 text-sage-300" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-sage-800 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-sage-600 max-w-xs mb-8">
                    It looks like you haven't added any products yet. Let's find something for your skin!
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      const bestsellers = document.getElementById('bestsellers');
                      if (bestsellers) {
                        bestsellers.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigate('/');
                      }
                    }}
                    className="bg-sage-700 text-cream-50 text-sm font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-sage-800 transition-colors cursor-pointer"
                  >
                    Shop Bestsellers
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-white p-4 rounded-xl border border-sage-100 shadow-xs relative group"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-sage-50 rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-sage-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-serif font-bold text-sage-800 text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-sage-500 mb-2">{item.product.weight}</p>
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-sage-200 rounded-md bg-cream-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-sage-600 hover:text-sage-900 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-sage-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-sage-600 hover:text-sage-900 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Price */}
                        <span className="text-sm font-bold text-sage-800">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="absolute top-4 right-4 text-sage-400 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-sage-100 bg-white space-y-4 shadow-inner">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-sage-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-sage-800">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-sage-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-sage-800">
                      {isFreeShipping ? (
                        <span className="text-green-600 uppercase font-semibold text-xs">Free</span>
                      ) : (
                        '₹50'
                      )}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-sage-200 pt-2 flex justify-between text-base font-bold text-sage-800">
                    <span>Estimated Total</span>
                    <span>₹{isFreeShipping ? cartTotal : cartTotal + 50}</span>
                  </div>
                </div>

                {/* Checkout CTA Buttons */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full bg-sage-700 hover:bg-sage-800 text-cream-50 font-semibold py-3.5 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm group cursor-pointer"
                  >
                    <span>Secure Checkout (Online Payment)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Order via WhatsApp</span>
                  </button> */}
                </div>

                <p className="text-center text-[10px] text-sage-400">
                  🔒 Secure SSL checkout • 100% genuine products
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
