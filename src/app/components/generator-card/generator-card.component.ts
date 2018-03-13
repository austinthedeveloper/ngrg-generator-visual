import { GeneratedItem } from './../../classes/generated-item.class';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import * as _ from 'lodash';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-generator-card',
  templateUrl: './generator-card.component.html',
  styleUrls: ['./generator-card.component.scss']
})

export class GeneratorCardComponent implements OnInit {
  @Input()
  item: GeneratedItem;

  @Output()
  copy: EventEmitter<GeneratedItem> = new EventEmitter<GeneratedItem>();

  @Output()
  delete: EventEmitter<GeneratedItem> = new EventEmitter<GeneratedItem>();

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
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  copyItem(item: GeneratedItem) {
    this.copy.emit(item);
  }

  deleteItem(item: GeneratedItem) {
    this.delete.emit(item);
  }

  copyClipboard() {
    this.snackMessage('Copied to Clipboard!');
  }

  get builtString() {
    if (!this.item || !this.checkTypes) {
      return;
    }
    let res = '';
    const flat = this.item.flags.flat ? '' : ' --flat false';
    const spec = this.item.flags.spec ? '' : ' --spec false';
    const group = this.item.flags.group ? ' --group true' : '';
    const test = this.item.flags.test ? ' --dry-run' : '';
    const module = this.item.module ? ` --module ${this.item.module}` : '';
    const flags = `${flat}${spec}${group}${test}${module}`;
    const path = this.item.path ? `${this.item.path}/` : '';
    _.forEach(this.item.types, (type, key) => {
      if (type) {
        const string = `${this.generate} ${key} ${path}${this.item.name}`;
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

  get checkTypes() {
    const types = this.item.types;
    const array = _(types).pickBy(_.identity).keys().value();
    return array.length ? true : false;
  }

}
