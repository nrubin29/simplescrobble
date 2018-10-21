import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import {MatDialog, MatPaginator, PageEvent} from '@angular/material';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {ScrobbleComponent} from '../../components/scrobble/scrobble.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formGroup: FormGroup;
  results: PaginatedData<Searchable>;
  viewType: string;
  loading: boolean;

  pageEvent: PageEvent;
  previousPageSize: number;

  @ViewChildren('navList', { read: ElementRef }) navList: QueryList<ElementRef>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private lastfmService: LastfmService, private matDialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      type: new FormControl('song'),
      query: new FormControl(environment.testQuery)
    });
    this.results = {};
    this.viewType = 'list';
    this.pageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
    this.previousPageSize = 10;
  }

  get currentResults(): Searchable[] {
    return this.results[this.pageEvent.pageIndex];
  }

  get hasResults() {
    return Object.keys(this.results).length > 0;
  }

  submit() {
    this.results = {};
    this.viewType = this.formGroup.getRawValue().type === 'song' ? 'list' : 'grid';
    this.loadData();
  }

  async loadData() {
    // We need to save a copy of the current pageEvent in case the user navigates before the search callback finishes.
    const page = {...this.pageEvent};
    this.loading = true;

    const searchResults = await this.lastfmService.search(this.formGroup.getRawValue().type, this.formGroup.getRawValue().query, page.pageSize, page.pageIndex + 1);
    this.results[page.pageIndex] = searchResults.results;

    this.paginator.length = searchResults.count;
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

  click(result: Searchable) {
    if (result instanceof MouseEvent) {
      return;
    }

    if (result.type === 'song') {
      this.matDialog.open(ScrobbleComponent, {data: result});
    }

    else if (result.type === 'artist') {
      this.router.navigate(['artist', result.name]);
    }

    else if (result.type === 'album') {
      this.router.navigate(['album', result.artist, result.name]);
    }
  }
}
