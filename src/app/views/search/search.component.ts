import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import { SelectionService } from '../../services/selection/selection.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formGroup: FormGroup;
  results: Track[];

  constructor(private lastfmService: LastfmService, private selectionService: SelectionService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      query: new FormControl(''),
    });
    this.results = [];
  }

  submit(form: NgForm) {
    this.lastfmService.search(form.value.query).then(data => {
      this.results = data;
      console.log(this.results);
    });
  }

  click(result: Track) {
    this.selectionService.selectedSong.next(result);
  }

  img(result: Track) {
    return result.album ? result.album.image[0]['#text'] : '';
  }
}
