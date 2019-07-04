import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineFriendsColumnComponent } from './online-friends-column.component';

describe('OnlineFriendsColumnComponent', () => {
  let component: OnlineFriendsColumnComponent;
  let fixture: ComponentFixture<OnlineFriendsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineFriendsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineFriendsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
