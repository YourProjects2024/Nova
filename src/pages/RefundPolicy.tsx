import React from 'react';
import { RefreshCw } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-sage-100 shadow-xs space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-sage-50 text-sage-700 flex items-center justify-center mx-auto">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-sage-800">Return, Replacement & Refund Policy</h1>
          <p className="text-xs text-sage-500">Last Updated: March 2025</p>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="text-sage-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>NEVA</strong>, we stand behind the quality of our organic skincare. However, because our formulations are intimate personal care products, we have strict guidelines for hygiene and safety.
          </p>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">1. Policy Overview</h3>
            <p>
              Due to hygiene and safety reasons, <strong>we do not accept returns or offer refunds/replacements on opened, used, or altered products</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">2. Eligible Cases for Replacement or Refund</h3>
            <p>
              We will gladly issue a replacement or a full refund under the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li><strong>Damaged on Arrival:</strong> The product or its glass bottle was broken or leaked during transit.</li>
              <li><strong>Incorrect Product:</strong> You received a different item from what you ordered (e.g., received cream instead of facewash).</li>
              <li><strong>Defective Product:</strong> The pump, dropper, or packaging is broken and unusable.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">3. Mandatory Claim Requirements</h3>
            <p>
              To process a replacement or refund, you must meet the following criteria within <strong>7 days</strong> of delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li>
                <strong>Unboxing Video:</strong> You must provide a clear, uncut unboxing video showing the sealed package being opened and the damage/defect clearly visible. This is mandatory to prevent fraud.
              </li>
              <li>
                <strong>Unused Condition:</strong> The product must be completely unused, with all original outer box packaging, seals, and labels intact.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">4. How to Submit a Claim</h3>
            <p>
              If your order meets the eligibility criteria, please follow these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li>Send an email to <strong>services.neva@gmail.com</strong> or message us on WhatsApp at <strong>+91 9998318359</strong>.</li>
              <li>Include your Order ID, Date of Purchase, and describe the issue.</li>
              <li>Attach the <strong>unboxing video</strong> and clear photos of the damaged item.</li>
            </ol>
            <p className="text-xs text-sage-500 mt-2">
              Our support team will review your claim and respond within 24 to 48 hours. Once approved, replacements are dispatched immediately. Refunds (if requested) take 5-7 business days to reflect in your original payment method.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">5. Cancellation Policy</h3>
            <p>
              Orders can only be cancelled before they are shipped (usually within 2 hours of placing the order). Once dispatched, orders cannot be cancelled or recalled.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">6. Contact Support</h3>
            <p>
              For immediate assistance regarding returns and refunds, please contact us:
            </p>
            <p className="bg-sage-50 p-4 rounded-lg border border-sage-100 text-xs sm:text-sm font-medium">
              <strong>Email:</strong> services.neva@gmail.com<br />
              <strong>Support Phone / WhatsApp:</strong> +91 9998318359
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
