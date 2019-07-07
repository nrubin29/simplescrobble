import {createAction, props} from '@ngrx/store';

export const authenticateAction = createAction('[Last.fm] Authenticate');
export const authenticateSuccessAction = createAction('[Last.fm] Authenticate Success');

export const searchAction = createAction('[Last.fm] Search', props<{t: 'track' | 'artist' | 'album', q: string, limit: number, page: number}>());
