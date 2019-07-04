import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsQuizColumnComponent } from './friends-quiz-column.component';

describe('FriendsQuizColumnComponent', () => {
  let component: FriendsQuizColumnComponent;
  let fixture: ComponentFixture<FriendsQuizColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsQuizColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsQuizColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
