import WorkLap from "../../classes/WorkLapClass.js";

function getFromLocalStorage() {
  // Get the JSON string from localStorage
  let lapsJSON = localStorage.getItem("laps");

  // Convert the JSON string back to an array
  let lapsPlain = JSON.parse(lapsJSON);

  // Convert the plain objects to WorkLap instances
  let laps = lapsPlain.map(
    (lap) =>
      new WorkLap(
        lap.startTime,
        lap.endTime,
        lap.current_hours,
        lap.current_minutes,
        lap.current_seconds,
        lap.workDoneString,
        lap.HourlyAmount,
      ),
  );

  console.log("Laps from local storage: ", laps);

  return laps;
}

export default getFromLocalStorage;
