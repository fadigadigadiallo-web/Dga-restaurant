
import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  LayoutDashboard, ShoppingCart, ReceiptEuro, Package, BookOpen, Plus, Trash2, 
  FileSpreadsheet, TrendingUp, Info, AlertTriangle, CheckCircle, XCircle, Search, FileText,
  Tags, Percent, Edit3, Save, LogOut, CloudSelectItem, RefreshCw, Clock, ChevronRight
} from 'lucide-react';
import { Sale, Expense, StockItem, ViewType, DashboardKPIs, User, Activity } from './types';
import ExcelGuide from './components/ExcelGuide';
import KPISection from './components/KPISection';
import TableComponent from './components/TableComponent';
import InvoiceView from './components/InvoiceView';
import LoginView from './components/LoginView';

const INITIAL_SALES: Sale[] = [
  { id: 'V001', date: '2023-11-01', productId: 'P001', productName: 'Laptop Pro', quantity: 2, unitPrice: 780000, total: 1560000 },
  { id: 'V002', date: '2023-11-02', productId: 'P002', productName: 'Monitor 4K', quantity: 5, unitPrice: 260000, total: 1300000 },
  { id: 'V003', date: '2023-11-05', productId: 'P001', productName: 'Laptop Pro', quantity: 1, unitPrice: 780000, total: 780000 },
];

const INITIAL_EXPENSES: Expense[] = [
  { id: 'D001', date: '2023-11-01', category: 'Loyer', description: 'Bureau Central', amount: 980000 },
  { id: 'D002', date: '2023-11-10', category: 'Salaires', description: 'Équipe Ventes', amount: 1960000 },
  { id: 'D003', date: '2023-11-15', category: 'Achat stock', description: 'Nouvelle Commande P001', amount: 520000 },
];

