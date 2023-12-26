import { ClockIcon } from "./ui/ClockIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LapContext } from "../context/LapContext";
import React, { useEffect } from "react";

export default function Navbar() {
	const [amount, setAmount] = useState(250);
	const { updateAmount } = React.useContext(LapContext);

	useEffect(() => {
		updateAmount(amount);
	}, [amount]);

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
		updateAmount(e.target.value);
	};

	return (
		<div className="navbar bg-neutral">
			<div className="flex-1">
				<div className="flex">
					<ClockIcon className="w-14 h-14" />
				</div>
				<Link to="/">
					<a className="btn btn-ghost text-2xl text-neutral-content">
						Just Like Clockwork
					</a>
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li className="text-xl">
						<div className="m-0 p-0">
							<label className="label">
								<span className="label-text text-xl">
									Hourly Amount
								</span>
							</label>
							<input
								type="text"
								placeholder="Enter Hourly Amount"
								value={amount}
								onChange={handleAmountChange}
								className="input input-bordered input-success w-48 max-w-xs"
							/>
						</div>
					</li>
					<li>
						<details>
							<summary className="text-xl">Export</summary>
							<ul className="p-2 bg-base-100 rounded-t-none">
								<li>
									<a>CSV</a>
								</li>
								<li>
									<a>JSON</a>
								</li>
								<li>
									<a>Text</a>
								</li>
								<li>
									<a>PDF</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
	);
}
