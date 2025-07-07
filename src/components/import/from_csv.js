import Papa from 'papaparse';
import WorkLap from '../../classes/WorkLapClass';

function uploadCSV(callback) {
  // Create an input element
  let input = document.createElement('input');
  input.type = 'file';

  // Set up the change event to read the file when selected
  input.onchange = (e) => {
    let file = e.target.files[0];

    // Parse the CSV file
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        // Convert the data to WorkLap objects
        let laps = results.data.map(
          (row) =>
            new WorkLap(
              row['Start Time'],
              row['End Time'],
              row['Hours'],
              row['Minutes'],
              row['Seconds'],
              row['Work Done'],
              row['Hourly Amount'],
              row['ID']
            )
        );

        // remove the last lap coz its a header
        laps.pop();

        // Call the callback function with the laps array
        callback(laps);
      },
    });
  };

  // Trigger the input click event to open the file dialog
  input.click();
}

export default uploadCSV;
