
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Activity {
  id: string;
  type: 'sale' | 'expense' | 'stock' | 'system';
  message: string;
  timestamp: string;
}

export interface Sale {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export interface StockItem {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  minThreshold: number;
  purchaseCost: number;
  sellingPrice: number;
  supplier: string;
}

export type ViewType = 'dashboard' | 'ventes' | 'depenses' | 'stock' | 'factures' | 'guide';

export interface DashboardKPIs {
  totalRevenue: number;
  totalExpenses: number;
  stockValue: number;
  estimatedProfit: number;
}
