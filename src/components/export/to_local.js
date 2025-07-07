function saveToLocalStorage(laps) {
  // Convert the laps array to a JSON string
  let lapsJSON = JSON.stringify(laps);

  // Save the JSON string to localStorage
  localStorage.setItem('laps', lapsJSON);
}

export { saveToLocalStorage as default };
