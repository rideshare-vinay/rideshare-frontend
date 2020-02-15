import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GoogleMapsComponent } from './google-maps.component';
import { GoogleMapsService } from 'src/app/services/google-maps-service/google-maps.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Coordinates } from 'src/app/models/coordinates';
import { of, BehaviorSubject } from 'rxjs';

describe('GoogleMapsComponent', () => {
  let component: GoogleMapsComponent;
  let fixture: ComponentFixture<GoogleMapsComponent>;
  let mockMarkerList:Coordinates[];
  let mapsService:GoogleMapsService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [HttpClientTestingModule],
      declarations: [GoogleMapsComponent],
      providers: [GoogleMapsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mapsService = TestBed.get(GoogleMapsService);

    mockMarkerList = [ 
      {lat: 100, lng: 100},
      {lat: 100, lng: 100},
      {lat: 100, lng: 100},
    ]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the markerList on init', fakeAsync(() => {
    (mapsService as any).googleMapsMarkerListEvent = new BehaviorSubject<Coordinates[]>(mockMarkerList);
    component.ngOnInit();
    tick();
    expect(component.markerList).toEqual(mockMarkerList);
  }));

  it('should set inputVisibility on init', fakeAsync(() => {
    (mapsService as any).googleMapsInputVisibilityEvent = new BehaviorSubject<boolean>(false);
    component.ngOnInit();
    tick();
    expect(component.inputVisibility).toBeFalsy();
  }));

});
