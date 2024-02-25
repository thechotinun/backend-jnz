(() => {
  const asyncForEach = (array, callback, done) => {
    const runAndWait = (i) => {
      if (i === array.length) return done();
      return callback(array[i], () => runAndWait(i + 1));
    };
    return runAndWait(0);
  };

  const dump = {};
  const dbRequest = window.indexedDB.open('firebaseLocalStorageDb');
  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const stores = ['firebaseLocalStorage'];

    const tx = db.transaction(stores);
    asyncForEach(
      stores,
      (store, next) => {
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => {
          dump[store] = req.result;
          next();
        };
      },
      () => {
        // console.log(JSON.stringify(dump));
        // console.log(JSON.parse(dump));
        // console.log(
        //   dump.firebaseLocalStorage[1].value.stsTokenManager.accessToken,
        // );
      },
    );
  };
})();
