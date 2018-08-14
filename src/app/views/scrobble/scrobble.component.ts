import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import * as moment from 'moment';
import { SelectionService } from '../../services/selection/selection.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-scrobble',
  templateUrl: './scrobble.component.html',
  styleUrls: ['./scrobble.component.scss']
})
export class ScrobbleComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private lastfmService: LastfmService, private selectionService: SelectionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      song: new FormControl(''),
      artist: new FormControl(''),
      album: new FormControl(''),
      custom: new FormControl(false),
      timestamp: new FormControl()
    });

    this.selectionService.selectedSong.subscribe(next => {
      this.formGroup.patchValue({
        song: next.name,
        artist: next.artist.name,
        album: next.album ? next.album.title : ''
      });
    });
  }

  submit(form: NgForm) {
    this.lastfmService.scrobble(form.value, form.value.custom ? moment(form.value.timestamp).unix() : moment().unix()).then(data => {
      this.snackBar.open(data.scrobbles['@attr'].accepted > 0 ? 'Success!' : 'Failed.', undefined, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}
