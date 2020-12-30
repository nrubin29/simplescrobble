import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-finale-banner',
  templateUrl: './finale-banner.component.html',
  styleUrls: ['./finale-banner.component.scss'],
})
export class FinaleBannerComponent implements OnInit {
  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (localStorage.getItem('hide_finale_banner') === 'true') {
      this.remove();
    }
  }

  private remove() {
    this.host.nativeElement.remove();
  }

  dismiss() {
    localStorage.setItem('hide_finale_banner', 'true');
    this.remove();
  }
}
