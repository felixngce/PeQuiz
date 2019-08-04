import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDoneComponent } from './question-done.component';

describe('QuestionDoneComponent', () => {
  let component: QuestionDoneComponent;
  let fixture: ComponentFixture<QuestionDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
