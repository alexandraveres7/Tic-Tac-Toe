import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AIboardComponent } from './AIboard.component';

describe('BoardComponent', () => {
  let component: AIboardComponent;
  let fixture: ComponentFixture<AIboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AIboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AIboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
