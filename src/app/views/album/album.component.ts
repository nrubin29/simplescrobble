import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityUtil } from '../../../types/entity-util';
import { SelectionService } from '../../services/selection/selection.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: Album;

  constructor(private selectionService: SelectionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.album = data.album;
    });
  }

  get img() {
    return EntityUtil.getImage(this.album, 'best');
  }

  onClick(track: TrackMatch) {
    if (track instanceof MouseEvent) {
      return;
    }

    this.selectionService.selectedSong.next({...track, album: {title: this.album.name}} as any);
  }
}
