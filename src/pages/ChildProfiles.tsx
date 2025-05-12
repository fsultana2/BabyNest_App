import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { X } from 'lucide-react';
import Layout from '../layouts/Layout'; // ✅ Shared layout with header
import '../styles/ChildProfiles.css';

interface Child {
  name: string;
  dob: string;
}

const ChildProfiles: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [children, setChildren] = useState<Child[]>([]);

  // Load children data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('children');
    if (saved) setChildren(JSON.parse(saved));
  }, []);

  // Update localStorage whenever children data changes
  useEffect(() => {
    if (children.length > 0) {
      localStorage.setItem('children', JSON.stringify(children));
    }
  }, [children]);

  const addChild = () => {
    if (!name || !dob) return;
    const newChild: Child = { name, dob };
    setChildren((prev) => [...prev, newChild]);
    setName('');
    setDob('');
  };

  const deleteChild = (index: number) => {
    setChildren((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteAll = () => {
    if (confirm('Delete all child profiles?')) {
      setChildren([]);
    }
  };

  const calculateAge = (dob: string) => {
    const parsed = parseISO(dob);
    return formatDistanceToNow(parsed, { addSuffix: false });
  };

  return (
    <Layout>
      <div className="child-page">
        <h2 className="child-title">Child Profiles</h2>

        <div className="child-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter child's name"
            className="child-name-input"
          />

          <div className="dob-wrapper">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="mm/dd/yyyy"
            />
          </div>

          <button className="add-button" onClick={addChild}>
            Add Child
          </button>
        </div>

        <div className="child-list">
          {children.map((child, index) => (
            <div className="child-card" key={index}>
              <span className="emoji">👶</span>
              <div className="child-info">
                <strong>{child.name}</strong>
                <p>(about {calculateAge(child.dob)} old)</p>
              </div>
              <button className="delete-button" onClick={() => deleteChild(index)}>
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        {children.length > 0 && (
          <button className="delete-all" onClick={deleteAll}>
            Delete All
          </button>
        )}
      </div>
    </Layout>
  );
};

export default ChildProfiles;
