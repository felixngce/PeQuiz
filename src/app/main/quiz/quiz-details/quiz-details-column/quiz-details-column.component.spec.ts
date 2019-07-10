import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDetailsColumnComponent } from './quiz-details-column.component';

describe('QuizDetailsColumnComponent', () => {
  let component: QuizDetailsColumnComponent;
  let fixture: ComponentFixture<QuizDetailsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDetailsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDetailsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
