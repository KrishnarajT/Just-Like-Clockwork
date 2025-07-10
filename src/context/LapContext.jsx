import { createContext, useState, useEffect } from 'react';
import getFromLocalStorage from '../components/import/from_local';
import saveToLocalStorage from '../components/export/to_local';

// Create the context
export const LapContext = createContext();

// Create a provider component
const LapProvider = ({ children }) => {
  let Laps = getFromLocalStorage() || [];
  const [laps, setLaps] = useState(Laps);

  const [breaksImpactAmount, setBreaksImpactAmount] = useState(false);
  const [breaksImpactTime, setBreaksImpactTime] = useState(false);
  const [showAmount, setShowAmount] = useState(true);
  const [showStatsBeforeLaps, setShowStatsBeforeLaps] = useState(false);
  function handleLapLocalUpdate(laps) {
    setLaps(laps);
  }

  const [amount, setAmount] = useState(0.0);


  // fetch the initial state from local storage
  useEffect(() => {
    const storedShowAmount = localStorage.getItem('showAmount');
    const storedShowStatsBeforeLaps = localStorage.getItem('showStatsBeforeLaps');
    const storedBreaksImpactAmount = localStorage.getItem('breaksImpactAmount');
    const storedBreaksImpactTime = localStorage.getItem('breaksImpactTime');

    setShowAmount(storedShowAmount ? JSON.parse(storedShowAmount) : true);
    setShowStatsBeforeLaps(storedShowStatsBeforeLaps ? JSON.parse(storedShowStatsBeforeLaps) : false);
    setBreaksImpactAmount(storedBreaksImpactAmount ? JSON.parse(storedBreaksImpactAmount) : false);
    setBreaksImpactTime(storedBreaksImpactTime ? JSON.parse(storedBreaksImpactTime) : false);
  }, []);

  // Functions to update and persist state variables
  const updateShowAmount = (value) => {
    setShowAmount(value);
    localStorage.setItem('showAmount', JSON.stringify(value));
  };

  const updateShowStatsBeforeLaps = (value) => {
    setShowStatsBeforeLaps(value);
    localStorage.setItem('showStatsBeforeLaps', JSON.stringify(value));
  };

  const updateBreaksImpactAmount = (value) => {
    setBreaksImpactAmount(value);
    localStorage.setItem('breaksImpactAmount', JSON.stringify(value));
  };

  const updateBreaksImpactTime = (value) => {
    setBreaksImpactTime(value);
    localStorage.setItem('breaksImpactTime', JSON.stringify(value));
  };

  // Load laps from IndexedDB when the component mounts
  useEffect(() => {
    getFromLocalStorage(handleLapLocalUpdate);
  }, []);

  // Save laps to IndexedDB whenever they change
  useEffect(() => {
    saveToLocalStorage(laps);
  }, [laps]);

  // Add a lap to the laps array
  const addLap = (lap) => {
    lap.setHourlyAmount(amount);
    // new lap reversed
    setLaps((prevLaps) => [lap, ...prevLaps]);
  };

  // Remove all laps
  const resetLaps = () => {
    setLaps([]);
  };

  // Get the ID of the last lap
  const getFirstLap = () => {
    return laps[0];
  };

  // Get lap from ID
  const getLapFromId = (id) => {
    return laps.filter((lap) => lap.id === id)[0];
  };

  // Update work done by ID
  const updateWorkDoneByID = (id, workDone) => {
    const newLaps = laps.map((lap) => {
      if (lap.id === id) {
        lap.setWorkDoneString(workDone);
      }
      return lap;
    });
    setLaps(newLaps);
  };

  // Update the amount
  const updateAmount = (amount) => {
    setAmount(amount);
  };

  // Update a lap
  const updateLap = (lapId, hours, minutes, seconds) => {
    const newLaps = laps.map((lap) => {
      if (lap.id === lapId) {
        lap.setCurrentHours(hours);
        lap.setCurrentMinutes(minutes);
        lap.setCurrentSeconds(seconds);
      }
      return lap;
    });
    setLaps(newLaps);
  };

  // Calculate the total amount sum of all laps
  const getTotalAmountSum = () => {
    let totalAmount = 0.0;
    laps
      .filter((lap) => {
        if (breaksImpactAmount) {
          return !lap.isBreakLap; // Exclude break laps
        }
        return true; // Include all laps
      })
      .forEach((lap) => {
        totalAmount += parseFloat(lap.getAmount());
      });
    // round to 3 decimal places
    totalAmount = Math.round(totalAmount * 1000) / 1000;
    // pad 0s if less than 3 decimal places
    totalAmount = totalAmount.toFixed(3);
    return totalAmount;
  };

  // Calculate the total time spent in minutes
  const getTotalTimeSpent = () => {
    let totalMinutes = 0;
    laps
      .filter((lap) => {
        if (breaksImpactTime) {
          return !lap.isBreakLap; // Exclude break laps
        }
        return true; // Include all laps
      }).forEach((lap) => {
        totalMinutes += +lap.getTotalTimeInMinutes();
      });
    // Round to 2 decimal places
    totalMinutes = Math.round(totalMinutes * 100) / 100;
    return totalMinutes;
  };

  // Calculate the total time spent in seconds
  const getTotalTimeSpentSeconds = () => {
    let totalSeconds = 0;
    laps
      .filter((lap) => {
        if (breaksImpactTime) {
          return !lap.isBreakLap; // Exclude break laps
        }
        return true; // Include all laps
      })
      .forEach((lap) => {
        totalSeconds += +lap.getTotalTimeInSeconds();
      });
    // Round to 2 decimal places
    totalSeconds = Math.round(totalSeconds * 100) / 100;
    return totalSeconds;
  };

  // Calculate total time spent on breaks
  const getTotalBreakTimeSpentMinutes = () => {
    let totalBreakTime = 0;
    laps
      .filter((lap) => lap.isBreakLap)
      .forEach((lap) => {
        totalBreakTime += +lap.getTotalTimeInMinutes();
      });
    // Round to 2 decimal places
    totalBreakTime = Math.round(totalBreakTime * 100) / 100;
    return totalBreakTime;
  };


  // function to update the end time for a lap
  const updateEndTime = (lapId, endTime) => {
    const newLaps = laps.map((lap) => {
      if (lap.id === lapId) {
        lap.setEndTime(endTime);
      }
      return lap;
    });
    setLaps(newLaps);
  };

  // Provide the context value to the children components
  return (
    <LapContext.Provider
      value={{
        laps,
        breaksImpactAmount,
        breaksImpactTime,
        setBreaksImpactAmount,
        setBreaksImpactTime,
        setLaps,
        addLap,
        resetLaps,
        updateLap,
        getFirstLap,
        getLapFromId,
        updateWorkDoneByID,
        updateAmount,
        updateEndTime,
        getTotalAmountSum,
        getTotalTimeSpent,
        getTotalTimeSpentSeconds,
        getTotalBreakTimeSpentMinutes,
        showAmount,
        setShowAmount,
        showStatsBeforeLaps,
        setShowStatsBeforeLaps,
        updateShowAmount,
        updateShowStatsBeforeLaps,
        updateBreaksImpactAmount,
        updateBreaksImpactTime,
      }}
    >
      {children}
    </LapContext.Provider>
  );
};

export default LapProvider;
