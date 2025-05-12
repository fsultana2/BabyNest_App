import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Child {
  name: string;
  dob: string;
}

interface ChildSelectorProps {
  children: Child[];
  selectedChild: string | null;
  onSelectChild: (child: Child) => void;
}

const ChildSelector: React.FC<ChildSelectorProps> = ({ children, selectedChild, onSelectChild }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ensure dropdown closes when selectedChild updates
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [selectedChild]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Log clicks to confirm event firing
  const handleSelect = (child: Child) => {
    console.log("Clicked child:", child.name);
    onSelectChild(child);
  };

  return (
    <div className="child-selector">
      <span className="child-label">Current Child:</span>
      <div className={`child-dropdown ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
        <span className="child-name">{selectedChild || 'Select'}</span>
        <ChevronDown size={16} />
      </div>

      {isDropdownOpen && (
        <div className={`child-dropdown-list ${isDropdownOpen ? 'visible' : ''}`}>
          {children.length > 0 ? (
            children.map((child, index) => (
              <div key={index} onClick={() => handleSelect(child)} className={`child-dropdown-item ${selectedChild === child.name ? 'selected' : ''}`}>
                {child.name}
              </div>
            ))
          ) : (
            <div className="child-dropdown-item">No children available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChildSelector;
