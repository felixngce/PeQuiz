import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerColumnComponent } from './answer-column.component';

describe('AnswerColumnComponent', () => {
  let component: AnswerColumnComponent;
  let fixture: ComponentFixture<AnswerColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
