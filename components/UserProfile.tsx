import React from 'react';
import { User, UserOrder, Currency } from '../types';
import { Package, Clock, CheckCircle, Truck, XCircle, User as UserIcon, Calendar, MapPin, CreditCard } from 'lucide-react';

interface UserProfileProps {
  user: User;
  orders: UserOrder[];
  currency: Currency;
  exchangeRate: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, orders, currency, exchangeRate }) => {
  const formatPrice = (price: number) => {
    const val = currency === 'SAR' ? price : price / exchangeRate;
    return `${val.toFixed(2)} ${currency === 'SAR' ? 'ر.س' : '$'}`;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending': return { color: 'bg-amber-100 text-amber-700', icon: Clock, label: 'قيد الانتظار' };
      case 'processing': return { color: 'bg-blue-100 text-blue-700', icon: Package, label: 'قيد التجهيز' };
      case 'shipped': return { color: 'bg-indigo-100 text-indigo-700', icon: Truck, label: 'تم الشحن' };
      case 'delivered': return { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'تم التوصيل' };
      default: return { color: 'bg-gray-100 text-gray-700', icon: XCircle, label: status };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg border-4 border-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                <p className="font-bold mb-1">عضو مميز</p>
                <p className="text-xs opacity-80">شكراً لكونك جزءاً من عائلتنا</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            طلباتي السابقة
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">لا توجد طلبات حتى الآن</h3>
                <p className="text-gray-500">ابدأ التسوق الآن واستمتع بأفضل العروض!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-gray-500">#{order.id.slice(-6)}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
                            <Calendar className="w-3 h-3" />
                            <span className="dir-ltr">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusConfig.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig.label}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-3">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="w-full md:w-64 border-t md:border-t-0 md:border-r border-gray-100 pt-4 md:pt-0 md:pr-6 space-y-3">
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-xs">{order.shippingAddress}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CreditCard className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-xs">{order.paymentMethod}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-100 mt-2">
                                <p className="text-sm text-gray-500 mb-1">الإجمالي</p>
                                <p className="text-xl font-bold text-primary dir-ltr">{formatPrice(order.total)}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;