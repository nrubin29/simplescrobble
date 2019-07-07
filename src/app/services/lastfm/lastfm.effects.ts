import {Injectable} from '@angular/core';
import {LastfmService} from './lastfm.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getSelectors, ROUTER_NAVIGATED, RouterNavigatedAction, RouterReducerState} from '@ngrx/router-store';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {authenticateAction, authenticateSuccessAction} from './lastfm.actions';
import {State} from '../../state';
import {createFeatureSelector, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {from} from 'rxjs';

@Injectable()
export class LastfmEffects {
  selectRouter = createFeatureSelector<
    State,
    RouterReducerState<any>
    >('router');

  authenticate$ = createEffect(() => this.actions$.pipe(
    ofType(authenticateAction),
    withLatestFrom(this.store.select(getSelectors(this.selectRouter).selectQueryParams)),
    switchMap(([, routeParams]) => this.lastfmService.authenticate(routeParams['token'])),
    map(data => {
      // TODO: Store this data in the store and sync to localStorage.
      localStorage.setItem('key', data.session.key);
      localStorage.setItem('name', data.session.name);
      this.lastfmService.onAuth.next();
      return from(this.router.navigate(['/search']));
    }),
    map(() => authenticateSuccessAction())
  ));

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private lastfmService: LastfmService
  ) {}
}
