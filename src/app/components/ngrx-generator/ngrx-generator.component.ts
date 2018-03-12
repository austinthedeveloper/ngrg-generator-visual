import { GeneratedItem } from './../../classes/generated-item.class';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import * as _ from 'lodash';
import {Store} from '@ngrx/store';
import * as fromActions from '../../store/actions';

@Component({
  selector: 'ngrx-generator',
  templateUrl: './ngrx-generator.component.html',
  styleUrls: ['./ngrx-generator.component.scss']
})

export class NgrxGeneratorComponent implements OnInit {
  items$: Observable<GeneratedItem[]>;

  types = [
    {name: 'Reducer', value: 'reducer'},
    {name: 'Action', value: 'action'},
    {name: 'Effect', value: 'effect'},
  ];

  flags = [
    {name: 'Dry Run', value: 'test'},
    {name: 'Group', value: 'group'},
    {name: 'Flatten', value: 'flat'},
    {name: 'Spec', value: 'spec'}
  ];

  generate = 'ng g';
  connector = '&&';

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.newItem();
    this.items$ = this.store.select('item').pipe(
      tap(res => console.log(res)),
      map(res => {
        return Object.keys(res.entities).map(id => res.entities[parseInt(id, 10)]);
      })
    );
  }

  newItem() {
    const newItem = new GeneratedItem();
    this.store.dispatch({
      type: fromActions.ItemActionTypes.add,
      payload: newItem
    });

  }

  copyItem(item: GeneratedItem) {
    const res = _.cloneDeep(item);
    res.id = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    this.store.dispatch({
      type: fromActions.ItemActionTypes.add,
      payload: res
    });
    this.snackMessage('Item Copied');
  }

  deleteItem(item: GeneratedItem) {
    this.snackMessage('Item Deleted');

    this.store.dispatch({
      type: fromActions.ItemActionTypes.remove,
      payload: item
    });
  }

  copyClipboard() {
    this.snackMessage('Copied to Clipboard!');
  }

  builtString(item: GeneratedItem) {
    if (!this.checkTypes(item.types)) {
      return;
    }
    let res = '';
    const flat = item.flags.flat ? '' : ' --flat false';
    const spec = item.flags.spec ? '' : ' --spec false';
    const group = item.flags.group ? ' --group true' : '';
    const test = item.flags.test ? ' --dry-run' : '';
    const module = item.module ? ` --module ${item.module}` : '';
    const flags = `${flat}${spec}${group}${test}${module}`;
    const path = item.path ? `${item.path}/` : '';
    _.forEach(item.types, (type, key) => {
      if (type) {
        const string = `${this.generate} ${key} ${path}${item.name}`;
        res = res.length ? `${res} ${this.connector} ${string}${flags}` : `${res} ${string}${flags}`;
      }
    });

    return res.replace(/\s\s/g, ' ');
  }

  snackMessage(message: string, action = 'Dismiss') {
    this.snackBar.open(message, '', {
      duration: 500,
    });
  }

  checkTypes(types) {
    const array = _(types).pickBy(_.identity).keys().value();
    return array.length ? true : false;
  }

}
