import { createContext, useState, useEffect } from "react";
import getFromLocalStorage from "../components/import/from_local";
import saveToLocalStorage from "../components/export/to_local";

// Create the context
export const LapContext = createContext();

// Create a provider component
const LapProvider = ({ children }) => {
  let Laps = getFromLocalStorage() || [];
  const [laps, setLaps] = useState(Laps);

  function handleLapLocalUpdate(laps) {
    setLaps(laps);
  }

  const [amount, setAmount] = useState(0.0);

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
    laps.forEach((lap) => {
      totalAmount += parseFloat(lap.getAmount());
    });
    totalAmount = Math.round(totalAmount * 1000) / 1000; // Round to 3 decimal places
    return totalAmount;
  };

  // Calculate the total time spent in minutes
  const getTotalTimeSpent = () => {
    let totalMinutes = 0;
    laps.forEach((lap) => {
      totalMinutes += +lap.getTotalTimeInMinutes();
    });
    // Round to 2 decimal places
    totalMinutes = Math.round(totalMinutes * 100) / 100;
    return totalMinutes;
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
      }}
    >
      {children}
    </LapContext.Provider>
  );
};

export default LapProvider;
