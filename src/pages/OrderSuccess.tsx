import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Calendar, CreditCard, ShieldCheck, ShoppingBag, Download } from 'lucide-react';
import logoImage from '../assets/nova.png';

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
    const productSummary = order.items
      .map((item) => `- ${item.product.name} (${item.product.weight}) x ${item.quantity}: ₹${item.product.price * item.quantity}`)
      .join('\n');
    const message = `Hi NEVA team, I want to track my order.

Order ID: ${order.orderId}
Payment ID: ${order.paymentId}
Order Date: ${order.date}

Customer:
${order.customer.firstName} ${order.customer.lastName}
Phone: +91 ${order.customer.phone}
Email: ${order.customer.email}

Shipping Address:
${order.customer.address}
${order.customer.city}, ${order.customer.state} - ${order.customer.zipCode}

Products:
${productSummary}

Subtotal: ₹${order.subtotal}
Shipping: ${order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee}`}
Total Paid: ₹${order.total}

Please share the tracking/status update for this order.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const pdfText = (value: string | number) =>
    String(value)
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');

  const loadLogoForPdf = () =>
    new Promise<{ binary: string; width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Could not prepare invoice logo.'));
          return;
        }

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        const binary = atob(dataUrl.split(',')[1]);
        resolve({ binary, width: canvas.width, height: canvas.height });
      };
      image.onerror = () => reject(new Error('Could not load invoice logo.'));
      image.src = logoImage;
    });

  const buildInvoicePdf = async () => {
    const logo = await loadLogoForPdf();
    const content: string[] = [];
    const write = (text: string | number, x: number, y: number, size = 10) => {
      content.push(`BT /F1 ${size} Tf ${x} ${y} Td (${pdfText(text)}) Tj ET`);
    };
    const line = (x1: number, y1: number, x2: number, y2: number) => {
      content.push(`${x1} ${y1} m ${x2} ${y2} l S`);
    };
    content.push('q 44 0 0 44 54 752 cm /Logo Do Q');
    write('NEVA', 116, 786, 26);
    write('Personal Care', 118, 768, 11);
    write('Certified organic, paraben-free and cruelty-free skincare', 118, 752, 9);
    write('Email: services.neva@gmail.com', 118, 734, 9);
    write('Phone / WhatsApp: +91 9998318359', 118, 720, 9);
    write('Website: yourprojects2024.github.io/Nova', 118, 706, 9);

    write('Tax Invoice / Receipt', 385, 786, 16);
    write(`Order ID: ${order.orderId}`, 385, 762, 10);
    write(`Payment ID: ${order.paymentId}`, 385, 746, 10);
    write(`Payment Mode: Razorpay Online`, 385, 730, 10);
    write(`Date: ${order.date}`, 385, 714, 10);
    line(50, 690, 545, 690);

    write('Bill To / Ship To', 50, 660, 14);
    write(`${order.customer.firstName} ${order.customer.lastName}`, 50, 640, 11);
    write(`${order.customer.address}, ${order.customer.city}`, 50, 624, 10);
    write(`${order.customer.state} - ${order.customer.zipCode}`, 50, 608, 10);
    write(`Email: ${order.customer.email}`, 50, 592, 10);
    write(`Phone: +91 ${order.customer.phone}`, 50, 576, 10);

    write('Product', 50, 540, 10);
    write('Qty', 330, 540, 10);
    write('Price', 390, 540, 10);
    write('Total', 470, 540, 10);
    line(50, 530, 545, 530);

    let y = 510;
    order.items.forEach((item) => {
      write(item.product.name, 50, y, 10);
      write(item.product.weight, 50, y - 14, 8);
      write(item.quantity, 330, y, 10);
      write(`INR ${item.product.price}`, 390, y, 10);
      write(`INR ${item.product.price * item.quantity}`, 470, y, 10);
      y -= 34;
    });

    line(50, y + 12, 545, y + 12);
    y -= 12;
    write('Subtotal', 360, y, 10);
    write(`INR ${order.subtotal}`, 470, y, 10);
    y -= 18;
    write('Shipping', 360, y, 10);
    write(order.shippingFee === 0 ? 'Free' : `INR ${order.shippingFee}`, 470, y, 10);
    y -= 24;
    line(360, y + 12, 545, y + 12);
    write('Total Paid', 360, y, 12);
    write(`INR ${order.total}`, 470, y, 12);

    write('Thank you for choosing NEVA.', 50, 80, 10);
    write('For support: services.neva@gmail.com | +91 9998318359', 50, 62, 9);

    const stream = content.join('\n');
    const objects = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
      '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> /XObject << /Logo 6 0 R >> >> /Contents 5 0 R >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
      `<< /Type /XObject /Subtype /Image /Width ${logo.width} /Height ${logo.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logo.binary.length} >>\nstream\n${logo.binary}\nendstream`,
    ];

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets.push(pdf.length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';
    offsets.slice(1).forEach((offset) => {
      pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return Uint8Array.from(pdf, (character) => character.charCodeAt(0) & 255);
  };

  const handleDownloadInvoice = async () => {
    const blob = new Blob([await buildInvoicePdf()], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEVA-Invoice-${order.orderId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
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
          <div className="border-b border-sage-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="font-serif text-lg font-bold text-sage-800">
              Invoice Receipt
            </h3>
            <button
              type="button"
              onClick={handleDownloadInvoice}
              className="bg-sage-700 hover:bg-sage-800 text-cream-50 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice</span>
            </button>
          </div>

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
