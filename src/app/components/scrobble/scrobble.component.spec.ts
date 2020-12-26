import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrobbleComponent } from './scrobble.component';

describe('ScrobbleComponent', () => {
  let component: ScrobbleComponent;
  let fixture: ComponentFixture<ScrobbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrobbleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrobbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
