import { Action } from '@ngrx/store';


export interface LevelState {
  entities: { [id: number]: any };
  loaded: boolean;
  loading: boolean;
}

export const initialState: LevelState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: Action): LevelState {
  switch (action.type) {

    default:
      return state;
  }
}
