import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Calendar, X } from 'lucide-react';
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

  useEffect(() => {
    const saved = localStorage.getItem('children');
    if (saved) setChildren(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('children', JSON.stringify(children));
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
        {/* Toggle Tabs */}
        <div className="child-toggle">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="active">Child Profiles</button>
        </div>

        <h2 className="child-title">Child Profiles</h2>

        {/* Add Form */}
        <div className="child-card-wrapper">
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
              {/* Only show one calendar icon (if needed visually, uncomment this): */}
              {/* <Calendar size={18} /> */}
            </div>

            <button className="add-button" onClick={addChild}>
              Add Child
            </button>
          </div>

          {/* Child List */}
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

          {/* Delete All */}
          {children.length > 0 && (
            <button className="delete-all" onClick={deleteAll}>
              Delete All
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChildProfiles;
