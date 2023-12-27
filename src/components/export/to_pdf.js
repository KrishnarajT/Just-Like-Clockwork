import { jsPDF } from "jspdf";
import "jspdf-autotable";

function downloadPDF(laps, total_amount, total_hours, total_laps) {
	// Create a new jsPDF instance
	const doc = new jsPDF();

	// Define the PDF table columns
	const columns = [
		"ID",
		"Start Time",
		"End Time",
		"Hours",
		"Minutes",
		"Seconds",
		"Work Done",
		"Hourly Amount",
	];

	// Convert each lap to a PDF table row
	const rows = laps.map((lap) => [
		lap.id,
		lap.startTime,
		lap.endTime,
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
		foot: [
			["Total", "", "", total_hours, "", "", total_laps, total_amount],
		],
		footStyles: { fillColor: [41, 128, 185], textColor: 255 },
	});

	// Trigger the download
	doc.save("laps.pdf");
}

export default downloadPDF;
