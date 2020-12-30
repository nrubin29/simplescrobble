import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaleBannerComponent } from './finale-banner.component';

describe('FinaleBannerComponent', () => {
  let component: FinaleBannerComponent;
  let fixture: ComponentFixture<FinaleBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinaleBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinaleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
