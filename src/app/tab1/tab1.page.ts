import { Component } from '@angular/core';
import { simpleTest, dropInstanceTest } from '../localforage/localforageCordovasqlitedriverDemo';
import { simpleObservableTest } from '../localforage/observableDemo';
import { simplePluralOperationsTest } from '../localforage/pluralOperationsDemo';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  testLocalForageDriver() {
    return simpleTest();
  }

  testLocalForageDropInstance() {
    return dropInstanceTest();
  }

  testLocalForageObservable() {
    return simpleObservableTest();
  }

  testLocalForagePluralOperations() {
    return simplePluralOperationsTest();
  }

}
