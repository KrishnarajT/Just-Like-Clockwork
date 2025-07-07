import { ClockIcon } from './ui/ClockIcon';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LapContext } from '../context/LapContext';
import React, { useEffect } from 'react';

import uploadCSV from '../components/import/from_csv';
import uploadJSON from '../components/import/from_json';
import importBrowser from './import/from_local';
import exportCSV from '../components/export/to_csv';
import exportJSON from '../components/export/to_json';
import exportPDF from '../components/export/to_pdf';
import exportBrowser from './export/to_local';
import { ThemeContext } from '../context/ThemeContext';
import { themeChange } from 'theme-change'

export default function Navbar() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  useEffect(() => {
    themeChange(false);
  }, []);
  const themes = [
    "business",
    "forest",
    "nord",
    "corporate",
    "dracula",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "cmyk",
    "autumn",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "sunset",
    "caramellatte",
    "abyss",
    "silk"
  ];
  const [amount, setAmount] = useState(250);
  const { laps, updateAmount, getTotalAmountSum, getTotalTimeSpent, setLaps } =
    React.useContext(LapContext);

  useEffect(() => {
    updateAmount(amount);
  }, [amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    updateAmount(e.target.value);
  };

  const handleImportCSV = (laps) => {
    // console.log(laps);
    setLaps(laps);
  };

  const handleImportJSON = (laps) => {
    // console.log(laps);
    setLaps(laps);
  };

  const handleImportBrowser = async () => {
    await importBrowser();
  };

  const handleExportCSV = async () => {
    exportCSV(laps);
  };

  const handleExportJSON = async () => {
    exportJSON(laps);
  };

  const handleExportPDF = async () => {
    exportPDF(laps, getTotalAmountSum(), getTotalTimeSpent(), laps.length);
  };

  const handleExportBrowser = async () => {
    exportBrowser(laps);
  };

  return (
    <div className="navbar bg-neutral px-2 py-2">
      <div className="flex-1">
        <div className="flex items-center">
          <ClockIcon className="w-14 h-14 text-neutral-content" />
          <Link to="/">
            <a className="btn btn-ghost text-2xl text-neutral-content">Just Like Clockwork</a>
          </Link>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="text-xl">
            <div className="m-0 p-0">
              <label className="label">
                <span className="label-text text-xl mx-2  text-neutral-content">Hourly Amount</span>
              </label>
              <input
                type="text"
                placeholder="Enter Hourly Amount"
                value={amount}
                onChange={handleAmountChange}
                className="input input-bordered input-success w-48 max-w-xs mx-2"
              />
            </div>
          </li>
          <li>
            <details>
              <summary className="text-xl mx-2  text-neutral-content">Import</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a
                    onClick={() => {
                      uploadCSV(handleImportCSV);
                    }}
                  >
                    CSV
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      uploadJSON(handleImportJSON);
                    }}
                  >
                    JSON
                  </a>
                </li>
                <li>
                  <a onClick={handleImportBrowser}>Browser</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="text-xl mx-2  text-neutral-content">Export</summary>
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
          <div className="dropdown dropdown-end" data-choose-theme>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-neutral text-neutral-content text-xl font-normal"
            >
              Theme
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content bg-base-300 rounded-box z-10 p-4 shadow-2xl max-h-96 overflow-y-auto"
              data-choose-theme
            >
              {themes.map((t) => (
                <li key={t}>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start text-lg capitalize hover:bg-base-100"
                    aria-label={t}
                    value={t}
                    checked={theme === t}
                    onChange={() => setTheme(t)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}
