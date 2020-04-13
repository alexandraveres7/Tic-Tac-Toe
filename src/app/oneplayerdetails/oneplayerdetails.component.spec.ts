import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneplayerdetailsComponent } from './oneplayerdetails.component';

describe('OneplayerdetailsComponent', () => {
  let component: OneplayerdetailsComponent;
  let fixture: ComponentFixture<OneplayerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneplayerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneplayerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
