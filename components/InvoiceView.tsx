
import React from 'react';
import { Sale } from '../types';
import { Printer, ArrowLeft, Download } from 'lucide-react';

interface InvoiceViewProps {
  sale: Sale;
  onBack: () => void;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({ sale, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <div className="mb-6 flex justify-between items-center no-print">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à la liste
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md"
          >
            <Printer className="w-4 h-4" /> Imprimer / PDF
          </button>
        </div>
      </div>

      <div id="invoice-content" className="bg-white p-12 rounded-none md:rounded-xl shadow-2xl max-w-[800px] mx-auto border border-slate-100 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black text-indigo-600 mb-2">FACTURE</h1>
            <p className="text-slate-400 font-medium">N° {sale.id.replace('V', 'INV-2023-')}</p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-lg text-slate-900">EXCEL MASTER SARL</h2>
            <p className="text-sm text-slate-500">Quartier Administratif</p>
            <p className="text-sm text-slate-500">B.P. 1234, Libreville / Douala</p>
            <p className="text-sm text-slate-500">Contact: +237 600 000 000</p>
          </div>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Facturé à</h3>
            <p className="font-bold text-slate-900">CLIENT PASSAGE</p>
            <p className="text-sm text-slate-500">Client Comptant</p>
            <p className="text-sm text-slate-500">Mode: Espèces / Mobile Money</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Détails</h3>
            <p className="text-sm text-slate-500">Date d'émission: <span className="text-slate-900 font-medium">{sale.date}</span></p>
            <p className="text-sm text-slate-500">Échéance: <span className="text-slate-900 font-medium">Immédiate</span></p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-slate-900">
              <th className="py-3 text-left text-sm font-bold text-slate-900 uppercase">Désignation</th>
              <th className="py-3 text-center text-sm font-bold text-slate-900 uppercase">Qté</th>
              <th className="py-3 text-right text-sm font-bold text-slate-900 uppercase">Prix Unitaire</th>
              <th className="py-3 text-right text-sm font-bold text-slate-900 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-6 text-slate-800 font-medium">{sale.productName}</td>
              <td className="py-6 text-center text-slate-600">{sale.quantity}</td>
              <td className="py-6 text-right text-slate-600">{sale.unitPrice.toLocaleString()} FCFA</td>
              <td className="py-6 text-right text-slate-900 font-bold">{sale.total.toLocaleString()} FCFA</td>
            </tr>
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-full max-w-[300px] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Sous-total</span>
              <span className="text-slate-900 font-medium">{sale.total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">TVA (0%)</span>
              <span className="text-slate-900 font-medium">0 FCFA</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t-2 border-slate-900">
              <span className="text-lg font-bold text-slate-900">NET À PAYER</span>
              <span className="text-xl font-black text-indigo-600">{sale.total.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 italic mb-4">
            Merci de votre confiance. Cette facture est générée automatiquement par Excel Master Dashboard.
          </p>
          <div className="flex justify-center gap-12 mt-8">
            <div className="text-center">
              <div className="h-16 w-32 border-b border-slate-200 mb-2 mx-auto"></div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Cachet Entreprise</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-32 border-b border-slate-200 mb-2 mx-auto"></div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Signature Client</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-content, #invoice-content * { visibility: visible; }
          #invoice-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%;
            margin: 0;
            padding: 20px;
          }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default InvoiceView;
