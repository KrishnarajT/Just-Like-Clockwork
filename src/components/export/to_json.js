import { saveAs } from 'file-saver';

function downloadJSON(laps) {
  // Convert the laps array to a JSON string
  let jsonString = JSON.stringify(laps, null, 2);

  // Create a Blob from the JSON string
  let blob = new Blob([jsonString], {
    type: 'application/json;charset=utf-8;',
  });

  // Trigger the download
  saveAs(blob, 'laps.json');
}

export default downloadJSON;
