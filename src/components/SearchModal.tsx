import React, { useState, useEffect, useRef } from 'react';
import { CountryAdministrativeData, MacroRegion, Municipality, SubDivision } from '../types/geo';
import { COUNTRIES } from '../data/countries';
import { Search, X, MapPin, Building, ChevronRight, Globe2 } from 'lucide-react';

interface SearchResultItem {
  countryId: string;
  countryName: string;
  countryFlag: string;
  type: 'macro' | 'subdivision' | 'municipality';
  level: 1 | 2 | 3;
  id: string;
  name: string;
  nameLocal: string;
  nameEn: string;
  extraInfo?: string;
}

interface SearchModalProps {
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Search across all countries & entities
  const results: SearchResultItem[] = [];
  const q = query.trim().toLowerCase();

  if (q.length > 0) {
    Object.values(COUNTRIES).forEach((country) => {
      // Search Macro Regions (Level 1)
      country.macroRegions.forEach((m) => {
        if (
          m.name.toLowerCase().includes(q) ||
          m.nameLocal.toLowerCase().includes(q) ||
          m.nameEn.toLowerCase().includes(q)
        ) {
          results.push({
            countryId: country.id,
            countryName: country.name,
            countryFlag: country.flag,
            type: 'macro',
            level: 1,
            id: m.id,
            name: m.name,
            nameLocal: m.nameLocal,
            nameEn: m.nameEn,
            extraInfo: country.levelNames.level1.ja,
          });
        }
      });

      // Search SubDivisions (Level 2)
      country.subDivisions.forEach((sub) => {
        if (
          sub.name.toLowerCase().includes(q) ||
          sub.nameLocal.toLowerCase().includes(q) ||
          sub.nameEn.toLowerCase().includes(q) ||
          sub.capitalCity.toLowerCase().includes(q)
        ) {
          results.push({
            countryId: country.id,
            countryName: country.name,
            countryFlag: country.flag,
            type: 'subdivision',
            level: 2,
            id: sub.id,
            name: sub.name,
            nameLocal: sub.nameLocal,
            nameEn: sub.nameEn,
            extraInfo: `州都/県庁: ${sub.capitalCity}`,
          });
        }

        // Search Municipalities (Level 3)
        sub.municipalities.forEach((m) => {
          if (
            m.name.toLowerCase().includes(q) ||
            m.nameLocal.toLowerCase().includes(q) ||
            m.nameEn.toLowerCase().includes(q)
          ) {
            results.push({
              countryId: country.id,
              countryName: country.name,
              countryFlag: country.flag,
              type: 'municipality',
              level: 3,
              id: m.id,
              name: m.name,
              nameLocal: m.nameLocal,
              nameEn: m.nameEn,
              extraInfo: `所属: ${sub.name} · ${m.designation || '都市'}`,
            });
          }
        });
      });
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16">
      <div className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="地域名・都市名・州名で検索 (例: カリフォルニア, ミュンヘン, 横浜, Texas)..."
            className="w-full text-sm bg-transparent focus:outline-none text-stone-900 dark:text-white placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer text-xs"
            >
              クリア
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {q.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-400 space-y-1">
              <p>世界各国の第一階層（広域圏）、第二階層（州・県・省）、第三階層（市区町村）を瞬時に検索できます。</p>
              <p className="font-mono text-[11px] text-stone-500">キーワードを入力してください</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-400">
              「{query}」に一致する行政区画や都市は見つかりませんでした。
            </div>
          ) : (
            <div className="space-y-1">
              {results.slice(0, 25).map((res) => (
                <button
                  key={`${res.countryId}-${res.id}`}
                  onClick={() => {
                    onSelectResult(res);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{res.countryFlag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          {res.name}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {res.nameEn}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                            res.level === 1
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : res.level === 2
                              ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          第{res.level}階層
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {res.countryName} · {res.extraInfo}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
