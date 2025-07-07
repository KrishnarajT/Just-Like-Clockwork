import { saveAs } from 'file-saver';

function downloadCSV(laps) {
  // Define the CSV header
  let csvContent = 'ID,Start Time,End Time,Hours,Minutes,Seconds,Work Done,Hourly Amount\n';

  // Convert each lap to a CSV row and add it to the CSV content
  laps.forEach((lap) => {
    const startTime =
      typeof lap.startTime === 'string' ? lap.startTime.replace(',', '') : lap.startTime;
    let endTime = typeof lap.endTime === 'string' ? lap.endTime.replace(',', '') : lap.endTime;
    if (endTime === 0) {
      endTime = 'Not yet done';
    }

    const workDoneString = lap.workDoneString.replace(/,/g, ';');

    csvContent += `${lap.id},${startTime},${endTime},${lap.current_hours},${lap.current_minutes},${lap.current_seconds},${workDoneString},${lap.HourlyAmount}\n`;
  });

  // Create a Blob from the CSV content
  let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Trigger the download
  saveAs(blob, 'laps.csv');
}

export default downloadCSV;
