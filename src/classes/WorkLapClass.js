import { v4 as uuidv4 } from "uuid";

class WorkLap {
	constructor(
		startTime,
		endTime,
		current_hours,
		current_minutes,
		current_seconds,
		workDoneString,
		HourlyAmount
	) {
		this.id = uuidv4();
		this.startTime = startTime;
		this.endTime = endTime;
		this.current_hours = current_hours;
		this.current_minutes = current_minutes;
		this.current_seconds = current_seconds;
		this.workDoneString = workDoneString;
		// type check hourly amount, if it is not a float, convert it to a float.
		if (typeof HourlyAmount !== "number") {
			HourlyAmount = parseFloat(HourlyAmount);
		}
		this.HourlyAmount = HourlyAmount;
	}

	// Getters
	getId() {
		return this.id;
	}

	getHourlyAmount() {
		return this.amount;
	}

	getStartTime() {
		return this.startTime;
	}

	getEndTime() {
		return this.endTime;
	}

	getCurrentHours() {
		return this.current_hours;
	}

	getCurrentMinutes() {
		return this.current_minutes;
	}

	getCurrentSeconds() {
		return this.current_seconds;
	}

	getWorkDoneString() {
		return this.workDoneString;
	}

	getAmount() {
		const totalSeconds =
			this.current_hours * 3600 +
			this.current_minutes * 60 +
			this.current_seconds;
		const amount = this.HourlyAmount * (totalSeconds / 3600);
		return amount.toFixed(3);
	}

	// Setters
	setStartTime(startTime) {
		this.startTime = startTime;
	}

	setEndTime(endTime) {
		this.endTime = endTime;
	}

	setCurrentHours(current_hours) {
		this.current_hours = current_hours;
	}

	setCurrentMinutes(current_minutes) {
		this.current_minutes = current_minutes;
	}

	setCurrentSeconds(current_seconds) {
		this.current_seconds = current_seconds;
	}

	setWorkDoneString(workDoneString) {
		this.workDoneString = workDoneString;
	}

	setHourlyAmount(amount) {
		this.HourlyAmount = amount;
	}
}

export default WorkLap;
