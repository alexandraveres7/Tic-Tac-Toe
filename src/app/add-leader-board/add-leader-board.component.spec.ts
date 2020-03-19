import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaderBoardComponent } from './add-leader-board.component';

describe('AddLeaderBoardComponent', () => {
  let component: AddLeaderBoardComponent;
  let fixture: ComponentFixture<AddLeaderBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaderBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeaderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
