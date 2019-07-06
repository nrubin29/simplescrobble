import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityUtil } from '../../../types/entity-util';
import {MatDialog} from '@angular/material';
import {ScrobbleComponent} from '../../components/scrobble/scrobble.component';
import {MultiScrobbleComponent} from '../../components/multi-scrobble/multi-scrobble.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: Album;

  constructor(private matDialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.album = data.album;
    });
  }

  get img() {
    return EntityUtil.getImage(this.album, 'best');
  }

  onClick(track: Track) {
    if (track instanceof MouseEvent) {
      return;
    }

    this.matDialog.open(ScrobbleComponent, {data: {...track, album: {name: this.album.name}}});
  }

  scrobble() {
    this.matDialog.open(MultiScrobbleComponent, {data: this.album});
  }
}
