import {Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-multi-scrobble',
  templateUrl: './multi-scrobble.component.html',
  styleUrls: ['./multi-scrobble.component.scss']
})
export class MultiScrobbleComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private lastfmService: LastfmService, private snackBar: MatSnackBar, private matDialogRef: MatDialogRef<MultiScrobbleComponent>, @Inject(MAT_DIALOG_DATA) private data: Album) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      custom: new FormControl(false),
      timestamp: new FormControl()
    });
  }

  submit(form: NgForm) {
    const timestamps = [form.value.custom ? moment(form.value.timestamp).unix() : moment().unix()];

    for (const track of this.data.tracks.slice(0, this.data.tracks.length - 1)) {
      timestamps.push(timestamps[timestamps.length - 1] + track.duration);
    }

    this.lastfmService.scrobble(this.data.tracks.map(track => ({album: this.data.name, artist: track.artist.name, name: track.name})), timestamps).then(data => {
      this.matDialogRef.close();
      this.snackBar.open(data.scrobbles['@attr'].accepted > 0 ? 'Success!' : 'Failed.', undefined, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}
