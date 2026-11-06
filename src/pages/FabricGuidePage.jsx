import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export const FabricGuidePage = () => {
  const fabrics = [
    {
      name: 'Giza Egyptian Combed Cotton',
      weight: '160 - 280 GSM',
      origin: 'Nile Delta, Egypt',
      desc: 'Extracted from extra-long staple Gossypium barbadense fibers. The yarn is combed to remove short fibers, resulting in remarkable tensile strength and a silk-soft hand feel that grows softer with every wash cycle.'
    },
    {
      name: 'Mulberry Grade-6A Silk',
      weight: '19 - 22 Momme',
      origin: 'Zhejiang & Como, Italy',
      desc: 'Produced by Bombyx mori silkworms fed exclusively on organic white mulberry leaves. Grade 6A represents the pinnacle of uniformity, offering natural hypoallergenic breathability and a pearlescent liquid luster.'
    },
    {
      name: 'Normandy Dew-Retted Flax Linen',
      weight: '185 GSM',
      origin: 'Normandy, France',
      desc: 'Grown with zero artificial irrigation in the maritime climate of Northern France. Dew-retting separates fibers gently, imparting high breathability and high tensile resistance in humid summer climates.'
    },
    {
      name: 'Mongolian Raw Cashmere',
      weight: '2-Ply Worsted 15.5 Micron',
      origin: 'Steppes of Outer Mongolia',
      desc: 'Gently hand-combed during spring molting from the soft underbelly of Capra hircus goats. Exceptional thermal regulation with near-weightless warmth.'
    },
    {
      name: 'Katan & Chanderi Handloom Weaves',
      weight: 'Varied Art Weaves',
      origin: 'Varanasi & Madhya Pradesh, India',
      desc: 'Woven on traditional wooden pit looms over 30 to 45 days. The warp and weft utilize twisted pure silk filament threads accented with fine silver and gold-electroplated zari bootis.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Fabric & Noble Materials Guide' }]} />

      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Material Provenance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
          The Noble Fibers of Atelier Étoile
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
          We believe true luxury is felt before it is seen. An exhaustive index of our certified natural yarns, certified origins, and weave structures.
        </p>
      </div>

      <div className="divide-y divide-stone-200 border border-stone-200 bg-white">
        {fabrics.map((f, idx) => (
          <div key={idx} className="p-6 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="font-serif text-lg text-stone-900 font-medium">{f.name}</h3>
              <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
                <span>{f.origin}</span>
                <span>·</span>
                <span>{f.weight}</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FabricGuidePage;
