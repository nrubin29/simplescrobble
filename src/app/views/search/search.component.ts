import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import { SelectionService } from '../../services/selection/selection.service';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formGroup: FormGroup;
  results: Track[]; // TODO: Perhaps use a better structure than an array to support things like jumping through pages.
  pageEvent: PageEvent;
  loading: boolean;
  @ViewChildren('navList', { read: ElementRef }) navList: QueryList<ElementRef>;
  @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;

  constructor(private lastfmService: LastfmService, private selectionService: SelectionService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      query: new FormControl('A Lack of Color'),
    });
    this.results = [];
    this.pageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
  }

  get filteredResults(): Track[] {
    return this.results.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);
  }

  submit() {
    this.results = [];
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.lastfmService.search(this.formGroup.getRawValue().query, this.pageEvent.pageSize, this.pageEvent.pageIndex + 1).then(searchedTracks => {
      this.loading = false;
      this.results = this.results.concat(searchedTracks.tracks);
      // this.pageEvent = {...this.pageEvent, length: searchedTracks.count};

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

    if (this.results.length <= (event.pageIndex + 1) * event.pageSize) {
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
