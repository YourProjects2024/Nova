import React, { useState, useEffect } from 'react';
import { X, Shield, CreditCard, Smartphone, Landmark, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  email: string;
  phone: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  amount,
  email,
  phone,
  onSuccess,
  onFailure
}) => {
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [step, setStep] = useState<'details' | 'processing' | 'otp' | 'success'>('details');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMethod('upi');
      setStep('details');
      setUpiId('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setCardName('');
      setSelectedBank('');
      setSelectedWallet('');
      setOtp('');
      setError('');
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    setError('');
    if (method === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setError('Please enter a valid UPI ID (e.g., name@okaxis)');
        return false;
      }
    } else if (method === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      if (!cardExpiry || !cardExpiry.includes('/')) {
        setError('Please enter card expiry in MM/YY format');
        return false;
      }
      if (cardCvv.length < 3) {
        setError('Please enter a valid 3-digit CVV');
        return false;
      }
      if (!cardName.trim()) {
        setError('Please enter cardholder name');
        return false;
      }
    } else if (method === 'netbanking') {
      if (!selectedBank) {
        setError('Please select a bank to proceed');
        return false;
      }
    } else if (method === 'wallet') {
      if (!selectedWallet) {
        setError('Please select a wallet to proceed');
        return false;
      }
    }
    return true;
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStep('processing');

    // Simulate payment processing steps
    setTimeout(() => {
      if (method === 'card') {
        // Cards usually require OTP
        setStep('otp');
      } else {
        // UPI, Netbanking, Wallets can succeed directly
        const mockPaymentId = `pay_NEVA${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
        onSuccess(mockPaymentId);
      }
    }, 2000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Please enter a valid 4 or 6 digit OTP');
      return;
    }

    setStep('processing');
    setError('');

    setTimeout(() => {
      const mockPaymentId = `pay_NEVA${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
      onSuccess(mockPaymentId);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (step !== 'processing') onClose();
          }}
          className="fixed inset-0 bg-slate-900 cursor-pointer"
        />

        {/* Razorpay Styled Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden z-50 border border-slate-200"
        >
          {/* Header */}
          <div className="bg-[#182030] text-white p-5 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="bg-[#3399cc] p-1.5 rounded-lg text-white font-serif font-extrabold text-sm tracking-wider">
                RP
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">NEVA PERSONAL CARE</h3>
                <p className="text-[10px] text-slate-400">Trusted by 10 Lakh+ Businesses</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Amount</p>
              <p className="text-base font-bold text-[#3399cc]">₹{amount.toFixed(2)}</p>
            </div>
            {step !== 'processing' && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Secure Payment bar */}
          <div className="bg-[#f0f4f9] px-5 py-2 flex items-center justify-between border-b border-slate-100 text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              100% Secure Checkout
            </span>
            <span className="text-slate-400">Razorpay Secure</span>
          </div>

          {/* Body */}
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg flex items-start gap-2.5 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {step === 'details' && (
              <div className="grid grid-cols-4 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => { setMethod('upi'); setError(''); }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    method === 'upi'
                      ? 'border-[#3399cc] bg-sky-50/50 text-[#3399cc] font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMethod('card'); setError(''); }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    method === 'card'
                      ? 'border-[#3399cc] bg-sky-50/50 text-[#3399cc] font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMethod('netbanking'); setError(''); }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    method === 'netbanking'
                      ? 'border-[#3399cc] bg-sky-50/50 text-[#3399cc] font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Landmark className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">Netbanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMethod('wallet'); setError(''); }}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    method === 'wallet'
                      ? 'border-[#3399cc] bg-sky-50/50 text-[#3399cc] font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Wallet className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">Wallets</span>
                </button>
              </div>
            )}

            {/* Step: Details Form */}
            {step === 'details' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {/* Method: UPI */}
                {method === 'upi' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">Enter UPI ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., success@upi, user@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc]"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">A payment request will be sent to your UPI app.</p>

                    {/* Quick Suggestions */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map((suf) => (
                        <button
                          key={suf}
                          type="button"
                          onClick={() => {
                            const name = upiId.split('@')[0] || 'customer';
                            setUpiId(name + suf);
                          }}
                          className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md hover:bg-slate-200 cursor-pointer"
                        >
                          {suf}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Method: Card */}
                {method === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(formatted);
                        }}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (val.length >= 2) {
                              setCardExpiry(val.slice(0, 2) + '/' + val.slice(2));
                            } else {
                              setCardExpiry(val);
                            }
                          }}
                          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] uppercase"
                      />
                    </div>
                  </div>
                )}

                {/* Method: Netbanking */}
                {method === 'netbanking' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">Select Your Bank</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'sbi', name: 'State Bank of India' },
                        { id: 'hdfc', name: 'HDFC Bank' },
                        { id: 'icici', name: 'ICICI Bank' },
                        { id: 'axis', name: 'Axis Bank' }
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id)}
                          className={`border p-2.5 rounded-lg text-left text-xs font-medium truncate transition-all cursor-pointer ${
                            selectedBank === bank.id
                              ? 'border-[#3399cc] bg-sky-50 text-[#3399cc]'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {bank.name}
                        </button>
                      ))}
                    </div>
                    <div>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] bg-white mt-2"
                      >
                        <option value="">-- Other Popular Banks --</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="bob">Bank of Baroda</option>
                        <option value="yes">YES Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Method: Wallet */}
                {method === 'wallet' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">Select Wallet</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'phonepe', name: 'PhonePe Wallet' },
                        { id: 'paytm', name: 'Paytm Wallet' },
                        { id: 'amazon', name: 'Amazon Pay' },
                        { id: 'mobikwik', name: 'MobiKwik' }
                      ].map((wallet) => (
                        <button
                          key={wallet.id}
                          type="button"
                          onClick={() => setSelectedWallet(wallet.id)}
                          className={`border p-3 rounded-lg text-left text-xs font-medium transition-all cursor-pointer ${
                            selectedWallet === wallet.id
                              ? 'border-[#3399cc] bg-sky-50 text-[#3399cc]'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {wallet.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Payment */}
                <button
                  type="submit"
                  className="w-full bg-[#3399cc] hover:bg-[#2c85b2] text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all text-sm tracking-wide mt-6 flex items-center justify-center gap-1 cursor-pointer"
                >
                  Pay ₹{amount.toFixed(2)}
                </button>
              </form>
            )}

            {/* Step: OTP Screen */}
            {step === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-4 py-4 text-center">
                <div className="w-12 h-12 bg-sky-50 text-[#3399cc] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">Enter OTP</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  A verification code has been sent to the phone registered with your card. Enter <strong>1234</strong> for testing.
                </p>

                <div className="max-w-[180px] mx-auto">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full border-2 border-slate-300 rounded-lg p-3 text-center text-lg font-bold tracking-widest focus:outline-hidden focus:border-[#3399cc]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all text-sm tracking-wide mt-6 cursor-pointer"
                >
                  Confirm & Pay ₹{amount.toFixed(2)}
                </button>
              </form>
            )}

            {/* Step: Processing Screen */}
            {step === 'processing' && (
              <div className="py-12 text-center space-y-6">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#3399cc] animate-spin" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Processing Payment...</h4>
                  <p className="text-xs text-slate-500 mt-1">Please do not close this window or press back.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer branding */}
          <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between text-[10px] text-slate-400">
            <span>Powered by Razorpay</span>
            <span>PCI-DSS Compliant</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
