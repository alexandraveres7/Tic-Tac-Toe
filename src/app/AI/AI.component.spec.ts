import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AIComponent } from './AI.component';

describe('BoardComponent', () => {
  let component: AIComponent;
  let fixture: ComponentFixture<AIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
