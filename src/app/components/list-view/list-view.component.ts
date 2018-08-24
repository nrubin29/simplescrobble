import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityUtil } from '../../../types/entity-util';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() currentResults: Entity[];
  @Input() image = true;
  @Input() descriptor = true;
  @Output() click = new EventEmitter<Entity>();

  constructor() { }

  ngOnInit() {
  }

  onClick(result: Entity) {
    this.click.emit(result);
  }

  img(result: Entity) {
    return EntityUtil.getImage(result, 'worst') || 'assets/placeholder.jpg';
  }

  getDescriptor(result: Entity) {
    return this.descriptor ? EntityUtil.getDescriptor(result) : undefined;
  }
}
