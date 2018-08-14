import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  previousPageSize: number;

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
    this.previousPageSize = 10;
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

  async loadData() {
    // We need to save a copy of the current pageEvent in case the user navigates before the search callback finishes.
    const page = Object.assign({}, this.pageEvent);
    this.loading = true;

    const searchedTracks = await this.lastfmService.search(this.formGroup.getRawValue().query, page.pageSize, page.pageIndex + 1);
    this.results[page.pageIndex] = searchedTracks.tracks;

    this.paginator.length = searchedTracks.count;
    this.loading = false;

    this.navList.changes.subscribe((lst: QueryList<ElementRef>) => {
      if (lst.length > 0) {
        lst.first.nativeElement.scrollTop = 0;
      }
    });
  }

  async onPage(event: PageEvent) {
    this.pageEvent = event;

    if (event.pageSize !== this.previousPageSize) {
      this.results = {};
      this.paginator.pageIndex = 0;
      this.pageEvent = {...this.pageEvent, pageIndex: 0};
      await this.loadData();
    }

    this.previousPageSize = event.pageSize;

    if (event.pageSize === this.previousPageSize && !(event.pageIndex in this.results)) {
      await this.loadData();
    }
  }

  click(result: Track) {
    this.selectionService.selectedSong.next(result);
  }

  img(result: Track) {
    return result.album ? result.album.image[0]['#text'] : '';
  }
}
