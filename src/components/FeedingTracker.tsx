import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/FeedingTracker.css';
import useSelectedChild from '../hooks/useSelectedChild';
type FormulaLog = { oz: string; time: string; date: string; child: string };
type BreastLog = { start: string; duration: number; date: string; child: string };
type SolidsLog = { meal: string; food: string; time: string; date: string; child: string };

const FeedingTracker: React.FC = () => {
    const location = useLocation();
    const { selectedChild } = useSelectedChild();



  
  const [formulaLogs, setFormulaLogs] = useState<FormulaLog[]>(() => {
      const stored = localStorage.getItem('formulaLogs');
      return stored ? JSON.parse(stored) : [];
    });
  
    const [breastLogs, setBreastLogs] = useState<BreastLog[]>(() => {
      const stored = localStorage.getItem('breastLogs');
      return stored ? JSON.parse(stored) : [];
    });
  
    const [solidsLogs, setSolidsLogs] = useState<SolidsLog[]>(() => {
      const stored = localStorage.getItem('solidsLogs');
      return stored ? JSON.parse(stored) : [];
    });

    const [feedingType, setFeedingType] = useState<'formula' | 'breast' | 'solids'>('formula');
    const [ozAmount, setOzAmount] = useState(0);
    const [feedingTime, setFeedingTime] = useState('');
    const [breastStartTime, setBreastStartTime] = useState('');
    const [breastDuration, setBreastDuration] = useState(0);
    const [isTiming, setIsTiming] = useState(false);
    const [timerStart, setTimerStart] = useState<Date | null>(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [mealType, setMealType] = useState('Breakfast');
    const [foodType, setFoodType] = useState('');
    const [solidsTime, setSolidsTime] = useState('');
  
    useEffect(() => {
      const restoreLogs = () => {
        try {
          setFormulaLogs(JSON.parse(localStorage.getItem('formulaLogs') || '[]'));
          setBreastLogs(JSON.parse(localStorage.getItem('breastLogs') || '[]'));
          setSolidsLogs(JSON.parse(localStorage.getItem('solidsLogs') || '[]'));
        } catch (e) {
          console.error('Failed to restore logs', e);
        }
      };
      restoreLogs();
      window.addEventListener('focus', restoreLogs);
      return () => window.removeEventListener('focus', restoreLogs);
    }, [location.pathname]);
  
    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isTiming && timerStart) {
        interval = setInterval(() => {
          const seconds = Math.floor((Date.now() - timerStart.getTime()) / 1000);
          setElapsedSeconds(seconds);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isTiming, timerStart]);
  
    useEffect(() => {
      localStorage.setItem('formulaLogs', JSON.stringify(formulaLogs));
    }, [formulaLogs]);
  
    useEffect(() => {
      localStorage.setItem('breastLogs', JSON.stringify(breastLogs));
    }, [breastLogs]);
  
    useEffect(() => {
      localStorage.setItem('solidsLogs', JSON.stringify(solidsLogs));
    }, [solidsLogs]);
  
    const incrementAmount = () => setOzAmount(ozAmount + 1);
    const decrementAmount = () => setOzAmount(Math.max(ozAmount - 1, 0));
  
    const today = new Date().toISOString().split('T')[0];
  
    const addFormulaLog = () => {
      const newLog: FormulaLog = { oz: ozAmount.toString(), time: feedingTime, date: today, child: selectedChild };
      const updated: FormulaLog[] = [...formulaLogs, newLog];
      setFormulaLogs(updated);
      setOzAmount(0);
      setFeedingTime('');
    };
  
    const addBreastLog = () => {
      const newLog: BreastLog = { start: breastStartTime, duration: elapsedSeconds, date: today, child: selectedChild };
      const updated: BreastLog[] = [...breastLogs, newLog];
      setBreastLogs(updated);
      setBreastStartTime('');
      setElapsedSeconds(0);
    };
  
    const addSolidsLog = () => {
      const newLog: SolidsLog = { meal: mealType, food: foodType, time: solidsTime, date: today, child: selectedChild };
      const updated: SolidsLog[] = [...solidsLogs, newLog];
      setSolidsLogs(updated);
      setMealType('Breakfast');
      setFoodType('');
      setSolidsTime('');
    };
  
    const deleteEntry = (index: number) => setFormulaLogs(formulaLogs.filter((_, i) => i !== index));
    const deleteBreastEntry = (index: number) => setBreastLogs(breastLogs.filter((_, i) => i !== index));
    const deleteSolidsEntry = (index: number) => setSolidsLogs(solidsLogs.filter((_, i) => i !== index));
  
    const deleteAllLogs = () => {
      if (window.confirm('Are you sure you want to delete all feeding logs?')) {
        setFormulaLogs([]);
        setBreastLogs([]);
        setSolidsLogs([]);
        localStorage.removeItem('formulaLogs');
        localStorage.removeItem('breastLogs');
        localStorage.removeItem('solidsLogs');
      }
    };
  

  return (
    <div className="feeding-tracker">
      <h3>Feeding Tracker</h3>
      <div className="feeding-tab-toggle">
        <div className={`tab-button ${feedingType === 'formula' ? 'active' : ''}`} onClick={() => setFeedingType('formula')}>🍴 Formula</div>
        <div className={`tab-button ${feedingType === 'breast' ? 'active' : ''}`} onClick={() => setFeedingType('breast')}>🍴 Breast</div>
        <div className={`tab-button ${feedingType === 'solids' ? 'active' : ''}`} onClick={() => setFeedingType('solids')}>🍴 Solids</div>
      </div>

      {feedingType === 'formula' && (
        <div className="feeding-form">
          <h4>Formula Feeding</h4>
          <form onSubmit={(e) => { e.preventDefault(); addFormulaLog(); }}>
            <div className="amount-wrapper">
              <label htmlFor="ozAmount">Amount (Oz):</label>
              <div className="amount-input-wrapper">
                <button type="button" onClick={decrementAmount} className="amount-button">-</button>
                <input id="ozAmount" type="number" value={ozAmount} readOnly required />
                <button type="button" onClick={incrementAmount} className="amount-button">+</button>
              </div>
            </div>
            <div className="time-wrapper">
              <label htmlFor="feedingTime">Time:</label>
              <input id="feedingTime" type="time" value={feedingTime} onChange={(e) => setFeedingTime(e.target.value)} required />
            </div>
            <button type="submit" className="add-button">Add</button>
          </form>
          <h5>Summary</h5>
          {formulaLogs.filter(log => log.child === selectedChild).map((log, index) =>  (
            <div key={index} className="summary">
              <p>{log.oz} oz at {log.time} <button onClick={() => deleteEntry(index)} className="delete-entry-button">❌</button></p>
            </div>
          ))}
          <p>Total: {formulaLogs
  .filter(log => log.child === selectedChild)
  .reduce((sum, log) => sum + parseFloat(log.oz), 0)} oz</p>

        </div>
      )}

      {feedingType === 'breast' && (
        <div className="feeding-form">
          <h4>Breastfeeding</h4>
          <form onSubmit={(e) => { e.preventDefault(); addBreastLog(); }}>
            <div className="time-wrapper">
              <label>Time:</label>
              {!isTiming ? (
                <div className="stopwatch-button-start" onClick={() => {
                  const now = new Date();
                  setTimerStart(now);
                  setIsTiming(true);
                  setElapsedSeconds(0);
                  const hours = now.getHours() % 12 || 12;
                  const minutes = now.getMinutes().toString().padStart(2, '0');
                  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
                  setBreastStartTime(`${hours}:${minutes} ${ampm}`);
                }}>Start</div>
              ) : (
                <div className="stopwatch-button-stop" onClick={() => {
                  setIsTiming(false);
                  setBreastDuration(elapsedSeconds);
                }}>Stop</div>
              )}
              {isTiming && (
                <div className="timer-display">
                  ⏱ {String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0')}:
                  {String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0')}:
                  {String(elapsedSeconds % 60).padStart(2, '0')}
                </div>
              )}
              {breastStartTime && !isTiming && <div className="start-time-display">Started at: {breastStartTime}</div>}
            </div>
            <button type="submit" className="add-button">Add</button>
          </form>
          <h5>Summary</h5>
          {breastLogs.filter(log => log.child === selectedChild).map((log, index) => {
            const hrs = Math.floor(log.duration / 3600);
            const mins = Math.floor((log.duration % 3600) / 60);
            const secs = log.duration % 60;
            return (
              <div key={index} className="summary">
                <p>{hrs}h {mins}m {secs}s at {log.start} <button onClick={() => deleteBreastEntry(index)} className="delete-entry-button">❌</button></p>
              </div>
            );
          })}
          <p>Total: {
  (() => {
    const total = breastLogs.filter(log => log.child === selectedChild)
      .reduce((sum, log) => sum + log.duration, 0);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}h ${m}m ${s}s`;
  })()
}</p>

        </div>
      )}

      {feedingType === 'solids' && (
        <div className="feeding-form">
          <h4>Solids Feeding</h4>
          <form onSubmit={(e) => { e.preventDefault(); addSolidsLog(); }}>
            <div className="time-wrapper">
              <label htmlFor="mealType">Meal:</label>
              <select id="mealType" value={mealType} onChange={(e) => setMealType(e.target.value)} className="solids-select">
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Mid Snacks</option>
                <option>Dinner</option>
              </select>
            </div>
            <div className="time-wrapper">
              <label htmlFor="foodType">Food:</label>
              <input id="foodType" type="text" value={foodType} onChange={(e) => setFoodType(e.target.value)} placeholder="e.g., Mashed banana" required />
            </div>
            <div className="time-wrapper">
              <label htmlFor="solidsTime">Time:</label>
              <input id="solidsTime" type="time" value={solidsTime} onChange={(e) => setSolidsTime(e.target.value)} required />
            </div>
            <button type="submit" className="add-button">Add</button>
          </form>
          <h5>Summary</h5>
          {solidsLogs.filter(log => log.child === selectedChild).map((log, index) => (
            <div key={index} className="summary">
              <p>{log.meal} – {log.food} at {log.time} <button onClick={() => deleteSolidsEntry(index)} className="delete-entry-button">❌</button></p>
            </div>
          ))}
         <p>Total: {solidsLogs.filter(log => log.child === selectedChild).length} entries</p>

        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={deleteAllLogs} className="delete-all-btn">Delete All Logs</button>
      </div>
    </div>
  );
};

export default FeedingTracker;
