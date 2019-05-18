import { db as localforage } from './config';

export async function simpleTest() {
  try {
    console.log('Initial driver', localforage.driver());
    alert('Initial driver: ' + localforage.driver());

    await localforage.setItem('testPromiseKey', 'testPromiseValue ' + (new Date()).toString());
    const value = await localforage.getItem('testPromiseKey');
    alert(localforage.driver() + ' getItem: ' + value);
  } catch (e) {
    alert(e);
    console.log(e);
  }
}

export async function dropInstanceTest() {
  try {
    console.log('Initial driver', localforage.driver());
    alert('Initial driver: ' + localforage.driver());

    const keys = await localforage.keys();
    alert(`Found ${keys.length} keys in the store.`);

    await localforage.setItem('testPromiseKey', 'testPromiseValue ' + (new Date()).toString());
    const value = await localforage.getItem('testPromiseKey');
    alert(localforage.driver() + ' getItem: ' + value);
    try {
      await localforage.dropInstance();
      const newKeys = await localforage.keys();
      alert(`Drop instance. Now having ${newKeys.length} keys.`);
    } catch (err) {
      alert(`Failed to drop instance!`);
      alert(err);
    }

  } catch (e) {
    alert(e);
    console.log(e);
  }
}

export function perfTest() {
  const items = [];
  // var output = document.querySelector('#cordovaSQLiteDriver-output');

  for (let i = 0; i < 200; i++) {
    items.push({
      key: 'key' + i,
      value: 'value' + i
    });
  }

  let t0 = +new Date();

  const driverErrors = {};
  const errorMessages = [];

  function timeAddAndRemove() {
    const driverName = localforage.driver();

    t0 = +new Date();
    return Promise.all(items.map(item => {
      return localforage.setItem(item.key, item.value);
    })).then(() => {
      return Promise.all(items.map(item => {
        return localforage.getItem(item.key);
      }));
    }).then(results => {
      const t1 = +new Date();
      driverErrors[driverName] = driverErrors[driverName] || [];
      for (let i = 0; i < results.length; i++) {
        if (results[i] !== 'value' + i) {
          driverErrors[driverName].push({
            i,
            value: results[i]
          });
        }
      }
      let msg = driverName + ' Time: ' + (t1 - t0);
      if (driverErrors[driverName] && driverErrors[driverName].length) {
        msg += ', Errors: ' + driverErrors[driverName].length;
      }
      errorMessages.push(msg);
      console.log(msg);
      // if (output)  {
      //   output.innerHTML += msg + '<br />';
      // }
    });
  }

  return Promise.resolve()
  .then(() => {
    // return localforage.setDriver(cordovaSQLiteDriver._driver).then(function() {
    //   if (output)  {
    //     output.innerHTML = 'Started perf test at: ' + (new Date()).toString() + '<br />';
    //   }
    //   return localforage.clear();
    // })
  })
  .then(timeAddAndRemove).then(() => {
    return localforage.setDriver([
        // localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
    ]).then(() => {
      return localforage.clear();
    });
  }).then(timeAddAndRemove);
}
