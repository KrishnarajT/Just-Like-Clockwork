/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/App.jsx",
		"./src/main.jsx",
		"./src/components/**/*.jsx",
		"./src/pages/*.jsx",
		"./index.html",
		"./src/components/ui/*.jsx",
	],
	plugins: [require("daisyui")],
	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: all,
	},
};
