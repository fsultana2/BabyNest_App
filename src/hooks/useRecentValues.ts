import { useState, useEffect } from 'react';

export default function useRecentValues(key: string) {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setValues(JSON.parse(stored));
    }
  }, [key]);

  const addValue = (value: string) => {
    const trimmed = value.trim();
    if (
      trimmed.length > 0 &&
      !values.includes(trimmed)
    ) {
      const updated = [trimmed, ...values].slice(0, 10); // max 10 recent
      setValues(updated);
      localStorage.setItem(key, JSON.stringify(updated));
    }
  };

  const deleteValue = (target: string) => {
    const updated = values.filter(v => v !== target);
    setValues(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return { values, addValue, deleteValue };
}
