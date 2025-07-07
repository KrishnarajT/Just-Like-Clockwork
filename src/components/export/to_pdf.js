import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function downloadPDF(laps, total_amount, total_minutes, total_laps) {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Define the PDF table columns
  const columns = [
    'ID',
    'Start Time',
    'End Time',
    'Hours',
    'Minutes',
    'Seconds',
    'Work Done',
    'Hourly Amount',
  ];

  // Convert each lap to a PDF table row
  const rows = laps.map((lap, index) => [
    // lap.id,
    index.toString(),
    lap.startTime,
    lap.endTime === 0 ? 'Not Yet Finished' : lap.endTime,
    lap.current_hours,
    lap.current_minutes,
    lap.current_seconds,
    lap.workDoneString,
    lap.HourlyAmount,
  ]);

  // Add the table to the PDF
  doc.autoTable({
    head: [columns],
    body: rows,
    foot: [[total_laps, 'Total', '', '', total_minutes, '', '', total_amount]],
    footStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  // Trigger the download
  doc.save('laps.pdf');
}

export default downloadPDF;
