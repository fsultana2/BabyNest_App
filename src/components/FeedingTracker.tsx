import React, { useState, useEffect } from 'react';
import '../styles/FeedingTracker.css';

const FeedingTracker: React.FC = () => {
  const [formulaLogs, setFormulaLogs] = useState<{ oz: string; time: string }[]>([]);
  const [breastLogs, setBreastLogs] = useState<{ start: string; duration: number }[]>([]);
  const [feedingType, setFeedingType] = useState<'formula' | 'breast' | 'solids'>('formula');

  // Formula states
  const [ozAmount, setOzAmount] = useState(0);
  const [feedingTime, setFeedingTime] = useState('');

  // Breastfeeding states
  const [breastStartTime, setBreastStartTime] = useState('');
  const [breastDuration, setBreastDuration] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [timerStart, setTimerStart] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Load logs from localStorage
  useEffect(() => {
    const storedFormulaLogs = localStorage.getItem('formulaLogs');
    if (storedFormulaLogs) {
      setFormulaLogs(JSON.parse(storedFormulaLogs));
    }

    const storedBreastLogs = localStorage.getItem('breastLogs');
    if (storedBreastLogs) {
      setBreastLogs(JSON.parse(storedBreastLogs));
    }
  }, []);

  // Save logs to localStorage
  useEffect(() => {
    if (formulaLogs.length > 0) {
      localStorage.setItem('formulaLogs', JSON.stringify(formulaLogs));
    }
  }, [formulaLogs]);

  useEffect(() => {
    if (breastLogs.length > 0) {
      localStorage.setItem('breastLogs', JSON.stringify(breastLogs));
    }
  }, [breastLogs]);

  // Stopwatch logic
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

  const incrementAmount = () => setOzAmount(ozAmount + 1);
  const decrementAmount = () => setOzAmount(ozAmount > 0 ? ozAmount - 1 : 0);

  const addFormulaLog = () => {
    const newLog = { oz: ozAmount.toString(), time: feedingTime };
    setFormulaLogs([...formulaLogs, newLog]);
    setOzAmount(0);
    setFeedingTime('');
  };

  const deleteEntry = (index: number) => {
    const updatedLogs = formulaLogs.filter((_, i) => i !== index);
    setFormulaLogs(updatedLogs);
  };

  const deleteAllLogs = () => {
    setFormulaLogs([]);
    setBreastLogs([]);
  };

  const addBreastLog = () => {
    const newLog = { start: breastStartTime, duration: breastDuration };
    setBreastLogs([...breastLogs, newLog]);
    setBreastStartTime('');
    setBreastDuration(0);
    setElapsedSeconds(0);
  };

  const deleteBreastEntry = (index: number) => {
    const updatedLogs = breastLogs.filter((_, i) => i !== index);
    setBreastLogs(updatedLogs);
  };

  return (
    <div className="feeding-tracker">
      <h3>Feeding Tracker</h3>

      {/* Feeding Type Selector */}
      <div className="feeding-type-selector">
        <button
          className={feedingType === 'formula' ? 'active' : ''}
          onClick={() => setFeedingType('formula')}
        >
          Formula
        </button>
        <button
          className={feedingType === 'breast' ? 'active' : ''}
          onClick={() => setFeedingType('breast')}
        >
          Breast
        </button>
        <button
          className={feedingType === 'solids' ? 'active' : ''}
          onClick={() => setFeedingType('solids')}
        >
          Solids
        </button>
      </div>

      {/* Formula Feeding Form */}
      {feedingType === 'formula' && (
        <div className="feeding-form">
          <h4>Formula Feeding</h4>
          <form onSubmit={(e) => { e.preventDefault(); addFormulaLog(); }}>
            <div className="amount-wrapper">
              <label htmlFor="ozAmount">Amount(Oz.):</label>
              <div className="amount-input-wrapper">
                <button type="button" onClick={decrementAmount} className="amount-button">-</button>
                <input
                  id="ozAmount"
                  type="number"
                  value={ozAmount}
                  readOnly
                  required
                />
                <button type="button" onClick={incrementAmount} className="amount-button">+</button>
              </div>
            </div>

            <div className="time-wrapper">
              <label htmlFor="feedingTime">Time:</label>
              <input
                id="feedingTime"
                type="time"
                value={feedingTime}
                onChange={(e) => setFeedingTime(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="add-button">
              Add
            </button>
          </form>

          <h5>Summary</h5>
          {formulaLogs.map((log, index) => (
            <div key={index} className="summary">
              <p>{log.oz} oz at {log.time} 
                <button onClick={() => deleteEntry(index)} className="delete-entry-button">❌</button>
              </p>
            </div>
          ))}
          <p>Total: {formulaLogs.reduce((sum, log) => sum + parseFloat(log.oz), 0)} oz</p>
        </div>
      )}

      {/* Breastfeeding Form with Stopwatch */}
      {feedingType === 'breast' && (
        <div className="feeding-form">
          <h4>Breastfeeding</h4>
          <form onSubmit={(e) => { e.preventDefault(); addBreastLog(); }}>
            <div className="time-wrapper">
              <label>Time:</label>
              {!isTiming ? (
                <button
                  type="button"
                  className="start-time-button"
                  onClick={() => {
                    const now = new Date();
                    setTimerStart(now);
                    setIsTiming(true);
                    setElapsedSeconds(0);

                    const hours = now.getHours() % 12 || 12;
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
                    const formattedTime = `${hours}:${minutes} ${ampm}`;
                    setBreastStartTime(formattedTime);
                  }}
                >
                  Start
                </button>
              ) : (
                <button
                  type="button"
                  className="stop-time-button"
                  onClick={() => {
                    setIsTiming(false);
                    setBreastDuration(elapsedSeconds); // ✅ Save raw seconds!
                  }}
                >
                  Stop
                </button>
              )}

              {isTiming && (
                <div className="timer-display">
                  ⏱ {String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0')}:
                  {String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0')}:
                  {String(elapsedSeconds % 60).padStart(2, '0')}
                </div>
              )}

              {breastStartTime && !isTiming && (
                <div className="start-time-display">
                  Started at: {breastStartTime}
                </div>
              )}
            </div>

            <button type="submit" className="add-button">
              Add
            </button>
          </form>

          <h5>Summary</h5>
          {breastLogs.map((log, index) => {
            const hrs = Math.floor(log.duration / 3600);
            const mins = Math.floor((log.duration % 3600) / 60);
            const secs = log.duration % 60;

            return (
              <div key={index} className="summary">
                <p>
                  {hrs}h {mins}m {secs}s at {log.start}
                  <button onClick={() => deleteBreastEntry(index)} className="delete-entry-button">❌</button>
                </p>
              </div>
            );
          })}

          <p>Total: {Math.floor(breastLogs.reduce((sum, log) => sum + log.duration, 0) / 60)} minutes</p>
        </div>
      )}

      {/* Delete All Logs Button */}
      <div>
        <button onClick={deleteAllLogs} className="delete-all-btn">
          Delete All Logs
        </button>
      </div>
    </div>
  );
};

export default FeedingTracker;
