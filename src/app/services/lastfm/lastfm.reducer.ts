import {Action, createReducer} from '@ngrx/store';

const initialState = {

};

const lastfmReducer = createReducer(
  initialState,
);

export function reducer(state: any | undefined, action: Action) {
  return lastfmReducer(state, action);
}
