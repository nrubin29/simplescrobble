import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiScrobbleComponent } from './multi-scrobble.component';

describe('MultiScrobbleComponent', () => {
  let component: MultiScrobbleComponent;
  let fixture: ComponentFixture<MultiScrobbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiScrobbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiScrobbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
