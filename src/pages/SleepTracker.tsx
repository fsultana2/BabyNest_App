import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import useSelectedChild from '../hooks/useSelectedChild';
import '../styles/SleepTracker.css';

type SleepLog = {
  start: string;
  end: string;
  date: string;
  location: string;
  child: string;
};

const locations = ['Crib', 'Bassinet', 'Bed', 'Stroller', 'Car Seat', 'Other'];

const SleepTracker: React.FC = () => {
  const { selectedChild } = useSelectedChild();

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([]);
  const [today, setToday] = useState('');
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null); // ✅ for edit

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setToday(currentDate);
    loadLogs(currentDate);
  }, [selectedChild]);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownIndex(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const loadLogs = (date: string) => {
    const allLogs = JSON.parse(localStorage.getItem('sleepLogs') || '[]');
    const filtered = allLogs.filter(
      (log: SleepLog) => log.date === date && log.child === selectedChild
    );
    setSleepLogs(filtered);
  };

  const handleSave = () => {
    if (!startTime || !endTime || !location) return;

    const newLog: SleepLog = {
      start: `${today}T${startTime}`,
      end: `${today}T${endTime}`,
      date: today,
      location,
      child: selectedChild,
    };

    const existingLogs = JSON.parse(localStorage.getItem('sleepLogs') || '[]');
    const updatedLogs = [...existingLogs, newLog];
    localStorage.setItem('sleepLogs', JSON.stringify(updatedLogs));
    setSleepLogs((prev) => [...prev, newLog]);

    setStartTime('');
    setEndTime('');
    setLocation('');
  };

  const handleEdit = (index: number) => {
    const log = sleepLogs[index];
    setStartTime(log.start.split('T')[1]);
    setEndTime(log.end.split('T')[1]);
    setLocation(log.location);
    setEditIndex(index);
    setOpenDropdownIndex(null);
  };

  const handleUpdate = () => {
    if (editIndex === null || !startTime || !endTime || !location) return;

    const updatedLog: SleepLog = {
      start: `${today}T${startTime}`,
      end: `${today}T${endTime}`,
      date: today,
      location,
      child: selectedChild,
    };

    const updatedLogs = [...sleepLogs];
    updatedLogs[editIndex] = updatedLog;

    const allLogs = JSON.parse(localStorage.getItem('sleepLogs') || '[]').filter(
      (log: SleepLog) => !(log.date === today && log.child === selectedChild)
    );

    const finalLogs = [...allLogs, ...updatedLogs];
    localStorage.setItem('sleepLogs', JSON.stringify(finalLogs));
    setSleepLogs(updatedLogs);

    // Reset form
    setStartTime('');
    setEndTime('');
    setLocation('');
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const updatedLogs = sleepLogs.filter((_, i) => i !== index);
    const allLogs = JSON.parse(localStorage.getItem('sleepLogs') || '[]').filter(
      (log: SleepLog) => !(log.date === today && log.child === selectedChild)
    );
    localStorage.setItem('sleepLogs', JSON.stringify([...allLogs, ...updatedLogs]));
    setSleepLogs(updatedLogs);
    setOpenDropdownIndex(null);
    setEditIndex(null);
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const getDuration = (start: string, end: string) => {
    const diff = (new Date(end).getTime() - new Date(start).getTime()) / 60000;
    return `${Math.floor(diff)} min`;
  };

  return (
    <Layout>
      <div className="sleep-page">
        <h2 className="sleep-title">🛌 Sleep Record</h2>

        <div className="sleep-form">
          <label>Start Time</label>
          <div className="time-input-wrapper">
            <span className="clock-icon">🕒</span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <label>End Time</label>
          <div className="time-input-wrapper">
            <span className="clock-icon">🕒</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <label>Location</label>
          <div className="location-options">
            {locations.map((loc) => (
              <button
                key={loc}
                className={`loc-btn ${location === loc ? 'selected' : ''}`}
                onClick={() => setLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          <button
            className="save-btn"
            onClick={editIndex !== null ? handleUpdate : handleSave}
          >
            {editIndex !== null ? '🔄 Update Sleep Record' : '💤 Save Sleep Record'}
          </button>
        </div>

        <div className="sleep-summary">
          <h3>Sleep Summary</h3>
          {sleepLogs.length === 0 ? (
            <p>No sleep records for today.</p>
          ) : (
            <>
              <table className="sleep-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Location</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sleepLogs.map((log, index) => (
                    <tr key={index}>
                      <td>{`${formatTime(log.start)} - ${formatTime(log.end)}`}</td>
                      <td>{getDuration(log.start, log.end)}</td>
                      <td>{log.location}</td>
                      <td className="dropdown-cell">
                        <div className="dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="dropdown-toggle"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownIndex(index === openDropdownIndex ? null : index);
                            }}
                          >
                            ✏️
                          </button>
                          {openDropdownIndex === index && (
                            <div className="dropdown-menu inside-cell">
                              <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                              <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="delete-all-btn" onClick={() => setSleepLogs([])}>
                Delete All
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SleepTracker;
