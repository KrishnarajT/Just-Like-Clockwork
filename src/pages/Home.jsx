// importing basics
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import React from "react";

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

import Footer from "../components/Footer";
const Home = () => {
	const { theme } = React.useContext(ThemeContext);
	useEffect(() => {
		if (theme === "business") {
			const light_button = document.getElementById("business_button");
			light_button.click();
		} else if (theme === "dracula") {
			const dark_button = document.getElementById("dracula_button");
			dark_button.click();
		} else if (theme === "forest") {
			const dark_button = document.getElementById("forest_button");
			dark_button.click();
		} else if (theme === "corporate") {
			const dark_button = document.getElementById("corporate_button");
			dark_button.click();
		} else if (theme === "wireframe") {
			const dark_button = document.getElementById("wireframe_button");
			dark_button.click();
		}
	});

	const {
		laps,
		addLap,
		resetLaps,
		updateLap,
		getLapFromId,
		getFirstLap,
		updateWorkDoneByID,
		getTotalAmountSum,
		getTotalTimeSpent,
		updateEndTime,
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
	const [lap, setLap] = useState(laps.length > 0 ? laps[0].getId() : "");

	useEffect(() => {
		// console.log("laps have changed");
		if (laps.length > 0) {
			setLap(laps[0].getId());
		}
		// localStorage.clear();
	}, [laps, lap]);

	// console.log(laps, lap);
	// if (laps.length > 0) {
	// 	if (laps.length > 0) {
	// 		setLap(laps[0].getId());
	// 	}
	// 	console.log(getLapFromId(lap));
	// }

	return (
		<div className="min-h-screen flex flex-col">
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

			<div className="w-full justify-center flex gap-4">
				<button
					disabled={
						!started ||
						(getLapFromId(lap).getCurrentHours() === 0 &&
							getLapFromId(lap).getCurrentMinutes() === 0)
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
					<LapIcon className="w-24 h-24 text-secondary transition-all duration-300 hover:text-primary hover:scale-90" />
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

			{/* table */}
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
								<tr key={index + 1} className="text-2xl">
									<td className="w-fit text-2xl">{index + 1}</td>
									<td className="text-2xl">{lap.getStartTime()}</td>
									<td className="text-2xl">
										{lap.getEndTime() === 0
											? "Not finished yet"
											: lap.getEndTime()}
									</td>
									<td className="text-2xl">
										{lap.getCurrentHours()}h: {lap.getCurrentMinutes()}m:{" "}
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

			<div className="w-full flex flex-col justify-center items-center my-10 outline p-6">
				<div className="font-bold  text-6xl">Stats</div>
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-figure text-secondary"></div>
						<div className="stat-title text-xl">Tasks Completed</div>
						<div className="stat-value text-accent text-6xl">{laps.length}</div>
						<div className="stat-desc text-xl">The Total number of laps.</div>
					</div>

					<div className="stat">
						<div className="stat-figure text-secondary"></div>
						<div className="stat-title text-xl">
							Total Minutes Spent Working
						</div>
						<div className="stat-value text-accent text-6xl">
							{getTotalTimeSpent()}
						</div>
						<div className="stat-desc text-xl">Sum of time on all laps.</div>
					</div>

					<div className="stat">
						<div className="stat-figure text-secondary"></div>
						<div className="stat-title text-xl">Total Amount Earned</div>
						<div className="stat-value text-accent text-6xl">
							{"₹ " + getTotalAmountSum()}
						</div>
						<div className="stat-desc text-xl">Sum of amount on all laps.</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Home;
