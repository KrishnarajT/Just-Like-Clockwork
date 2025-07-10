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

const allColumns = [
  "ID",
  "Start Time",
  "End Time",
  "Elapsed Time",
  "Work Done",
  "Break",
  "Amount"
];

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


export default function Navbar() {

  const [selectedCols, setSelectedCols] = useState([...allColumns]);

  const toggleColumn = (col) => {
    setSelectedCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const toggleAll = () => {
    if (selectedCols.length === allColumns.length) {
      setSelectedCols([]); // Uncheck all
    } else {
      setSelectedCols([...allColumns]); // Check all
    }
  };

  const { theme, setTheme } = React.useContext(ThemeContext);
  useEffect(() => {
    themeChange(false);
  }, []);

  const [amount, setAmount] = useState(450);
  const { laps, updateAmount, getTotalAmountSum, getTotalTimeSpent, setLaps, showAmount, setShowAmount, showStatsBeforeLaps, setShowStatsBeforeLaps,
    updateBreaksImpactAmount, updateBreaksImpactTime, updateShowAmount, updateShowStatsBeforeLaps

   } =
    React.useContext(LapContext);

  useEffect(() => {
    updateAmount(amount);
  }, [amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    updateAmount(e.target.value);
  };

  const handleImportCSV = (laps) => {
    uploadCSV(laps)
    // console.log(laps);
    setLaps(laps);
  };

  const handleImportJSON = (laps) => {
    uploadJSON(laps)
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
          {/* Import */}
          <div className="dropdown dropdown-center font-semibold">
            <div tabIndex={0} role="button" className="btn btn-neutral text-neutral-content text-xl font-normal">Import</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm w-fit">
              <li><a
                onClick={handleImportCSV}
              >CSV</a></li>
              <li><a
                onClick={handleImportJSON}
              >JSON</a></li>
              <li><a
                onClick={handleImportBrowser}
              >Browser</a></li>
            </ul>
          </div>
          {/* Export */}
          <div className="dropdown dropdown-center font-semibold">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-neutral text-neutral-content text-xl font-normal"
            >
              Export
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-64 p-4 shadow"
            >
              <legend className="fieldset-legend text-xl mb-2">Choose Columns</legend>
              <div className="flex flex-col gap-1 mb-4 max-h-48 overflow-y-auto pr-2 text-md">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedCols.length === allColumns.length}
                    onChange={toggleAll}
                  />
                  <span className="ml-2 text-base-content">All</span>
                </label>

                {allColumns.map((col) => (
                  <label key={col} className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedCols.includes(col)}
                      onChange={() => toggleColumn(col)}
                    />
                    <span className="ml-2 text-base-content">{col}</span>
                  </label>
                ))}
              </div>

              <legend className="fieldset-legend text-xl mb-2">Choose Format</legend>
              <li className="text-md"><a>Clipboard CSV</a></li>
              <li className="text-md"><a
                onClick={handleExportCSV}
              >CSV</a></li>
              <li className="text-md"><a
                onClick={handleExportJSON}
              >JSON</a></li>
              <li className="text-md"><a
                onClick={handleExportBrowser}
              >PDF</a></li>
              <li className="text-md"><a
                onClick={handleExportPDF}
              >Text</a></li>
            </ul>
          </div>
          {/* Settings */}
          <div className="dropdown dropdown-center">
            <div tabIndex={0} role="button" className="btn btn-neutral text-neutral-content text-xl font-normal">Settings</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm w-fit">
              <div className="flex flex-col gap-2 mb-4 max-h-64 overflow-y-auto pr-2">
                <label className="label cursor-pointer text-lg font-semibold">
                  <input
                    type="checkbox"
                    className="checkbox"
                  // checked={selectedCols.length === allColumns.length}
                  // onChange={toggleAll}
                  />
                  <span className="ml-2 text-base-content">Breaks Impact Time</span>
                </label>
                <label className="label cursor-pointer text-lg font-semibold">
                  <input
                    type="checkbox"
                    className="checkbox"
                  // checked={selectedCols.length === allColumns.length}
                  // onChange={toggleAll}
                  />
                  <span className="ml-2 text-base-content">Breaks Impact Amount</span>
                </label>
                <label className="label cursor-pointer text-lg font-semibold">
                  <input
                    type="checkbox"
                    className="checkbox"
                  // checked={selectedCols.length === allColumns.length}
                  // onChange={toggleAll}
                  />
                  <span className="ml-2 text-base-content">Breaks Impact Amount</span>
                </label>
                <label className="label cursor-pointer text-lg font-semibold">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={showAmount}
                    onChange={() => updateShowAmount(!showAmount)}
                  />
                  <span className="ml-2 text-base-content">Show Amount</span>
                </label>
                <label className="label cursor-pointer text-lg font-semibold">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={showStatsBeforeLaps}
                    onChange={() => updateShowStatsBeforeLaps(!showStatsBeforeLaps)}
                  />
                  <span className="ml-2 text-base-content">Show stats before laps</span>
                </label>
                <legend className="fieldset-legend text-xl mb-2">Hourly Amount</legend>
                <label className="label">
                  <input
                    type="text"
                    placeholder="Enter Hourly Amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="input input-ghost w-16 mx-2 p-4 mb-4 h-4"
                  />
                </label>

              </div>
            </ul>
          </div>
          {/* Themes */}
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
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start text-lg capitalize"
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
