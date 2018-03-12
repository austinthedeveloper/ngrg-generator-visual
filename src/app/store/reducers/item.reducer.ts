import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAction from '../actions/item.actions';


export interface State {
  entities: { [id: number]: any };
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromAction.ItemActions): State {
  switch (action.type) {
    case fromAction.ItemActionTypes.add:
    case fromAction.ItemActionTypes.copy: {
      const item = action.payload;
      const entities = {
        ...state.entities,
        [item.id]: item,
      };

      return {
        ...state,
        entities,
      };
    }
    case fromAction.ItemActionTypes.remove: {
      const item = action.payload;
      const { [item.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }
    default:
      return state;
  }
}

export const getItemsLoading = (state: State) => state.loading;
export const getItemsLoaded = (state: State) => state.loaded;
export const getItems = (state: State) => state.entities;


