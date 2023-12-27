import { ClockIcon } from "./ui/ClockIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LapContext } from "../context/LapContext";
import React, { useEffect } from "react";

import importCSV from "../components/import/from_csv";
import importJSON from "../components/import/from_json";
import importBrowser from "../components/import/from_indexdb";
import exportCSV from "../components/export/to_csv";
import exportJSON from "../components/export/to_json";
import exportPDF from "../components/export/to_pdf";
import exportBrowser from "../components/export/to_indexdb";

export default function Navbar() {
	const [amount, setAmount] = useState(250);
	const { laps, updateAmount } = React.useContext(LapContext);

	useEffect(() => {
		updateAmount(amount);
	}, [amount]);

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
		updateAmount(e.target.value);
	};

	const handleImportCSV = async () => {
		await importCSV();
	};

	const handleImportJSON = async () => {
		await importJSON();
	};

	const handleImportBrowser = async () => {
		await importBrowser();
	};

	const handleExportCSV = async () => {
		exportCSV(laps);
	};

	const handleExportJSON = async () => {
		await exportJSON();
	};

	const handleExportPDF = async () => {
		await exportPDF();
	};

	const handleExportBrowser = async () => {
		await exportBrowser();
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
							<summary className="text-xl">Import</summary>
							<ul className="p-2 bg-base-100 rounded-t-none">
								<li>
									<a onClick={handleImportCSV}>CSV</a>
								</li>
								<li>
									<a onClick={handleImportJSON}>JSON</a>
								</li>
								<li>
									<a onClick={handleImportBrowser}>Browser</a>
								</li>
							</ul>
						</details>
					</li>
					<li>
						<details>
							<summary className="text-xl">Export</summary>
							<ul className="p-2 bg-base-100 rounded-t-none">
								<li>
									<a onClick={handleExportCSV}>CSV</a>
								</li>
								<li>
									<a onClick={handleExportJSON}>JSON</a>
								</li>
								<li>
									<a onClick={handleExportPDF}>PDF</a>
								</li>
								<li>
									<a onClick={handleExportBrowser}>Browser</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
	);
}
