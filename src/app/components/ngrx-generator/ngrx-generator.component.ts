import { GeneratedItem } from './../../classes/generated-item.class';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import * as _ from 'lodash';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';

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
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
    this.newItem();
    this.items$ = this.store.select(fromStore.getItems).pipe(
      tap(res => console.log('change', res))
    );
  }

  newItem() {
    const newItem = new GeneratedItem();
    this.store.dispatch({
      type: fromStore.ItemActionTypes.add,
      payload: newItem
    });

  }

  copyItem(item: GeneratedItem) {
    const res = _.cloneDeep(item);
    res.id = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    this.store.dispatch({
      type: fromStore.ItemActionTypes.copy,
      payload: res
    });
    this.snackMessage('Item Copied');
  }

  deleteItem(item: GeneratedItem) {
    this.snackMessage('Item Deleted');

    this.store.dispatch({
      type: fromStore.ItemActionTypes.remove,
      payload: item
    });
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
