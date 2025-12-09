import React from 'react';
import { Plus, Heart, Star } from 'lucide-react';
import { Product, Currency } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
  currency: Currency;
  exchangeRate: number;
  onClick?: (product: Product) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isFavorite, 
  onAddToCart, 
  onToggleFavorite,
  currency,
  exchangeRate,
  onClick,
  onShowToast
}) => {
  const isOutOfStock = product.stock === 0;
  const rating = product.rating || 0;

  const displayPrice = currency === 'SAR' 
    ? product.price 
    : (product.price / exchangeRate).toFixed(2);
  
  const currencySymbol = currency === 'SAR' ? 'ر.س' : '$';

  return (
    <div 
        onClick={() => onClick && onClick(product)}
        className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative cursor-pointer ${isOutOfStock ? 'opacity-75' : ''}`}
    >
      
      {/* Favorite Button (Floating) */}
      <button 
        onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
            onShowToast(isFavorite ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة للمفضلة', 'info');
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:bg-white transition-all transform hover:scale-110 active:scale-95 group/fav"
        title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      >
        <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/fav:text-red-500'}`} />
      </button>

      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${isOutOfStock ? 'grayscale' : ''}`}
        />
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                <span className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg transform -rotate-12 border-2 border-white">
                    نفذت الكمية
                </span>
            </div>
        )}

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm z-10">
          {product.category}
        </div>
        
        {product.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm z-10">
                +{product.images.length - 1}
            </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors" title={product.name}>{product.name}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
            <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-current' : 'text-gray-200 fill-gray-200'}`} 
                    />
                ))}
            </div>
            {product.brand && <span className="text-xs font-semibold text-gray-400 border-r border-gray-200 pr-2 mr-2">{product.brand}</span>}
        </div>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">{product.description}</p>
        
        {/* Attributes Badges */}
        <div className="flex flex-col gap-2 mb-4">
             {/* Colors */}
            {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-gray-400 font-medium">الألوان:</span>
                    <div className="flex -space-x-1.5 space-x-reverse items-center">
                        {product.colors.slice(0, 4).map((color, idx) => (
                            <span key={idx} className="w-4 h-4 rounded-full border border-white shadow-sm bg-gray-200 text-[8px] flex items-center justify-center overflow-hidden" title={color} style={{backgroundColor: ['أبيض', 'white'].includes(color) ? '#fff' : ['أسود', 'black'].includes(color) ? '#000' : color}}>
                                {!['أبيض', 'أسود', 'white', 'black', 'red', 'blue', 'green'].some(c => color.includes(c)) && color.charAt(0)}
                            </span>
                        ))}
                        {product.colors.length > 4 && (
                            <span className="text-[10px] text-gray-400 pr-1">+{product.colors.length - 4}</span>
                        )}
                    </div>
                </div>
            )}
             {/* Sizes */}
             {product.sizes && product.sizes.length > 0 && (
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-gray-400 font-medium">المقاسات:</span>
                    <div className="flex gap-1 flex-wrap">
                        {product.sizes.slice(0, 3).map((size, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-[9px] text-gray-600 font-medium">
                            {size}
                            </span>
                        ))}
                        {product.sizes.length > 3 && (
                            <span className="text-[10px] text-gray-400">...</span>
                        )}
                    </div>
                </div>
            )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-xl font-bold text-primary dir-ltr">
            {currency === 'USD' && <span className="text-sm font-normal text-gray-500 mr-1">$</span>}
            {displayPrice}
            {currency === 'SAR' && <span className="text-sm font-normal text-gray-500 mr-1"> ر.س</span>}
          </span>
          
          <button
            onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
                onShowToast('تمت الإضافة للسلة بنجاح', 'success');
            }}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200 text-sm font-medium active:scale-95 ${
                isOutOfStock 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-900 hover:bg-primary text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            {isOutOfStock ? 'نفذت' : 'أضف للسلة'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;