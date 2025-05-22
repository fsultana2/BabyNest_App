import { useState } from 'react';

type UseSelectedChildHook = {
  selectedChild: string;
  setChild: (childName: string) => void;
};

const useSelectedChild = (): UseSelectedChildHook => {
  const [selectedChild, setSelectedChild] = useState<string>(() => {
    return localStorage.getItem('selectedChild') || '';
  });

  const setChild = (childName: string) => {
    setSelectedChild(childName);
    localStorage.setItem('selectedChild', childName);
  };

  return { selectedChild, setChild };
};

export default useSelectedChild;
