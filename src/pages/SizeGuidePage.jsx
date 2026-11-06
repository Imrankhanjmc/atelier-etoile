import React, { useState } from 'react';
import { Ruler, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sizeGuides } from '../data/sizeCharts';
import Breadcrumb from '../components/common/Breadcrumb';

export const SizeGuidePage = () => {
  const [activeTab, setActiveTab] = useState('women');
  const currentGuide = sizeGuides[activeTab] || sizeGuides.women;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Size & Fit Guide' }]} />

      <div className="max-w-2xl space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Precision Sizing
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
          Atelier Size & Measurement Guide
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
          Our silhouettes are calibrated according to international luxury sizing standards. Follow our measuring advice below to find your tailored fit.
        </p>
      </div>

      {/* Department Tabs */}
      <div className="flex border-b border-stone-200 gap-4 overflow-x-auto text-xs uppercase tracking-wider font-semibold">
        {[
          { id: 'women', label: "Women's Apparel" },
          { id: 'men', label: "Men's Apparel" },
          { id: 'kids', label: "Kids' Clothing" },
          { id: 'footwear', label: 'Footwear & Shoes' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 border-b-2 -mb-px transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Guide Details */}
      <div className="space-y-6">
        <div>
          <h3 className="font-serif text-xl text-stone-900">{currentGuide.title}</h3>
          <p className="text-xs text-stone-500 mt-1">{currentGuide.description}</p>
        </div>

        {/* Measurement Table */}
        <div className="border border-stone-200 overflow-x-auto bg-white shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 border-b border-stone-200 uppercase tracking-wider font-semibold text-stone-700">
              <tr>
                {currentGuide.measurements.map((header, idx) => (
                  <th key={idx} className="p-3.5 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-600 font-mono tabular-nums">
              {currentGuide.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3.5 font-semibold text-stone-900 whitespace-nowrap font-sans">
                    {row.size}
                  </td>
                  {activeTab === 'men' && (
                    <>
                      <td className="p-3.5 whitespace-nowrap">{row.chest}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.waist}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.shoulder}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.sleeve}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.neck}</td>
                    </>
                  )}
                  {activeTab === 'women' && (
                    <>
                      <td className="p-3.5 whitespace-nowrap">{row.bust}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.waist}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.hips}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.length}</td>
                    </>
                  )}
                  {activeTab === 'kids' && (
                    <>
                      <td className="p-3.5 whitespace-nowrap">{row.height}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.chest}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.waist}</td>
                    </>
                  )}
                  {activeTab === 'footwear' && (
                    <>
                      <td className="p-3.5 whitespace-nowrap">{row.uk}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.usMen}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.usWomen}</td>
                      <td className="p-3.5 whitespace-nowrap">{row.length}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Guide Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs text-stone-600">
          <div className="p-6 border border-stone-200 bg-stone-50 space-y-2">
            <h4 className="font-serif text-base text-stone-900 font-medium">Bespoke Fitting Advice</h4>
            <p className="leading-relaxed">
              When ordering structured blazers or trousers, maintain your natural posture without sucking in your abdomen. For oversized tops and knitwear, order your standard size as the relaxed drape is already factored into the pattern.
            </p>
          </div>

          <div className="p-6 border border-stone-200 bg-stone-50 space-y-2">
            <h4 className="font-serif text-base text-stone-900 font-medium">Footwear Conversion Note</h4>
            <p className="leading-relaxed">
              Our sneakers and leather shoes are crafted on Italian lasts. If you possess a wider foot profile, we recommend ordering one half or whole size up for enduring comfort during gala evenings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
