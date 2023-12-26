// importing basics
import { useState, useContext, useEffect } from "react";

// importing classes
import WorkLap from "../classes/WorkLapClass";

// importing contexts
import { LapContext } from "../context/LapContext";

// importing components
import Timer from "../components/Timer";
import { PlayButton } from "../components/ui/PlayButton";
import { PauseButton } from "../components/ui/PauseButton";
import { StopButton } from "../components/ui/StopButton";
import { LapIcon } from "../components/ui/LapIcon";
import { StartButton } from "../components/ui/StartButton";
import TimerContinuous from "../components/TimerContinuous";

const Home = () => {
	const {
		laps,
		addLap,
		resetLaps,
		updateLap,
		getLastLap,
		getLapFromId,
		updateWorkDoneByID,
	} = useContext(LapContext);

	const UpdateCurrentWorkLapTime = (lapId, hours, minutes, seconds) => {
		updateLap(lapId, hours, minutes, seconds);
	};

	const addNewLap = () => {
		const currentDate = new Date().toLocaleString();
		const newlap = new WorkLap(currentDate, 0, 0, 0, 0, "", 0);
		addLap(newlap);
		return newlap.id;
	};

	const [isPlaying, setIsPlaying] = useState(false);
	const [started, setStarted] = useState(false);
	const [clearTimer, setClearTimer] = useState(false);
	const [clearLapTimer, setClearLapTimer] = useState(false);
	const [lap, setLap] = useState();

	console.log(laps, lap);
	if (laps.length > 0) {
		console.log("lap", lap);
		console.log(getLapFromId(lap));
	}

	return (
		<div>
			{laps.length > 0 ? (
				<div className="flex justify-center items-center h-48 text-primary gap-16 m-10">
					<div className="outline p-8 rounded-xl pb-2 outline-secondary">
						<Timer
							lap={getLapFromId(lap)}
							isPlaying={isPlaying}
							clearTimer={clearLapTimer}
							setClearTimer={setClearTimer}
							UpdateCurrentWorkLapTime={UpdateCurrentWorkLapTime}
						/>
						<div className="flex justify-center items-center text-center text-2xl italic">
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
						<div className="flex justify-center items-center text-center text-2xl italic">
							Total Time
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-48 text-primary gap-16 m-10">
					<div className="outline p-8 rounded-xl pb-2 outline-secondary">
						<div className="text-9xl font-bold">00:00:00</div>
						<div className="flex justify-center items-center text-center text-2xl italic">
							Lap Time
						</div>
					</div>
					<div className="outline p-8 rounded-xl pb-2 outline-secondary">
						<div className="text-9xl font-bold text-secondary">
							00:00:00
						</div>
						<div className="flex justify-center items-center text-center text-2xl italic">
							Total Time
						</div>
					</div>
				</div>
			)}

			<div className="w-full justify-center flex gap-4">
				<button
					disabled={
						!started ||
						(getLapFromId(lap).getCurrentHours() === 0 &&
							getLapFromId(lap).getCurrentMinutes() === 0)
					}
					onClick={() => {
						setIsPlaying(false);
						const new_lap_id = addNewLap();
						setLap(new_lap_id);
						setClearLapTimer(true);
					}}
				>
					<LapIcon className="w-24 h-24 text-secondary transition-all duration-300 hover:text-primary hover:scale-90" />
				</button>
				<button
					disabled={!started}
					onClick={() => {
						setIsPlaying(() => {
							return !isPlaying;
						});
					}}
				>
					{isPlaying ? (
						<PauseButton className="w-24 h-24 text-secondary transition-all duration-300 hover:text-primary" />
					) : (
						<PlayButton className="w-24 h-24 text-secondary transition-all duration-300 hover:text-primary" />
					)}
				</button>
				<button>
					{started === false ? (
						<StartButton
							className="w-24 h-24 text-secondary transition-all duration-300 hover:text-primary hover:scale-90"
							onClick={() => {
								if (laps.length === 0) {
									const new_lap_id = addNewLap();
									setLap(new_lap_id);
									console.log(laps);
									setStarted(true);
									setIsPlaying(true);
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

			{/* table */}
			<div className="overflow-x-auto m-6 outline outline-secondary rounded-2xl scroll-auto">
				<table className="table table-lg text-xl">
					{/* head */}
					<thead className="">
						<tr className="text-2xl">
							<th className="w-4">ID</th>
							<th className="w-48">Start Time</th>
							<th className="w-24">Elapsed Time</th>
							<th className="w-1/2 break-words">Work Done</th>
							<th className="w-12">Amount</th>
						</tr>
					</thead>
					<tbody>
						{/* body */}
						{laps.map((lap, index) => {
							return (
								<tr key={index + 1} className="text-2xl">
									<td className="w-fit text-2xl">
										{index + 1}
									</td>
									<td className="text-2xl">
										{lap.getStartTime()}
									</td>
									<td className="text-2xl">
										{lap.getCurrentHours()} Hours :{" "}
										{lap.getCurrentMinutes()} Minutes :{" "}
										{lap.getCurrentSeconds()} Seconds
									</td>
									<td className="text-2xl break-words">
										<textarea
											className="textarea textarea-bordered w-full rounded-lg"
											placeholder="Type here"
											value={lap.getWorkDoneString()}
											onChange={(e) => {
												updateWorkDoneByID(
													lap.getId(),
													e.target.value
												);
											}}
										></textarea>
									</td>
									<td className="text-2xl">
										{lap.getAmount()}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						Congratulations on the Lap!
					</h3>
					<p className="py-4">
						Please write what you have done in the last lap.
					</p>
					<div className="modal-action">
						<div className="flex flex-col w-full">
							<textarea
								className="textarea textarea-accent w-full rounded-xl"
								placeholder="work completed in this lap."
							></textarea>
						</div>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default Home;
