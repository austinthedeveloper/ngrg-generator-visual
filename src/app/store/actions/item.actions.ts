import { Action } from '@ngrx/store';

export enum ItemActionTypes {
  add = '[Item] Add Item',
  remove = '[Item] Remove Item',
}

export class AddItem implements Action {
  readonly type = ItemActionTypes.add;
  constructor(public payload: any) {}
}

export class RemoveItem implements Action {
  readonly type = ItemActionTypes.add;
  constructor(public payload: any) {}
}

export type ItemActions = AddItem | RemoveItem;
