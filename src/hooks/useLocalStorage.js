import { useEffect, useState } from 'react';

/**
 * Small persistent-state hook backed by localStorage.
 * Falls back gracefully to the default value when storage is blocked.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full / disabled - state still works in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
