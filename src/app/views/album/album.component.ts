import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityUtil } from '../../../types/entity-util';
import {MatDialog} from '@angular/material';
import {ScrobbleComponent} from '../../components/scrobble/scrobble.component';

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

  onClick(track: TrackMatch) {
    if (track instanceof MouseEvent) {
      return;
    }

    this.matDialog.open(ScrobbleComponent, {data: {...track, album: {title: this.album.name}}});
  }
}
