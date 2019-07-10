import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDescriptionComponent } from './quiz-description.component';

describe('QuizDescriptionComponent', () => {
  let component: QuizDescriptionComponent;
  let fixture: ComponentFixture<QuizDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
