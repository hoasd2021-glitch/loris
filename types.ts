
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand?: string;
  description: string;
  detailedDescription?: string;
  images: string[];
  stock: number;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  reviewsCount?: number;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS',
  CART = 'CART',
  ADMIN = 'ADMIN',
  FAVORITES = 'FAVORITES',
  PROFILE = 'PROFILE'
}

export type Currency = 'SAR' | 'USD';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedDays: string;
}

export interface UserOrder {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: Currency;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: string;
  paymentMethod: string;
}
