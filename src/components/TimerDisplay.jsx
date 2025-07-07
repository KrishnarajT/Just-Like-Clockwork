import { useContext } from 'react';
import { LapContext } from '../context/LapContext';
import Timer from '../components/Timer';
import TimerContinuous from '../components/TimerContinuous';
import PropTypes from 'prop-types';

export default function TimerDisplay({
  isPlaying,
  clearLapTimer,
  setClearLapTimer,
  clearTimer,
  setClearTimer,
  lap,
}) {
  const UpdateCurrentWorkLapTime = (lapId, hours, minutes, seconds) => {
    updateLap(lapId, hours, minutes, seconds);
  };

  const { laps, getLapFromId, getFirstLap, updateLap } = useContext(LapContext);

  return (
    <div>
      {laps.length > 0 ? (
        <div className="flex justify-center items-center h-48  gap-16 m-10">
          <div className="outline p-8 rounded-xl pb-2 outline-secondary">
            <Timer
              lap={getLapFromId(lap) ? getLapFromId(lap) : getFirstLap()}
              isPlaying={isPlaying}
              clearTimer={clearLapTimer}
              setClearTimer={setClearLapTimer}
              UpdateCurrentWorkLapTime={UpdateCurrentWorkLapTime}
            />
            <div className="flex justify-center items-center text-center text-2xl italic text-secondary">
              Lap Time
            </div>
          </div>
          <div className="outline p-8 rounded-xl pb-2 outline-secondary">
            <TimerContinuous
              isPlaying={isPlaying}
              clearTimer={clearTimer}
              setClearTimer={setClearTimer}
              UpdateCurrentWorkLapTime={UpdateCurrentWorkLapTime}
            />
            <div className="flex justify-center items-center text-center text-2xl italic text-secondary">
              Total Time
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48  gap-16 m-10">
          <div className="outline p-8 rounded-xl pb-2 outline-secondary">
            <div className="text-9xl font-bold">00:00:00</div>
            <div className="flex justify-center items-center text-center text-2xl italic text-secondary">
              Lap Time
            </div>
          </div>
          <div className="outline p-8 rounded-xl pb-2 outline-secondary">
            <div className="text-9xl font-bold text-secondary">00:00:00</div>
            <div className="flex justify-center items-center text-center text-2xl italic text-secondary">
              Total Time
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// props validation
TimerDisplay.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  clearLapTimer: PropTypes.bool.isRequired,
  setClearLapTimer: PropTypes.func.isRequired,
  UpdateCurrentWorkLapTime: PropTypes.func.isRequired,
  clearTimer: PropTypes.bool.isRequired,
  setClearTimer: PropTypes.func.isRequired,
  lap: PropTypes.string.isRequired,
};
