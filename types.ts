import type React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
  details?: { title: string; value: string }[];
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CartDetailItem extends Product {
  quantity: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number; // Price at the time of purchase
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  items: OrderItem[];
  total: number;
}

export interface ShopBannerData {
  id: string;
  imageUrl: string;
  title_ml: string;
  title_en?: string;
  tagline_ml: string;
  tagline_en?: string;
  bgColor?: string; // Optional background color if image fails or for styling
  textColor?: string; // Optional text color
}