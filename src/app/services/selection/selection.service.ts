import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  selectedSong: Subject<Track>;

  constructor() {
    this.selectedSong = new Subject<Track>();
  }
}
