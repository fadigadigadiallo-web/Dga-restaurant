
import React from 'react';
import { TrendingUp, CreditCard, Box, Wallet } from 'lucide-react';
import { DashboardKPIs } from '../types';

interface KPISectionProps {
  kpis: DashboardKPIs;
}

const KPICard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
  trendType?: 'up' | 'down';
}> = ({ title, value, icon, color, trend, trendType }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
    <div className={`p-4 rounded-xl ${color} text-white transition-transform group-hover:scale-110`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      {trend && (
        <span className={`text-xs font-bold mt-1 flex items-center gap-1 ${trendType === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trendType === 'up' ? '↑' : '↓'} {trend} vs mois dernier
        </span>
      )}
    </div>
  </div>
);

const KPISection: React.FC<KPISectionProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <KPICard 
        title="Chiffre d'Affaires" 
        value={`${kpis.totalRevenue.toLocaleString()} FCFA`} 
        icon={<TrendingUp className="w-6 h-6" />}
        color="bg-indigo-500"
        trend="12%"
        trendType="up"
      />
      <KPICard 
        title="Dépenses Totales" 
        value={`${kpis.totalExpenses.toLocaleString()} FCFA`} 
        icon={<CreditCard className="w-6 h-6" />}
        color="bg-rose-500"
        trend="5%"
        trendType="down"
      />
      <KPICard 
        title="Valeur du Stock" 
        value={`${kpis.stockValue.toLocaleString()} FCFA`} 
        icon={<Box className="w-6 h-6" />}
        color="bg-emerald-500"
      />
      <KPICard 
        title="Bénéfice Estimé" 
        value={`${kpis.estimatedProfit.toLocaleString()} FCFA`} 
        icon={<Wallet className="w-6 h-6" />}
        color="bg-amber-500"
        trend="18%"
        trendType="up"
      />
    </div>
  );
};

export default KPISection;
