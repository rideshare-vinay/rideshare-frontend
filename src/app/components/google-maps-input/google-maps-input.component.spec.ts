import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsInputComponent } from './google-maps-input.component';

describe('GoogleMapsInputComponent', () => {
  let component: GoogleMapsInputComponent;
  let fixture: ComponentFixture<GoogleMapsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
