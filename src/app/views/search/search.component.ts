import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { LastfmService } from '../../services/lastfm/lastfm.service';
import { SelectionService } from '../../services/selection/selection.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formGroup: FormGroup;
  results: Track[];
  pageEvent: PageEvent;
  loading: boolean;
  @ViewChildren('navList', { read: ElementRef }) navList: QueryList<ElementRef>;

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

  submit(form: NgForm) {
    this.results = [];
    this.loading = true;
    this.lastfmService.search(form.value.query).then(data => {
      this.loading = false;
      this.results = data;
      this.pageEvent = {...this.pageEvent, length: data.length};

      this.navList.changes.subscribe((lst: QueryList<ElementRef>) => {
        lst.first.nativeElement.scrollTop = 0;
      });
    });
  }

  onPage(event: PageEvent) {
    this.pageEvent = event;
  }

  click(result: Track) {
    this.selectionService.selectedSong.next(result);
  }

  img(result: Track) {
    return result.album ? result.album.image[0]['#text'] : '';
  }
}
