import { useState, useEffect } from 'react';

const useSelectedChild = () => {
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  useEffect(() => {
    const storedChild = localStorage.getItem('selectedChild');
    if (storedChild) {
      setSelectedChild(storedChild);
    }
  }, []);

  const setChild = (childName: string) => {
    setSelectedChild(childName);
    localStorage.setItem('selectedChild', childName);
  };

  return { selectedChild, setChild };
};

export default useSelectedChild;
