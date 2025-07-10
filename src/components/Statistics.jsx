import { useContext } from 'react';
import { LapContext } from '../context/LapContext';

export default function Statistics() {
  const { laps, getTotalAmountSum, getTotalBreakTimeSpentMinutes, showAmount} = useContext(LapContext);

  return (
    <div className="w-full flex flex-col justify-center items-center my-10 outline p-6">
      {/* <div className="font-bold text-6xl">Statistics</div> */}
      <div className="stats">
        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title text-xl pb-2">Tasks Completed</div>
          <div className="font-bold text-accent text-6xl">
            {laps
              .filter((lap) => !lap.isBreakLap).length
            }</div>
          <div className="stat-desc text-xl pt-4">Laps Excluding Breaks</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title text-xl pb-2">Break Minutes</div>
          <div className="font-bold text-accent text-6xl">{getTotalBreakTimeSpentMinutes()}</div>
          <div className="stat-desc text-xl pt-4">Sum of time on breaks.</div>
        </div>
        {showAmount && (
          <div className="stat">
            <div className="stat-figure text-secondary pb-2"></div>
            <div className="stat-title text-xl">Total Amount Earned</div>
            <div className="text-accent text-6xl font-bold">{'₹ ' + getTotalAmountSum()}</div>
            <div className="stat-desc text-xl pt-4">Sum of amount on all laps.</div>
          </div>
        )}
      </div>
    </div>
  );
}
