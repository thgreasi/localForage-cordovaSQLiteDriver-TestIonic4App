import { Observable } from 'rxjs';
import { db as localForage } from './config';
import { extendPrototype } from 'localforage-observable';
const localforage = extendPrototype(localForage);

console.log(localforage, localforage.newObservable);

localforage.newObservable.factory = (subscribeFn) => {
    return Observable.create(subscribeFn);
};

export function simpleObservableTest() {
  try {
    localforage.ready().then(() => {
      const observable = localforage.newObservable();

      const subscription = observable.subscribe({
        next(args) {
          console.log('I observe everything', args);
          alert('I observe everything ' + JSON.stringify(args));
        },
        error(err) {
          console.log('Found an error!', err);
          alert('Found an error! ' + err);
        },
        complete() {
          console.log('Observable destroyed!');
          alert('Observable destroyed!');
        }
      });

      return localforage.setItem('testPromiseKey', 'testPromiseValue ' + (new Date()).toString()).catch((err) => {
        alert(err);
        console.log(err);
      }).then((value) => {
        subscription.unsubscribe();
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
