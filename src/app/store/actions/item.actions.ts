import { Action } from '@ngrx/store';

export enum ItemActionTypes {
  add = '[Item] Add Item',
  copy = '[Item] Copy Item',
  remove = '[Item] Remove Item',
}

export class AddItem implements Action {
  readonly type = ItemActionTypes.add;
  constructor(public payload: any) {}
}

export class CopyItem implements Action {
  readonly type = ItemActionTypes.copy;
  constructor(public payload: any) {}
}

export class RemoveItem implements Action {
  readonly type = ItemActionTypes.remove;
  constructor(public payload: any) {}
}

export type ItemActions = AddItem | CopyItem | RemoveItem;
