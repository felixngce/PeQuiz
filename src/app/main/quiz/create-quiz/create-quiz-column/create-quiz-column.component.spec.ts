import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizColumnComponent } from './create-quiz-column.component';

describe('CreateQuizColumnComponent', () => {
  let component: CreateQuizColumnComponent;
  let fixture: ComponentFixture<CreateQuizColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuizColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuizColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
