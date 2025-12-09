import React, { useState } from 'react';
import { X, CreditCard, MapPin, Phone, User, CheckCircle, Loader2 } from 'lucide-react';
import { CartItem, Currency, ShippingOption } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  currency: Currency;
  exchangeRate: number;
  shippingOption: ShippingOption;
  onPlaceOrder: (address: string, payment: string) => Promise<void>;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  currency,
  exchangeRate,
  shippingOption,
  onPlaceOrder
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const displayTotal = currency === 'SAR' 
    ? totalAmount 
    : (totalAmount / exchangeRate).toFixed(2);
  
  const currencySymbol = currency === 'SAR' ? 'ر.س' : '$';

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await onPlaceOrder(
      `${formData.address}, ${formData.city}`, 
      `Credit Card ending in ${formData.cardNumber.slice(-4) || '0000'}`
    );
    
    setLoading(false);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 'details' ? 'تفاصيل الشحن' : step === 'payment' ? 'الدفع' : 'تم الطلب بنجاح'}
          </h2>
          {step !== 'success' && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'details' && (
            <form id="shipping-form" onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="text" 
                      className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      placeholder="محمد علي"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رقم الجوال</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="tel" 
                      className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">العنوان</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    required 
                    type="text" 
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder="اسم الشارع، الحي"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">المدينة</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  placeholder="الرياض"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form id="payment-form" onSubmit={handlePayment} className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center text-blue-800">
                <span className="font-bold">المبلغ الإجمالي للدفع:</span>
                <span className="text-xl font-bold dir-ltr">{currencySymbol} {displayTotal}</span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">رقم البطاقة</label>
                  <div className="relative">
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required 
                      type="text" 
                      maxLength={19}
                      className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dir-ltr"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">تاريخ الانتهاء</label>
                    <input 
                      required 
                      type="text" 
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dir-ltr text-center"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={e => setFormData({...formData, expiry: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">رمز الأمان (CVV)</label>
                    <input 
                      required 
                      type="text" 
                      maxLength={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none dir-ltr text-center"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={e => setFormData({...formData, cvv: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">تم الطلب بنجاح!</h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                شكراً لطلبك. تم استلام الطلب وسيتم البدء في تجهيزه فوراً. يمكنك متابعة حالة الطلب من صفحة ملفك الشخصي.
              </p>
              <button 
                onClick={onClose}
                className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
              >
                مواصلة التسوق
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 'success' && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            {step === 'payment' ? (
              <button 
                onClick={() => setStep('details')}
                className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors"
              >
                رجوع
              </button>
            ) : (
              <div>
                <p className="text-xs text-gray-500 font-bold">الإجمالي</p>
                <p className="text-lg font-bold text-primary dir-ltr">{currencySymbol} {displayTotal}</p>
              </div>
            )}
            
            <button 
              form={step === 'details' ? 'shipping-form' : 'payment-form'}
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-primary hover:bg-secondary text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {step === 'details' ? 'متابعة للدفع' : 'تأكيد الطلب'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;