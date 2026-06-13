import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const phoneNumber = '+919998318359';
  const message = encodeURIComponent('Hi NEVA team, I am visiting your website and would like to know more about your organic skincare products.');
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba59] transition-all duration-300 transform hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="absolute right-14 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-100">
        Chat with us!
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </a>
  );
};
