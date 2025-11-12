import { PRODUCTS, CATEGORIES, ORDERS } from './constants';
import { Product, Category, Order } from './types';

export const fetchCategories = async (): Promise<Category[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return CATEGORIES;
};

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return PRODUCTS;
};

export const fetchOrders = async (): Promise<Order[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return ORDERS;
}