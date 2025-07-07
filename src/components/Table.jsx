import RandomSVG from './ui/RandomSVG';
import { StartButton } from './ui/StartButton';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { LapContext } from '../context/LapContext';

export default function Table({ updateWorkDoneByID }) {
  const { laps } = useContext(LapContext);

  return (
    <div>
      {laps.length > 0 ? (
        <div className="overflow-x-auto m-6 outline outline-secondary rounded-2xl scroll-auto">
          <table className="table table-lg text-xl">
            {/* head */}
            <thead className="">
              <tr className="text-2xl">
                <th className="w-4">ID</th>
                <th className="w-48">Start Time</th>
                <th className="w-48">End Time</th>
                <th className="w-12">Elapsed Time</th>
                <th className="w-1/3 break-words">Work Done</th>
                <th className="w-12">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* body */}
              {laps.map((lap, index) => {
                return (
                  <tr key={index + 1} className="text-2xl border-0">
                    <td className="w-fit text-2xl">{index + 1}</td>
                    <td className="text-2xl">{lap.getStartTime()}</td>
                    <td className="text-2xl">
                      {lap.getEndTime() === 0 ? 'Not finished yet' : lap.getEndTime()}
                    </td>
                    <td className="text-2xl">
                      {lap.getCurrentHours()}h: {lap.getCurrentMinutes()}m:{' '}
                      {lap.getCurrentSeconds()}s
                    </td>
                    <td className="text-2xl break-words">
                      <textarea
                        className="textarea textarea-bordered w-full rounded-lg text-xl"
                        placeholder="Type here"
                        value={lap.getWorkDoneString()}
                        onChange={(e) => {
                          updateWorkDoneByID(lap.getId(), e.target.value);
                        }}
                      ></textarea>
                    </td>
                    <td className="text-2xl">{lap.getAmount()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        // tell user to start adding new laps
        <div className="flex justify-center items-center h-fit gap-16 m-10 outline p-6 rounded-xl outline-secondary min-h-64 text-2xl text-secondary flex-col">
          <RandomSVG />
          <div className="flex gap-1 items-center justify-center text-center">
            <div>No Laps Added Yet! Start by clicking</div>
            <StartButton className="w-12 h-12 text-accent transition-all duration-200 hover:scale-90" />{' '}
            above.
          </div>
        </div>
      )}
    </div>
  );
}

// props validatino
Table.propTypes = {
  updateWorkDoneByID: PropTypes.func.isRequired,
};
