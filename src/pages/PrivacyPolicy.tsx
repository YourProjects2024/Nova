import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-sage-100 shadow-xs space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-sage-50 text-sage-700 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-sage-800">Privacy Policy</h1>
          <p className="text-xs text-sage-500">Last Updated: March 2025</p>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="text-sage-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>NEVA</strong>, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit and purchase from our website.
          </p>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">1. Information We Collect</h3>
            <p>
              When you place an order, create an account, or subscribe to our newsletter, we collect the following personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li>Contact details: Name, Email Address, and Phone Number.</li>
              <li>Delivery details: Shipping Address and Billing Address.</li>
              <li>Payment details: Processed securely through our payment gateway partner, Razorpay. We do not store your credit card or bank account details on our servers.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">2. How We Use Your Information</h3>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-sage-600">
              <li>To process, ship, and deliver your skincare orders.</li>
              <li>To communicate with you regarding your order status, tracking, and customer support.</li>
              <li>To send you skincare tips, exclusive deals, and product updates (if you opt-in to our newsletter).</li>
              <li>To improve our website performance, user experience, and customer service.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">3. Information Security</h3>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. All transactions are processed through a secure SSL-encrypted payment gateway (Razorpay) and are not stored or processed on our servers.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">4. Cookies and Tracking</h3>
            <p>
              We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic so that we can offer better site experiences in the future.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sage-800 text-lg">5. Contact Us</h3>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please reach out to us at:
            </p>
            <p className="bg-sage-50 p-4 rounded-lg border border-sage-100 text-xs sm:text-sm font-medium">
              <strong>Email:</strong> services.neva@gmail.com<br />
              <strong>Phone:</strong> +91 9998318359
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
