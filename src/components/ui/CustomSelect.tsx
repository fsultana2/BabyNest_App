import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './CustomSelect.css';

interface CustomSelectProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selected, onSelect, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div className={`custom-select ${className}`} ref={ref}>
      <div className="select-header" onClick={() => setOpen(!open)}>
        <span>{selected || 'Select'}</span>
        <ChevronDown size={16} />
      </div>
      {open && (
        <ul className="select-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => { onSelect(option); setOpen(false); }}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
