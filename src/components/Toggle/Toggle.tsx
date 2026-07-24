'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hindari mismatch hydration — render placeholder sebelum client mount
  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ash-faint text-ash-light transition-colors hover:border-accent hover:text-accent"
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;