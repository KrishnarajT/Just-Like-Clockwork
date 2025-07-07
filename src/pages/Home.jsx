// importing basics
import { useState, useContext, useEffect } from 'react';
// import { ThemeContext } from '../context/ThemeContext';
import React from 'react';

// importing contexts
import { LapContext } from '../context/LapContext';

// importing components
import Footer from '../components/Footer';
import Statistics from '../components/Statistics';
import TimerDisplay from '../components/TimerDisplay';
import Table from '../components/Table';
import ControlButtons from '../components/ControlButtons';

const Home = () => {

  const { laps, updateWorkDoneByID } = useContext(LapContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [clearTimer, setClearTimer] = useState(false);
  const [clearLapTimer, setClearLapTimer] = useState(false);
  const [lap, setLap] = useState(laps.length > 0 ? laps[0].getId() : '');

  useEffect(() => {
    // console.log("laps have changed");
    if (laps.length > 0) {
      setLap(laps[0].getId());
    }
    // localStorage.clear();
  }, [laps, lap]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Timer */}
      <TimerDisplay
        isPlaying={isPlaying}
        clearLapTimer={clearLapTimer}
        setClearLapTimer={setClearLapTimer}
        clearTimer={clearTimer}
        setClearTimer={setClearTimer}
        lap={lap}
      />

      {/* Buttons */}
      <ControlButtons
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        started={started}
        setStarted={setStarted}
        clearTimer={clearTimer}
        setClearTimer={setClearTimer}
        clearLapTimer={clearLapTimer}
        setClearLapTimer={setClearLapTimer}
        lap={lap}
        setLap={setLap}
      />
      <Statistics />
      <Table laps={laps} updateWorkDoneByID={updateWorkDoneByID} />
      <Footer />
    </div>
  );
};

export default Home;
