import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import { SelectionService } from '../../services/selection/selection.service';
import { MatPaginator, PageEvent } from '@angular/material';
import { environment } from '../../../environments/environment';

interface TrackData {
  [page: number]: Track[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formGroup: FormGroup;
  results: TrackData;
  pageEvent: PageEvent;
  loading: boolean;
  @ViewChildren('navList', { read: ElementRef }) navList: QueryList<ElementRef>;
  @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;

  constructor(private lastfmService: LastfmService, private selectionService: SelectionService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      query: new FormControl(environment.testQuery),
    });
    this.results = {};
    this.pageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
  }

  get currentResults(): Track[] {
    return this.results[this.pageEvent.pageIndex];
  }

  get hasResults() {
    return Object.keys(this.results).length > 0;
  }

  submit() {
    this.results = {};
    this.loadData();
  }

  loadData() {
    // We need to save a copy of the current pageEvent in case the user navigates before the search callback finishes.
    const page = Object.assign({}, this.pageEvent);
    this.loading = true;
    this.lastfmService.search(this.formGroup.getRawValue().query, page.pageSize, page.pageIndex + 1).then(searchedTracks => {
      this.loading = false;
      this.results[page.pageIndex] = searchedTracks.tracks;
      console.log(this.results);

      this.paginator.changes.subscribe((lst: QueryList<MatPaginator>) => {
        if (lst.length > 0) {
          lst.first.length = searchedTracks.count;
        }
      });

      this.navList.changes.subscribe((lst: QueryList<ElementRef>) => {
        if (lst.length > 0) {
          lst.first.nativeElement.scrollTop = 0;
        }
      });
    });
  }

  onPage(event: PageEvent) {
    this.pageEvent = event;

    if (!(event.pageIndex in this.results)) {
      this.loadData();
    }
  }

  click(result: Track) {
    this.selectionService.selectedSong.next(result);
  }

  img(result: Track) {
    return result.album ? result.album.image[0]['#text'] : '';
  }
}
