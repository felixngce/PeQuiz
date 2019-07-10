import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDescriptionColumnComponent } from './quiz-description-column.component';

describe('QuizDescriptionColumnComponent', () => {
  let component: QuizDescriptionColumnComponent;
  let fixture: ComponentFixture<QuizDescriptionColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDescriptionColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDescriptionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
