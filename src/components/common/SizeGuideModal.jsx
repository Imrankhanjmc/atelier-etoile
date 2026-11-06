import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { sizeGuides } from '../../data/sizeCharts';

export const SizeGuideModal = ({ isOpen, onClose, defaultCategory = 'women' }) => {
  const [activeCategory, setActiveCategory] = useState(
    ['men', 'women', 'kids', 'footwear'].includes(defaultCategory) ? defaultCategory : 'women'
  );

  if (!isOpen) return null;

  const currentGuide = sizeGuides[activeCategory] || sizeGuides.women;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-stone-700" />
            <h3 className="font-serif text-lg tracking-wide text-stone-900">
              Atelier Size & Measurement Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-2 overflow-x-auto">
          {[
            { id: 'women', label: "Women's Apparel" },
            { id: 'men', label: "Men's Apparel" },
            { id: 'kids', label: "Kids' Clothing" },
            { id: 'footwear', label: 'Footwear' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`pb-3 px-3 text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeCategory === tab.id
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-1">
              {currentGuide.title}
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              {currentGuide.description}
            </p>
          </div>

          {/* Table */}
          <div className="border border-stone-200 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-700 uppercase tracking-wider font-semibold">
                <tr>
                  {currentGuide.measurements.map((header, idx) => (
                    <th key={idx} className="p-3 whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-600 font-mono tabular-nums">
                {currentGuide.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3 font-semibold text-stone-900 whitespace-nowrap font-sans">
                      {row.size}
                    </td>
                    {activeCategory === 'men' && (
                      <>
                        <td className="p-3 whitespace-nowrap">{row.chest}</td>
                        <td className="p-3 whitespace-nowrap">{row.waist}</td>
                        <td className="p-3 whitespace-nowrap">{row.shoulder}</td>
                        <td className="p-3 whitespace-nowrap">{row.sleeve}</td>
                        <td className="p-3 whitespace-nowrap">{row.neck}</td>
                      </>
                    )}
                    {activeCategory === 'women' && (
                      <>
                        <td className="p-3 whitespace-nowrap">{row.bust}</td>
                        <td className="p-3 whitespace-nowrap">{row.waist}</td>
                        <td className="p-3 whitespace-nowrap">{row.hips}</td>
                        <td className="p-3 whitespace-nowrap">{row.length}</td>
                      </>
                    )}
                    {activeCategory === 'kids' && (
                      <>
                        <td className="p-3 whitespace-nowrap">{row.height}</td>
                        <td className="p-3 whitespace-nowrap">{row.chest}</td>
                        <td className="p-3 whitespace-nowrap">{row.waist}</td>
                      </>
                    )}
                    {activeCategory === 'footwear' && (
                      <>
                        <td className="p-3 whitespace-nowrap">{row.uk}</td>
                        <td className="p-3 whitespace-nowrap">{row.usMen}</td>
                        <td className="p-3 whitespace-nowrap">{row.usWomen}</td>
                        <td className="p-3 whitespace-nowrap">{row.length}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Advice */}
          <div className="bg-stone-50 border border-stone-200 p-4 space-y-2 text-xs text-stone-600">
            <span className="font-semibold text-stone-900 uppercase tracking-wider block">
              How to Measure Accurately
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <strong className="text-stone-800">Chest / Bust:</strong> Measure around the fullest part of your chest, keeping the tape horizontal under the arms.
              </div>
              <div>
                <strong className="text-stone-800">Waist:</strong> Measure around your natural waistline, keeping tape comfortably loose.
              </div>
              <div>
                <strong className="text-stone-800">Hips:</strong> Stand with feet together and measure around the fullest point of your hips.
              </div>
              <div>
                <strong className="text-stone-800">Inseam:</strong> Measure from the top of the inner thigh straight down to the bottom of the ankle.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium uppercase tracking-wider bg-stone-900 text-white hover:bg-stone-800 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
