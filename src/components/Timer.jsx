import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({
	lap,
	isPlaying,
	clearTimer,
	setClearTimer,
	UpdateCurrentWorkLapTime,
}) => {
	console.log("Timer", lap);
	const [time, setTime] = useState({
		hours: lap.getCurrentHours(),
		minutes: lap.getCurrentMinutes(),
		seconds: lap.getCurrentSeconds(),
	});

	useEffect(() => {
		console.log("Timer useEffect");
		// log everything
		console.log("lap", lap);
		console.log("isPlaying", isPlaying);
		console.log("clearTimer", clearTimer);
		let interval = null;
		if (isPlaying) {
			interval = setInterval(() => {
				setTime((prevTime) => {
					const seconds = prevTime.seconds + 1;
					const minutes = prevTime.minutes + Math.floor(seconds / 60);
					const hours = prevTime.hours + Math.floor(minutes / 60);
					UpdateCurrentWorkLapTime(
						lap.getId(),
						hours % 24,
						minutes % 60,
						seconds % 60
					);
					return {
						hours: hours % 24,
						minutes: minutes % 60,
						seconds: seconds % 60,
					};
				});
			}, 1000);
		} else {
			clearInterval(interval);
			UpdateCurrentWorkLapTime(
				lap.getId(),
				time.hours,
				time.minutes,
				time.seconds
			);
		}

		if (clearTimer) {
			setTime({ hours: 0, minutes: 0, seconds: 0 });
			UpdateCurrentWorkLapTime(
				lap.getId(),
				time.hours,
				time.minutes,
				time.seconds
			);
			setClearTimer(false);
		}

		return () => clearInterval(interval);
	}, [isPlaying, clearTimer, setClearTimer]);

	return (
		<div className="text-9xl font-bold">
			{time.hours.toString().padStart(2, "0")}:
			{time.minutes.toString().padStart(2, "0")}:
			{time.seconds.toString().padStart(2, "0")}
		</div>
	);
};

Timer.propTypes = {
	lap: PropTypes.object.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	clearTimer: PropTypes.bool.isRequired,
	setClearTimer: PropTypes.func.isRequired,
	UpdateCurrentWorkLapTime: PropTypes.func.isRequired,
};

export default Timer;
