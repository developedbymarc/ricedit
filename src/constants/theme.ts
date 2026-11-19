
import '@/global.css';

import { Platform } from 'react-native';

/**
 * Ricedit design system
 *
 * Direction:
 * - Dark-first, terminal-inspired aesthetic
 * - Neutral charcoal surfaces
 * - Muted green accent
 * - Clear hierarchy between background and interactive surfaces
 */

export const Colors = {
  light: {
    // Base
    text: '#191D1A',
    background: '#F7F8F6',

    // Surfaces
    backgroundElement: '#ECEFEC',
    backgroundSelected: '#DDE5DD',

    // Typography
    textSecondary: '#707A72',

    // Additional palette
    accent: '#26834A',
    accentForeground: '#FFFFFF',
    border: '#DDE2DC',
    separator: '#E5E9E4',
    success: '#26834A',
    warning: '#B7791F',
    danger: '#D64545',
    overlay: '#00000066',
  },

  dark: {
    // Base
    text: '#E8EDE8',
    background: '#141714',

    // Surfaces
    backgroundElement: '#1E241F',
    backgroundSelected: '#29332B',

    // Typography
    textSecondary: '#9AA69C',

    // Additional palette
    accent: '#75D69A',
    accentForeground: '#102016',
    border: '#303A32',
    separator: '#272F29',
    success: '#75D69A',
    warning: '#E7B566',
    danger: '#F07878',
    overlay: '#00000099',
  },
} as const;

export type ThemeColor =
  keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },

  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/**
 * Spacing in units of 4
 */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 28,
  eight: 32,
  sixteen: 64,
} as const;

export const Radius = {
  small: 6,
  medium: 10,
  large: 14,
  extraLarge: 20,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;
