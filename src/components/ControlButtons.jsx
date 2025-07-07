import { PlayButton } from '../components/ui/PlayButton';
import { PauseButton } from '../components/ui/PauseButton';
import { StopButton } from '../components/ui/StopButton';
import { LapIcon } from '../components/ui/LapIcon';
import WorkLap from '../classes/WorkLapClass';

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { LapContext } from '../context/LapContext';
import { StartButton } from './ui/StartButton';

export default function ControlButtons({
  setClearLapTimer,
  setClearTimer,
  lap,
  started,
  setStarted,
  isPlaying,
  setIsPlaying,
  setLap,
}) {
  const addNewLap = () => {
    const currentDate = new Date().toLocaleString();
    const newlap = new WorkLap(currentDate, 0, 0, 0, 0, '', 0);
    addLap(newlap);
    return newlap.id;
  };
  const { laps, addLap, resetLaps, getLapFromId, updateEndTime } = useContext(LapContext);

  return (
    <div className="w-full justify-center flex gap-4">
      <button
        disabled={
          !started ||
          (getLapFromId(lap).getCurrentHours() === 0 && getLapFromId(lap).getCurrentMinutes() === 0)
        }
        onClick={() => {
          updateEndTime(lap, new Date().toLocaleString());
          setIsPlaying(false);
          const new_lap_id = addNewLap();
          setLap(new_lap_id);
          setClearLapTimer(true);
          setTimeout(() => {
            setIsPlaying(true);
          }, 500);
        }}
      >
        <LapIcon
          className={`w-24 h-24 ${
            !(
              !started ||
              (getLapFromId(lap).getCurrentHours() === 0 &&
                getLapFromId(lap).getCurrentMinutes() === 0)
            )
              ? 'text-secondary transition-all duration-300 hover:text-primary hover:scale-90'
              : 'text-secondary cursor-not-allowed'
          }`}
        />
      </button>
      <button
        disabled={!started}
        onClick={() => {
          setTimeout(() => {
            setIsPlaying(!isPlaying);
          }, 100);
        }}
      >
        {isPlaying ? (
          <PauseButton
            className={`w-24 h-24 ${
              started
                ? 'text-secondary transition-all duration-300 hover:text-primary'
                : 'text-secondary cursor-not-allowed'
            }`}
          />
        ) : (
          <PlayButton
            className={`w-24 h-24 ${
              started
                ? 'text-secondary transition-all duration-300 hover:text-primary'
                : 'text-secondary cursor-not-allowed'
            }`}
          />
        )}
      </button>
      <button>
        {started === false ? (
          <StartButton
            className="w-24 h-24 text-accent transition-all duration-300 hover:text-primary hover:scale-90"
            onClick={() => {
              if (laps.length === 0) {
                const new_lap_id = addNewLap();
                setLap(new_lap_id);
                setStarted(true);
                setIsPlaying(true);
              } else {
                setStarted(true);
                // setIsPlaying(true);
              }
            }}
          />
        ) : (
          <StopButton
            className="w-24 h-24 text-error"
            onClick={() => {
              setStarted(false);
              setIsPlaying(false);
              setClearTimer(true);
              resetLaps();
            }}
          />
        )}
      </button>
    </div>
  );
}

// props validation
ControlButtons.propTypes = {
  setClearLapTimer: PropTypes.func.isRequired,
  setClearTimer: PropTypes.func.isRequired,
  lap: PropTypes.string.isRequired,
  started: PropTypes.bool.isRequired,
  setStarted: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setLap: PropTypes.func.isRequired,
};
