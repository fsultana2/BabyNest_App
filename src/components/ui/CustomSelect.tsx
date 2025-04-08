import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  const dropdown = (
    <ul
      ref={dropdownRef}
      className="select-options portal-dropdown"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        zIndex: 99999,
      }}
    >
      {options.map((option, idx) => (
        <li
          key={idx}
          onClick={() => {
            onSelect(option);
            setOpen(false);
          }}
        >
          {option}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div
        className={`custom-select ${className || ''}`}
        ref={ref}
        onClick={() => setOpen((prev) => !prev)}
        style={{ position: 'relative' }}
      >
        <div className="select-header">
          <span>{selected || 'Select'}</span>
          <ChevronDown size={16} />
        </div>
      </div>
      {open && createPortal(dropdown, document.getElementById('dropdown-root')!)}
    </>
  );
};

export default CustomSelect;
