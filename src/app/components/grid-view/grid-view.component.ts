import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {EntityUtil} from '../../../types/entity-util';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  @Input() currentResults: Searchable[];
  @Input() descriptor = true;
  @Output() click = new EventEmitter<Searchable>();
  chunk: number;

  constructor() { }

  ngOnInit() {
    this.resize({target: window});
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.chunk = Math.floor(event.target.innerWidth / 150);
  }

  onClick(result: Searchable) {
    this.click.emit(result);
  }

  img(result: Searchable) {
    const image = EntityUtil.getImage(result, 'best');
    return image ? `url("${image}")` : 'url("assets/placeholder.jpg")';
  }

  getDescriptor(result: Searchable) {
    return this.descriptor ? EntityUtil.getDescriptor(result) : undefined;
  }
}
