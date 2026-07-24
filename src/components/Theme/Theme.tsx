'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={['dark', 'light']}
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;