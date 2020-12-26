import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityUtil } from '../../../types/entity-util';
import { MatDialog } from '@angular/material/dialog';
import { ScrobbleComponent } from '../../components/scrobble/scrobble.component';
import { MultiScrobbleComponent } from '../../components/multi-scrobble/multi-scrobble.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist;

  constructor(private matDialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.playlist = data.playlist;
    });
  }

  get img() {
    return EntityUtil.getImage(this.playlist, 'best');
  }

  onClick(track: Track) {
    if (track instanceof MouseEvent) {
      return;
    }

    this.matDialog.open(ScrobbleComponent, { data: track });
  }

  scrobble() {
    this.matDialog.open(MultiScrobbleComponent, { data: this.playlist });
  }
}
