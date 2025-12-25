
import React from 'react';
import { Trash2, Download } from 'lucide-react';

interface TableComponentProps {
  data: any[];
  headers: string[];
  onDelete: (id: string) => void;
  title: string;
}

const TableComponent: React.FC<TableComponentProps> = ({ data, headers, onDelete, title }) => {
  const exportToCSV = () => {
    if (data.length === 0) return;
    
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    data.forEach(item => {
      const values = Object.values(item).map(val => {
        const escaped = ('' + val).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-700">{title}</h3>
        <button 
          onClick={exportToCSV}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm transition-all"
        >
          <Download className="w-3.5 h-3.5" /> Exporter CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              {headers.map((header) => (
                <th key={header} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, idx) => (
              <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors group">
                {Object.values(item).map((val, i) => (
                  <td key={i} className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {typeof val === 'number' && i >= 4 ? `${val.toLocaleString()} FCFA` : val}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400">Aucune donnée disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
