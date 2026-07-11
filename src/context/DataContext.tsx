/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, ProductInventory, BusinessInsights } from '../types.js';
import { useAuth } from './AuthContext.js';

interface DataContextType {
  orders: Order[];
  inventory: ProductInventory[];
  insights: BusinessInsights | null;
  isLoadingData: boolean;
  isGeneratingInsights: boolean;
  dataError: string | null;
  fetchData: () => Promise<void>;
  uploadCSVData: (parsedOrders: Order[]) => Promise<boolean>;
  updateInventory: (updated: ProductInventory[]) => Promise<boolean>;
  generateAIInsights: (promptOverride?: string) => Promise<boolean>;
  resetAllData: () => Promise<void>;
  clearDataError: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<ProductInventory[]>([]);
  const [insights, setInsights] = useState<BusinessInsights | null>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState<boolean>(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Fetch commerce data on authentication
  const fetchData = async () => {
    if (!isAuthenticated) return;
    setIsLoadingData(true);
    setDataError(null);
    try {
      const token = localStorage.getItem('insights_auth_token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const [ordersRes, inventoryRes, insightsRes] = await Promise.all([
        fetch('/api/orders', { headers }),
        fetch('/api/inventory', { headers }),
        fetch('/api/insights', { headers })
      ]);

      if (!ordersRes.ok || !inventoryRes.ok || !insightsRes.ok) {
        throw new Error('Failed to retrieve dashboard information');
      }

      const ordersData = await ordersRes.json();
      const inventoryData = await inventoryRes.json();
      const insightsData = await insightsRes.json();

      setOrders(ordersData.orders || []);
      setInventory(inventoryData.inventory || []);
      setInsights(insightsData.insights || null);
    } catch (err: any) {
      console.error('Error fetching dashboard datasets:', err);
      setDataError(err.message || 'Could not load store data. Please try again.');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const clearDataError = () => setDataError(null);

  // Upload parsed CSV data to server and update state
  const uploadCSVData = async (parsedOrders: Order[]): Promise<boolean> => {
    setDataError(null);
    try {
      const token = localStorage.getItem('insights_auth_token');
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orders: parsedOrders })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit parsed records');
      }

      // Automatically compute a new mock inventory catalog based on the uploaded product names
      const generatedInventory: ProductInventory[] = [];
      const productMap = new Map<string, { category: string; price: number; cost: number }>();
      
      parsedOrders.forEach(o => {
        if (!productMap.has(o.productName)) {
          productMap.set(o.productName, {
            category: o.productCategory,
            price: o.price,
            cost: o.cost
          });
        }
      });

      productMap.forEach((val, name) => {
        // Generate a standard starting inventory count
        generatedInventory.push({
          productName: name,
          category: val.category,
          price: val.price,
          cost: val.cost,
          stock: Math.floor(Math.random() * 100) + 5, // Random stock count for realism
          lowStockThreshold: 15
        });
      });

      // Post inventory list too
      await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inventory: generatedInventory })
      });

      // Force refresh of local memory state
      setOrders(parsedOrders);
      setInventory(generatedInventory);
      setInsights(null); // Reset insights since dataset changed!
      
      return true;
    } catch (err: any) {
      console.error('CSV uploading data error:', err);
      setDataError(err.message || 'Failed to upload and update database records.');
      return false;
    }
  };

  // Update product stock counts
  const updateInventory = async (updated: ProductInventory[]): Promise<boolean> => {
    try {
      const token = localStorage.getItem('insights_auth_token');
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inventory: updated })
      });

      if (response.ok) {
        setInventory(updated);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Inventory updating error:', err);
      return false;
    }
  };

  // Call server-side Gemini generation (we will build this in later milestones)
  const generateAIInsights = async (promptOverride?: string): Promise<boolean> => {
    setIsGeneratingInsights(true);
    setDataError(null);
    try {
      const token = localStorage.getItem('insights_auth_token');
      const response = await fetch('/api/insights/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ promptOverride, orders, inventory })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Insights generation failed');
      }

      setInsights(data.insights);
      return true;
    } catch (err: any) {
      console.error('AI insight generation error:', err);
      setDataError(err.message || 'AI insight generation failed. Please verify API configuration.');
      return false;
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  // Complete reset to initial seeded records
  const resetAllData = async () => {
    setIsLoadingData(true);
    try {
      const token = localStorage.getItem('insights_auth_token');
      const response = await fetch('/api/reset', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setInventory(data.inventory);
        setInsights(null);
      }
    } catch (err) {
      console.error('Reset database failed:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <DataContext.Provider value={{
      orders,
      inventory,
      insights,
      isLoadingData,
      isGeneratingInsights,
      dataError,
      fetchData,
      uploadCSVData,
      updateInventory,
      generateAIInsights,
      resetAllData,
      clearDataError,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
