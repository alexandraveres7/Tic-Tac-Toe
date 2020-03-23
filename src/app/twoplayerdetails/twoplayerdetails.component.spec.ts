import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoplayerdetailsComponent } from './twoplayerdetails.component';

describe('TwoplayerdetailsComponent', () => {
  let component: TwoplayerdetailsComponent;
  let fixture: ComponentFixture<TwoplayerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoplayerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoplayerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
