
import React from 'react';
import { CheckCircle2, ChevronRight, Info, HelpCircle } from 'lucide-react';

const ExcelGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <section>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl mb-8">
          <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2 mb-2">
            <Info className="w-6 h-6" /> Bienvenue dans votre Guide de Création Excel (FCFA)
          </h2>
          <p className="text-indigo-700">
            Suivez ces étapes structurées pour transformer un simple classeur en un outil de pilotage puissant pour votre activité en Afrique centrale ou de l'ouest.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-6">Étape 1 : Création des feuilles de données</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="font-bold">1</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-3">Feuille "Ventes"</h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ID Vente</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Date</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ID Produit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Nom Produit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quantité Vendue</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Prix Unitaire (FCFA)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Total Vente (FCFA)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-4">
              <span className="font-bold">2</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-3">Feuille "Dépenses"</h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ID Dépense</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Date</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Catégorie</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Description</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Montant (FCFA)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <span className="font-bold">3</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-3">Feuille "Stock"</h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ID Produit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Nom Produit</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quantité en Stock</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Coût Achat (FCFA)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fournisseur</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Étape 2 : Création de la feuille "Tableau de Bord"</h3>
        
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" /> 1. Formules Excel pour vos indicateurs (KPIs)
            </h4>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">C5</div>
              <div>
                <p className="font-semibold text-slate-800">Chiffre d'Affaires Total (FCFA)</p>
                <code className="block bg-slate-900 text-indigo-300 p-3 rounded-lg mt-2 text-sm">
                  =SOMME(Ventes!G:G)
                </code>
                <p className="text-xs text-slate-400 mt-2">Note: G:G correspond à la colonne "Total Vente".</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">E5</div>
              <div>
                <p className="font-semibold text-slate-800">Dépenses Totales (FCFA)</p>
                <code className="block bg-slate-900 text-indigo-300 p-3 rounded-lg mt-2 text-sm">
                  =SOMME(Dépenses!E:E)
                </code>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">G5</div>
              <div>
                <p className="font-semibold text-slate-800">Valeur du Stock (FCFA)</p>
                <code className="block bg-slate-900 text-indigo-300 p-3 rounded-lg mt-2 text-sm">
                  =SOMMEPROD(Stock!C2:C100; Stock!D2:D100)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-500" /> 2. Astuces de Format de Cellule
            </h4>
          </div>
          <div className="p-6">
            <ol className="space-y-4 text-slate-600 list-decimal pl-4">
              <li><strong>Format Monétaire :</strong> Sélectionnez vos cellules de montants, faites un clic droit &gt; <span className="text-indigo-600 font-semibold">Format de cellule</span>. Choisissez "Comptabilité" ou "Monétaire", et cherchez le symbole "XOF" ou "XAF" pour afficher <strong>FCFA</strong>.</li>
              <li><strong>Design :</strong> Pour un rendu professionnel, masquez le quadrillage Excel (<span className="text-indigo-600 font-semibold">Affichage &gt; décocher Quadrillage</span>) une fois vos tableaux en place.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExcelGuide;
