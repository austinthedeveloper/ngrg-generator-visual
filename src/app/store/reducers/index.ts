import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromLevels from './level/level.reducer';

export interface AppState {
  level: fromLevels.LevelState;
}

export const reducers: ActionReducerMap<AppState> = {
  level: fromLevels.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
