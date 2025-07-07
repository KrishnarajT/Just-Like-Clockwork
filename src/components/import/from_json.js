import WorkLap from '../../classes/WorkLapClass';

function uploadJSON(callback) {
  // Create an input element
  let input = document.createElement('input');
  input.type = 'file';

  // Set up the change event to read the file when selected
  input.onchange = (e) => {
    let file = e.target.files[0];

    // Create a new FileReader
    let reader = new FileReader();

    // Set up the load event to parse the file when read
    reader.onload = (e) => {
      // Parse the JSON string
      let data = JSON.parse(e.target.result);
      // console.log(data);
      // Convert the data to WorkLap objects
      let laps = data.map(
        (lap) =>
          new WorkLap(
            lap.startTime,
            lap.endTime,
            lap.current_hours,
            lap.current_minutes,
            lap.current_seconds,
            lap.workDoneString,
            lap.HourlyAmount,
            lap.id
          )
      );
      // console.log(laps);

      // Call the callback function with the laps array
      callback(laps);
    };

    // Read the file as a text string
    reader.readAsText(file);
  };

  // Trigger the input click event to open the file dialog
  input.click();
}

export default uploadJSON;
