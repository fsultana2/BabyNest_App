// components/ui/select.tsx
import React, { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  value: Option;
  onChange: (option: Option) => void;
  options: Option[];
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, className = '' }) => {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={`custom-select ${className}`}>
      <div className="select-trigger" onClick={() => setOpen(!open)}>
        {value?.label || 'Select...'}
        <span style={{ marginLeft: 'auto' }}>▼</span>
      </div>
      {open && (
        <div className="select-dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className="select-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
