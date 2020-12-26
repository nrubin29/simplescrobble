import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scrobble',
  templateUrl: './scrobble.component.html',
  styleUrls: ['./scrobble.component.scss'],
})
export class ScrobbleComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private lastfmService: LastfmService,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<ScrobbleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Track
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.data.name || ''),
      artist: new FormControl(
        this.data.artist ? this.data.artist.name || '' : ''
      ),
      album: new FormControl(this.data.album ? this.data.album.name || '' : ''),
      custom: new FormControl(false),
      timestamp: new FormControl(),
    });
  }

  submit(form: NgForm) {
    this.lastfmService
      .scrobble(
        [form.value],
        [
          form.value.custom
            ? moment(form.value.timestamp).unix()
            : moment().unix(),
        ]
      )
      .then(data => {
        this.matDialogRef.close();
        this.snackBar.open(
          data.scrobbles['@attr'].accepted > 0 ? 'Success!' : 'Failed.',
          undefined,
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      });
  }
}
