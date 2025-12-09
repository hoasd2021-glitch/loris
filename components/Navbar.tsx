import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, Zap, Settings, Store, Heart, Banknote, User as UserIcon, LogOut, X, Home, Package } from 'lucide-react';
import { APP_NAME } from '../constants';
import { ViewState, Currency, User } from '../types';

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
  onCartClick: () => void;
  onFavoritesClick: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  favoritesCount,
  onCartClick, 
  onFavoritesClick,
  searchTerm, 
  onSearchChange,
  currentView,
  onNavigate,
  currency,
  onToggleCurrency,
  currentUser,
  onLoginClick,
  onLogoutClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigate = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <div className="bg-primary p-1.5 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">{APP_NAME}</span>
          </div>

          {/* Search Bar - Only show in Home view or Favorites */}
          <div className={`flex-1 max-w-lg mx-4 transition-opacity duration-200 ${currentView === ViewState.ADMIN ? 'opacity-0 pointer-events-none hidden md:block' : 'opacity-100 hidden md:block'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                disabled={currentView === ViewState.ADMIN}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
             {/* Currency Toggle */}
             <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors hidden sm:flex"
              title="تغيير العملة"
            >
              <Banknote className="w-4 h-4" />
              <span>{currency === 'SAR' ? 'ر.س' : 'USD'}</span>
            </button>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            {/* Admin Toggle */}
            <button
              onClick={() => onNavigate(currentView === ViewState.ADMIN ? ViewState.HOME : ViewState.ADMIN)}
              className={`p-2 rounded-full transition-colors focus:outline-none flex items-center gap-2 hidden sm:flex ${
                currentView === ViewState.ADMIN 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:text-primary hover:bg-blue-50'
              }`}
              title={currentView === ViewState.ADMIN ? "العودة للمتجر" : "لوحة المشرف"}
            >
              {currentView === ViewState.ADMIN ? (
                <>
                  <Store className="h-6 w-6" />
                  <span className="text-sm font-bold hidden sm:inline">المتجر</span>
                </>
              ) : (
                <Settings className="h-6 w-6" />
              )}
            </button>

            {/* Favorites Button */}
            <button
              onClick={onFavoritesClick}
              className={`relative p-2 rounded-full transition-colors focus:outline-none ${
                currentView === ViewState.FAVORITES 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
              }`}
              aria-label="المفضلة"
            >
              <Heart className={`h-6 w-6 ${currentView === ViewState.FAVORITES ? 'fill-current' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full min-w-[18px]">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors focus:outline-none"
              aria-label="عربة التسوق"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Login/Profile */}
            {currentUser ? (
              <div className="relative group hidden sm:block">
                <button 
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  title={currentUser.name}
                >
                   <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                   </div>
                   <span className="text-xs font-bold text-gray-700 max-w-[80px] truncate hidden sm:block">{currentUser.name}</span>
                </button>
                {/* Dropdown for Logout */}
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 hidden group-hover:block animate-fade-in p-1">
                   <div className="p-3 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                   </div>
                   <button
                      onClick={() => onNavigate(ViewState.PROFILE)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                   >
                      <UserIcon className="w-4 h-4" />
                      ملفي الشخصي
                   </button>
                   <button 
                      onClick={onLogoutClick}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                   >
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                   </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-primary transition-colors text-sm font-bold shadow-sm hidden sm:flex"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">دخول</span>
              </button>
            )}
            
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
                <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden sm:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 animate-slide-in-left">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <span className="text-lg font-bold text-gray-900">القائمة</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-4 flex-1 overflow-y-auto space-y-2">
                    <button onClick={() => handleMobileNavigate(ViewState.HOME)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                        <Home className="w-5 h-5 text-gray-400" />
                        الرئيسية
                    </button>
                    {currentUser && (
                        <button onClick={() => handleMobileNavigate(ViewState.PROFILE)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                            ملفي الشخصي
                        </button>
                    )}
                    <button onClick={() => handleMobileNavigate(ViewState.FAVORITES)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                        <Heart className="w-5 h-5 text-gray-400" />
                        المفضلة
                    </button>
                    <button onClick={() => handleMobileNavigate(currentView === ViewState.ADMIN ? ViewState.HOME : ViewState.ADMIN)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                        {currentView === ViewState.ADMIN ? <Store className="w-5 h-5 text-gray-400" /> : <Settings className="w-5 h-5 text-gray-400" />}
                        {currentView === ViewState.ADMIN ? 'المتجر' : 'لوحة المشرف'}
                    </button>
                    <div className="border-t border-gray-100 my-2 pt-2">
                        <button onClick={onToggleCurrency} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                            <Banknote className="w-5 h-5 text-gray-400" />
                            العملة: {currency === 'SAR' ? 'ريال سعودي' : 'دولار أمريكي'}
                        </button>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                    {currentUser ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                    {currentUser.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{currentUser.name}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[120px]">{currentUser.email}</p>
                                </div>
                            </div>
                            <button onClick={onLogoutClick} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => {
                                onLoginClick();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold"
                        >
                            تسجيل الدخول
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;