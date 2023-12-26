import { v4 as uuidv4 } from "uuid";

class WorkLap {
	constructor(
		startTime,
		endTime,
		current_hours,
		current_minutes,
		current_seconds,
		workDoneString,
		amount
	) {
		this.id = uuidv4();
		this.startTime = startTime;
		this.endTime = endTime;
		this.current_hours = current_hours;
		this.current_minutes = current_minutes;
		this.current_seconds = current_seconds;
		this.workDoneString = workDoneString;
		this.amount = amount;
	}

	// Getters
	getId() {
		return this.id;
	}

	getAmount() {
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

	setAmount(amount) {
		this.amount = amount;
	}
}

export default WorkLap;
