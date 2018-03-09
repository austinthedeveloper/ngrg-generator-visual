import { Action } from '@ngrx/store';

export enum LevelActionTypes {
  LevelAction = '[Level] Action'
}

export class Level implements Action {
  readonly type = LevelActionTypes.LevelAction;
}

export type LevelActions = Level;
