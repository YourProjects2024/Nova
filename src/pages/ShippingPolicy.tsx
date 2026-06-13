import React from 'react';
import { Truck } from 'lucide-react';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-sage-100 shadow-xs space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-sage-50 text-sage-700 flex items-center justify-center mx-auto">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-sage-800">Shipping Policy</h1>
          <p className="text-xs text-sage-500">Last Updated: March 2025</p>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="text-sage-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Thank you for shopping at <strong>NEVA</strong>. We are dedicated to delivering your organic skincare products in a quick, safe, and efficient manner. Below are the terms and conditions that constitute our Shipping Policy.
          </p>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">1. Shipping Coverage</h3>
            <p>
              We provide Pan-India shipping to almost all pin codes. If your location is not serviceable by our courier partners, we will contact you to find an alternative solution or issue a full refund.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">2. Processing & Dispatch Times</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li>All orders are processed and dispatched within <strong>24 to 48 hours</strong> of order confirmation (excluding Sundays and National Holidays).</li>
              <li>Orders placed before 12:00 PM are generally dispatched on the same day.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">3. Delivery Timelines</h3>
            <p>
              Once dispatched, delivery times depend on your location:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li><strong>Metro Cities:</strong> 2 to 4 business days.</li>
              <li><strong>Rest of India:</strong> 4 to 7 business days.</li>
              <li>Please note that extreme weather conditions, natural disasters, or festival seasons may cause unforeseen delays.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">4. Shipping Charges</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li>We offer <strong>FREE Shipping</strong> on all orders of <strong>₹499 and above</strong>.</li>
              <li>For orders below ₹499, a flat shipping charge of <strong>₹50</strong> will be applied at checkout.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">5. Order Tracking</h3>
            <p>
              Once your package is shipped, you will receive a tracking link via SMS and Email. You can also track your order directly by contacting us on WhatsApp at <strong>+91 9998318359</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">6. Contact Us</h3>
            <p>
              For any questions regarding your shipment, feel free to reach out:
            </p>
            <p className="bg-sage-50 p-4 rounded-lg border border-sage-100 text-xs sm:text-sm font-medium">
              <strong>Email:</strong> services.neva@gmail.com<br />
              <strong>WhatsApp Support:</strong> +91 9998318359
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