const INITIAL_STOCK: StockItem[] = [
  { id: 'P001', productName: 'Laptop Pro', category: 'Informatique', quantity: 15, minThreshold: 5, purchaseCost: 520000, sellingPrice: 780000, supplier: 'TechCorp' },
  { id: 'P002', productName: 'Monitor 4K', category: 'Informatique', quantity: 3, minThreshold: 5, purchaseCost: 162500, sellingPrice: 260000, supplier: 'Display Solutions' },
  { id: 'P003', productName: 'Clavier Mécanique', category: 'Accessoires', quantity: 0, minThreshold: 10, purchaseCost: 29250, sellingPrice: 45000, supplier: 'Peripherals Ltd' },
  { id: 'P004', productName: 'Souris Sans Fil', category: 'Accessoires', quantity: 45, minThreshold: 10, purchaseCost: 15000, sellingPrice: 25000, supplier: 'Peripherals Ltd' },
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<ViewType>('dashboard');
  const [sales, setSales] = useState<Sale[]>(INITIAL_SALES);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [stock, setStock] = useState<StockItem[]>(INITIAL_STOCK);
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', type: 'system', message: 'Système initialisé avec succès', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSaleForInvoice, setSelectedSaleForInvoice] = useState<Sale | null>(null);
  const [isInventoryMode, setIsInventoryMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const savedUser = localStorage.getItem('excel_master_user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { localStorage.removeItem('excel_master_user'); }
    }
  }, []);

  const addActivity = (type: Activity['type'], message: string) => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  const handleSync = () => {
    setIsSyncing(true);
    addActivity('system', 'Tentative de synchronisation cloud...');
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync(new Date().toLocaleTimeString());
      addActivity('system', 'Base de données synchronisée avec succès');
    }, 1500);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('excel_master_user', JSON.stringify(newUser));
    addActivity('system', `Session ouverte par ${newUser.name}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('excel_master_user');
  };

  const kpis = useMemo((): DashboardKPIs => {
    const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const stockValue = stock.reduce((sum, i) => sum + (i.quantity * i.purchaseCost), 0);
    return { totalRevenue, totalExpenses, stockValue, estimatedProfit: totalRevenue - totalExpenses };
  }, [sales, expenses, stock]);

  const stockStats = useMemo(() => {
    const outOfStock = stock.filter(item => item.quantity <= 0).length;
    const lowStock = stock.filter(item => item.quantity > 0 && item.quantity <= item.minThreshold).length;
    const healthyStock = stock.filter(item => item.quantity > item.minThreshold).length;
    const totalItems = stock.reduce((sum, i) => sum + i.quantity, 0);
    return { outOfStock, lowStock, healthyStock, totalItems };
  }, [stock]);

  const filteredStock = useMemo(() => {
    return stock.filter(item => 
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stock, searchTerm]);

  const handleStockUpdate = (id: string, newQuantity: number) => {
    const item = stock.find(i => i.id === id);
    if (item && item.quantity !== newQuantity) {
      addActivity('stock', `Mise à jour inventaire : ${item.productName} (${newQuantity})`);
    }
    setStock(stock.map(item => item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item));
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (!user) return <LoginView onLogin={handleLogin} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <KPISection kpis={kpis} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" /> Ventes par Produit (Volumes)
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sales}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="productName" tick={{fontSize: 12}} />
                        <YAxis />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} name="Chiffre d'Affaires" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                   <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-500" /> État des Stocks Critique
                  </h3>
                  <div className="space-y-4">
                    {stock.filter(i => i.quantity <= i.minThreshold).map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-rose-500" />
                          <div>
                            <p className="text-sm font-bold text-slate-800">{item.productName}</p>
                            <p className="text-xs text-rose-600 font-medium">Reste : {item.quantity} unités</p>
                          </div>
                        </div>
                        <button onClick={() => setActiveTab('stock')} className="text-xs font-bold text-rose-700 underline">Gérer</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-500" /> Activité Récente
                  </h3>
                  <div className="space-y-4">
                    {activities.map((act) => (
                      <div key={act.id} className="flex gap-4 group">
                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                          act.type === 'sale' ? 'bg-emerald-500' : 
                          act.type === 'expense' ? 'bg-rose-500' : 
                          act.type === 'stock' ? 'bg-amber-500' : 'bg-slate-400'
                        }`}></div>
                        <div>
                          <p className="text-sm text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">{act.message}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-1">{act.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-500/20 text-white">
                  <h4 className="font-bold mb-2">Conseil Pro</h4>
                  <p className="text-sm text-indigo-100 leading-relaxed">N'oubliez pas d'exporter vos données chaque fin de mois pour vos archives comptables Excel.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'ventes':
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Journal des Ventes</h2>
              <button 
                onClick={() => {
                  const newSale = { id: `V00${sales.length + 1}`, date: new Date().toISOString().split('T')[0], productId: 'P000', productName: 'Nouveau Produit', quantity: 1, unitPrice: 50000, total: 50000 };
                  setSales([...sales, newSale]);
                  addActivity('sale', `Vente ajoutée : ${newSale.id} (${newSale.total.toLocaleString()} FCFA)`);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Ajouter une vente
              </button>
            </div>
            <TableComponent 
              title="Historique des Ventes"
              data={sales} 
              headers={['ID Vente', 'Date', 'ID Produit', 'Nom Produit', 'Quantité', 'Prix Unitaire', 'Total']}
              onDelete={(id) => { setSales(sales.filter(s => s.id !== id)); addActivity('sale', `Vente supprimée : ${id}`); }}
            />
          </div>
        );
      case 'depenses':
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Journal des Dépenses</h2>
              <button 
                onClick={() => {
                  const newExp = { id: `D00${expenses.length + 1}`, date: new Date().toISOString().split('T')[0], category: 'Autre', description: 'Nouvelle dépense', amount: 25000 };
                  setExpenses([...expenses, newExp]);
                  addActivity('expense', `Dépense enregistrée : ${newExp.category} (${newExp.amount.toLocaleString()} FCFA)`);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Ajouter une dépense
              </button>
            </div>
            <TableComponent 
              title="Liste des Dépenses"
              data={expenses} 
              headers={['ID Dépense', 'Date', 'Catégorie', 'Description', 'Montant']}
              onDelete={(id) => { setExpenses(expenses.filter(e => e.id !== id)); addActivity('expense', `Dépense supprimée : ${id}`); }}
            />
          </div>
        );
      case 'stock':
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-800">Inventaire des Produits</h2>
              <div className="flex gap-2">
                <button onClick={() => setIsInventoryMode(!isInventoryMode)} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold ${isInventoryMode ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'}`}>
                  {isInventoryMode ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />} {isInventoryMode ? 'Enregistrer' : 'Faire Inventaire'}
                </button>
                <button 
                  onClick={() => setStock([...stock, { id: `P00${stock.length + 1}`, productName: 'Nouveau Stock', category: 'Divers', quantity: 10, minThreshold: 5, purchaseCost: 15000, sellingPrice: 20000, supplier: 'Inconnu' }])}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Nouveau Produit
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
               <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Recherche produit ou catégorie..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                      <th className="px-6 py-4">Produit</th>
                      <th className="px-6 py-4">Catégorie</th>
                      <th className="px-6 py-4 text-center">Quantité</th>
                      <th className="px-6 py-4">Prix Vente</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStock.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-800">{item.productName}</p>
                          <p className="text-[10px] text-slate-400">{item.id}</p>
                        </td>
                        <td className="px-6 py-4"><span className="text-xs bg-slate-100 px-2 py-1 rounded-md">{item.category}</span></td>
                        <td className="px-6 py-4 text-center">
                          {isInventoryMode ? (
                            <input type="number" value={item.quantity} onChange={(e) => handleStockUpdate(item.id, parseInt(e.target.value) || 0)} className="w-16 text-center border rounded py-1" />
                          ) : (
                            <span className={`text-sm font-bold ${item.quantity <= item.minThreshold ? 'text-rose-600' : 'text-slate-700'}`}>{item.quantity}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-emerald-600">{item.sellingPrice.toLocaleString()} FCFA</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => setStock(stock.filter(i => i.id !== item.id))} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'factures':
        if (selectedSaleForInvoice) return <InvoiceView sale={selectedSaleForInvoice} onBack={() => setSelectedSaleForInvoice(null)} />;
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Facturation Automatique</h2>
            <TableComponent title="Sélectionnez une vente pour facturer" data={sales} headers={['ID Vente', 'Date', 'ID Produit', 'Nom Produit', 'Qté', 'Prix', 'Total']} onDelete={() => {}} />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sales.map(sale => (
                <div key={sale.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-indigo-500">{sale.id}</p>
                    <p className="text-sm font-bold text-slate-800">{sale.productName}</p>
                    <p className="text-xs text-slate-400">{sale.total.toLocaleString()} FCFA</p>
                  </div>
                  <button onClick={() => setSelectedSaleForInvoice(sale)} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"><FileText className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'guide':
        return <ExcelGuide />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col sticky top-0 h-auto md:h-screen no-print">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-500 p-2 rounded-xl"><FileSpreadsheet className="w-6 h-6 text-white" /></div>
          <h1 className="text-xl font-bold text-white">Excel Master</h1>
        </div>
        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'ventes', label: 'Ventes', icon: ShoppingCart },
            { id: 'depenses', label: 'Dépenses', icon: ReceiptEuro },
            { id: 'stock', label: 'Stock', icon: Package },
            { id: 'factures', label: 'Factures', icon: FileText },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as ViewType)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'hover:bg-slate-800'}`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <img src={user.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
            <div className="overflow-hidden"><p className="text-sm font-bold text-white truncate">{user.name}</p><p className="text-[10px] text-slate-400 uppercase tracking-tighter">{user.role}</p></div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 text-rose-400"><LogOut className="w-5 h-5" /> Déconnexion</button>
          <button onClick={() => setActiveTab('guide')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === 'guide' ? 'bg-emerald-600/20 text-emerald-400' : 'hover:bg-slate-800'}`}><BookOpen className="w-5 h-5" /> Guide Excel</button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {activeTab === 'dashboard' ? 'Vue d\'ensemble' : activeTab === 'ventes' ? 'Journal des Ventes' : activeTab === 'depenses' ? 'Gestion des Dépenses' : activeTab === 'stock' ? 'Inventaire des Produits' : activeTab === 'factures' ? 'Facturation' : 'Guide Excel'}
            </h1>
            <p className="text-slate-500 mt-1">Gérez votre activité commerciale avec précision.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dernière synchro</span>
                <span className="text-xs font-bold text-slate-600">{lastSync}</span>
              </div>
              <button onClick={handleSync} disabled={isSyncing} className={`p-2 rounded-xl transition-all ${isSyncing ? 'bg-indigo-100 text-indigo-400 animate-spin' : 'bg-slate-50 text-indigo-600 hover:bg-indigo-50'}`}>
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white p-2 px-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> En ligne
              </span>
            </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
