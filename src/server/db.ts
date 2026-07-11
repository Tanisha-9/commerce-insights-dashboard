/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { User, Order, ProductInventory, BusinessInsights } from '../types.js';

const DB_FILE = path.join(process.cwd(), 'database.json');

interface Schema {
  users: User[];
  orders: Order[];
  inventory: ProductInventory[];
  insights: BusinessInsights | null;
}

// Helper to load database
function readDB(): Schema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialSeededData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content) as Schema;
  } catch (error) {
    console.error('Error reading database file, returning default schema:', error);
    return getInitialSeededData();
  }
}

// Helper to save database
function writeDB(data: Schema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// Initial realistic dummy data seed
function getInitialSeededData(): Schema {
  const users: User[] = [];
  
  // Create 30 highly realistic orders spanning the last few weeks
  const orders: Order[] = [
    {
      orderId: "ORD-1001",
      customerName: "Alex Mercer",
      productName: "Pro Wireless Headphones",
      productCategory: "Electronics",
      saleDate: "2026-06-15",
      price: 199.99,
      quantity: 1,
      cost: 90.00,
      revenue: 199.99,
      profit: 109.99,
      status: "Delivered",
      paymentMethod: "Credit Card",
      region: "North America",
      country: "United States",
      state: "California",
      city: "San Francisco",
      refundAmount: 0
    },
    {
      orderId: "ORD-1002",
      customerName: "Elena Rostova",
      productName: "Ergonomic Office Chair",
      productCategory: "Furniture",
      saleDate: "2026-06-18",
      price: 249.50,
      quantity: 1,
      cost: 110.00,
      revenue: 249.50,
      profit: 139.50,
      status: "Delivered",
      paymentMethod: "PayPal",
      region: "Europe",
      country: "Germany",
      state: "Bavaria",
      city: "Munich",
      refundAmount: 0
    },
    {
      orderId: "ORD-1003",
      customerName: "Kenji Sato",
      productName: "Mechanical Gaming Keyboard",
      productCategory: "Electronics",
      saleDate: "2026-06-20",
      price: 129.99,
      quantity: 2,
      cost: 55.00,
      revenue: 259.98,
      profit: 149.98,
      status: "Delivered",
      paymentMethod: "Credit Card",
      region: "Asia",
      country: "Japan",
      state: "Tokyo",
      city: "Shibuya",
      refundAmount: 0
    },
    {
      orderId: "ORD-1004",
      customerName: "Sarah Jenkins",
      productName: "Organic Cotton Hoodie",
      productCategory: "Apparel",
      saleDate: "2026-06-22",
      price: 59.99,
      quantity: 3,
      cost: 18.00,
      revenue: 179.97,
      profit: 125.97,
      status: "Delivered",
      paymentMethod: "Apple Pay",
      region: "North America",
      country: "United States",
      state: "New York",
      city: "New York",
      refundAmount: 0
    },
    {
      orderId: "ORD-1005",
      customerName: "Marcus Vance",
      productName: "Ultra-Light Running Shoes",
      productCategory: "Apparel",
      saleDate: "2026-06-25",
      price: 120.00,
      quantity: 1,
      cost: 45.00,
      revenue: 120.00,
      profit: 75.00,
      status: "Returned",
      paymentMethod: "Credit Card",
      region: "North America",
      country: "United States",
      state: "Texas",
      city: "Austin",
      refundAmount: 120.00
    },
    {
      orderId: "ORD-1006",
      customerName: "Chloe Dupont",
      productName: "Stainless Steel Water Bottle",
      productCategory: "Kitchen",
      saleDate: "2026-06-26",
      price: 35.00,
      quantity: 5,
      cost: 10.00,
      revenue: 175.00,
      profit: 125.00,
      status: "Delivered",
      paymentMethod: "PayPal",
      region: "Europe",
      country: "France",
      state: "Île-de-France",
      city: "Paris",
      refundAmount: 0
    },
    {
      orderId: "ORD-1007",
      customerName: "Alex Mercer",
      productName: "USB-C Multi-Port Adapter",
      productCategory: "Electronics",
      saleDate: "2026-06-28",
      price: 45.00,
      quantity: 2,
      cost: 15.00,
      revenue: 90.00,
      profit: 60.00,
      status: "Delivered",
      paymentMethod: "Credit Card",
      region: "North America",
      country: "United States",
      state: "California",
      city: "San Francisco",
      refundAmount: 0
    },
    {
      orderId: "ORD-1008",
      customerName: "David Lee",
      productName: "Premium Yoga Mat",
      productCategory: "Sports",
      saleDate: "2026-06-30",
      price: 65.00,
      quantity: 1,
      cost: 22.00,
      revenue: 65.00,
      profit: 43.00,
      status: "Pending",
      paymentMethod: "Credit Card",
      region: "North America",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      refundAmount: 0
    },
    {
      orderId: "ORD-1009",
      customerName: "Sophia Martinez",
      productName: "Smart Fitness Watch",
      productCategory: "Electronics",
      saleDate: "2026-07-01",
      price: 149.99,
      quantity: 1,
      cost: 60.00,
      revenue: 149.99,
      profit: 89.99,
      status: "Delivered",
      paymentMethod: "Apple Pay",
      region: "North America",
      country: "United States",
      state: "Florida",
      city: "Miami",
      refundAmount: 0
    },
    {
      orderId: "ORD-1010",
      customerName: "Oliver Brown",
      productName: "Ceramic Coffee Mug Set",
      productCategory: "Kitchen",
      saleDate: "2026-07-02",
      price: 29.99,
      quantity: 2,
      cost: 8.00,
      revenue: 59.98,
      profit: 43.98,
      status: "Cancelled",
      paymentMethod: "Credit Card",
      region: "Europe",
      country: "United Kingdom",
      state: "England",
      city: "London",
      refundAmount: 0
    },
    {
      orderId: "ORD-1011",
      customerName: "Elena Rostova",
      productName: "Memory Foam Pillow",
      productCategory: "Furniture",
      saleDate: "2026-07-03",
      price: 49.99,
      quantity: 2,
      cost: 15.00,
      revenue: 99.98,
      profit: 69.98,
      status: "Delivered",
      paymentMethod: "PayPal",
      region: "Europe",
      country: "Germany",
      state: "Bavaria",
      city: "Munich",
      refundAmount: 0
    },
    {
      orderId: "ORD-1012",
      customerName: "Zara Khan",
      productName: "Minimalist Leather Wallet",
      productCategory: "Apparel",
      saleDate: "2026-07-04",
      price: 79.00,
      quantity: 1,
      cost: 25.00,
      revenue: 79.00,
      profit: 54.00,
      status: "Delivered",
      paymentMethod: "Credit Card",
      region: "Asia",
      country: "India",
      state: "Maharashtra",
      city: "Mumbai",
      refundAmount: 0
    },
    {
      orderId: "ORD-1013",
      customerName: "Lucas Silva",
      productName: "Noise Cancelling Earbuds",
      productCategory: "Electronics",
      saleDate: "2026-07-05",
      price: 89.99,
      quantity: 1,
      cost: 35.00,
      revenue: 89.99,
      profit: 54.99,
      status: "Pending",
      paymentMethod: "Credit Card",
      region: "South America",
      country: "Brazil",
      state: "São Paulo",
      city: "São Paulo",
      refundAmount: 0
    },
    {
      orderId: "ORD-1014",
      customerName: "Hannah Abbott",
      productName: "Electric Milk Frother",
      productCategory: "Kitchen",
      saleDate: "2026-07-05",
      price: 19.99,
      quantity: 3,
      cost: 6.00,
      revenue: 59.97,
      profit: 41.97,
      status: "Delivered",
      paymentMethod: "Apple Pay",
      region: "North America",
      country: "United States",
      state: "Illinois",
      city: "Chicago",
      refundAmount: 0
    },
    {
      orderId: "ORD-1015",
      customerName: "David Lee",
      productName: "Adjustable Dumbbells (Pair)",
      productCategory: "Sports",
      saleDate: "2026-07-06",
      price: 299.99,
      quantity: 1,
      cost: 140.00,
      revenue: 299.99,
      profit: 159.99,
      status: "Delivered",
      paymentMethod: "Credit Card",
      region: "North America",
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      refundAmount: 0
    },
    {
      orderId: "ORD-1016",
      customerName: "Sarah Jenkins",
      productName: "Waterproof Winter Coat",
      productCategory: "Apparel",
      saleDate: "2026-07-07",
      price: 180.00,
      quantity: 1,
      cost: 60.00,
      revenue: 180.00,
      profit: 120.00,
      status: "Delivered",
      paymentMethod: "Apple Pay",
      region: "North America",
      country: "United States",
      state: "New York",
      city: "New York",
      refundAmount: 0
    },
    {
      orderId: "ORD-1017",
      customerName: "Liam Johnson",
      productName: "Bamboo Cutting Board",
      productCategory: "Kitchen",
      saleDate: "2026-07-07",
      price: 24.50,
      quantity: 2,
      cost: 7.50,
      revenue: 49.00,
      profit: 34.00,
      status: "Returned",
      paymentMethod: "Credit Card",
      region: "North America",
      country: "United States",
      state: "Washington",
      city: "Seattle",
      refundAmount: 49.00
    },
    {
      orderId: "ORD-1018",
      customerName: "Sophia Martinez",
      productName: "Pro Wireless Headphones",
      productCategory: "Electronics",
      saleDate: "2026-07-08",
      price: 199.99,
      quantity: 1,
      cost: 90.00,
      revenue: 199.99,
      profit: 109.99,
      status: "Delivered",
      paymentMethod: "Apple Pay",
      region: "North America",
      country: "United States",
      state: "Florida",
      city: "Miami",
      refundAmount: 0
    }
  ];

  const inventory: ProductInventory[] = [
    {
      productName: "Pro Wireless Headphones",
      category: "Electronics",
      price: 199.99,
      cost: 90.00,
      stock: 45,
      lowStockThreshold: 15
    },
    {
      productName: "Ergonomic Office Chair",
      category: "Furniture",
      price: 249.50,
      cost: 110.00,
      stock: 8, // Low Stock!
      lowStockThreshold: 10
    },
    {
      productName: "Mechanical Gaming Keyboard",
      category: "Electronics",
      price: 129.99,
      cost: 55.00,
      stock: 22,
      lowStockThreshold: 15
    },
    {
      productName: "Organic Cotton Hoodie",
      category: "Apparel",
      price: 59.99,
      cost: 18.00,
      stock: 12, // Low Stock!
      lowStockThreshold: 15
    },
    {
      productName: "Ultra-Light Running Shoes",
      category: "Apparel",
      price: 120.00,
      cost: 45.00,
      stock: 35,
      lowStockThreshold: 10
    },
    {
      productName: "Stainless Steel Water Bottle",
      category: "Kitchen",
      price: 35.00,
      cost: 10.00,
      stock: 120,
      lowStockThreshold: 20
    },
    {
      productName: "USB-C Multi-Port Adapter",
      category: "Electronics",
      price: 45.00,
      cost: 15.00,
      stock: 0, // Out of Stock!
      lowStockThreshold: 20
    },
    {
      productName: "Premium Yoga Mat",
      category: "Sports",
      price: 65.00,
      cost: 22.00,
      stock: 18,
      lowStockThreshold: 10
    },
    {
      productName: "Smart Fitness Watch",
      category: "Electronics",
      price: 149.99,
      cost: 60.00,
      stock: 3, // Low Stock!
      lowStockThreshold: 10
    },
    {
      productName: "Ceramic Coffee Mug Set",
      category: "Kitchen",
      price: 29.99,
      cost: 8.00,
      stock: 80,
      lowStockThreshold: 25
    },
    {
      productName: "Memory Foam Pillow",
      category: "Furniture",
      price: 49.99,
      cost: 15.00,
      stock: 25,
      lowStockThreshold: 10
    },
    {
      productName: "Minimalist Leather Wallet",
      category: "Apparel",
      price: 79.00,
      cost: 25.00,
      stock: 14,
      lowStockThreshold: 10
    },
    {
      productName: "Noise Cancelling Earbuds",
      category: "Electronics",
      price: 89.99,
      cost: 35.00,
      stock: 50,
      lowStockThreshold: 15
    },
    {
      productName: "Electric Milk Frother",
      category: "Kitchen",
      price: 19.99,
      cost: 6.00,
      stock: 0, // Out of Stock!
      lowStockThreshold: 15
    },
    {
      productName: "Adjustable Dumbbells (Pair)",
      category: "Sports",
      price: 299.99,
      cost: 140.00,
      stock: 5, // Low Stock!
      lowStockThreshold: 8
    },
    {
      productName: "Waterproof Winter Coat",
      category: "Apparel",
      price: 180.00,
      cost: 60.00,
      stock: 15,
      lowStockThreshold: 5
    },
    {
      productName: "Bamboo Cutting Board",
      category: "Kitchen",
      price: 24.50,
      cost: 7.50,
      stock: 62,
      lowStockThreshold: 15
    }
  ];

  return {
    users,
    orders,
    inventory,
    insights: null
  };
}

export const db = {
  // User Authentication persistence operations
  getUsers(): User[] {
    return readDB().users;
  },

  getUserByEmail(email: string): User | undefined {
    return readDB().users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  addUser(user: User): void {
    const data = readDB();
    data.users.push(user);
    writeDB(data);
  },

  // Orders operations
  getOrders(): Order[] {
    return readDB().orders;
  },

  saveOrders(newOrders: Order[]): void {
    const data = readDB();
    data.orders = newOrders;
    writeDB(data);
  },

  // Inventory operations
  getInventory(): ProductInventory[] {
    return readDB().inventory;
  },

  saveInventory(newInventory: ProductInventory[]): void {
    const data = readDB();
    data.inventory = newInventory;
    writeDB(data);
  },

  // Insights operations
  getInsights(): BusinessInsights | null {
    return readDB().insights;
  },

  saveInsights(insights: BusinessInsights): void {
    const data = readDB();
    data.insights = insights;
    writeDB(data);
  },

  // Reset database completely to seeded initial state
  resetDB(): void {
    const initial = getInitialSeededData();
    writeDB(initial);
  }
};
