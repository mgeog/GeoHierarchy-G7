import React, { useState } from 'react';
import { CountryAdministrativeData } from '../types/geo';
import { COUNTRIES, COUNTRY_LIST } from '../data/countries';
import {
  X,
  BookOpen,
  Globe2,
  Layers,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronRight,
  Building,
} from 'lucide-react';

interface HierarchyComparisonViewProps {
  onClose: () => void;
  onSelectCountry: (countryId: string) => void;
}

export const HierarchyComparisonView: React.FC<HierarchyComparisonViewProps> = ({
  onClose,
  onSelectCountry,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState('japan');
  const [expandedMacro, setExpandedMacro] = useState<string | null>(null);

  const activeCountry = COUNTRIES[selectedCountryId];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                世界各国の行政区画・階層比較ガイド
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                第1階層（広域圏） · 第2階層（州・県・省） · 第3階層（市区町村・都市）の国別制度構造
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Country Selector Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-x-auto">
          {COUNTRY_LIST.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCountryId(c.id);
                setExpandedMacro(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCountryId === c.id
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Country Overview Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 border border-stone-200 dark:border-stone-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{activeCountry.flag}</span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    {activeCountry.name} ({activeCountry.nameLocal}) の統治・地方制度
                  </h3>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {activeCountry.systemDescription}
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectCountry(activeCountry.id);
                  onClose();
                }}
                className="shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <span>マップで開く</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3-Tier Grid Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Level 1 */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-stone-800/60 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] font-bold">
                  第1階層 (Level 1)
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  {activeCountry.macroRegions.length} 区分
                </span>
              </div>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                {activeCountry.levelNames.level1.ja}
              </h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                {activeCountry.levelNames.level1.local}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeCountry.levelNames.level1.desc}
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-stone-800/60 border border-sky-200/70 dark:border-sky-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-sky-200 dark:bg-sky-900/60 text-sky-900 dark:text-sky-200 text-[10px] font-bold">
                  第2階層 (Level 2)
                </span>
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400">
                  {activeCountry.subDivisions.length} 区分
                </span>
              </div>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                {activeCountry.levelNames.level2.ja}
              </h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                {activeCountry.levelNames.level2.local}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeCountry.levelNames.level2.desc}
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-stone-800/60 border border-emerald-200/70 dark:border-emerald-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-[10px] font-bold">
                  第3階層 (Level 3)
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  基礎自治体
                </span>
              </div>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">
                {activeCountry.levelNames.level3.ja}
              </h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                {activeCountry.levelNames.level3.local}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeCountry.levelNames.level3.desc}
              </p>
            </div>
          </div>

          {/* Interactive Hierarchy Tree for this Country */}
          <div>
            <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>{activeCountry.name}の階層構造ツリー (クリックで展開)</span>
            </h4>

            <div className="space-y-2">
              {activeCountry.macroRegions.map((macro) => {
                const isExpanded = expandedMacro === macro.id;
                const subs = activeCountry.subDivisions.filter(
                  (s) => s.macroRegionId === macro.id
                );

                return (
                  <div
                    key={macro.id}
                    className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-stone-50/50 dark:bg-stone-800/30"
                  >
                    <button
                      onClick={() => setExpandedMacro(isExpanded ? null : macro.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-stone-100/60 dark:hover:bg-stone-800/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: macro.color }}
                        />
                        <span className="font-bold text-xs text-stone-900 dark:text-white">
                          【第1階層】{macro.name} ({macro.nameEn})
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {subs.length}の{activeCountry.levelNames.level2.ja}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-2">
                        <div className="text-[11px] text-stone-500 mb-2">
                          {macro.description}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {subs.map((sub) => (
                            <div
                              key={sub.id}
                              className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                                  {sub.name}
                                </span>
                                <span className="text-[10px] text-stone-400">
                                  {sub.nameEn}
                                </span>
                              </div>
                              <div className="text-[10px] text-stone-500 mb-1">
                                州都/県庁: <span className="font-medium text-sky-700 dark:text-sky-300">{sub.capitalCity}</span>
                              </div>
                              {sub.municipalities.length > 0 && (
                                <div className="text-[10px] text-stone-600 dark:text-stone-400">
                                  主な都市: {sub.municipalities.map((m) => m.name).join('、')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
