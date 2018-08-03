import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import * as moment from 'moment';
import { SelectionService } from '../../services/selection/selection.service';

@Component({
  selector: 'app-scrobble',
  templateUrl: './scrobble.component.html',
  styleUrls: ['./scrobble.component.scss']
})
export class ScrobbleComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private lastfmService: LastfmService, private selectionService: SelectionService) { }

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
      alert(data.scrobbles['@attr'].accepted > 0 ? 'Success!' : 'Failed.');
    });
  }
}
