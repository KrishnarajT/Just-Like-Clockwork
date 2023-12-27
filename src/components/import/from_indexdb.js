import WorkLap from "../../classes/WorkLapClass.js";

function getFromIndexedDB(callback) {
	// Open the database
	let open = indexedDB.open("LapsDatabase", 1);

	open.onsuccess = function () {
		// Start a new transaction
		let db = open.result;
		let tx = db.transaction("LapsStore", "readonly");
		let store = tx.objectStore("LapsStore");

		// Get all the laps from the object store
		let getAll = store.getAll();

		getAll.onsuccess = function () {
			// Convert the plain objects to WorkLap instances
			let laps = getAll.result.map(
				(lap) =>
					new WorkLap(
						lap.startTime,
						lap.endTime,
						lap.current_hours,
						lap.current_minutes,
						lap.current_seconds,
						lap.workDoneString,
						lap.HourlyAmount
					)
			);

			// Call the callback function with the laps array
			callback(laps);
		};

		// Close the db when the transaction is done
		tx.oncomplete = function () {
			db.close();
		};
	};
}

export default getFromIndexedDB;
