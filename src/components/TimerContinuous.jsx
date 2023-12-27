import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TimerContinuous = ({ isPlaying, clearTimer, setClearTimer }) => {
	const [time, setTime] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		let interval = null;
		if (isPlaying) {
			interval = setInterval(() => {
				setTime((prevTime) => {
					const seconds = prevTime.seconds + 1;
					const minutes = prevTime.minutes + Math.floor(seconds / 60);
					const hours = prevTime.hours + Math.floor(minutes / 60);
					return {
						hours: hours % 24,
						minutes: minutes % 60,
						seconds: seconds % 60,
					};
				});
			}, 1000);
		} else {
			clearInterval(interval);
		}

		if (clearTimer) {
			setTime({ hours: 0, minutes: 0, seconds: 0 });
			setClearTimer(false);
		}

		return () => clearInterval(interval);
	}, [isPlaying, clearTimer, setClearTimer]);

	return (
		<div className="text-9xl font-bold text-accent">
			{time.hours.toString().padStart(2, "0")}:
			{time.minutes.toString().padStart(2, "0")}:
			{time.seconds.toString().padStart(2, "0")}
		</div>
	);
};

TimerContinuous.propTypes = {
	isPlaying: PropTypes.bool.isRequired,
	clearTimer: PropTypes.bool.isRequired,
	setClearTimer: PropTypes.func.isRequired,
};

export default TimerContinuous;
