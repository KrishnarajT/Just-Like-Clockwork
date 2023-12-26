import { createContext, useState } from "react";

// Create the context
export const LapContext = createContext();

// Create a provider component
const LapProvider = ({ children }) => {
	const [laps, setLaps] = useState([]);
	const [amount, setAmount] = useState(0.0);

	// Add a lap to the laps array
	const addLap = (lap) => {
		console.log(lap);
		lap.setHourlyAmount(amount);
		// new lap reversed
		setLaps((prevLaps) => [lap, ...prevLaps]);
	};

	// Remove all laps
	const resetLaps = () => {
		setLaps([]);
	};

	// get last lap
	const getLastLap = () => {
		console.log("the laps look like this", laps);
		// return the id of the last lap
		return laps[laps.length - 1].id;
	};

	// get lap from id
	const getLapFromId = (id) => {
		return laps.filter((lap) => {
			return lap.id === id;
		})[0];
	};

	const updateWorkDoneByID = (id, workDone) => {
		const newLaps = laps.map((lap) => {
			if (lap.id === id) {
				lap.setWorkDoneString(workDone);
			}
			return lap;
		});
		setLaps(newLaps);
	};

	const updateAmount = (amount) => {
		setAmount(amount);
	};

	// update a lap
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

	// Function to calculate the total amount sum of all laps
	const getTotalAmountSum = () => {
		let totalAmount = 0.0;
		laps.forEach((lap) => {
			totalAmount += lap.getAmount();
		});
		return totalAmount;
	};

	
	// Provide the context value to the children components
	return (
		<LapContext.Provider
			value={{
				laps,
				addLap,
				resetLaps,
				updateLap,
				getLastLap,
				getLapFromId,
				updateWorkDoneByID,
				updateAmount,
				getTotalAmountSum,
			}}
		>
			{children}
		</LapContext.Provider>
	);
};

export default LapProvider;
