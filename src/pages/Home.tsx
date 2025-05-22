// ✅ Everything you see here is already the latest complete version.

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Camera, Baby, Moon, Play, Droplet } from 'lucide-react';
import { Music, Book, FileText } from 'lucide-react';
import useSelectedChild from '../hooks/useSelectedChild';
import '../styles/Home.css';
import ChildSelector from '../components/ChildSelector'; 


const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedChild, setChild } = useSelectedChild();
  const [children, setChildren] = useState<{ name: string; dob: string }[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Feeding summary states
  const [formulaTotal, setFormulaTotal] = useState(0);
  const [breastSessions, setBreastSessions] = useState(0);
  const [solidMeals, setSolidMeals] = useState<string[]>([]);
  const [todayDate, setTodayDate] = useState('');
  // Feeding summary states
  //sleeping summary states
  const [sleepSummary, setSleepSummary] = useState('');

  //sleeping summary states
  
  useEffect(() => {
    const savedChildren = JSON.parse(localStorage.getItem('children') || '[]');
    setChildren(savedChildren);
  
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setProfileImage(savedImage);
  
    const today = new Date().toISOString().split('T')[0];
    setTodayDate(today);
  
    // Formula
    const formulaLogs = JSON.parse(localStorage.getItem('formulaLogs') || '[]');
    const todayFormula = formulaLogs.filter(
      (log: any) => log.date === today && log.child === selectedChild
    );
    const totalOz = todayFormula.reduce((sum: number, log: any) => sum + parseFloat(log.oz), 0);
    setFormulaTotal(totalOz);
  
    // Breast
    const breastLogs = JSON.parse(localStorage.getItem('breastLogs') || '[]');
    const todayBreast = breastLogs.filter(
      (log: any) => log.date === today && log.child === selectedChild
    );
    setBreastSessions(todayBreast.length);
  
    // Solids
    const solidsLogs = JSON.parse(localStorage.getItem('solidsLogs') || '[]');
    const todaySolids = solidsLogs.filter(
      (log: any) => log.date === today && log.child === selectedChild
    );
    const meals = [...new Set(todaySolids.map((log: any) => log.meal))] as string[];
    setSolidMeals(meals);
  
    // ✅ Sleep
    const sleepLogs = JSON.parse(localStorage.getItem('sleepLogs') || '[]');
    const todaySleepLogs = sleepLogs.filter(
      (log: any) => log.date === today && log.child === selectedChild
    );
  
    const totalMinutes = todaySleepLogs.reduce((sum: number, log: any) => {
      const start = new Date(log.start).getTime();
      const end = new Date(log.end).getTime();
      const duration = (end - start) / 60000;
      return sum + duration;
    }, 0);
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    const summaryText =
      hours > 0 && minutes > 0
        ? `${hours} hr${hours > 1 ? 's' : ''} ${minutes} min`
        : hours > 0
        ? `${hours} hr${hours > 1 ? 's' : ''}`
        : `${minutes} min`;
  
    setSleepSummary(summaryText || '0 min');
  }, [selectedChild]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleChildSelect = (child: { name: string }) => {
    setChild(child.name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="home-page">
      <div className="toggle-bar">
        <button className={`toggle-button ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button className={`toggle-button ${location.pathname === '/child-profiles' ? 'active' : ''}`} onClick={() => navigate('/child-profiles')}>Child Profiles</button>
      </div>

      <ChildSelector children={children} onSelectChild={handleChildSelect} selectedChild={selectedChild} />

      <div className="upload-section">
        <div className="upload-circle">
          {profileImage ? <img src={profileImage} alt="Profile" className="avatar-image" /> : <Camera size={32} color="#777" />}
        </div>
        <label htmlFor="file-upload" className="upload-button">Upload</label>
        <input type="file" id="file-upload" onChange={handleImageUpload} style={{ display: 'none' }} />
      </div>

      <div className="activity-grid">
        <div className="activity-card" onClick={() => navigate('/feeding')}><Baby size={28} /><span>Feeding</span></div>
        <div className="activity-card" onClick={() => navigate('/sleep')}>
  <Moon size={28} />
  <span>Sleep</span>
</div>

        <div className="activity-card"><Droplet size={28} /><span>Diaper</span></div>
        <div className="activity-card"><Play size={28} /><span>Play</span></div>
      </div>

      <div className="summary-section">
      <h3 className="summary-title">Summary 📅 {todayDate}</h3>

        <div className="summary-grid">
          <div className="summary-card"><strong>Feedings:</strong>
            <div>Formula: {formulaTotal} oz</div>
            <div>Breast: {breastSessions} session(s)</div>
            <div>Solids: {solidMeals.join(', ') || 'None'}</div>
          </div>
          <div className="summary-card"><strong>Sleep:</strong> {sleepSummary}</div>

          <div className="summary-card"><strong>Diapers:</strong> 6</div>
          <div className="summary-card"><strong>Play:</strong> 2 hrs</div>
        </div>
      </div>

      <div className="bottom-nav">
        <div className="bottom-icon" onClick={() => navigate('/lullabies')}><Music size={24} /><span>Lullabies</span></div>
        <div className="bottom-icon" onClick={() => navigate('/books')}><Book size={24} /><span>Books</span></div>
        <div className="bottom-icon" onClick={() => navigate('/reports')}><FileText size={24} /><span>Reports</span></div>
      </div>

      <footer className="home-footer">BabyNest © 2025 • Made with ❤️ for families</footer>
    </div>
  );
};

export default Home;
