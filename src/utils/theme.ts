import { MapTheme } from '../types/geo';

export interface ThemeStyles {
  bg: string;
  gridLine: string;
  ocean: string;
  countryOutline: string;
  subdivisionDefaultFill: string;
  subdivisionStroke: string;
  subdivisionHoverStroke: string;
  subdivisionActiveFill: string;
  macroLabelColor: string;
  subdivisionLabelColor: string;
  cityLabelColor: string;
  cityPointFill: string;
  cityCapitalFill: string;
  macroZoneOpacity: number;
}

export const MAP_THEMES: Record<MapTheme, ThemeStyles> = {
  educational: {
    bg: '#f8fafc', // slate-50
    gridLine: 'rgba(148, 163, 184, 0.25)',
    ocean: '#f1f5f9', // slate-100
    countryOutline: '#334155', // slate-700
    subdivisionDefaultFill: '#e2e8f0', // slate-200
    subdivisionStroke: '#94a3b8', // slate-400
    subdivisionHoverStroke: '#0284c7', // sky-600
    subdivisionActiveFill: 'rgba(14, 165, 233, 0.25)',
    macroLabelColor: '#475569',
    subdivisionLabelColor: '#1e293b',
    cityLabelColor: '#0f172a',
    cityPointFill: '#475569',
    cityCapitalFill: '#e11d48', // rose-600
    macroZoneOpacity: 0.16,
  },
  textbook: {
    bg: '#fcfaf2', // warm parchment
    gridLine: 'rgba(217, 203, 178, 0.35)',
    ocean: '#f5efe0',
    countryOutline: '#57422f',
    subdivisionDefaultFill: '#ede3cf',
    subdivisionStroke: '#b39f82',
    subdivisionHoverStroke: '#854d0e',
    subdivisionActiveFill: 'rgba(180, 83, 9, 0.25)',
    macroLabelColor: '#785437',
    subdivisionLabelColor: '#3a2717',
    cityLabelColor: '#25160d',
    cityPointFill: '#57422f',
    cityCapitalFill: '#991b1b',
    macroZoneOpacity: 0.2,
  },
  blueprint: {
    bg: '#0f172a', // slate-900
    gridLine: 'rgba(51, 65, 85, 0.5)',
    ocean: '#0b1120',
    countryOutline: '#38bdf8', // sky-400
    subdivisionDefaultFill: '#1e293b',
    subdivisionStroke: '#334155',
    subdivisionHoverStroke: '#38bdf8',
    subdivisionActiveFill: 'rgba(56, 189, 248, 0.3)',
    macroLabelColor: '#94a3b8',
    subdivisionLabelColor: '#f1f5f9',
    cityLabelColor: '#ffffff',
    cityPointFill: '#38bdf8',
    cityCapitalFill: '#f43f5e',
    macroZoneOpacity: 0.25,
  },
  minimal: {
    bg: '#ffffff',
    gridLine: 'rgba(226, 232, 240, 0.4)',
    ocean: '#fafafa',
    countryOutline: '#18181b',
    subdivisionDefaultFill: '#f4f4f5',
    subdivisionStroke: '#a1a1aa',
    subdivisionHoverStroke: '#18181b',
    subdivisionActiveFill: 'rgba(24, 24, 27, 0.15)',
    macroLabelColor: '#71717a',
    subdivisionLabelColor: '#18181b',
    cityLabelColor: '#09090b',
    cityPointFill: '#18181b',
    cityCapitalFill: '#e11d48',
    macroZoneOpacity: 0.12,
  },
};
