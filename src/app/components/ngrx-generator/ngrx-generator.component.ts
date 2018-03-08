import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

export class GeneratedItem {
  name: string;
  path: string;
  module: string;

  id: number;
  types = {
    reducer: false,
    action: false,
    effect: false,
  };
  flags = {
    flat: true,
    group: false,
    test: false
  };

  constructor(id: number) {
    this.id = id;
  }
}

@Component({
  selector: 'ngrx-generator',
  templateUrl: './ngrx-generator.component.html',
  styleUrls: ['./ngrx-generator.component.scss']
})

export class NgrxGeneratorComponent implements OnInit {

  items: any[] = [];

  types = [
    {name: 'Reducer', value: 'reducer'},
    {name: 'Action', value: 'action'},
    {name: 'Effect', value: 'effect'},
  ];

  flags = [
    {name: 'Dry Run', value: 'test'},
    {name: 'Group', value: 'group'},
    {name: 'Flatten', value: 'flat'},
  ];

  generate = 'ng g ';
  connector = ' && ';

  constructor() { }

  ngOnInit() {
    this.newItem();
  }

  newItem() {
    this.items.push(new GeneratedItem(Math.random()));
  }

  builtString(item: GeneratedItem) {
    let res = '';
    const flat = item.flags.flat ? '' : '--flat false';
    const group = item.flags.group ? '--group true' : '';
    const test = item.flags.test ? '--dry-run' : '';
    const flags = `${flat} ${group} ${test}`;
    const path = item.path ? `${item.path}/` : '';
    _.forEach(item.types, (type, key) => {
      if (type) {
        const string = `${this.generate} ${key} ${path}${item.name}`;
        res = res.length ? `${res} ${this.connector} ${string} ${flags}` : `${res} ${string} ${flags}`;
      }
    });
    return res;
  }

}
