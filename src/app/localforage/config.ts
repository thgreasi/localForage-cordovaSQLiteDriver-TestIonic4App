import * as localforage from 'localforage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import * as sessionStorageWrapper from 'localforage-sessionstoragewrapper';

console.log(localforage, localforage.driver());
console.log(cordovaSQLiteDriver, cordovaSQLiteDriver._driver);
console.log(sessionStorageWrapper, sessionStorageWrapper._driver);

export function init() {
  try {
    localforage.defineDriver(cordovaSQLiteDriver)
    .then(() => localforage.defineDriver(sessionStorageWrapper))
    .then(() => {
      return localforage.setDriver([
        cordovaSQLiteDriver._driver,
        sessionStorageWrapper._driver,
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ]).then(() => {
        console.log('setDriver:' + localforage.driver());
      });
    }).catch((err) => {
      alert(err);
      console.log(err);
    });
  } catch (e) {
    alert(e);
    console.log(e);
  }
}

init();

export const db = localforage;
