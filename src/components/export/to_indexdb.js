function saveToIndexedDB(laps) {
  // Open (or create) the database
  let open = indexedDB.open("LapsDatabase", 1);

  // Create the schema
  open.onupgradeneeded = function() {
    let db = open.result;
    db.createObjectStore("LapsStore", {keyPath: "id"});
  };

  open.onsuccess = function() {
    // Start a new transaction
    let db = open.result;
    let tx = db.transaction("LapsStore", "readwrite");
    let store = tx.objectStore("LapsStore");

    // Add the laps to the object store
    for (let i = 0; i < laps.length; i++) {
      store.put(laps[i]);
    }

    // Close the db when the transaction is done
    tx.oncomplete = function() {
      db.close();
    };
  };
}

export default saveToIndexedDB;