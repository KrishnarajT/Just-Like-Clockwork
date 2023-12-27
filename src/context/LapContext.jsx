import { createContext, useState } from "react";
import getFromIndexedDB from "../components/import/from_indexdb";
import { useEffect } from "react";

// Create the context
export const LapContext = createContext();

// Create a provider component
const LapProvider = ({ children }) => {
	const [laps, setLaps] = useState([]);
	const [amount, setAmount] = useState(0.0);

	// Load laps from IndexedDB when the component mounts
	useEffect(() => {
		getFromIndexedDB(setLaps);
	}, []);

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
			totalAmount += parseFloat(lap.getAmount());
		});
		totalAmount = Math.round(totalAmount * 1000) / 1000; // Round to 3 decimal places
		console.log("totalAmount", totalAmount);
		return totalAmount;
	};

	// function to get the total time spent in minutes
	const getTotalTimeSpent = () => {
		let totalMinutes = 0;
		laps.forEach((lap) => {
			totalMinutes += +lap.getTotalTimeInMinutes();
		});
		// round to 2 decimal places
		totalMinutes = Math.round(totalMinutes * 100) / 100;
		return totalMinutes;
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
				getTotalTimeSpent,
			}}
		>
			{children}
		</LapContext.Provider>
	);
};

export default LapProvider;
