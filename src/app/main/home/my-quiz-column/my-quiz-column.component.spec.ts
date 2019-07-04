import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuizColumnComponent } from './my-quiz-column.component';

describe('MyQuizColumnComponent', () => {
  let component: MyQuizColumnComponent;
  let fixture: ComponentFixture<MyQuizColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuizColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuizColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
