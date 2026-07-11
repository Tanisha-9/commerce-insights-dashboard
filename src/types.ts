/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export type OrderStatus = 'Pending' | 'Delivered' | 'Returned' | 'Cancelled';

export interface Order {
  orderId: string;
  customerName: string;
  productName: string;
  productCategory: string;
  saleDate: string; // ISO format (YYYY-MM-DD)
  price: number;
  quantity: number;
  cost: number; // Cost of goods sold (COGS) per unit
  revenue: number; // price * quantity
  profit: number; // revenue - (cost * quantity)
  status: OrderStatus;
  paymentMethod: string;
  region: string;
  country: string;
  state: string;
  city: string;
  refundAmount: number;
}

export interface ProductInventory {
  productName: string;
  category: string;
  price: number;
  cost: number;
  stock: number; // current inventory count
  lowStockThreshold: number; // e.g., < 15 is low stock
}

export interface BusinessInsights {
  businessSummary: string;
  salesInsights: string;
  inventorySuggestions: string;
  productRecommendations: string;
  generatedAt: string;
}

export interface DashboardData {
  orders: Order[];
  inventory: ProductInventory[];
  insights: BusinessInsights | null;
}

// Authentication state payload
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}
