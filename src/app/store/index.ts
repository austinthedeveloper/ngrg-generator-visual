import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromItem from './reducers/item.reducer';
// not used in production
import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
  item: fromItem.State;
}

export const reducers: ActionReducerMap<State> = {

  item: fromItem.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

export function getItemsState(state: State) { return state.item; }
export const getItems = createSelector(getItemsState, ({ entities }) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
// export const getItems = createSelector(getItemsState, fromItem.getItems);
export const getItemsLoaded = createSelector(getItemsState, fromItem.getItemsLoaded);
export const getItemsLoading = createSelector(getItemsState, fromItem.getItemsLoading);

export * from './actions';
