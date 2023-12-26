import { ClockIcon } from "./ui/ClockIcon";
import { Link } from "react-router-dom";

export default function Navbar() {
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
						<Link to="/about">About</Link>
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
