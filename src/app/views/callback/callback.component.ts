import { Component, OnInit } from '@angular/core';
import {State} from '../../state';
import {Store} from '@ngrx/store';
import {authenticateAction} from '../../services/lastfm/lastfm.actions';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(authenticateAction());
  }
}
